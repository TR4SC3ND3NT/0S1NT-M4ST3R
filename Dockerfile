# === Базовый образ: Node + Python для фронта и бэка в одном контейнере ===
FROM node:20-bullseye

# Не даём apt задавать вопросы
ENV DEBIAN_FRONTEND=noninteractive

# Рабочая директория
WORKDIR /app

# --- Устанавливаем Python и системные зависимости для backend ---
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
        python3 python3-pip python3-venv \
    && rm -rf /var/lib/apt/lists/*

# --- Копируем backend и ставим зависимости ---
COPY backend ./backend

RUN pip3 install --no-cache-dir -r backend/requirements.txt

# --- Копируем frontend и ставим зависимости + билдим Next.js ---
COPY frontend ./frontend

WORKDIR /app/frontend

RUN npm install && npm run build

# --- Скрипт запуска: поднимаем backend + frontend в одном контейнере ---
WORKDIR /app

# start.sh будет запускать оба сервиса
RUN printf '#!/bin/sh\n\
set -e\n\
# Запуск backend\n\
cd /app/backend\n\
if [ -n \"$BACKEND_CMD\" ]; then\n\
  echo \"[start.sh] Using custom BACKEND_CMD: $BACKEND_CMD\"\n\
  sh -c \"$BACKEND_CMD\" &\n\
else\n\
  echo \"[start.sh] Starting backend with uvicorn app:app --host 0.0.0.0 --port 8000\"\n\
  uvicorn app:app --host 0.0.0.0 --port 8000 &\n\
fi\n\
# Запуск frontend\n\
cd /app/frontend\n\
echo \"[start.sh] Starting Next.js on port ${PORT:-8080}\"\n\
npm run start -- -p \"${PORT:-8080}\"\n' > /app/start.sh && \
    chmod +x /app/start.sh

# Railway будет прокидывать PORT, но поставим дефолт для локального запуска
ENV PORT=8080

EXPOSE 8080

# Главная команда контейнера
CMD ["/app/start.sh"]
