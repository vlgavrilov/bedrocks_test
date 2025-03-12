FROM node:20
WORKDIR /app

# Копируем и устанавливаем backend
COPY backend backend
WORKDIR /app/backend
RUN npm install

# Копируем package.json и package-lock.json перед копированием кода frontend
WORKDIR /app/frontend
COPY frontend/package.json frontend/package-lock.json ./
RUN npm install

# Копируем оставшиеся файлы
COPY frontend ./

# Сборка
RUN npm run build

CMD node /app/backend/server.js & npx serve -s /app/frontend/build -l 3010
