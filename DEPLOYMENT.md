# Docker Deployment Guide

## Prerequisites

1. **Nginx Proxy Manager** running with `global_proxy` network
2. **External PostgreSQL Database** (not managed by this compose file)

## Setup Steps

### 1. Configure Environment Variables

Copy `.env.example` to `.env` and update the values:

```bash
cp .env.example .env
```

Update these critical values in `.env`:

- `DATABASE_URL` - Your PostgreSQL connection string
- `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` - OAuth credentials
- `AUTH_SECRET` - Generate with: `openssl rand -base64 32`
- `AUTH_URL` and `NEXT_PUBLIC_APP_URL` - Your production domain

### 2. Build and Run

```bash
# Build and start the container
docker-compose up -d --build

# View logs
docker-compose logs -f app
```

### 3. Configure Nginx Proxy Manager

In Nginx Proxy Manager dashboard:

1. **Add Proxy Host**:
   - Domain Names: `yourdomain.com`
   - Scheme: `http`
   - Forward Hostname/IP: `rectorcup-app`
   - Forward Port: `3000`
   - Enable WebSockets Support (for Socket.IO)

2. **SSL**:
   - Enable "Force SSL"
   - Request a new SSL certificate (Let's Encrypt)

### 4. Database Setup

Ensure your PostgreSQL database:

- Is accessible from the Docker container
- Has the database created: `rectorcup`
- Firewall allows connections from your Docker host

The app will automatically run migrations on startup.

## Commands

```bash
# Start
docker-compose up -d

# Stop
docker-compose down

# Rebuild after code changes
docker-compose up -d --build

# View logs
docker-compose logs -f

# Access container shell
docker exec -it rectorcup-app sh

# Run Prisma commands
docker exec -it rectorcup-app pnpm prisma migrate deploy
docker exec -it rectorcup-app pnpm prisma studio
```

## Network Architecture

```
Internet → Nginx Proxy Manager (global_proxy) → Next.js App (rectorcup-app:3000)
                                                    ↓
                                            External PostgreSQL DB
```

## Troubleshooting

**App can't connect to database:**

- Verify `DATABASE_URL` is correct
- Check database allows remote connections
- Ensure PostgreSQL is running

**502 Bad Gateway in Nginx Proxy Manager:**

- Check app is running: `docker ps`
- Verify network: `docker network inspect global_proxy`
- Check logs: `docker-compose logs -f`

**OAuth not working:**

- Update Google OAuth redirect URLs to include your domain
- Verify `AUTH_URL` matches your domain
