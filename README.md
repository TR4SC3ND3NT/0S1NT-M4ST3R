# 0S1NT-M4ST3R
<p align="center">
  An OSINT toolkit providing informations on techniques and simple tools packaged in a nice responsive UI.
</p>

I created this project to gather in the same place knowledge I learnt in OSINT, to share it and gives access to everyone. This project is a mix between short articles and tools that I use/like. Everything is integrated in a web UI and with tools running on the backend, you can host it on your server and use it from anywhere.

## Tech stack

### Frontend
- **Next.js** (React + TypeScript)
- Современный тёмный UI (Tailwind-подобные утилиты, кастомные компоненты)
- Компоненты на базе Radix UI (`@radix-ui/react-separator` и др.)
- `react-syntax-highlighter` для подсветки кода в некоторых инструментах
- WebSocket / Socket.io клиент для живых обновлений

### Backend
- **Python 3**
- FastAPI / ASGI-приложение (запуск через `uvicorn app:app`)
- Интеграции с внешними OSINT-сервисами (домен, IP, email, username и т.д.)
- Асинхронные запросы к API, обработка результатов и отдача их фронту

### Infrastructure
- **Docker** для локального запуска
- `docker-compose` для dev-окружения (отдельно фронт + бэк)
- Root-`Dockerfile` для деплоя на **Railway**
- Переменные окружения для ключей к API и базы данных (`DATABASE_URL` и др.)


## Features

Different tools are available in the UI giving you access to these features:
- Domains:
  - WHOIS
  - crt.sh domain enumeration
- Social networks:
  - Tiktok video timestamp extractor
  - Google account search ([ghunt](https://github.com/mxrch/GHunt))
  - Github account search ([osgint](https://github.com/hippiiee/osgint))
  - Discord user search
- Images:
  - Google reverse image search
  - Yandex reverse image search
- Username search ([whatsmyname](https://github.com/WebBreacher/WhatsMyName) and [socid-extractor](https://github.com/soxoj/socid-extractor))

## Installation

Modify the `docker-compose.yml` file to add your GHunt base64 token (if you want to use it).
optionally, you can modify the `NEXT_PUBLIC_BACKEND_API` variable to run the backend on a remote server.

```bash
git clone https://github.com/TR4SC3ND3NT/0S1NT-M4ST3R.git
cd 0S1NT-M4ST3R
docker compose up
```

And that's it, you can now access the app on `http://localhost:3000`.

## Contributing

Feel free to contribute to the project, if you want to had techniques, write articles or even integrate new tools.
