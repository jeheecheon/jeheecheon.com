FROM node:22 AS builder
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@10.10.0 --activate
COPY . .
RUN pnpm install --frozen-lockfile
RUN pnpm -F "./packages/*" build && pnpm -F "@apps/be-blog" build

FROM node:22 AS runner
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@10.10.0 --activate
COPY --from=builder /app/apps/be-blog/dist ./apps/be-blog/dist
COPY --from=builder /app/packages/common/dist ./packages/common/dist
COPY --from=builder /app/packages/entities-blog/dist ./packages/entities-blog/dist
COPY --from=builder /app/pnpm-workspace.yaml ./pnpm-workspace.yaml
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=builder /app/apps/be-blog/package.json ./apps/be-blog/package.json
COPY --from=builder /app/packages/common/package.json ./packages/common/package.json
COPY --from=builder /app/packages/entities-blog/package.json ./packages/entities-blog/package.json
COPY --from=builder /app/packages/typescript-config/package.json ./packages/typescript-config/package.json
COPY --from=builder /app/packages/eslint-config/package.json ./packages/eslint-config/package.json
COPY --from=builder /app/packages/prettier-config/package.json ./packages/prettier-config/package.json
RUN pnpm -F @apps/be-blog... install --prod --frozen-lockfile 
CMD ["node", "apps/be-blog/dist/src/main.js"]