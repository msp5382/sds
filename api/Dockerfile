FROM oven/bun:latest

COPY package.json ./
COPY bun.lockb ./

RUN bun install

COPY index.ts ./

EXPOSE 3000

CMD ["bun", "run", "index.ts"]