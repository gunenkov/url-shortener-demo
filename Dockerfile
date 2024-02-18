# используем для сборки образ NodeJS 18 на ОС Alpine
FROM node:18-alpine

# Переходим в папку контейнера
WORKDIR /app

# копируем файлы
COPY . .

# устанавливаем NestJS CLI
RUN npm i -g @nestjs/cli

# устанавливаем пакеты и очищаем кэш
RUN npm ci --only=production && npm cache clean --force

# собираем приложение в режиме Production
RUN npm run build

# устанавливаем переменную NODE_ENV в режим Production
ENV NODE_ENV production

# запускаем приложение
CMD [ "node", "dist/main.js" ]