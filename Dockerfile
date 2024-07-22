FROM node:21-alpine3.17


WORKDIR /RepipiTwitterbotJS
COPY . .
RUN npm ci
COPY . .

LABEL org.opencontainers.image.source https://github.com/d0vak1n/repipitwitterbotjs

ENTRYPOINT ["npm", "run", "start-api"]
EXPOSE 3000