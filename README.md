# Bundler and Deployer for decentralized packages

> This repository is created to help people creating decentralized packages via IPFS easy

> Single command to deploy!

> Version controll based on Hashes

> Typescript and Javascript compatible

> Message history

> Readme data (TODO)


#### Install globally
```bash
npm i @rxdi/deploy -g
```

#### Bundle and deploy your file!

```bash
rxdi-deploy ./index.ts @yournamespace "fix(ManyThings): inside core module" -v --tsconfig
```


```bash
rxdi-deploy `main-file` `namespace` `message` `...arguments`
```

Where:

`main-file`: This is the main bundle file

`namespace`: How this module will be `imported` example: `@yournamespace` `import {} from '@yournamespace';`

`message`: Short message representing what is changed in this version

`...aruments`: 
  - (-v)- Verbose logging,
  - (--browser)- Build only for `browser` if none defaults to `node`
  - (--tsconfig)- If there is no tsconfig create it


After uploading module to IPFS we need to install it:

Install global `@rxdi/core` this is our connection with the uploaded package

```bash
npm install -g @rxdi/core
```

```bash
rxdi install `ipfs-hash`
```

```bash
rxdi i QmWxi1tiVRJfVCTkFD9upaeQoPgG4NzbagxyA1RQCt3X3P
```


One liner test
```bash
echo "export const rxdi_deploy = 'hello_world_ipfs';" > index.ts && rxdi-deploy ./index.ts @yournamespace "init(): init commit" -v --tsconfig
```