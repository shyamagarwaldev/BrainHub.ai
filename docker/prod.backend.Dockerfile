
FROM oven/bun:1 AS base
WORKDIR /app
# -----------------------------
FROM base AS pruner
RUN bun add -g turbo
COPY . .
RUN turbo prune backend --docker
# -----------------------------
FROM base AS installer
COPY --from=pruner /app/out/json/ .
RUN bun install --frozen-lockfile
# -----------------------------
FROM base AS builder
COPY --from=installer /app/node_modules ./node_modules
COPY --from=pruner /app/out/full/ .
RUN bun turbo build --filter=@repo/backend
# -----------------------------
FROM oven/bun:1-slim AS runner

WORKDIR /app
ENV NODE_ENV=production

COPY --from=builder /app/apps/backend/dist ./dist
COPY --from=builder /app/apps/backend/package.json .

EXPOSE 3000

CMD ["bun","run","start"]