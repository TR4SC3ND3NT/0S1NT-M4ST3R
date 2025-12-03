#!/bin/sh
set -e

# Порт от Railway или 8080 по умолчанию
PORT="${PORT:-8080}"

echo "[start.sh] Starting backend on 8000..."
cd /app/backend
# если у тебя FastAPI:
uvicorn app:app --host 0.0.0.0 --port 8000 &

echo "[start.sh] Starting Next.js on port $PORT..."
cd /app/frontend
npm run start -- -p "$PORT"
