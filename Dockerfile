# ---------- Stage 1: build frontend ----------
    FROM node:20-bullseye AS frontend-build

    WORKDIR /app/frontend
    
    # Устанавливаем зависимости
    COPY frontend/package*.json ./
    RUN npm install
    
    # Копируем исходники и собираем
    COPY frontend ./
    RUN npm run build
    
    # ---------- Stage 2: final runtime (Node + Python) ----------
    FROM node:20-bullseye
    
    # Ставит Python для backend
    RUN apt-get update && apt-get install -y \
        python3 python3-pip \
     && rm -rf /var/lib/apt/lists/*
    
    WORKDIR /app
    
    # Backend
    COPY backend ./backend
    RUN pip3 install --no-cache-dir -r backend/requirements.txt
    
    # Готовый frontend (код, node_modules, .next и т.д.)
    COPY --from=frontend-build /app/frontend ./frontend
    
    # ENV для Railway
    ENV NODE_ENV=production
    ENV PORT=8080
    
    EXPOSE 8080
    
    # Старт-скрипт
    COPY start.sh ./start.sh
    RUN chmod +x ./start.sh
    
    CMD ["./start.sh"]
    