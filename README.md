# Portfolio CMS
Simple CMS app featuring a full frontend and backend app, automated testing and deployment.
It can be used as a text based blog of any kind, for manuals, recipes or simply to publish texts or reviews of any kind. Over time more different types of media will become usable.

## Features

- Login with unique username and password
- View posts from all users
- Create, edit or delete your own posts
- Comment on each others posts
- Simple UI and quick loading pages

## Installation

**Prerequisites**
- Node.js v22.14.0 (see .nvmrc — use nvm use if you have nvm)
- pnpm v11.3.0+ — npm install -g pnpm
- Docker & Docker Compose — required for the Docker setup, or a running MongoDB instance for local dev

### Option 1 - Docker

__1. Clone the repository__

```
git clone https://github.com/nenuphars/Portfolio-CMS.git
cd Portfolio-CMS
```

__2. Set up environment variables__

```
cp .env.example .env
```

Open .env and fill in the required values:

| Variable            |	Description                                                                           |
|---------------------|---------------------------------------------------------------------------------------|
| MONGO_USER          |	MongoDB root username                                                                 |
| MONGO_PASSWORD      |	MongoDB root password                                                                 |
| MONGO_URI           |	MongoDB connection string (e.g. mongodb://user:pass@mongo:27017/cms?authSource=admin) |
| JWT_SECRET          |	A long, random secret string for signing JWTs                                         |
| PORT                |	Backend port (default: 4000)                                                          |
| NEXT_PUBLIC_API_URL |	URL the frontend uses to reach the backend (default: http://localhost:4000)           |


__3. Start all services__

```
docker compose up --build
```

The app will be available at:

Frontend: http://localhost:3000
Backend API: http://localhost:4000


### Option 2 — Local Development

__1. Clone the repository__

```
git clone https://github.com/nenuphars/Portfolio-CMS.git
cd Portfolio-CMS
```

__2. Set up environment variables__

```
cp .env.example .env
```

Fill in the values as described above. For local development, MONGO_URI should point to your local or remote MongoDB instance (e.g. mongodb://localhost:27017/cms).

__3. Install dependencies__

```
pnpm install
```

__4. Run the development servers__

In one terminal, start the backend:

```
pnpm dev:backend
```

In another terminal, start the frontend:

```
pnpm dev:frontend
```

The app will be available at:

Frontend: http://localhost:3000
Backend API: http://localhost:4000

## Tech Stack

__Frontend:__
- Next.js
- Typescript/React

__Backend:__
- MongoDB
- ExpressJS

__Infrastructure:__
- Hetzner Cloud
- GitHub Actions
- Docker
