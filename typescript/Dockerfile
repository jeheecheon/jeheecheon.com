FROM node:22 AS builder
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@10.10.0 --activate
COPY . .
RUN pnpm install --frozen-lockfile
RUN pnpm -F "./packages/*" build && pnpm -F "apps/be-blog" build

FROM node:22 AS runner
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@10.10.0 --activate
COPY --from=builder /app/apps/be-blog/dist ./dist
COPY --from=builder /app/package.json ./
COPY --from=builder /app/pnpm-lock.yaml ./
RUN pnpm install --prod
CMD ["node", "dist/main.js"]