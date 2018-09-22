# Bundler and Deployer for decentralized packages

> This repository is created to help people creating decentralized packages via IPFS easy

#### Install globally
```bash
npm i @rxdi/deploy ipfs -g
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