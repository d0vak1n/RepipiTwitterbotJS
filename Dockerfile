FROM node:18-alpine
COPY . .
WORKDIR /RepipiTwitterbotJS
CMD npm run start
