FROM node:10-alpine
WORKDIR /usr/src/app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3000

RUN npm run import-data

CMD [ "npm", "run", "start:dev" ]
