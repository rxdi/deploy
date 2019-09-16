export const CommandDescription = {
  '--message': 'Simple commit message when deploying module',
  '--out-dir': 'Parcel build out dir',
  '--file': 'Pass file path after this argument',
  '--namespace': `How this module will be named ? Later when you install it you can use it as follow import { MyModule } from '@mynamespace'`,
  '--beat': `How many seconds the application should stay after deploy recomended 20 seconds so file will be distributed accross the network`,
  '--html': 'Pass your html file this will override module and will injet your html before metadata',
  '--html-message':
    'Pass your html file this will override --message or 3-th argument message and you can put whole html',
  '--webui': `Will spawn web ui with many settings, history, last deployed module etc. can be passed with --open-browser argument`,
  '--open-browser': `Will open browser for web user interface`,
  '--graphiql-playground': `Development purposes open graphiql-playground dev tools`,
  '--node-only': `Will just spawn node so you can use it for persistent data`,
  '--silent': `Will silent every program output log`,
  '--unminify': 'Tell ParcelJS to not minify or uglify current deployed module',
  '--browser': 'Will tell ParcelJS to build current module for browser',
  '--tsconfig': `Create tsconfig file if not exist`,
  '--verbose': 'Better logging or you can use -v argument for simplicity',
  '--default-ipfs-node': `Default ipfs node is GO but if you want you can use JS '--default-ipfs-node js'`,
  '--ipfs-api-gateway': 'This is the address of the IPFS Gatway default: 8081',
  '--ipfs-api-port': 'This is the port of the IPFS Api default: 5002',
  '--ipfs-swarms': `These are the swarms for the Ipfs daemon passing them with comma separated example: --ipfs-swarms /ip4/0.0.0.0/tcp/4001,/ip6/::/tcp/4001, etc...`,
  '--deployer-config-name': `This is default reactive.json filename you can change with other but in this moment is not tested very well`,
  '--graphiql': `Open GraphiQL dev screen`,
  '--open-browser-graphiql': 'Open browser for development purposes with Graphiql Dev tools',
  '--webui-server-watcher':
    'If this argument passed we can spawn our server watcher so we can manage syncronization with UI and passing data from the rxdi-deploy server',
  '--webui-server-watcher-port':
    'Watcher port is the main status port for webui if changed webui will not work defaults: 8957',
  '--graphiql-subscription-endpoint': 'Graphiql Dev tool subscription endpoint',
  '--graphiql-auth-token': 'Authentication token for graphiql dev tools',
  '--graphql-endpoint': 'Endpoint for the Graphql webserver',
  '--write-effects':
    'Development effects are for graphql webserver can be checked here for more info https://github.com/Stradivario/gapi',
  '--graphql-server-only':
    'This argument will start also graphql web server so you can start making queries and interact with deployer only via API',
  '--graphiql-endpoint': `Endpoint for Graphiql development tools`,
  '--graphql-api-port': 'Development server api port is random, if not set --random-port will default to: 9300',
  '--random-port':
    'This parameter will set random port to Graphql Server if for example you dont have the port avalable',
  '--disable-package-collection': `Disable collecting dependencies from package.json`,
  '--collect-packages': 'Collect dependencies from package.json and transfer it to reactive.json',
  '--help': `This help suite :)`,
  '--server-push-interval':
    'Interval for server push service this is how fast the data will update by default is 7 seconds',
  '--enable-full-folder-access':
    'Will give you reading and writing the whole file system so you can scan and build every folder and file (development only)',
  '--customComponent': 'Default ipfs module view component link',
  '--interceptor': 'Pass Javascript or Typescript file to customize your Request/Response logic and Authorization',
  '--import': 'Pass @rxdi module like a regular Import object',
  '--globals': 'Install npm packages inside container separated by comma `@rxdi/core, @rxdi/hapi`, etc.',
};
