# Bundler and Deployer for decentralized packages

> This repository is created to help people creating decentralized packages via IPFS easy

> Single command to deploy!

> Version control based on Hashes

> Typescript and Javascript compatible

> Message history

> Readme data (TODO)

> Parcel Lazy Module import for Browser (currently not supported) files will not be downloaded so the resolver will not find them (TODO)

#### Install globally
```bash
npm i @rxdi/deploy -g
```

#### Bundle and deploy your file!

```bash
rxdi-deploy ./index.ts @yournamespace "fix(ManyThings): inside core module" -v --tsconfig
```

#### Two liner test deploy

###### Create typescript file:
```bash
echo "export const rxdi_deploy = 'rxdi-deploy-test';" > index.ts
```

###### Deploy created file:
```bash
rxdi-deploy ./index.ts @nonamespace "init(): init commit" -v --tsconfig
```

#### After deploy screen:

![rxdi-package-system](https://cloudflare-ipfs.com/ipfs/QmQaUMabwM49XtzMzCBF8EPiS3QqFsXcUjtMBKXz4HSrgo)


#### After deploy screen with warnings:
![rxdi-package-system](https://cloudflare-ipfs.com/ipfs/QmSnfFEQdtUV3HdbxByRTMRr9y8QLHJF7mwqmaiamoLLJf)

#### Installing deployed module
###### Install global `@rxdi/core` this is our connection with the uploaded package

```bash
npm install -g @rxdi/core
```

##### Install module

```bash
rxdi install `ipfs-hash`
```

```bash
rxdi i QmWxi1tiVRJfVCTkFD9upaeQoPgG4NzbagxyA1RQCt3X3P
```


#### Explanation

```bash
rxdi-deploy `main-file` `namespace` `message` `...arguments`
```

`main-file`: This is the main bundle file

`namespace`: How this module will be `imported` example: `@yournamespace` `import {} from '@yournamespace';`

`message`: Short message representing what is changed in this version

`...aruments`: 
  - (-v)- Verbose logging,
  - (--browser)- Build only for `browser` if none defaults to `node`
  - (--tsconfig)- If there is no tsconfig create it
  - (--unminify)- Will tell ParcelJS to unminify bundle by default minify is set to true (Planet care)
  - (--beat)- Heart beat how many seconds will IPFS Daemon run after success finish build job
  - (--node-only)- Will start the builder as a IPFS node and will not build file

`unminify` - Reason that we don't have `minify` option and by `default` rxdi-deploy `minify` every bundle is that we care about Nature and for every deployed IPFS file even for testing will cost in the future many environmental changes for maintaining much larger space than we actualy can use.
`beat` argument is created for better control over process termination.
Reason this exist is internal mechanism since we ADD file to IPFS and then stop the Daemon no one can serve the file for us.
So to fix this we need to PING biggest IPFS nodes available at the moment with our new generated HASH.
Since some of them may be down or the connection may be slow the flow of Pinging content onto IPFS is separated from the main Deploy chain.
This solution will provide us with stable independent build with correct end result.




#### Adding other file than `.ts` or `.js`

```bash
rxdi-deploy P1010094.jpg
```
###### If the file is bigger put `--beat 30` number is equivalent to seconds
###### This will ensure sucessfuly distributed file across main nodes

```bash
rxdi-deploy P1010094.jpg --beat 30
```


#### Docker


```bash
docker build -t rxdi/deployer .
```

```bash
docker-compose up -d
```

Open browser to http://localhost:9200
To change the port open `docker-compose.yml`

```yml
version: '2'
services:

  rxdi-ipfs-deployer:
    image: rxdi/deployer:latest
    restart: always
    mem_limit: 1000000000
    cpu_shares: 73
    container_name: rxdi-ipfs-deployer
    environment:
      - API_PORT=9000
      - RANDOM_PORT=false
    ports:
      - "9200:9000"
    volumes:
      - ./packages:/usr/src/app/packages
      - ./.rxdi:/root/.rxdi
      - ./.rxdi:/root/.rxdi
```