FROM node:22

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm run build

RUN npm ci --production

COPY . .

ENV PORT=3000

EXPOSE $PORT

RUN npm rebuild bcrypt --build-from-source

CMD [ "npm", "run", "start:prod" ]