FROM node:22

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY . .

ENV PORT=3000

EXPOSE $PORT

CMD [ "npm", "run", "start:dev" ]