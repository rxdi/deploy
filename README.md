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
  - (--unminify)- Will tell ParcelJS to unminify bundle by default minify is set to true (Planet care)
  - (--beat)- Heart beat how many seconds will IPFS Daemon run after success finish build job
  - (--node-only)- Will start the builder as a IPFS node and will not build file

`unminify` - Reason that we don't have `minify` option and by `default` rxdi-deploy `minify` every bundle is that we care about Nature and for every deployed IPFS file even for testing will cost in the future many environmental changes for maintaining much larger space than we actualy can use.
`beat` argument is created for better control over process termination.
Reason this exist is internal mechanism since we ADD file to IPFS and then stop the Daemon no one can serve the file for us.
So to fix this we need to PING biggest IPFS nodes available at the moment with our new generated HASH.
Since some of them may be down or the connection may be slow the flow of Pinging content onto IPFS is separated from the main Deploy chain.
This solution will provide us with stable independent build with correct end result.

After uploading module to IPFS we sure want to install it:

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
echo "export const rxdi_deploy = 'final_test53454';" > index.ts && rxdi-deploy ./index.ts @nonamespace "init(): init commit" -v --tsconfig --minify --beat 6
```