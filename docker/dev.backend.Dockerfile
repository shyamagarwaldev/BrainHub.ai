FROM oven/bun:1
WORKDIR /app
COPY package.json bun.lock turbo.json ./
COPY apps ./apps
COPY packages ./packages
RUN bun install --frozen-lockfile
EXPOSE 3000
CMD ["bun","run","dev","--filter=@repo/backend"]
