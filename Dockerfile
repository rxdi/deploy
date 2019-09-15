FROM node:8.9.4

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

RUN npm i -g npm

RUN npm i -g typescript @gapi/cli

COPY package.json package.json

RUN npm install

COPY . .

RUN npm run build

RUN mkdir -p /usr/src/app/files

WORKDIR /usr/src/app/files

RUN touch index.html

VOLUME [ "/packages" ]

VOLUME [ "/files" ]

ENTRYPOINT ["node", "../dist/main.js", "--webui", "--verbose", "--ipfs-api-gateway", "8080",  "--ipfs-api-port", "5001", '--browser']