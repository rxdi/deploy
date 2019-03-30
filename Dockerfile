FROM node:8.9.4

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

RUN npm i -g npm

RUN npm i -g typescript @gapi/cli

COPY package.json package.json

RUN npm install

COPY . .

RUN npm run build

VOLUME [ "/packages" ]

ENTRYPOINT ["node", "./dist/main.js", "--webui", "--verbose", "--ipfs-api-gateway", "8080",  "--ipfs-api-port", "5001"]