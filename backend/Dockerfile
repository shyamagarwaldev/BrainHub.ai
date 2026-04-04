FROM oven/bun:1-slim


WORKDIR /app

RUN groupadd -r bunapp && useradd -r -g bunapp bunapp


COPY package.json bun.lock ./
RUN bun install --frozen-lockfile


COPY . .


RUN chown -R bunapp:bunapp /app


USER bunapp

EXPOSE 8080

CMD ["bun", "run", "dev"]