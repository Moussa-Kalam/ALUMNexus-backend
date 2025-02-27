FROM node:22

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm run ci

COPY . .

RUN npm ci --production

RUN npm run build

ENV PORT=3000

EXPOSE $PORT

RUN npm rebuild bcrypt --build-from-source

CMD [ "npm", "run", "start:prod" ]