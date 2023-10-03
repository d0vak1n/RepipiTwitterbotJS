FROM node:latest

# Install dependencies only when needed

WORKDIR /RepipiTwitterbotJS

COPY package*.json ./
RUN npm ci

CMD npm run start
