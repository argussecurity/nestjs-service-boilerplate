FROM node:12-alpine
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY tsconfig.json tsconfig.build.json nest-cli.json ./
COPY migrations ./migrations
COPY src ./src

RUN npm run build


FROM node:12-alpine
WORKDIR /app-prod

ENV NODE_ENV=production
ENV TYPEORM_ENTITIES=dist/**/*.entity.js
ENV TYPEORM_MIGRATIONS=dist/migrations/*.js
ENV TYPEORM_MIGRATIONS_DIR=migrations
ENV TYPEORM_MIGRATIONS_RUN=true

COPY package.json package-lock.json ./
RUN npm install

COPY --from=0 /app/dist ./dist

CMD ["npm", "run", "start:prod"]
