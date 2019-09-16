# Bundler and Deployer for decentralized packages

> This repository is created to help people creating decentralized packages via IPFS easy

> Single command to deploy!

> Version control based on Hashes

> Typescript and Javascript compatible

> Message history

> Readme data (TODO)

> Parcel Lazy Module import for Browser (currently not supported) files will not be downloaded so the resolver will not find them (TODO)

> Web UI Included!

#### Install globally
```bash
npm i @rxdi/deploy -g
```

###### Starting WebUI

```bash
rxdi-deploy --webui --open-browser
```

Or using command line

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

> `(--message)`: Simple commit message when deploying module

> `(--out-dir)`: Parcel build out dir

> `(--file)`: Pass file path after this argument

> `(--namespace)`: How this module will be named ? Later when you install it you can use it as follow import { MyModule } from @mynamespace

> `(--beat)`: How many seconds the application should stay after deploy recomended 20 seconds so file will be distributed accross the network

> `(--html)`: Pass your html file this will override --message or 3-th argument message and you can put whole html

> `(--webui)`: Will spawn web ui with many settings, history, last deployed module etc. can be passed with --open-browser argument

> `(--open-browser)`: Will open browser for web user interface

> `(--graphiql-playground)`: Development purposes open graphiql-playground dev tools

> `(--node-only)`: Will just spawn node so you can use it for persistent data

> `(--silent)`: Will silent every program output log

> `(--unminify)`: Tell ParcelJS to not minify or uglify current deployed module

> `(--browser)`: Will tell ParcelJS to build current module for browser

> `(--tsconfig)`: Create tsconfig file if not exist

> `(--verbose)`: Better logging or you can use -v argument for simplicity

> `(--default-ipfs-node)`: ` ipfs node is GO but if you want you can use JS '--default-ipfs-node js'

> `(--ipfs-api-gateway)`: This is the address of the IPFS Gatway default: 8081

> `(--ipfs-api-port)`: This is the port of the IPFS Api default: 5002

> `(--ipfs-swarms)`: These are the swarms for the Ipfs daemon passing them with comma separated example: --ipfs-swarms /ip4/0.0.0.0/tcp/4001,/ip6/::/tcp/4001, etc...

> `(--deployer-config-name)`: This is default reactive.json filename you can change with other but in this moment is not tested very well

> `(--graphiql)`: Open GraphiQL dev screen

> `(--open-browser-graphiql)`: Open browser for development purposes with Graphiql Dev tools

> `(--webui-server-watcher)`: If this argument passed we can spawn our server watcher so we can manage syncronization with UI and passing data from the rxdi-deploy server

> `(--webui-server-watcher-port)`: Watcher port is the main status port for webui if changed webui will not work defaults: 8957

> `(--graphiql-subscription-endpoint)`: Graphiql Dev tool subscription endpoint

> `(--graphiql-auth-token)`: Authentication token for graphiql dev tools

> `(--graphql-endpoint)`: Endpoint for the Graphql webserver

> `(--write-effects)`: Development effects are for graphql webserver can be checked here for more info https://github.com/Stradivario/gapi

> `(--graphql-server-only)` : This argument will start also graphql web server so you can start making queries and interact with deployer only via API

> `(--graphiql-endpoint)`: Endpoint for Graphiql development tools

> `(--graphql-api-port)`: Development server api port is random, if set --random-port false will default to: 9300 if --graphql-api-port 8*** is not set

> `(--random-port)`: This parameter will set random port to Graphql Server if for example you dont have the port avalable

> `(--disable-package-collection)`: Disable collecting dependencies from package.json

> `(--collect-packages)`: Collect dependencies from package.json and transfer it to reactive.json

> `(--server-push-interval)`: Interval for server push service this is how fast the data will update by default is 7 seconds

> `(--help)`: This help suite :)

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

Available on `docker hub` https://hub.docker.com/r/rxdi/deploy

Single command to run
```bash
docker run -p 8957:8957 -p 5001:5001 -p 8080:8080 -p 9300:9300 -v $(pwd)/files:/usr/src/app/files -v $(pwd)/packages:/usr/src/app/packages -v $(pwd)/.rxdi:/root/.rxdi -v $(pwd)/.jsipfs:/root/.jsipfs -i -t rxdi/deploy:latest --graphiql-playground --webui
```

```bash
docker pull rxdi/deploy
```

Manual build from source

```bash
docker build -t rxdi/deploy .
```

```bash
docker-compose up -d
```

Open browser to http://localhost:9300/webui
To change the port open `docker-compose.yml`

```yml
version: '2'
services:

  rxdi-ipfs-deployer:
    image: rxdi/deploy:latest
    restart: always
    mem_limit: 1000000000
    cpu_shares: 73
    container_name: rxdi-ipfs-deployer
    environment:
      - API_PORT=9300
      - RANDOM_PORT=false
      - IPFS_API_GATEWAY=/ip4/127.0.0.1/tcp/8080
      - IPFS_API_PORT=/ip4/127.0.0.1/tcp/5001
    ports:
      - "9300:9300"
      - "5001:5001"
      - "8080:8080"
      - "8957:8957"
    volumes:
      - ./packages:/usr/src/app/packages
      - ./.rxdi:/root/.rxdi
      - ./.jsipfs:/root/.jsipfs
```



#### Modify Authentication logic

Add inside the working directory file with name `interceptor.ts` and add following content;
if using `docker` place `interceptor.ts` inside `my-project` or mount it at with custom folder `-v $(pwd)/files:/usr/src/app/files`
as long as `interceptor.ts` present inside `/usr/src/app/files` it will be loaded.

Working with this approach you need to set `--interceptor ./interceptor.ts` argument

```typescript
import { Request } from 'hapi';
import { errorUnauthorized, GenericGapiResolversType } from '@gapi/core';

interface Context {
  user: { type: string };
}

interface Resolver extends GenericGapiResolversType {
  scope?: string[];
  public?: boolean;
}

function canAccess(resolverScope: string[], context: Context) {
  return context && context.user && resolverScope.filter(scope => scope === context.user.type).length
    ? true
    : errorUnauthorized();
}
function AuthenticationHooks(resolver: Resolver, context: Context) {
  canAccess(resolver.scope, context);
}
function ResolverHooks(resolver: Resolver, root, args, context: Context, info) {
  if (resolver && !resolver.public) {
    AuthenticationHooks(resolver, context);
  }
}


export async function OnRequestHook(request: Request) {
  return { user: { type: 'ADMIN' } };
}

export async function ResolverHook(resolver: Resolver, root, args, context: Context, info) {
    return ResolverHooks(resolver, root, args, context, info);
}


```

Important part is that we export 2 methods `OnRequestHook` and `ResolverHook`
These are named for convenience the script internally will take UP to 2 methods

1. Request handler function - will populate `context` variable for resolver
2. Resolver hook function - on every request apply some authentication logic
3. By default every resolver scope is predefined with `ADMIN` to change it set Environment variable `APP_DEFAULT_SCOPE`

```typescript
export async function MyMethodWhichWillPopulateContext(request: Request) {
  return { user: { type: 'ADMIN' } };
}

export async function MyMethodThatWillBeRunnedOnEveryRequest(resolver: Resolver, root, args, context: Context, info) {
    console.log(context);
    return ResolverHooks(resolver, root, args, context, info);
}
```