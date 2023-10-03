FROM node:20-alpine3.17


WORKDIR /RepipiTwitterbotJS
COPY . .
RUN npm ci

CMD npm run start
