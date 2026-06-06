# ─── Stage 1: Build ──────────────────────────────────────────────────────────
FROM node:20-alpine AS build

WORKDIR /app

# Install dependencies first (layer-cached unless package files change)
COPY package.json package-lock.json ./
RUN npm ci --frozen-lockfile

# Copy only the files needed for the Vite build
COPY vite.config.js eslint.config.js ./
COPY client/ ./client/

# Build — Vite root is ./client, outDir is ../dist → output lands at /app/dist
RUN npm run build

# ─── Stage 2: Serve ──────────────────────────────────────────────────────────
FROM nginx:1.27-alpine AS serve

# SPA routing: try file → try directory → fall back to index.html
COPY client/nginx.conf /etc/nginx/conf.d/default.conf

# Copy built assets from Stage 1
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
