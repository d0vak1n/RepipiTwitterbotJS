FROM node:21-alpine3.17


WORKDIR /RepipiTwitterbotJS
COPY . .
RUN npm ci
COPY . .

ENTRYPOINT ["npm", "run", "start-api"]
EXPOSE 3000