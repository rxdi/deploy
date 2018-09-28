FROM node:8.9.4

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

RUN npm i -g npm

RUN npm i -g typescript

COPY package.json package.json

RUN npm install

COPY . .

RUN tsc

VOLUME [ "/packages" ]

ENTRYPOINT ["node", "./index.js", "--webui", "--verbose", "--graphiql"]