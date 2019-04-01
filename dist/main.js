// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"commands-description.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CommandDescription = {
  '--message': 'Simple commit message when deploying module',
  '--out-dir': 'Parcel build out dir',
  '--file': 'Pass file path after this argument',
  '--namespace': `How this module will be named ? Later when you install it you can use it as follow import { MyModule } from '@mynamespace'`,
  '--beat': `How many seconds the application should stay after deploy recomended 20 seconds so file will be distributed accross the network`,
  '--html': 'Pass your html file this will override --message or 3-th argument message and you can put whole html',
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
  '--webui-server-watcher': 'If this argument passed we can spawn our server watcher so we can manage syncronization with UI and passing data from the rxdi-deploy server',
  '--webui-server-watcher-port': 'Watcher port is the main status port for webui if changed webui will not work defaults: 8957',
  '--graphiql-subscription-endpoint': 'Graphiql Dev tool subscription endpoint',
  '--graphiql-auth-token': 'Authentication token for graphiql dev tools',
  '--graphql-endpoint': 'Endpoint for the Graphql webserver',
  '--write-effects': 'Development effects are for graphql webserver can be checked here for more info https://github.com/Stradivario/gapi',
  '--graphql-server-only': 'This argument will start also graphql web server so you can start making queries and interact with deployer only via API',
  '--graphiql-endpoint': `Endpoint for Graphiql development tools`,
  '--graphql-api-port': 'Development server api port is random, if not set --random-port will default to: 9300',
  '--random-port': 'This parameter will set random port to Graphql Server if for example you dont have the port avalable',
  '--disable-package-collection': `Disable collecting dependencies from package.json`,
  '--collect-packages': 'Collect dependencies from package.json and transfer it to reactive.json',
  '--help': `This help suite :)`,
  '--server-push-interval': 'Interval for server push service this is how fast the data will update by default is 7 seconds',
  '--enable-full-folder-access': 'Will give you reading and writing the whole file system so you can scan and build every folder and file (development only)'
};
},{}],"commands.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

const commands_description_1 = require("./commands-description");

function strEnum(o) {
  return o.reduce((res, key) => {
    res[key] = key;
    return res;
  }, Object.create(null));
}

exports.Commands = strEnum(['--message', '--out-dir', '--file', '--namespace', '--beat', '--html', '--webui', '--open-browser', '--node-only', '--silent', '--unminify', '--browser', '--v', '--tsconfig', '--verbose', '--default-ipfs-node', '--deployer-config-name', '--open-browser-graphiql', '--webui-server-watcher', '--webui-server-watcher-port', '--random-port', '--graphiql', '--graphiql-subscription-endpoint', '--graphiql-playground', '--graphiql-auth-token', '--graphiql-endpoint', '--graphql-endpoint', '--write-effects', '--graphql-api-port', '--disable-package-collection', '--collect-packages', '--server-push-interval', '--help', '--ipfs-api-gateway', '--ipfs-api-port', '--ipfs-swarms', '--graphql-server-only', '--enable-full-folder-access']);
exports.ExcludedFromHelpers = strEnum(['--v']);
Object.keys(exports.Commands).map(command => {
  if (Object.keys(exports.ExcludedFromHelpers).filter(c => c === command).length) {
    return;
  }

  const commandExist = Object.keys(commands_description_1.CommandDescription).filter(c => c === command).length;

  if (!commandExist) {
    console.error(`
Missing helper for command ${command} if you seen this message the developers don't do their job very well and this release is broken...
        `);
    process.exit(0);
  }
});
},{"./commands-description":"commands-description.ts"}],"check-arguments.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

const commands_1 = require("./commands");

const commands_description_1 = require("./commands-description");

const compareString = (a, b, percentage = 32) => {
  const first = a.split('');
  const second = b.split('');
  const similarity = first.filter((string, index) => string === second[index]).length;
  const similarPercentage = similarity / first.length * 100;

  if (similarPercentage > percentage) {
    console.log('Command similarity', similarPercentage + '%');
    return a;
  } else {
    return false;
  }
};

const args = process.argv.slice(2);
const argumentCommands = args.filter(c => c.includes('--'));

exports.checkArguments = () => {
  argumentCommands.map(command => {
    const commandExist = Object.keys(commands_description_1.CommandDescription).filter(c => c === command).length;

    if (!commandExist && args.length) {
      const predicted = Object.keys(commands_1.Commands).filter(c => compareString(c.split('--')[1], command.split('--')[1])).toString();
      let message = '';

      if (predicted.length) {
        message = `maybe you mean '${predicted}'`;
      }

      console.error(`
            
Unknown option '${command}' ${message}?
More options you can find passing --help argument
            
            `);
      process.exit(0);
    }
  });
};
},{"./commands":"commands.ts","./commands-description":"commands-description.ts"}],"app/services/helpers/helpers.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.includes = i => process.argv.toString().includes(i);

exports.nextOrDefault = (i, fb = true, type = p => p) => {
  if (process.argv.toString().includes(i)) {
    const isNextArgumentPresent = process.argv[process.argv.indexOf(i) + 1];

    if (!isNextArgumentPresent) {
      return fb;
    }

    if (isNextArgumentPresent.includes('--')) {
      return fb;
    }

    return type(isNextArgumentPresent);
  }

  return fb;
};
},{}],"app/services/logger/logger.service.ts":[function(require,module,exports) {
"use strict";

var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

const core_1 = require("@rxdi/core");

const rxjs_1 = require("rxjs");

let LoggerService = class LoggerService {
  constructor() {
    this.stdout = new rxjs_1.BehaviorSubject('');
  }

};
LoggerService = __decorate([core_1.Service()], LoggerService);
exports.LoggerService = LoggerService;
},{}],"app/services/arguments/arguments.service.ts":[function(require,module,exports) {
"use strict";

var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

const core_1 = require("@rxdi/core");

const helpers_1 = require("../helpers/helpers");

let ArgumentsService = class ArgumentsService {
  nextOrDefault(i, fallback = null, type = p => p) {
    return helpers_1.nextOrDefault(i, fallback, type);
  }

};
ArgumentsService = __decorate([core_1.Service()], ArgumentsService);
exports.ArgumentsService = ArgumentsService;
},{"../helpers/helpers":"app/services/helpers/helpers.ts"}],"env.injection.tokens.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

const core_1 = require("@rxdi/core");

exports.__ROOT_FOLDER = new core_1.InjectionToken('root_folder');
exports.__NODE_MODULES = new core_1.InjectionToken('local_node_modules');
exports.__DEPLOYER_ARGUMENTS = new core_1.InjectionToken('rxdi-deployer-command-arguments');
exports.__PARCEL_BROWSER_BUILD = new core_1.InjectionToken('rxdi-deployer-parcel-is-browser-build');
exports.__PARCEL_MINIFY = new core_1.InjectionToken('rxdi-deployer-parcel-minify');
exports.__PARCEL_BUILD_OUT_DIR = new core_1.InjectionToken('rxdi-deployer-parcel-build-out-dir');
exports.__PARCEL_SETTINGS = new core_1.InjectionToken('rxdi-deployer-parcel-settings');
exports.__GENERATE_TS_CONFIG = new core_1.InjectionToken('rxdi-deployer-tsconfig-generate');
exports.__FILE_PATH = new core_1.InjectionToken('rxdi-deployer-file-path');
exports.__FILE_NAME = new core_1.InjectionToken('rxdi-deployer-file-name');
exports.__NAMESPACE = new core_1.InjectionToken('rxdi-deployer-namespace');
exports.__FOLDER = new core_1.InjectionToken('rxdi-deployer-folder');
exports.__FILE_EXTENSION = new core_1.InjectionToken('rxdi-deployer-file-extension');
exports.__IPFS_NODE_RESOLUTION_TIME = new core_1.InjectionToken('rxdi-deployer-node-resolution-time');
exports.__DEPLOYER_OUTPUT_CONFIG_NAME = new core_1.InjectionToken('rxdi-deployer-default-migration-package-name');
exports.__PROCESSING_TIME_INIT = new core_1.InjectionToken('rxdi-deployer-processin-time-init');
exports.__PROCESSING_TIME_FINISH = new core_1.InjectionToken('rxdi-deployer-processin-time-finish');
exports.__PROCESSING_TIME_END = new core_1.InjectionToken('rxdi-deployer-processin-time-end');
exports.__SETTINGS_DATABASE = new core_1.InjectionToken('rxdi-deployer-home-settings');
exports.__BUILD_HISTORY_DATABASE = new core_1.InjectionToken('rxdi-deployer-build-history-database');
exports.__PREVIWS_DATABASE = new core_1.InjectionToken('rxdi-deployer-previews-database');
exports.__TRANSACTIONS_DATABASE = new core_1.InjectionToken('rxdi-deployer-transactions-database');
exports.__NAMESPACE_DB = new core_1.InjectionToken('rxdi-deployer-namespace-database');
exports.__HOME_DIR = new core_1.InjectionToken('rxdi-deployer-home-directory');
exports.__COMMIT_MESSAGE = new core_1.InjectionToken('rxdi-deployer-commit-message');
exports.__CREATE_HTML_PAGE = new core_1.InjectionToken('rxdi-deployer-commit-message');
;

class DagModel {}

exports.DagModel = DagModel;

class PreviousModel {}

exports.PreviousModel = PreviousModel;
},{}],"app/services/tsconfig-generator/tsconfig-generator.service.ts":[function(require,module,exports) {
"use strict";

var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

const core_1 = require("@rxdi/core");

let TsConfigGenratorService = class TsConfigGenratorService {
  getTsConfig(filename) {
    return `
{
    "compilerOptions": {
        "declaration": true,
        "module": "commonjs",
        "target": "es6",
        "baseUrl": "src",
        "stripInternal": true,
        "emitDecoratorMetadata": true,
        "experimentalDecorators": true,
        "moduleResolution": "node",
        "outDir": ".",
        "lib": [
            "es2017",
            "es2016",
            "es2015",
            "es6",
            "dom",
            "esnext.asynciterable"
        ],
        "skipLibCheck": true,
        "typeRoots": [
            "node_modules/@types"
        ]
    },
    "include": [
        "."
    ],
    "files": [
        "${filename}.ts"
    ]
}`;
  }

};
TsConfigGenratorService = __decorate([core_1.Service()], TsConfigGenratorService);
exports.TsConfigGenratorService = TsConfigGenratorService;
},{}],"app/services/file/file.service.ts":[function(require,module,exports) {
"use strict";

var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var __metadata = this && this.__metadata || function (k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : new P(function (resolve) {
        resolve(result.value);
      }).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _a, _b;

const core_1 = require("@rxdi/core");

const fs_1 = require("fs");

let FileService = class FileService {
  constructor(fileService, logger) {
    this.fileService = fileService;
    this.logger = logger;
  }

  ensureDir(dir) {
    return this.fileService.mkdirp(dir);
  }

  readFile(file) {
    return __awaiter(this, void 0, void 0, function* () {
      return yield this.readFilePromisify(file);
    });
  }

  writeFile(path, data) {
    return __awaiter(this, void 0, void 0, function* () {
      return yield this.writeFilePromisify(path, data);
    });
  }

  createFolder(folder) {
    return __awaiter(this, void 0, void 0, function* () {
      return yield this.fileService.mkdirp(folder).toPromise();
    });
  }

  fileWalker(folder) {
    return this.fileService.fileWalker(folder);
  }

  readFilePromisify(file) {
    return new Promise((resolve, reject) => {
      fs_1.readFile(file, 'utf8', (err, data) => {
        if (err) {
          reject(err);
        }

        resolve(data);
      });
    });
  }

  readFilePromisifyFallback(file) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
      fs_1.readFile(file, 'utf8', (err, data) => {
        if (err) {
          this.logger.error('Fallback missing reactive.json file will create one!');
          return this.writeFile(file, JSON.stringify({
            name: '',
            typings: '',
            module: '',
            message: '',
            previews: []
          })).then(() => __awaiter(this, void 0, void 0, function* () {
            return resolve((yield this.readFilePromisify(file)));
          })).catch(e => reject(e));
        }

        return resolve(data);
      });
    }));
  }

  writeFilePromisify(path, data, encoding = 'utf-8') {
    return new Promise((resolve, reject) => {
      fs_1.writeFile(path, data, {
        encoding
      }, err => {
        if (err) {
          reject(err);
        }

        resolve(true);
      });
    });
  }

  readFileRaw(file) {
    return new Promise((resolve, reject) => {
      fs_1.readFile(file, (err, data) => {
        if (err) {
          reject(err);
        }

        resolve(data);
      });
    });
  }

};
FileService = __decorate([core_1.Service(), __metadata("design:paramtypes", [typeof (_a = typeof core_1.FileService !== "undefined" && core_1.FileService) === "function" ? _a : Object, typeof (_b = typeof core_1.BootstrapLogger !== "undefined" && core_1.BootstrapLogger) === "function" ? _b : Object])], FileService);
exports.FileService = FileService;
},{}],"environment-setter.module.ts":[function(require,module,exports) {
"use strict";

var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : new P(function (resolve) {
        resolve(result.value);
      }).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

const core_1 = require("@rxdi/core");

const arguments_service_1 = require("./app/services/arguments/arguments.service");

const env_injection_tokens_1 = require("./env.injection.tokens");

const tsconfig_generator_service_1 = require("./app/services/tsconfig-generator/tsconfig-generator.service");

const file_service_1 = require("./app/services/file/file.service");

const os_1 = require("os");

const Datastore = require('nedb');

const helpers_1 = require("./app/services/helpers/helpers");

const fs_1 = require("fs");

let EnvironemntSetterModule = class EnvironemntSetterModule {};
EnvironemntSetterModule = __decorate([core_1.Module({
  services: [{
    provide: 'isLockExists',
    deps: [file_service_1.FileService],
    lazy: true,
    useFactory: fileService => __awaiter(this, void 0, void 0, function* () {
      const repoLockPath = `${os_1.homedir()}/.jsipfs/repo.lock`;
      const lockPath = `${os_1.homedir()}/.jsipfs/datastore/LOCK`;

      try {
        yield fileService.readFile(repoLockPath);
        fs_1.unlinkSync(repoLockPath);
      } catch (e) {}

      try {
        yield fileService.readFile(lockPath);
        fs_1.unlinkSync(lockPath);
      } catch (e) {}

      return true;
    })
  }, {
    provide: env_injection_tokens_1.__DEPLOYER_ARGUMENTS,
    useFactory: () => process.argv.slice(2)
  }, {
    provide: env_injection_tokens_1.__NODE_MODULES,
    useValue: __dirname.replace('dist', '') + '/node_modules'
  }, {
    provide: env_injection_tokens_1.__ROOT_FOLDER,
    useValue: __dirname.replace('dist', '')
  }, {
    provide: env_injection_tokens_1.__HOME_DIR,
    useValue: os_1.homedir()
  }, {
    provide: env_injection_tokens_1.__COMMIT_MESSAGE,
    deps: [env_injection_tokens_1.__DEPLOYER_ARGUMENTS],
    useFactory: args => {
      const hasArgument = helpers_1.nextOrDefault('--message', false);

      if (hasArgument) {
        return hasArgument;
      }

      if (args[2] && args[2].includes('--')) {
        return '';
      }

      return args[2] || '';
    }
  }, {
    provide: env_injection_tokens_1.__PARCEL_BROWSER_BUILD,
    useFactory: () => helpers_1.includes('--browser')
  }, {
    provide: env_injection_tokens_1.__PARCEL_MINIFY,
    useFactory: () => !helpers_1.includes('--unminify')
  }, {
    provide: env_injection_tokens_1.__PARCEL_BUILD_OUT_DIR,
    useFactory: () => helpers_1.nextOrDefault('--out-dir', 'build')
  }, {
    provide: env_injection_tokens_1.__PARCEL_SETTINGS,
    useFactory: () => ({
      watch: false,
      logLevel: 3,
      detailedReport: true
    })
  }, {
    provide: env_injection_tokens_1.__GENERATE_TS_CONFIG,
    useFactory: () => helpers_1.includes('--tsconfig')
  }, {
    provide: env_injection_tokens_1.__FILE_PATH,
    deps: [env_injection_tokens_1.__DEPLOYER_ARGUMENTS],
    useFactory: args => {
      if (helpers_1.includes('--file')) {
        return helpers_1.nextOrDefault('--file', '');
      }

      if (args[0] && args[0].includes('--') && args[0] && !args[0].match(/[^\\]*\.(\w+)$/)) {
        return './index.ts';
      }

      return args[0] || './index.ts';
    }
  }, {
    provide: env_injection_tokens_1.__FILE_NAME,
    deps: [env_injection_tokens_1.__FILE_PATH],
    useFactory: filePath => filePath.split('/').pop()
  }, {
    provide: env_injection_tokens_1.__NAMESPACE,
    deps: [env_injection_tokens_1.__DEPLOYER_ARGUMENTS],
    useFactory: args => {
      if (helpers_1.includes('--namespace')) {
        return helpers_1.nextOrDefault('--namespace', '@rxdi');
      }

      if (args[1] && args[1].includes('--')) {
        return '@rxdi';
      }

      return args[1] || '@rxdi';
    }
  }, {
    provide: env_injection_tokens_1.__FOLDER,
    deps: [env_injection_tokens_1.__FILE_PATH],
    useFactory: filePath => filePath.substring(0, filePath.lastIndexOf('/'))
  }, {
    provide: env_injection_tokens_1.__FILE_EXTENSION,
    deps: [env_injection_tokens_1.__FILE_PATH],
    useFactory: filePath => {
      return filePath.match(/\.([0-9a-z]+)(?:[\?#]|$)/i) ? filePath.match(/\.([0-9a-z]+)(?:[\?#]|$)/i)[0] : 'ts';
    }
  }, {
    provide: env_injection_tokens_1.__IPFS_NODE_RESOLUTION_TIME,
    useFactory: () => helpers_1.nextOrDefault('--beat', 20, Number)
  }, {
    provide: env_injection_tokens_1.__DEPLOYER_OUTPUT_CONFIG_NAME,
    useValue: helpers_1.nextOrDefault('--deployer-config-name', 'reactive.json')
  }, {
    provide: env_injection_tokens_1.__PROCESSING_TIME_INIT,
    useFactory: () => Date.now()
  }, {
    provide: env_injection_tokens_1.__PROCESSING_TIME_FINISH,
    useFactory: () => helpers_1.nextOrDefault('--deployer-config-name', 'reactive.json')
  }, {
    provide: env_injection_tokens_1.__PROCESSING_TIME_END,
    deps: [arguments_service_1.ArgumentsService],
    useFactory: () => helpers_1.nextOrDefault('--deployer-config-name', 'reactive.json')
  }, {
    provide: env_injection_tokens_1.__CREATE_HTML_PAGE,
    deps: [arguments_service_1.ArgumentsService],
    useFactory: () => helpers_1.nextOrDefault('--html', '<h1>@rxdi decentralized module</h1>')
  }, {
    provide: 'init-ts-config-file',
    deps: [env_injection_tokens_1.__GENERATE_TS_CONFIG, env_injection_tokens_1.__FILE_NAME, env_injection_tokens_1.__FOLDER, tsconfig_generator_service_1.TsConfigGenratorService, file_service_1.FileService],
    lazy: true,
    useFactory: (tsConfig, fileName, folder, generator, fileService) => __awaiter(this, void 0, void 0, function* () {
      if (tsConfig) {
        yield fileService.writeFile(folder + '/tsconfig.json', generator.getTsConfig(fileName.replace('.ts', '')));
      }

      return tsConfig;
    })
  }, {
    provide: env_injection_tokens_1.__SETTINGS_DATABASE,
    deps: [env_injection_tokens_1.__HOME_DIR],
    lazy: true,
    useFactory: homeDir => new Promise(resolve => {
      const database = new Datastore({
        filename: `${homeDir}/.rxdi/settings`,
        autoload: true,
        timestampData: true
      });
      database.loadDatabase(e => {
        if (e) {
          throw new Error('Error loading database!');
        }

        resolve(database);
      });
    })
  }, {
    provide: env_injection_tokens_1.__NAMESPACE_DB,
    deps: [env_injection_tokens_1.__HOME_DIR],
    lazy: true,
    useFactory: homeDir => new Promise(resolve => {
      const database = new Datastore({
        filename: `${homeDir}/.rxdi/namespace`,
        autoload: true,
        timestampData: true
      });
      database.loadDatabase(e => {
        if (e) {
          throw new Error('Error loading database!');
        }

        resolve(database);
      });
    })
  }, {
    provide: env_injection_tokens_1.__BUILD_HISTORY_DATABASE,
    deps: [env_injection_tokens_1.__HOME_DIR],
    lazy: true,
    useFactory: homeDir => new Promise(resolve => {
      const database = new Datastore({
        filename: `${homeDir}/.rxdi/history`,
        autoload: true,
        timestampData: true
      });
      database.loadDatabase(e => {
        if (e) {
          throw new Error('Error loading database!');
        }

        resolve(database);
      });
    })
  }, {
    provide: env_injection_tokens_1.__PREVIWS_DATABASE,
    deps: [env_injection_tokens_1.__HOME_DIR],
    lazy: true,
    useFactory: homeDir => new Promise(resolve => {
      const database = new Datastore({
        filename: `${homeDir}/.rxdi/previews`,
        autoload: true
      });
      database.loadDatabase(e => {
        if (e) {
          throw new Error('Error loading database!');
        }

        resolve(database);
      });
    })
  }, {
    provide: env_injection_tokens_1.__TRANSACTIONS_DATABASE,
    deps: [env_injection_tokens_1.__HOME_DIR],
    lazy: true,
    useFactory: homeDir => new Promise(resolve => {
      const database = new Datastore({
        filename: `${homeDir}/.rxdi/transactions`,
        autoload: true
      });
      database.loadDatabase(e => {
        if (e) {
          throw new Error('Error loading database!');
        }

        resolve(database);
      });
    })
  }]
})], EnvironemntSetterModule);
exports.EnvironemntSetterModule = EnvironemntSetterModule;
},{"./app/services/arguments/arguments.service":"app/services/arguments/arguments.service.ts","./env.injection.tokens":"env.injection.tokens.ts","./app/services/tsconfig-generator/tsconfig-generator.service":"app/services/tsconfig-generator/tsconfig-generator.service.ts","./app/services/file/file.service":"app/services/file/file.service.ts","./app/services/helpers/helpers":"app/services/helpers/helpers.ts"}],"app/services/ipfs-file/ipfs-file.service.ts":[function(require,module,exports) {
"use strict";

var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var __metadata = this && this.__metadata || function (k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var __param = this && this.__param || function (paramIndex, decorator) {
  return function (target, key) {
    decorator(target, key, paramIndex);
  };
};

var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : new P(function (resolve) {
        resolve(result.value);
      }).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _a, _b;

const core_1 = require("@rxdi/core");

const stream_1 = require("stream");

const ipfs_daemon_node_info_1 = require("@gapi/ipfs-daemon/ipfs-daemon-node-info");

const ipfs_daemon_1 = require("@gapi/ipfs-daemon");

const rxjs_1 = require("rxjs");

const http_1 = require("http");

const https_1 = require("https");

const operators_1 = require("rxjs/operators");

let FileIpfsService = class FileIpfsService {
  constructor(ipfsDaemon, ipfsDaemonNodeInfo, logger) {
    this.ipfsDaemon = ipfsDaemon;
    this.ipfsDaemonNodeInfo = ipfsDaemonNodeInfo;
    this.logger = logger;
    this.nodeInfo = this.ipfsDaemonNodeInfo.info;
    this.providers = {
      infura: 'https://ipfs.infura.io/ipfs/',
      cloudflare: 'https://cloudflare-ipfs.com/ipfs/',
      ipfsOriginal: 'https://ipfs.io/ipfs/',
      thisNode: `http://${this.ipfsDaemonNodeInfo.info.gatewayHost}:${this.ipfsDaemonNodeInfo.info.gatewayPort}/ipfs/`
    };
  }

  addFile(file) {
    return __awaiter(this, void 0, void 0, function* () {
      const content = new stream_1.Readable();
      content.push(file);
      content.push(null);
      const ipfsFile = yield this.ipfsDaemon.api.add([{
        content
      }]);

      try {
        this.ping(ipfsFile[0].hash).subscribe();
      } catch (e) {}

      this.logger.log(`\Cloudflare: ${this.providers.cloudflare}${ipfsFile[0].hash}`);
      return ipfsFile;
    });
  }

  ping(hash) {
    return this.httpObservable(`${this.providers.thisNode}${hash}`).pipe(operators_1.switchMap(() => rxjs_1.combineLatest(this.httpObservable(`${this.providers.infura}${hash}`), this.httpObservable(`${this.providers.cloudflare}${hash}`), this.httpObservable(`${this.providers.ipfsOriginal}${hash}`))));
  }

  httpObservable(link) {
    return rxjs_1.Observable.create(o => {
      if (link.includes('https')) {
        https_1.get(link, r => o.next(r));
      } else {
        http_1.get(link, r => o.next(r));
      }
    });
  }

  wait(ipfsFile) {
    return __awaiter(this, void 0, void 0, function* () {
      return yield new Promise((resolve, reject) => this.ping(ipfsFile[0].hash).subscribe(stream => resolve(stream), e => reject(e)));
    });
  }

  addPackage(p) {
    return __awaiter(this, void 0, void 0, function* () {
      return yield this.addFile(JSON.stringify(p, null, 4));
    });
  }

  catIpfsFile(hash) {
    return __awaiter(this, void 0, void 0, function* () {
      return yield this.ipfsDaemon.api.cat(hash);
    });
  }

  getIpfsFile(hash) {
    return __awaiter(this, void 0, void 0, function* () {
      return yield this.ipfsDaemon.api.get(hash);
    });
  }

  addRawFile(content) {
    return __awaiter(this, void 0, void 0, function* () {
      const ipfsFile = yield this.ipfsDaemon.api.add([{
        content
      }]);
      this.ping(ipfsFile[0].hash).subscribe();
      return ipfsFile;
    });
  }

};
FileIpfsService = __decorate([core_1.Service(), __param(0, core_1.Inject(ipfs_daemon_1.IPFS_DAEMON)), __metadata("design:paramtypes", [Object, typeof (_a = typeof ipfs_daemon_node_info_1.IpfsDaemonInfoService !== "undefined" && ipfs_daemon_node_info_1.IpfsDaemonInfoService) === "function" ? _a : Object, typeof (_b = typeof core_1.BootstrapLogger !== "undefined" && core_1.BootstrapLogger) === "function" ? _b : Object])], FileIpfsService);
exports.FileIpfsService = FileIpfsService;
},{}],"app/services/parcel-bundler/parcel-bundler.service.ts":[function(require,module,exports) {
"use strict";

var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var __metadata = this && this.__metadata || function (k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var __param = this && this.__param || function (paramIndex, decorator) {
  return function (target, key) {
    decorator(target, key, paramIndex);
  };
};

var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : new P(function (resolve) {
        resolve(result.value);
      }).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _a, _b, _c, _d;

const core_1 = require("@rxdi/core");

const Bundler = require("parcel-bundler");

const env_injection_tokens_1 = require("../../../env.injection.tokens");

let ParcelBundlerService = class ParcelBundlerService {
  constructor(isBrowserBuild, isBuildMinfied, buildOutDir, settings) {
    this.isBrowserBuild = isBrowserBuild;
    this.isBuildMinfied = isBuildMinfied;
    this.buildOutDir = buildOutDir;
    this.settings = settings;
  }

  prepareBundler(file, outDir = null, fileName) {
    return __awaiter(this, void 0, void 0, function* () {
      return new Promise((resolve, reject) => {
        const options = Object.assign({
          target: this.isBrowserBuild ? 'browser' : 'node',
          minify: this.isBuildMinfied,
          outFile: fileName,
          outDir: outDir || this.buildOutDir
        }, this.settings);
        const bundler = new Bundler(file, options);
        let bundle = null;
        bundler.on('bundled', compiledBundle => {
          bundle = compiledBundle;
        });
        bundler.on('buildEnd', () => {
          process.argv.toString().includes('--silent') ? console.log = () => null : process.stdout.write(`Parcel Build finished! Bundle source: ${bundle.name}\n`);
          bundle = null;
          setTimeout(() => resolve(), 1000);
        });
        bundler.on('buildError', e => reject(e));
        bundler.bundle();
      });
    });
  }

};
ParcelBundlerService = __decorate([core_1.Service(), __param(0, core_1.Inject(env_injection_tokens_1.__PARCEL_BROWSER_BUILD)), __param(1, core_1.Inject(env_injection_tokens_1.__PARCEL_MINIFY)), __param(2, core_1.Inject(env_injection_tokens_1.__PARCEL_BUILD_OUT_DIR)), __param(3, core_1.Inject(env_injection_tokens_1.__PARCEL_SETTINGS)), __metadata("design:paramtypes", [typeof (_a = typeof env_injection_tokens_1.__PARCEL_BROWSER_BUILD !== "undefined" && env_injection_tokens_1.__PARCEL_BROWSER_BUILD) === "function" ? _a : Object, typeof (_b = typeof env_injection_tokens_1.__PARCEL_BROWSER_BUILD !== "undefined" && env_injection_tokens_1.__PARCEL_BROWSER_BUILD) === "function" ? _b : Object, typeof (_c = typeof env_injection_tokens_1.__PARCEL_BUILD_OUT_DIR !== "undefined" && env_injection_tokens_1.__PARCEL_BUILD_OUT_DIR) === "function" ? _c : Object, typeof (_d = typeof env_injection_tokens_1.__PARCEL_SETTINGS !== "undefined" && env_injection_tokens_1.__PARCEL_SETTINGS) === "function" ? _d : Object])], ParcelBundlerService);
exports.ParcelBundlerService = ParcelBundlerService;
},{"../../../env.injection.tokens":"env.injection.tokens.ts"}],"app/services/file/file-user.service.ts":[function(require,module,exports) {
"use strict";

var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var __metadata = this && this.__metadata || function (k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : new P(function (resolve) {
        resolve(result.value);
      }).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _a, _b;

const core_1 = require("@rxdi/core");

const file_service_1 = require("./file.service");

const env_injection_tokens_1 = require("../../../env.injection.tokens");

let FileUserService = class FileUserService {
  constructor(fileService) {
    this.fileService = fileService;
  }

  writeFile(file, fileName, namespace) {
    return __awaiter(this, void 0, void 0, function* () {
      return yield new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        this.fileService.ensureDir(`${this.parcelBuildDir}/${namespace}`).subscribe(() => __awaiter(this, void 0, void 0, function* () {
          yield this.fileService.writeFile(`${this.parcelBuildDir}/${namespace}/${fileName}`, file);
          resolve(true);
        }), e => reject(e));
      }));
    });
  }

  writeDag(path, file) {
    return __awaiter(this, void 0, void 0, function* () {
      return yield new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        yield this.fileService.writeFile(path, file);
        resolve(true);
      }));
    });
  }

};

__decorate([core_1.Inject(env_injection_tokens_1.__PARCEL_BUILD_OUT_DIR), __metadata("design:type", typeof (_a = typeof env_injection_tokens_1.__PARCEL_BUILD_OUT_DIR !== "undefined" && env_injection_tokens_1.__PARCEL_BUILD_OUT_DIR) === "function" ? _a : Object)], FileUserService.prototype, "parcelBuildDir", void 0);

FileUserService = __decorate([core_1.Service(), __metadata("design:paramtypes", [typeof (_b = typeof file_service_1.FileService !== "undefined" && file_service_1.FileService) === "function" ? _b : Object])], FileUserService);
exports.FileUserService = FileUserService;
},{"./file.service":"app/services/file/file.service.ts","../../../env.injection.tokens":"env.injection.tokens.ts"}],"app/services/dts-generator/dts-generator.service.ts":[function(require,module,exports) {
"use strict";

var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var __metadata = this && this.__metadata || function (k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var __param = this && this.__param || function (paramIndex, decorator) {
  return function (target, key) {
    decorator(target, key, paramIndex);
  };
};

var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : new P(function (resolve) {
        resolve(result.value);
      }).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _a;

const core_1 = require("@rxdi/core");

const childProcess = require("child_process");

const env_injection_tokens_1 = require("../../../env.injection.tokens");

let TypescriptDefinitionGeneratorService = class TypescriptDefinitionGeneratorService {
  constructor(logger, node_modules) {
    this.logger = logger;
    this.node_modules = node_modules;
  }

  validateEntries(namespace, projectPath, outPath) {
    if (!projectPath) {
      throw new Error('Missing project path');
    }

    if (!namespace) {
      throw new Error('Missing project namespace');
    }

    if (!outPath) {
      throw new Error('Missing project outPath');
    }
  }

  mergeTypings(namespace, projectPath, outPath) {
    return __awaiter(this, void 0, void 0, function* () {
      this.validateEntries(namespace, projectPath, outPath);
      return new Promise((resolve, reject) => {
        if (this.child) {
          this.child.stdout.removeAllListeners('data');
          this.child.stderr.removeAllListeners('data');
          this.child.removeAllListeners('exit');
          this.child.kill();
        }

        process.env = Object.assign(process.env, {});
        this.logger.log('Typescript merging definitions started in child process...\n');
        this.child = childProcess.spawn(`${this.node_modules}/.bin/rxdi-merge`, ['--name', namespace, '--project', projectPath, '--out', outPath]);
        this.child.stdout.on('data', data => {
          process.argv.toString().includes('--silent') ? console.log = () => null : process.stdout.write(data);
        });
        this.child.stderr.on('data', data => {
          if (data.toString().includes('Unable to resolve configuration')) {
            this.logger.log('If you want rxdi-deploy to create tsconfig.json for you pass parameter --tsconfig');
          }

          reject(process.stdout.write(data));
        });
        this.child.on('exit', code => {
          this.child.kill();
          this.child = null;
          this.logger.log(`Child process exited with code ${code}\n`);
          resolve(true);
        });
      });
    });
  }

};
TypescriptDefinitionGeneratorService = __decorate([core_1.Service(), __param(1, core_1.Inject(env_injection_tokens_1.__NODE_MODULES)), __metadata("design:paramtypes", [typeof (_a = typeof core_1.BootstrapLogger !== "undefined" && core_1.BootstrapLogger) === "function" ? _a : Object, String])], TypescriptDefinitionGeneratorService);
exports.TypescriptDefinitionGeneratorService = TypescriptDefinitionGeneratorService;
},{"../../../env.injection.tokens":"env.injection.tokens.ts"}],"app/status/status-injection.tokens.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

const core_1 = require("@rxdi/core");

class BuildStatus {
  constructor() {
    this.status = 'SUCCESS';
    this.message = '';
  }

}

class FILE_DEPLOYMENT_STATUS_INTERFACE {
  constructor() {
    this.file = new BuildStatus();
    this.typings = new BuildStatus();
    this.module = new BuildStatus();
  }

}

exports.FILE_DEPLOYMENT_STATUS_INTERFACE = FILE_DEPLOYMENT_STATUS_INTERFACE;
exports.START = new core_1.InjectionToken('compilation-started');
exports.FILE_DEPLOYMENT_STATUS = new core_1.InjectionToken('files-deploy-ment');
},{}],"app/services/table-service/table-service.ts":[function(require,module,exports) {
"use strict";

var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var __metadata = this && this.__metadata || function (k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _a, _b;

const core_1 = require("@rxdi/core");

const status_injection_tokens_1 = require("../../status/status-injection.tokens");

const ipfs_file_service_1 = require("../ipfs-file/ipfs-file.service");

var Table = require('terminal-table');

let TableService = class TableService {
  constructor(fileIpfsService) {
    this.fileIpfsService = fileIpfsService;
  }

  createGenericTableStatus(ModuleStatus) {
    let Icon, Color;

    if (ModuleStatus === 'WARNING') {
      Icon = '⚠';
      Color = 'yellow';
    }

    if (ModuleStatus === 'FAILED') {
      Icon = '✘';
      Color = 'red';
    }

    if (ModuleStatus === 'SUCCESS') {
      Icon = '✔';
      Color = 'green';
    }

    return {
      Icon,
      Color
    };
  }

  createTable(file, typings, m) {
    const provider = 'https://cloudflare-ipfs.com/ipfs/';
    let FileStatus = this.$deploymentStatus.getValue().file;
    let TypingsStatus = this.$deploymentStatus.getValue().typings;
    let ModuleStatus = this.$deploymentStatus.getValue().module;
    const statusFile = this.createGenericTableStatus(FileStatus.status);
    const statusTypings = this.createGenericTableStatus(TypingsStatus.status);
    const statusModule = this.createGenericTableStatus(ModuleStatus.status);
    let columns = ['', 'Status', 'File Type', 'Size', 'Gateway'];
    let width = [4, '6%', '6%', '8%', '78%'];
    let fileRow = [statusFile.Icon, FileStatus.status, 'Bundle', `${file[0].size} bytes`, `${provider}${file[0].hash}`];
    let typingsRow = [statusTypings.Icon, TypingsStatus.status, 'Typings', `${typings[0].size} bytes`, `${provider}${typings[0].hash}`];
    let moduleRow = [statusModule.Icon, ModuleStatus.status, 'Module', `${m[0].size} bytes`, `${provider}${m[0].hash}`];

    if (FileStatus.status !== 'SUCCESS' || TypingsStatus.status !== 'SUCCESS' || ModuleStatus.status !== 'SUCCESS') {
      columns.push('Errors');
      width = [4, '6%', '6%', '8%', '40%', '38%'];
    }

    if (FileStatus.status !== 'SUCCESS') {
      fileRow.push(FileStatus.message);
    }

    if (TypingsStatus.status !== 'SUCCESS') {
      typingsRow.push(TypingsStatus.message);
    }

    if (ModuleStatus.status !== 'SUCCESS') {
      moduleRow.push(ModuleStatus.message);
    }

    const t = new Table({
      borderStyle: 2,
      horizontalLine: true,
      width,
      rightPadding: 0,
      leftPadding: 1
    });
    t.push(columns);
    t.push(fileRow);
    t.push(typingsRow);
    t.push(moduleRow);
    t.attrRange({
      row: [0, 1]
    }, {
      color: 'green',
      bg: 'black'
    });
    t.attrRange({
      column: [0, 1]
    }, {
      color: 'green',
      bg: 'black'
    });
    t.attrRange({
      column: [0, 2],
      row: [0, 4]
    }, {
      color: 'green',
      bg: 'black'
    });
    t.attrRange({
      column: [0, 1],
      row: [0, 2]
    }, {
      color: 'green'
    });
    t.attrRange({
      column: [0, 2],
      row: [0, 2]
    }, {
      color: statusFile.Color
    });
    t.attrRange({
      column: [0, 2],
      row: [2, 3]
    }, {
      color: statusTypings.Color
    });
    t.attrRange({
      column: [0, 2],
      row: [3, 4]
    }, {
      color: statusModule.Color
    });
    t.attrRange({
      row: [1],
      column: [1]
    }, {});

    if (FileStatus.status !== 'SUCCESS' || TypingsStatus.status !== 'SUCCESS' || ModuleStatus.status !== 'SUCCESS') {
      t.attrRange({
        column: [5, 6]
      }, {
        color: 'red'
      });
      t.attrRange({
        column: [5, 6],
        row: [5, 6]
      }, {
        color: 'red'
      });
    }

    return t;
  }

  previewsVersions(previewsVersions) {
    var t = new Table({
      borderStyle: 2,
      horizontalLine: true,
      width: ['50%', '50%'],
      rightPadding: 0,
      leftPadding: 1
    });
    t.push(['Previews versions', 'Gateway']);
    previewsVersions.forEach(v => {
      t.push([v, `https://cloudflare-ipfs.com/ipfs/${v}`]);
    });
    t.attrRange({
      row: [0, 1]
    }, {
      align: 'center',
      color: 'green',
      bg: 'black'
    });
    t.attrRange({
      row: [1],
      column: [1]
    }, {
      leftPadding: 5
    });
    return t;
  }

  endInstallCommand(hash) {
    const t = new Table({
      borderStyle: 2,
      horizontalLine: true,
      width: ['50%'],
      rightPadding: 0,
      leftPadding: 1
    });
    t.push(['Install command']);
    t.push([`rxdi i ${hash}`]);
    t.attrRange({
      row: [0, 1]
    }, {
      align: 'center',
      color: 'green',
      bg: 'black'
    });
    t.attrRange({
      row: [1],
      column: [1]
    }, {
      leftPadding: 5
    });
    return t;
  }

  previewsNext(previewsVersions) {
    var t = new Table({
      borderStyle: 2,
      horizontalLine: true,
      width: ['50%', '50%'],
      rightPadding: 0,
      leftPadding: 1
    });
    t.push(['Previews version', 'Next version']);
    let isNext = false;
    let previews = [];
    let next = [];
    previewsVersions.forEach(v => {
      if (isNext) {
        isNext = false;
        next.push(v);
      } else {
        previews.push(v);
        isNext = true;
      }
    });
    previews.forEach((v, index) => {
      t.push([v, next[index]]);
    });
    t.attrRange({
      row: [0, 1]
    }, {
      align: 'center',
      color: 'green',
      bg: 'black'
    });
    t.attrRange({
      row: [1],
      column: [1]
    }, {
      leftPadding: 5
    });
    return t;
  }

  getHistoryTable(history) {
    var t = new Table({
      borderStyle: 2,
      horizontalLine: true,
      width: [3, '50%', '50%'],
      rightPadding: 0,
      leftPadding: 1
    });
    t.push(['', 'Date', 'Hash']);
    console.log(history);
    history.forEach(v => {
      t.push(['', `${v.createdAt}`, `rxdi-deploy --find ${v.hash}`]);
    });
    t.attrRange({
      row: [0, 1]
    }, {
      align: 'center',
      color: 'green',
      bg: 'black'
    });
    t.attrRange({
      row: [1],
      column: [1]
    }, {
      leftPadding: 5
    });
    return t;
  }

  fileUploadStatus(file) {
    const t = new Table({
      borderStyle: 2,
      horizontalLine: true,
      width: ['100%'],
      rightPadding: 0,
      leftPadding: 1
    });
    t.push(['File upload status']);
    t.push([`\File size: ${file[0].size} bytes`]);
    t.push([`\IPFS address: ${this.fileIpfsService.providers.cloudflare}${file[0].hash}`]);
    t.attrRange({
      row: [0, 1]
    }, {
      align: 'center',
      color: 'green',
      bg: 'black'
    });
    t.attrRange({
      row: [1],
      column: [1]
    }, {
      leftPadding: 5
    });
    return t;
  }

};

__decorate([core_1.Inject(status_injection_tokens_1.FILE_DEPLOYMENT_STATUS), __metadata("design:type", typeof (_a = typeof status_injection_tokens_1.FILE_DEPLOYMENT_STATUS !== "undefined" && status_injection_tokens_1.FILE_DEPLOYMENT_STATUS) === "function" ? _a : Object)], TableService.prototype, "$deploymentStatus", void 0);

TableService = __decorate([core_1.Service(), __metadata("design:paramtypes", [typeof (_b = typeof ipfs_file_service_1.FileIpfsService !== "undefined" && ipfs_file_service_1.FileIpfsService) === "function" ? _b : Object])], TableService);
exports.TableService = TableService;
},{"../../status/status-injection.tokens":"app/status/status-injection.tokens.ts","../ipfs-file/ipfs-file.service":"app/services/ipfs-file/ipfs-file.service.ts"}],"app/status/status.service.ts":[function(require,module,exports) {
"use strict";

var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var __metadata = this && this.__metadata || function (k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _a;

const core_1 = require("@rxdi/core");

const status_injection_tokens_1 = require("./status-injection.tokens");

let StatusService = class StatusService {
  getBuildStatus() {
    return this.$deploymentStatus.getValue();
  }

  setBuildStatus(status) {
    this.$deploymentStatus.next(Object.assign({}, this.$deploymentStatus.getValue(), status));
  }

};

__decorate([core_1.Inject(status_injection_tokens_1.FILE_DEPLOYMENT_STATUS), __metadata("design:type", typeof (_a = typeof status_injection_tokens_1.FILE_DEPLOYMENT_STATUS !== "undefined" && status_injection_tokens_1.FILE_DEPLOYMENT_STATUS) === "function" ? _a : Object)], StatusService.prototype, "$deploymentStatus", void 0);

StatusService = __decorate([core_1.Service()], StatusService);
exports.StatusService = StatusService;
},{"./status-injection.tokens":"app/status/status-injection.tokens.ts"}],"app/status/status.module.ts":[function(require,module,exports) {
"use strict";

var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

const core_1 = require("@rxdi/core");

const rxjs_1 = require("rxjs");

const status_injection_tokens_1 = require("./status-injection.tokens");

const status_service_1 = require("./status.service");

let StatusModule = class StatusModule {};
StatusModule = __decorate([core_1.Module({
  services: [status_service_1.StatusService, {
    provide: status_injection_tokens_1.START,
    useValue: new rxjs_1.BehaviorSubject(true)
  }, {
    provide: status_injection_tokens_1.FILE_DEPLOYMENT_STATUS,
    useValue: new rxjs_1.BehaviorSubject({
      file: {
        status: 'SUCCESS',
        message: 'success'
      },
      typings: {
        status: 'SUCCESS',
        message: 'success'
      },
      module: {
        status: 'SUCCESS',
        message: 'success'
      }
    })
  }]
})], StatusModule);
exports.StatusModule = StatusModule;
},{"./status-injection.tokens":"app/status/status-injection.tokens.ts","./status.service":"app/status/status.service.ts"}],"app/services/build-history/build-history.service.ts":[function(require,module,exports) {
"use strict";

var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var __metadata = this && this.__metadata || function (k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _a;

const core_1 = require("@rxdi/core");

const rxjs_1 = require("rxjs");

const env_injection_tokens_1 = require("../../../env.injection.tokens");

let BuildHistoryService = class BuildHistoryService {
  insert(doc) {
    return new rxjs_1.Observable(o => {
      this.buildHistoryDatabase.insert(doc, (e, d) => {
        if (e) {
          throw new Error('Unable to insert to database');
        }

        o.next(d);
      });
    });
  }

  find(doc) {
    return new rxjs_1.Observable(o => {
      this.buildHistoryDatabase.find(doc, (e, d) => {
        if (e) {
          o.error(e);
        }

        o.next(d);
      });
    });
  }

  findAll(skip = 0, limit = 100, sort = {
    createdAt: -1
  }, where = {}) {
    return new Promise((resolve, reject) => {
      this.buildHistoryDatabase.find(where).sort(sort).skip(skip).limit(limit).exec((e, d) => {
        if (e) {
          reject(e);
        }

        resolve(d.map(doc => {
          doc.createdAt = new Date(doc.createdAt).valueOf();
          return doc;
        }).sort((a, b) => b.createdAt - a.createdAt).map(doc => {
          doc.createdAt = new Date(doc.createdAt);
          return doc;
        }));
      });
    });
  }

};

__decorate([core_1.Inject(env_injection_tokens_1.__BUILD_HISTORY_DATABASE), __metadata("design:type", typeof (_a = typeof env_injection_tokens_1.__BUILD_HISTORY_DATABASE !== "undefined" && env_injection_tokens_1.__BUILD_HISTORY_DATABASE) === "function" ? _a : Object)], BuildHistoryService.prototype, "buildHistoryDatabase", void 0);

BuildHistoryService = __decorate([core_1.Service()], BuildHistoryService);
exports.BuildHistoryService = BuildHistoryService;
},{"../../../env.injection.tokens":"env.injection.tokens.ts"}],"app/services/error-reason/error-reason.service.ts":[function(require,module,exports) {
"use strict";

var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

const core_1 = require("@rxdi/core");

let ErrorReasonService = class ErrorReasonService {
  moduleIntegrityError(oldHash, newHash) {
    console.log(`Module is with the same integrity like in the previws version ${oldHash}`);
    console.log(`To check this version write down following command rxdi-deploy --find ${newHash}`);
  }

};
ErrorReasonService = __decorate([core_1.Service()], ErrorReasonService);
exports.ErrorReasonService = ErrorReasonService;
},{}],"app/services/previous/previous.service.ts":[function(require,module,exports) {
"use strict";

var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var __metadata = this && this.__metadata || function (k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _a;

const core_1 = require("@rxdi/core");

const rxjs_1 = require("rxjs");

const env_injection_tokens_1 = require("../../../env.injection.tokens");

let PreviousService = class PreviousService {
  insert(doc) {
    return new rxjs_1.Observable(o => {
      this.previwsDatabase.insert(doc, (e, d) => {
        if (e) {
          throw new Error('Unable to insert to database');
        }

        o.next(d);
      });
    });
  }

  find(doc) {
    return new rxjs_1.Observable(o => {
      this.previwsDatabase.find(doc, (e, d) => {
        if (e) {
          o.error(e);
        }

        o.next(d);
      });
    });
  }

};

__decorate([core_1.Inject(env_injection_tokens_1.__PREVIWS_DATABASE), __metadata("design:type", typeof (_a = typeof env_injection_tokens_1.__PREVIWS_DATABASE !== "undefined" && env_injection_tokens_1.__PREVIWS_DATABASE) === "function" ? _a : Object)], PreviousService.prototype, "previwsDatabase", void 0);

PreviousService = __decorate([core_1.Service()], PreviousService);
exports.PreviousService = PreviousService;
},{"../../../env.injection.tokens":"env.injection.tokens.ts"}],"app/services/package-json/package-json.service.ts":[function(require,module,exports) {
"use strict";

var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var __metadata = this && this.__metadata || function (k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var __param = this && this.__param || function (paramIndex, decorator) {
  return function (target, key) {
    decorator(target, key, paramIndex);
  };
};

var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : new P(function (resolve) {
        resolve(result.value);
      }).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _a, _b;

const file_service_1 = require("../file/file.service");

const core_1 = require("@rxdi/core");

const env_injection_tokens_1 = require("../../../env.injection.tokens");

const helpers_1 = require("../helpers/helpers");

let PackageJsonService = class PackageJsonService {
  constructor(fileService, deployerOutputConfigName) {
    this.fileService = fileService;
    this.deployerOutputConfigName = deployerOutputConfigName;
  }

  OnInit() {
    if (helpers_1.includes('--collect-packages')) {
      this.defaultOutputConfig = 'package.json';
    } else {
      this.defaultOutputConfig = this.deployerOutputConfigName;
    }
  }

  prepareDependencies(path) {
    return __awaiter(this, void 0, void 0, function* () {
      const file = yield this.read(path);

      if (file.dependencies) {
        return Object.keys(file.dependencies).map(name => ({
          name,
          version: file.dependencies[name]
        }));
      }

      return [];
    });
  }

  readModifyWrite(modifier = {}, path) {
    return __awaiter(this, void 0, void 0, function* () {
      let file = yield this.read(path);
      file = Object.assign({}, modifier, file);
      return yield this.write(file, path);
    });
  }

  read(path) {
    return __awaiter(this, void 0, void 0, function* () {
      return JSON.parse((yield this.fileService.readFile(path || `${process.cwd()}/${this.defaultOutputConfig}`)));
    });
  }

  write(data, path) {
    return __awaiter(this, void 0, void 0, function* () {
      return yield this.fileService.writeFile(path || `${process.cwd()}/${this.defaultOutputConfig}`, JSON.stringify(data));
    });
  }

};
PackageJsonService = __decorate([core_1.Service(), __param(1, core_1.Inject(env_injection_tokens_1.__DEPLOYER_OUTPUT_CONFIG_NAME)), __metadata("design:paramtypes", [typeof (_a = typeof file_service_1.FileService !== "undefined" && file_service_1.FileService) === "function" ? _a : Object, typeof (_b = typeof env_injection_tokens_1.__DEPLOYER_OUTPUT_CONFIG_NAME !== "undefined" && env_injection_tokens_1.__DEPLOYER_OUTPUT_CONFIG_NAME) === "function" ? _b : Object])], PackageJsonService);
exports.PackageJsonService = PackageJsonService;
},{"../file/file.service":"app/services/file/file.service.ts","../../../env.injection.tokens":"env.injection.tokens.ts","../helpers/helpers":"app/services/helpers/helpers.ts"}],"app/server/namespace/services/namespace.service.ts":[function(require,module,exports) {
"use strict";

var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var __metadata = this && this.__metadata || function (k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : new P(function (resolve) {
        resolve(result.value);
      }).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _a;

const core_1 = require("@rxdi/core");

const env_injection_tokens_1 = require("../../../../env.injection.tokens");

let NamespaceService = class NamespaceService {
  getNamespace(name) {
    return new Promise((resolve, reject) => {
      this.namespace.find({
        name
      }).exec((e, d) => {
        if (e) {
          reject(e);
        }

        resolve(d);
      });
    });
  }

  getNamespaceById(_id) {
    return new Promise((resolve, reject) => {
      this.namespace.findOne({
        _id
      }, (e, d) => {
        if (e) {
          reject(e);
        }

        console.log(d);
        resolve(d);
      });
    });
  }

  searchForDuplicates(name) {
    return new Promise((resolve, reject) => {
      this.namespace.findOne({
        name
      }, (e, d) => {
        if (e) {
          reject(e);
        }

        resolve(d);
      });
    });
  }

  insert(doc) {
    return __awaiter(this, void 0, void 0, function* () {
      return yield new Promise((resolve, reject) => {
        this.namespace.insert(doc, (e, d) => {
          if (e) {
            reject(e);
          }

          resolve(d);
        });
      });
    });
  }

  listNamespaces(skip = 0, limit = 100, sort = {
    createdAt: -1
  }) {
    return new Promise((resolve, reject) => {
      this.namespace.find({}).sort(sort).skip(skip).limit(limit).exec((e, d) => {
        if (e) {
          reject(e);
        }

        resolve(d);
      });
    });
  }

};

__decorate([core_1.Inject(env_injection_tokens_1.__NAMESPACE_DB), __metadata("design:type", typeof (_a = typeof env_injection_tokens_1.__NAMESPACE_DB !== "undefined" && env_injection_tokens_1.__NAMESPACE_DB) === "function" ? _a : Object)], NamespaceService.prototype, "namespace", void 0);

NamespaceService = __decorate([core_1.Service()], NamespaceService);
exports.NamespaceService = NamespaceService;
},{"../../../../env.injection.tokens":"env.injection.tokens.ts"}],"app/services/time/time.service.ts":[function(require,module,exports) {
"use strict";

var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

const core_1 = require("@rxdi/core");

let TimeService = class TimeService {
  calculateTime(time) {
    const date = new Date(time);
    return {
      day: this.getDay(date),
      month: this.getDay(date),
      year: this.getDay(date)
    };
  }

  getDay(date) {
    return date.getUTCDate();
  }

  getMonth(date) {
    return date.getUTCDate();
  }

  getYear(date) {
    return date.getUTCFullYear();
  }

};
TimeService = __decorate([core_1.Service()], TimeService);
exports.TimeService = TimeService;
},{}],"app/services/html-template-builder/html-template-builder.service.ts":[function(require,module,exports) {
"use strict";

var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

const core_1 = require("@rxdi/core");

let HtmlTemplateBuilder = class HtmlTemplateBuilder {};
HtmlTemplateBuilder = __decorate([core_1.Service()], HtmlTemplateBuilder);
exports.HtmlTemplateBuilder = HtmlTemplateBuilder;
},{}],"app/services/index.ts":[function(require,module,exports) {
"use strict";

function __export(m) {
  for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}

Object.defineProperty(exports, "__esModule", {
  value: true
});

__export(require("./file/file-user.service"));

__export(require("./file/file.service"));

__export(require("./ipfs-file/ipfs-file.service"));

__export(require("./parcel-bundler/parcel-bundler.service"));

__export(require("./arguments/arguments.service"));

__export(require("./dts-generator/dts-generator.service"));

__export(require("./tsconfig-generator/tsconfig-generator.service"));

__export(require("./table-service/table-service"));

__export(require("./build-history/build-history.service"));

__export(require("./previous/previous.service"));

__export(require("./error-reason/error-reason.service"));

__export(require("./time/time.service"));

__export(require("./package-json/package-json.service"));

__export(require("./html-template-builder/html-template-builder.service"));

__export(require("./helpers/helpers"));

__export(require("./logger/logger.service"));
},{"./file/file-user.service":"app/services/file/file-user.service.ts","./file/file.service":"app/services/file/file.service.ts","./ipfs-file/ipfs-file.service":"app/services/ipfs-file/ipfs-file.service.ts","./parcel-bundler/parcel-bundler.service":"app/services/parcel-bundler/parcel-bundler.service.ts","./arguments/arguments.service":"app/services/arguments/arguments.service.ts","./dts-generator/dts-generator.service":"app/services/dts-generator/dts-generator.service.ts","./tsconfig-generator/tsconfig-generator.service":"app/services/tsconfig-generator/tsconfig-generator.service.ts","./table-service/table-service":"app/services/table-service/table-service.ts","./build-history/build-history.service":"app/services/build-history/build-history.service.ts","./previous/previous.service":"app/services/previous/previous.service.ts","./error-reason/error-reason.service":"app/services/error-reason/error-reason.service.ts","./time/time.service":"app/services/time/time.service.ts","./package-json/package-json.service":"app/services/package-json/package-json.service.ts","./html-template-builder/html-template-builder.service":"app/services/html-template-builder/html-template-builder.service.ts","./helpers/helpers":"app/services/helpers/helpers.ts","./logger/logger.service":"app/services/logger/logger.service.ts"}],"app/server/file/services/file.service.ts":[function(require,module,exports) {
"use strict";

var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : new P(function (resolve) {
        resolve(result.value);
      }).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

const core_1 = require("@rxdi/core");

const operators_1 = require("rxjs/operators");

const fs_1 = require("fs");

const services_1 = require("../../../services");

const path_1 = require("path");

const rxjs_1 = require("rxjs");

let FileService = class FileService {
  constructor() {
    this.units = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    this.results = [];
  }

  wholeReadDirRecursive(path = '.') {
    return __awaiter(this, void 0, void 0, function* () {
      const directory = yield this.readDir(path);
      const pathinternal = path;
      const self = this;
      return (yield Promise.all(directory.map(file => __awaiter(this, void 0, void 0, function* () {
        const path = path_1.resolve(pathinternal, file);
        const stat = yield this.statAsync(path);

        if (stat && stat.isDirectory()) {
          if (!file.includes('node_modules')) {
            yield self.wholeReadDirRecursive.bind(this)(path);
          } else {
            return null;
          }
        } else {
          this.results = [...this.results, path];
        }
      })))).filter(a => !!a);
    });
  }

  readCurrentDirFlat(path = '.') {
    return __awaiter(this, void 0, void 0, function* () {
      return (yield this.readDir(path)).map(file => path_1.resolve(path, file)).filter(a => !!a);
    });
  }

  listFolder(folder) {
    return __awaiter(this, void 0, void 0, function* () {
      return yield new Promise((resolve, reject) => {
        rxjs_1.from(this.readCurrentDirFlat(folder)).pipe(operators_1.switchMap(res => this.map(res))).subscribe(res => resolve(res), e => reject(e));
      });
    });
  }

  readDir(folder, limit = 200) {
    return __awaiter(this, void 0, void 0, function* () {
      return yield new Promise((resolve, reject) => {
        fs_1.readdir(folder, (err, list) => {
          if (err) {
            resolve([]);
          } else {
            let count = 0;
            resolve(list.map(f => {
              count++;

              if (limit > count) {
                return f;
              } else {
                return null;
              }
            }).filter(res => !!res));
          }
        });
      });
    });
  }

  map(res) {
    return __awaiter(this, void 0, void 0, function* () {
      let foldersCount = 100;
      let counter = 0;
      return (yield Promise.all(res.map(r => __awaiter(this, void 0, void 0, function* () {
        counter++;
        const mapping = {
          path: r,
          directory: null,
          file: null,
          name: null,
          status: null
        };
        const status = yield this.statAsync(r);

        const pathMapping = v => r.replace(process.cwd(), v);

        if (!status.isDirectory || status && status['prototype'] === String) {
          return null;
        }

        if (status.isDirectory()) {
          mapping.directory = true;
        } else {
          mapping.file = true;
        }

        mapping.name = r.split("/").pop();
        mapping.path = pathMapping('.');

        if (services_1.includes('--enable-full-folder-access')) {
          mapping.path = r;
        }

        mapping.status = status;
        mapping.status.size = this.niceBytes(status.size);

        if (counter === foldersCount) {
          return null;
        }

        return mapping;
      })))).filter(res => !!res);
    });
  }

  niceBytes(x) {
    let l = 0,
        n = parseInt(x, 10) || 0;

    while (n >= 1024 && ++l) n = n / 1024;

    return n.toFixed(n >= 10 || l < 1 ? 0 : 1) + ' ' + this.units[l];
  }

  statAsync(path) {
    return __awaiter(this, void 0, void 0, function* () {
      return yield new Promise((resolve, reject) => {
        fs_1.stat(path, (e, stats) => {
          if (e) {
            resolve(e);
          }

          resolve(stats);
        });
      });
    });
  }

};
FileService = __decorate([core_1.Service()], FileService);
exports.FileService = FileService;
},{"../../../services":"app/services/index.ts"}],"app/plugins/compile/compile.plugin.ts":[function(require,module,exports) {
"use strict";

var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var __metadata = this && this.__metadata || function (k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : new P(function (resolve) {
        resolve(result.value);
      }).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x;

const env_injection_tokens_1 = require("../../../env.injection.tokens");

const core_1 = require("@rxdi/core");

const operators_1 = require("rxjs/operators");

const rxjs_1 = require("rxjs");

const file_user_service_1 = require("../../services/file/file-user.service");

const parcel_bundler_service_1 = require("../../services/parcel-bundler/parcel-bundler.service");

const ipfs_file_service_1 = require("../../services/ipfs-file/ipfs-file.service");

const file_service_1 = require("../../services/file/file.service");

const dts_generator_service_1 = require("../../services/dts-generator/dts-generator.service");

const tsconfig_generator_service_1 = require("../../services/tsconfig-generator/tsconfig-generator.service");

const table_service_1 = require("../../services/table-service/table-service");

const build_history_service_1 = require("../../services/build-history/build-history.service");

const previous_service_1 = require("../../services/previous/previous.service");

const error_reason_service_1 = require("../../services/error-reason/error-reason.service");

const status_service_1 = require("../../status/status.service");

const package_json_service_1 = require("../../services/package-json/package-json.service");

const helpers_1 = require("../../services/helpers/helpers");

const namespace_service_1 = require("../../server/namespace/services/namespace.service");

const file_service_2 = require("../../server/file/services/file.service");

let CompilePlugin = class CompilePlugin {
  constructor(parcelBundler, logger, ipfsFile, fileService, fileUserService, typingsGenerator, tsConfigGenerator, tableService, buildHistoryService, previousService, namespaceService, errorReasonService, statusService, packageJsonService, internalFileService) {
    this.parcelBundler = parcelBundler;
    this.logger = logger;
    this.ipfsFile = ipfsFile;
    this.fileService = fileService;
    this.fileUserService = fileUserService;
    this.typingsGenerator = typingsGenerator;
    this.tsConfigGenerator = tsConfigGenerator;
    this.tableService = tableService;
    this.buildHistoryService = buildHistoryService;
    this.previousService = previousService;
    this.namespaceService = namespaceService;
    this.errorReasonService = errorReasonService;
    this.statusService = statusService;
    this.packageJsonService = packageJsonService;
    this.internalFileService = internalFileService;
    this.fileNotDeployed = '';
    this.initIpfsModule = [{
      size: 0,
      hash: this.fileNotDeployed,
      path: this.fileNotDeployed,
      content: this.fileNotDeployed
    }];
  }

  register() {
    return __awaiter(this, void 0, void 0, function* () {
      if (helpers_1.includes('--webui') || helpers_1.includes('--node-only')) {
        return yield Promise.resolve();
      }

      if (this.isJavascriptCompilation()) {
        return yield this.compile();
      }

      return yield new Promise(resolve => {
        this.writeOtherFile(`${this.folder}${this.fileName}`).pipe(operators_1.tap(r => this.logSuccess(r)), operators_1.switchMapTo(rxjs_1.interval(1000)), operators_1.take(this.resolutionTime), operators_1.map(v => this.resolutionTime - 1 - v)).subscribe(counter => {
          if (!counter) {
            resolve(true);
            process.exit(0);
          }
        }, e => {
          this.logger.error(e);
          process.exit(1);
        });
      });
    });
  }

  isJavascriptCompilation() {
    return !!['.ts', '.js', '.tsx'].filter(e => e === this.extension).length;
  }

  compile() {
    return __awaiter(this, void 0, void 0, function* () {
      return this.completeBuildAndAddToIpfs(this.folder, this.fileName, this.commitMessage, this.namespace, this.outputConfigName).pipe(operators_1.tap(r => this.logSuccess(r)), operators_1.switchMapTo(rxjs_1.interval(1000)), operators_1.take(this.resolutionTime), operators_1.map(v => this.resolutionTime - 1 - v)).subscribe(counter => {
        if (!counter) {
          process.exit(0);
        }
      }, e => {
        this.logger.error(e);
        process.exit(1);
      });
    });
  }

  parcelBuild(path, outDir = null, fileName) {
    return this.parcelBundler.prepareBundler(path, outDir, fileName);
  }

  createCommitMessage(message = '') {
    return __awaiter(this, void 0, void 0, function* () {
      if (helpers_1.includes('--html')) {
        let file;
        const filePath = helpers_1.nextOrDefault('--html', './index.html');

        try {
          file = yield this.fileService.readFileRaw(filePath);
        } catch (e) {
          console.log(`
Error loading file ${filePath}
                `);
          process.exit(0);
        }

        return yield this.ipfsFile.addRawFile(file);
      } else {
        if (!!message && !message.includes('--') && !message.includes('-')) {
          return yield this.ipfsFile.addFile(message);
        } else {
          return yield Promise.resolve(this.initIpfsModule);
        }
      }
    });
  }

  completeBuildAndAddToIpfs(folder, file, message, namespace, outputConfigName, buildFolder = './build') {
    let ipfsFile;
    let ipfsModule;
    let ipfsTypings = this.initIpfsModule;
    let ipfsMessage = this.initIpfsModule;
    let ipfsFileMetadata = this.initIpfsModule;
    let currentModule;
    let dag;
    this.logger.log('Bundling Started!\n');
    return rxjs_1.from(this.parcelBuild(folder + '/' + file, buildFolder, `${file.split('.')[0]}.js`)).pipe(operators_1.tap(() => {
      this.logger.log('Bundling finished!\n');
      this.logger.log(`Adding commit message ${message}...\n`);
    }), operators_1.switchMap(() => __awaiter(this, void 0, void 0, function* () {
      return this.createCommitMessage(message);
    })), operators_1.tap(res => {
      ipfsMessage = res;
      this.logger.log(`Commit message added...\n`);
    }), operators_1.switchMap(() => this.fileService.readFile(`${buildFolder}/${file.split('.')[0]}.js`)), operators_1.tap(() => {
      this.logger.log(`Reading bundle ${buildFolder}/${file.split('.')[0]}.js finished!\n`);
    }), operators_1.switchMap(res => this.ipfsFile.addFile(res)), operators_1.tap(res => {
      ipfsFile = res;
      this.logger.log(`Bundle added to ipfs ${buildFolder}/${file.split('.')[0]}.js\n`);
      this.logger.log(`Typescript definitions merge started!\n`);
    }), operators_1.switchMap(() => rxjs_1.from(this.typingsGenerator.mergeTypings(namespace, folder, `${buildFolder}/index.d.ts`))), operators_1.tap(() => this.logger.log(`Typescript definitions merge finished! Reading file...\n`)), operators_1.switchMap(() => this.fileService.readFile(`${buildFolder}/index.d.ts`)), operators_1.tap(() => this.logger.log(`Typescript definitions read finished! Adding to IPFS...\n`)), operators_1.switchMap(res => {
      if (!!res) {
        return this.ipfsFile.addFile(res);
      } else {
        this.statusService.setBuildStatus({
          typings: {
            status: 'WARNING',
            message: 'Missing typescript definition.Typings will not be uploaded!'
          }
        });
        return Promise.resolve(this.initIpfsModule);
      }
    }), operators_1.tap(res => {
      ipfsTypings = res;

      if (ipfsTypings[0].hash) {
        this.logger.log(`Typescript definitions added to IPFS! Adding module configuration...\n`);
      }
    }), operators_1.switchMap(() => this.fileService.readFilePromisifyFallback(`${folder}/${outputConfigName}`)), operators_1.switchMap(d => __awaiter(this, void 0, void 0, function* () {
      try {
        dag = JSON.parse(d);
      } catch (e) {
        throw new Error(`Cannot parse ${outputConfigName} from root directory!`);
      }

      currentModule = {
        name: namespace,
        module: ipfsFile[0].hash,
        createdAt: new Date()
      };

      if (ipfsTypings[0].hash) {
        currentModule.typings = ipfsTypings[0].hash;
      }

      if (ipfsMessage[0].hash) {
        currentModule.message = ipfsMessage[0].hash;
      }

      if (ipfsFileMetadata[0].hash) {
        currentModule.metadata = ipfsFileMetadata[0].hash;
      }

      currentModule.previous = [...(dag.previous || [])];
      let f = {
        ipfs: []
      };

      if (yield this.internalFileService.statAsync(`${folder}/${outputConfigName}`)) {
        this.logger.log(`Reactive file present ${outputConfigName} package dependencies will be taken from it`);

        try {
          f = JSON.parse((yield this.fileService.readFile(`${folder}/${outputConfigName}`)));
        } catch (e) {
          throw new Error(`Cannot parce reactive file at ${folder}/${outputConfigName}`);
        }

        if (f.dependencies) {
          currentModule.dependencies = f.dependencies;
        }

        const dependencies = [];

        if (f.ipfs && f.ipfs.length) {
          f.ipfs.forEach(p => p.dependencies.forEach(d => dependencies.push(d)));

          if (dependencies.length) {
            currentModule.dependencies = dependencies;
          }
        }
      }

      this.logger.log(`Current module before deploy ${JSON.stringify(currentModule)}`);

      if (helpers_1.includes('--collect-packages')) {
        const packages = yield this.packageJsonService.prepareDependencies(`${folder}/package.json`);

        if (packages.length) {
          currentModule.packages = packages;
        }
      }

      ipfsModule = yield this.ipfsFile.addFile(JSON.stringify(currentModule, null, 2));

      if (currentModule.previous.length >= 20) {
        currentModule.previous.shift();
      }

      currentModule.previous = [...currentModule.previous, ipfsModule[0].hash];

      if (f.ipfs) {
        currentModule.ipfs = f.ipfs;
      }

      yield this.fileUserService.writeDag(`${folder}/${outputConfigName}`, JSON.stringify(currentModule, null, 2));
      return ipfsModule;
    })), operators_1.tap(() => this.logger.log(`Module configuration added to ipfs!\n`)), operators_1.switchMap(() => __awaiter(this, void 0, void 0, function* () {
      let nmspc = yield this.namespaceService.searchForDuplicates(namespace);

      if (!nmspc) {
        nmspc = yield this.namespaceService.insert({
          name: namespace
        });
      }

      return nmspc;
    })), operators_1.switchMap(nmspc => rxjs_1.combineLatest([this.buildHistoryService.insert({
      status: {
        file: this.statusService.getBuildStatus().file,
        typings: this.statusService.getBuildStatus().typings,
        module: this.statusService.getBuildStatus().module
      },
      hash: ipfsModule[0].hash,
      name: namespace,
      typings: ipfsTypings[0].hash,
      module: ipfsFile[0].hash,
      metadata: ipfsFileMetadata[0].hash,
      message: ipfsMessage[0].hash,
      namespaceId: nmspc['_id']
    }), this.previousService.insert({
      name: namespace,
      hash: ipfsModule[0].hash
    })])), operators_1.map(() => ({
      file: ipfsFile,
      typings: ipfsTypings,
      module: ipfsModule
    })), operators_1.tap(() => __awaiter(this, void 0, void 0, function* () {
      this.logger.log('Module saved to persistant history!');

      if (!ipfsModule) {
        this.fileNotAddedToIpfs(ipfsModule);
      }

      console.log('' + this.tableService.previewsVersions(currentModule.previous));
      console.log('' + this.tableService.previewsNext(currentModule.previous));
      console.log('' + this.tableService.endInstallCommand(ipfsModule[0].hash));
      console.log('' + this.tableService.createTable(ipfsFile, ipfsTypings, ipfsModule));

      const returnItemByIndex = i => currentModule.previous[currentModule.previous.length - i];

      yield this.showError(returnItemByIndex(2), returnItemByIndex(1));
    })));
  }

  fileNotAddedToIpfs(file) {
    console.log(`File not added to ipfs for ${JSON.stringify(file)}`);
    console.log(`More info can be found executing command: rxdi-deploy --find ${file[0].hash}`);
  }

  integrityCheck(dag, file, typings) {
    const genericIntegrityError = 'Integrity is same like in the previews version!';
    console.log(dag.module, file[0].hash);

    if (dag.module === file[0].hash) {
      this.logger.log(`
        !! Warning !!
        Module is with the same integrity and will not be uploaded again!
        You need to make change to the module so it will be with different integrity!
            `);
      this.statusService.setBuildStatus({
        file: {
          status: 'WARNING',
          message: genericIntegrityError
        },
        module: {
          status: 'WARNING',
          message: genericIntegrityError
        }
      });
    }

    if (dag.typings === typings[0].hash) {
      this.logger.log(`
        !! Warning !!
        Typings are with the same integrity and will not be uploaded again!
        You need to make change to the module so it will be with different integrity!
            `);
      this.statusService.setBuildStatus({
        typings: {
          status: 'WARNING',
          message: genericIntegrityError
        }
      });
    }
  }

  showError(oldHash, newHash) {
    return __awaiter(this, void 0, void 0, function* () {
      return yield new Promise(resolve => {
        if (Object.keys(this.statusService.getBuildStatus()).filter(k => this.statusService.getBuildStatus()[k].status !== 'SUCCESS').length) {
          this.errorReasonService.moduleIntegrityError(oldHash, newHash);
        }

        setTimeout(() => {
          resolve();
        }, 1000);
      });
    });
  }

  writeOtherFile(file) {
    return rxjs_1.from(this.fileService.readFileRaw(file)).pipe(operators_1.switchMap(content => this.ipfsFile.addRawFile(content)), operators_1.tap(c => {
      console.log('' + this.tableService.fileUploadStatus(c));
    }));
  }

  logSuccess(res) {
    console.log(`Deploy finish ipfs node will shutdown in: ${this.resolutionTime} seconds`);
  }

  completeBuildAndAddToIpfs2(namespace = '@gapi/core') {
    const fileName = 'index';
    let ipfsFile;
    return rxjs_1.from(this.fileUserService.writeFile(`
import { Service } from '@rxdi/core';

@Service()
export class Pesho {
    constructor() {
        console.log('THIS IS PESHO SERVICE');
    }
}
        
        `, fileName + '.ts', namespace)).pipe(operators_1.switchMap(() => rxjs_1.from(this.fileUserService.writeFile(this.tsConfigGenerator.getTsConfig(fileName), 'tsconfig.json', namespace))), operators_1.switchMap(() => rxjs_1.from(this.parcelBundler.prepareBundler(`./build/${namespace}/${fileName}.ts`))), operators_1.switchMap(() => this.fileService.readFile(`./build/${fileName}.js`)), operators_1.switchMap(res => this.ipfsFile.addFile(res)), operators_1.tap(res => ipfsFile = res), operators_1.switchMap(() => rxjs_1.from(this.typingsGenerator.mergeTypings(namespace, `./build/${namespace}`, './build/index.d.ts'))), operators_1.switchMap(() => rxjs_1.of(ipfsFile)));
  }

};

__decorate([core_1.Inject(env_injection_tokens_1.__FILE_NAME), __metadata("design:type", typeof (_a = typeof env_injection_tokens_1.__FILE_NAME !== "undefined" && env_injection_tokens_1.__FILE_NAME) === "function" ? _a : Object)], CompilePlugin.prototype, "fileName", void 0);

__decorate([core_1.Inject(env_injection_tokens_1.__FOLDER), __metadata("design:type", typeof (_b = typeof env_injection_tokens_1.__FOLDER !== "undefined" && env_injection_tokens_1.__FOLDER) === "function" ? _b : Object)], CompilePlugin.prototype, "folder", void 0);

__decorate([core_1.Inject(env_injection_tokens_1.__IPFS_NODE_RESOLUTION_TIME), __metadata("design:type", typeof (_c = typeof env_injection_tokens_1.__IPFS_NODE_RESOLUTION_TIME !== "undefined" && env_injection_tokens_1.__IPFS_NODE_RESOLUTION_TIME) === "function" ? _c : Object)], CompilePlugin.prototype, "resolutionTime", void 0);

__decorate([core_1.Inject(env_injection_tokens_1.__DEPLOYER_OUTPUT_CONFIG_NAME), __metadata("design:type", typeof (_d = typeof env_injection_tokens_1.__DEPLOYER_OUTPUT_CONFIG_NAME !== "undefined" && env_injection_tokens_1.__DEPLOYER_OUTPUT_CONFIG_NAME) === "function" ? _d : Object)], CompilePlugin.prototype, "outputConfigName", void 0);

__decorate([core_1.Inject(env_injection_tokens_1.__NAMESPACE), __metadata("design:type", typeof (_e = typeof env_injection_tokens_1.__NAMESPACE !== "undefined" && env_injection_tokens_1.__NAMESPACE) === "function" ? _e : Object)], CompilePlugin.prototype, "namespace", void 0);

__decorate([core_1.Inject(env_injection_tokens_1.__COMMIT_MESSAGE), __metadata("design:type", typeof (_f = typeof env_injection_tokens_1.__COMMIT_MESSAGE !== "undefined" && env_injection_tokens_1.__COMMIT_MESSAGE) === "function" ? _f : Object)], CompilePlugin.prototype, "commitMessage", void 0);

__decorate([core_1.Inject(env_injection_tokens_1.__FILE_EXTENSION), __metadata("design:type", typeof (_g = typeof env_injection_tokens_1.__FILE_EXTENSION !== "undefined" && env_injection_tokens_1.__FILE_EXTENSION) === "function" ? _g : Object)], CompilePlugin.prototype, "extension", void 0);

CompilePlugin = __decorate([core_1.Plugin(), __metadata("design:paramtypes", [typeof (_h = typeof parcel_bundler_service_1.ParcelBundlerService !== "undefined" && parcel_bundler_service_1.ParcelBundlerService) === "function" ? _h : Object, typeof (_j = typeof core_1.BootstrapLogger !== "undefined" && core_1.BootstrapLogger) === "function" ? _j : Object, typeof (_k = typeof ipfs_file_service_1.FileIpfsService !== "undefined" && ipfs_file_service_1.FileIpfsService) === "function" ? _k : Object, typeof (_l = typeof file_service_1.FileService !== "undefined" && file_service_1.FileService) === "function" ? _l : Object, typeof (_m = typeof file_user_service_1.FileUserService !== "undefined" && file_user_service_1.FileUserService) === "function" ? _m : Object, typeof (_o = typeof dts_generator_service_1.TypescriptDefinitionGeneratorService !== "undefined" && dts_generator_service_1.TypescriptDefinitionGeneratorService) === "function" ? _o : Object, typeof (_p = typeof tsconfig_generator_service_1.TsConfigGenratorService !== "undefined" && tsconfig_generator_service_1.TsConfigGenratorService) === "function" ? _p : Object, typeof (_q = typeof table_service_1.TableService !== "undefined" && table_service_1.TableService) === "function" ? _q : Object, typeof (_r = typeof build_history_service_1.BuildHistoryService !== "undefined" && build_history_service_1.BuildHistoryService) === "function" ? _r : Object, typeof (_s = typeof previous_service_1.PreviousService !== "undefined" && previous_service_1.PreviousService) === "function" ? _s : Object, typeof (_t = typeof namespace_service_1.NamespaceService !== "undefined" && namespace_service_1.NamespaceService) === "function" ? _t : Object, typeof (_u = typeof error_reason_service_1.ErrorReasonService !== "undefined" && error_reason_service_1.ErrorReasonService) === "function" ? _u : Object, typeof (_v = typeof status_service_1.StatusService !== "undefined" && status_service_1.StatusService) === "function" ? _v : Object, typeof (_w = typeof package_json_service_1.PackageJsonService !== "undefined" && package_json_service_1.PackageJsonService) === "function" ? _w : Object, typeof (_x = typeof file_service_2.FileService !== "undefined" && file_service_2.FileService) === "function" ? _x : Object])], CompilePlugin);
exports.CompilePlugin = CompilePlugin;
},{"../../../env.injection.tokens":"env.injection.tokens.ts","../../services/file/file-user.service":"app/services/file/file-user.service.ts","../../services/parcel-bundler/parcel-bundler.service":"app/services/parcel-bundler/parcel-bundler.service.ts","../../services/ipfs-file/ipfs-file.service":"app/services/ipfs-file/ipfs-file.service.ts","../../services/file/file.service":"app/services/file/file.service.ts","../../services/dts-generator/dts-generator.service":"app/services/dts-generator/dts-generator.service.ts","../../services/tsconfig-generator/tsconfig-generator.service":"app/services/tsconfig-generator/tsconfig-generator.service.ts","../../services/table-service/table-service":"app/services/table-service/table-service.ts","../../services/build-history/build-history.service":"app/services/build-history/build-history.service.ts","../../services/previous/previous.service":"app/services/previous/previous.service.ts","../../services/error-reason/error-reason.service":"app/services/error-reason/error-reason.service.ts","../../status/status.service":"app/status/status.service.ts","../../services/package-json/package-json.service":"app/services/package-json/package-json.service.ts","../../services/helpers/helpers":"app/services/helpers/helpers.ts","../../server/namespace/services/namespace.service":"app/server/namespace/services/namespace.service.ts","../../server/file/services/file.service":"app/server/file/services/file.service.ts"}],"app/server/services/webui.service.ts":[function(require,module,exports) {
"use strict";

var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var __metadata = this && this.__metadata || function (k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var __param = this && this.__param || function (paramIndex, decorator) {
  return function (target, key) {
    decorator(target, key, paramIndex);
  };
};

var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : new P(function (resolve) {
        resolve(result.value);
      }).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _a, _b;

const hapi_1 = require("@rxdi/hapi");

const core_1 = require("@rxdi/core");

const hapi_2 = require("hapi");

const env_injection_tokens_1 = require("../../../env.injection.tokens");

const services_1 = require("../../services");

let WebUiService = class WebUiService {
  constructor(server, root_folder) {
    this.server = server;
    this.root_folder = root_folder;
  }

  OnInit() {
    services_1.includes('--webui') ? this.register() : null;
  }

  register() {
    return __awaiter(this, void 0, void 0, function* () {
      this.server.route({
        method: 'GET',
        path: '/webui/{param*}',
        handler: {
          directory: {
            path: `${this.root_folder}/webui`,
            listing: true,
            index: ['index.html']
          }
        }
      });
    });
  }

};
WebUiService = __decorate([core_1.Service(), __param(0, core_1.Inject(hapi_1.HAPI_SERVER)), __param(1, core_1.Inject(env_injection_tokens_1.__ROOT_FOLDER)), __metadata("design:paramtypes", [typeof (_a = typeof hapi_2.Server !== "undefined" && hapi_2.Server) === "function" ? _a : Object, typeof (_b = typeof env_injection_tokens_1.__ROOT_FOLDER !== "undefined" && env_injection_tokens_1.__ROOT_FOLDER) === "function" ? _b : Object])], WebUiService);
exports.WebUiService = WebUiService;
},{"../../../env.injection.tokens":"env.injection.tokens.ts","../../services":"app/services/index.ts"}],"app/server/services/server-push.service.ts":[function(require,module,exports) {
"use strict";

var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var __metadata = this && this.__metadata || function (k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var __param = this && this.__param || function (paramIndex, decorator) {
  return function (target, key) {
    decorator(target, key, paramIndex);
  };
};

var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : new P(function (resolve) {
        resolve(result.value);
      }).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _a, _b, _c, _d;

const core_1 = require("@rxdi/core");

const http_1 = require("http");

const hapi_1 = require("hapi");

const hapi_2 = require("@rxdi/hapi");

const rxjs_1 = require("rxjs");

const operators_1 = require("rxjs/operators");

const services_1 = require("../../services");

let ServerPushService = class ServerPushService {
  constructor(server, exitHandler, afterStarterService, openService) {
    this.server = server;
    this.exitHandler = exitHandler;
    this.afterStarterService = afterStarterService;
    this.openService = openService;
    this.sendToClient = new rxjs_1.Subject();
    this.sendTime = new rxjs_1.Subject();
    this.clientConnected = new rxjs_1.Subject();
    this.exitHandler.errorHandler.subscribe(e => __awaiter(this, void 0, void 0, function* () {
      return yield this.stopServerWatcher();
    }));
    const interval = services_1.nextOrDefault('--server-push-interval', 1000 * 7, a => Number(a * 1000));
    rxjs_1.timer(0, interval).pipe(operators_1.tap(() => this.sendTime.next(true))).subscribe();
    this.afterStarterService.appStarted.pipe(operators_1.switchMapTo(this.waitXSeconds(5)), operators_1.take(1), operators_1.filter(() => !this.connected), operators_1.filter(() => services_1.includes('--open-browser')), operators_1.tap(() => this.openService.openPage(`http://${this.server.info.address}:${this.server.info.port}/webui`))).subscribe();
  }

  waitXSeconds(sec) {
    return rxjs_1.Observable.create(o => {
      const timeout = setTimeout(() => o.next(true), sec * 1000);
      return () => clearTimeout(timeout);
    });
  }

  OnInit() {
    this.register();
  }

  register() {
    return __awaiter(this, void 0, void 0, function* () {
      if (services_1.includes('--webui-server-watcher') || services_1.includes('--webui')) {
        this.createServerWatcher();
      }
    });
  }

  stopServerWatcher() {
    return __awaiter(this, void 0, void 0, function* () {
      return yield new Promise(resolve => this.serverWatcher.close(() => resolve()));
    });
  }

  createServerWatcher() {
    this.serverWatcher = http_1.createServer(this.OnRequest.bind(this));
    this.serverWatcher.listen(services_1.nextOrDefault('--webui-server-watcher-port', 8957));
  }

  OnRequest(req, res) {
    if (req.url === '/status') {
      if (!this.connected) {
        this.clientConnected.next(true);
        res.write('data: ' + JSON.stringify({
          response: {
            init: true
          }
        }) + '\n\n');
      }

      this.connected = true;
      res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive'
      });
      this.sendToClient.subscribe(data => res.write('data: ' + JSON.stringify(data) + '\n\n'));
      this.sendTime.subscribe(data => res.write('data: ' + JSON.stringify({
        time: new Date().toLocaleTimeString()
      }) + '\n\n'));
      this.sendTime.subscribe(data => res.write('data: ' + JSON.stringify({
        config: {
          graphql: {},
          hapi: this.server.info
        }
      }) + '\n\n'));
      req.on('end', () => {
        this.connected = false;
        req.destroy();
      });
      return;
    }

    res.statusCode = 400;
    return res.end();
  }

};
ServerPushService = __decorate([core_1.Service(), __param(0, core_1.Inject(hapi_2.HAPI_SERVER)), __metadata("design:paramtypes", [typeof (_a = typeof hapi_1.Server !== "undefined" && hapi_1.Server) === "function" ? _a : Object, typeof (_b = typeof core_1.ExitHandlerService !== "undefined" && core_1.ExitHandlerService) === "function" ? _b : Object, typeof (_c = typeof core_1.AfterStarterService !== "undefined" && core_1.AfterStarterService) === "function" ? _c : Object, typeof (_d = typeof hapi_2.OpenService !== "undefined" && hapi_2.OpenService) === "function" ? _d : Object])], ServerPushService);
exports.ServerPushService = ServerPushService;
},{"../../services":"app/services/index.ts"}],"app/server/user/types/user.type.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

const graphql_1 = require("graphql");

exports.UserType = new graphql_1.GraphQLObjectType({
  name: 'UserType',
  fields: {
    message: {
      type: graphql_1.GraphQLString
    }
  }
});
},{}],"app/server/user/user-queries.controller.ts":[function(require,module,exports) {
"use strict";

var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var __metadata = this && this.__metadata || function (k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : new P(function (resolve) {
        resolve(result.value);
      }).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _a;

const core_1 = require("@rxdi/core");

const core_2 = require("@gapi/core");

const graphql_1 = require("graphql");

const user_type_1 = require("./types/user.type");

let UserQueriesController = class UserQueriesController {
  constructor(pubsub) {
    this.pubsub = pubsub;
  }

  findUser(root, {
    message
  }) {
    return __awaiter(this, void 0, void 0, function* () {
      return {
        message
      };
    });
  }

  subscribeToUserMessagesBasic({
    message
  }) {
    return {
      message
    };
  }

};

__decorate([core_2.Type(user_type_1.UserType), core_2.Query({
  message: {
    type: graphql_1.GraphQLString
  }
}), __metadata("design:type", Function), __metadata("design:paramtypes", [Object, Object]), __metadata("design:returntype", Promise)], UserQueriesController.prototype, "findUser", null);

__decorate([core_2.Type(user_type_1.UserType), core_2.Subscribe(self => self.pubsub.asyncIterator('CREATE_SIGNAL_BASIC')), core_2.Subscription(), __metadata("design:type", Function), __metadata("design:paramtypes", [Object]), __metadata("design:returntype", void 0)], UserQueriesController.prototype, "subscribeToUserMessagesBasic", null);

UserQueriesController = __decorate([core_1.Controller(), __metadata("design:paramtypes", [typeof (_a = typeof core_2.PubSubService !== "undefined" && core_2.PubSubService) === "function" ? _a : Object])], UserQueriesController);
exports.UserQueriesController = UserQueriesController;
},{"./types/user.type":"app/server/user/types/user.type.ts"}],"app/server/build/types/built-status.type.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

const graphql_1 = require("graphql");

exports.BuildStatus = new graphql_1.GraphQLObjectType({
  name: 'BuildStatus',
  fields: {
    status: {
      type: graphql_1.GraphQLString
    },
    message: {
      type: graphql_1.GraphQLString
    }
  }
});
exports.BuildStatusType = new graphql_1.GraphQLObjectType({
  name: 'BuildStatusType',
  fields: {
    file: {
      type: exports.BuildStatus
    },
    typings: {
      type: exports.BuildStatus
    },
    module: {
      type: exports.BuildStatus
    }
  }
});
},{}],"app/server/history/types/history.type.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

const graphql_1 = require("graphql");

const built_status_type_1 = require("../../build/types/built-status.type");

exports.HistoryType = new graphql_1.GraphQLObjectType({
  name: 'HistoryType',
  fields: {
    _id: {
      type: graphql_1.GraphQLString
    },
    name: {
      type: graphql_1.GraphQLString
    },
    typings: {
      type: graphql_1.GraphQLString
    },
    module: {
      type: graphql_1.GraphQLString
    },
    metadata: {
      type: graphql_1.GraphQLString
    },
    message: {
      type: graphql_1.GraphQLString
    },
    hash: {
      type: graphql_1.GraphQLString
    },
    status: {
      type: built_status_type_1.BuildStatusType
    },
    namespaceId: {
      type: graphql_1.GraphQLString
    },
    createdAt: {
      type: graphql_1.GraphQLString
    },
    updatedAt: {
      type: graphql_1.GraphQLString
    }
  }
});
},{"../../build/types/built-status.type":"app/server/build/types/built-status.type.ts"}],"app/server/history/history-subscription.controller.ts":[function(require,module,exports) {
"use strict";

var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var __metadata = this && this.__metadata || function (k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _a;

const core_1 = require("@gapi/core");

const history_type_1 = require("./types/history.type");

let HistorySubscriptionController = class HistorySubscriptionController {
  constructor(pubsub) {
    this.pubsub = pubsub;
  }

  listenForNewBuilds(payload) {
    return {
      payload
    };
  }

};

__decorate([core_1.Type(history_type_1.HistoryType), core_1.Subscribe(self => self.pubsub.asyncIterator('LISTEN_FOR_BUILDS')), core_1.Subscription(), __metadata("design:type", Function), __metadata("design:paramtypes", [Object]), __metadata("design:returntype", void 0)], HistorySubscriptionController.prototype, "listenForNewBuilds", null);

HistorySubscriptionController = __decorate([core_1.Controller(), __metadata("design:paramtypes", [typeof (_a = typeof core_1.PubSubService !== "undefined" && core_1.PubSubService) === "function" ? _a : Object])], HistorySubscriptionController);
exports.HistorySubscriptionController = HistorySubscriptionController;
},{"./types/history.type":"app/server/history/types/history.type.ts"}],"app/server/history/history.module.ts":[function(require,module,exports) {
"use strict";

var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

const core_1 = require("@rxdi/core");

const history_subscription_controller_1 = require("./history-subscription.controller");

let HistoryModule = class HistoryModule {};
HistoryModule = __decorate([core_1.Module({
  controllers: [history_subscription_controller_1.HistorySubscriptionController]
})], HistoryModule);
exports.HistoryModule = HistoryModule;
},{"./history-subscription.controller":"app/server/history/history-subscription.controller.ts"}],"app/server/services/compile.service.ts":[function(require,module,exports) {
"use strict";

var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var __metadata = this && this.__metadata || function (k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _a;

const core_1 = require("@rxdi/core");

const compile_plugin_1 = require("../../plugins/compile/compile.plugin");

let CompileService = class CompileService {
  constructor(compilePlugin) {
    this.compilePlugin = compilePlugin;
  }

  buildFile(folder = './packages/', file = 'index.ts', message = 'bla bla', namespace = '@pesho', buildFolder) {
    return this.compilePlugin.completeBuildAndAddToIpfs(folder, file, message, namespace, 'reactive.json', buildFolder);
  }

};
CompileService = __decorate([core_1.Service(), __metadata("design:paramtypes", [typeof (_a = typeof compile_plugin_1.CompilePlugin !== "undefined" && compile_plugin_1.CompilePlugin) === "function" ? _a : Object])], CompileService);
exports.CompileService = CompileService;
},{"../../plugins/compile/compile.plugin":"app/plugins/compile/compile.plugin.ts"}],"app/server/namespace/types/namespace.type.ts":[function(require,module,exports) {
"use strict";

var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : new P(function (resolve) {
        resolve(result.value);
      }).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

const graphql_1 = require("graphql");

const history_type_1 = require("../../history/types/history.type");

const core_1 = require("@rxdi/core");

const services_1 = require("../../../services");

exports.NamespaceType = new graphql_1.GraphQLObjectType({
  name: 'Namespacetype',
  fields: {
    _id: {
      type: graphql_1.GraphQLString
    },
    name: {
      type: graphql_1.GraphQLString
    },
    builds: {
      type: new graphql_1.GraphQLList(history_type_1.HistoryType),
      resolve: root => __awaiter(this, void 0, void 0, function* () {
        const buildHistoryService = core_1.Container.get(services_1.BuildHistoryService);
        return yield buildHistoryService.findAll(0, 100, null, {
          namespaceId: root._id
        });
      })
    }
  }
});
},{"../../history/types/history.type":"app/server/history/types/history.type.ts","../../../services":"app/services/index.ts"}],"app/server/namespace/types/namespace-list.type.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

const graphql_1 = require("graphql");

const namespace_type_1 = require("./namespace.type");

exports.NamespaceListType = new graphql_1.GraphQLObjectType({
  name: 'NamespaceListType',
  fields: {
    count: {
      type: graphql_1.GraphQLInt
    },
    rows: {
      type: new graphql_1.GraphQLList(namespace_type_1.NamespaceType)
    }
  }
});
},{"./namespace.type":"app/server/namespace/types/namespace.type.ts"}],"app/server/namespace/namespace.controller.ts":[function(require,module,exports) {
"use strict";

var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var __metadata = this && this.__metadata || function (k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : new P(function (resolve) {
        resolve(result.value);
      }).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _a, _b;

const core_1 = require("@gapi/core");

const namespace_type_1 = require("./types/namespace.type");

const namespace_service_1 = require("./services/namespace.service");

const namespace_list_type_1 = require("./types/namespace-list.type");

let NamespaceController = class NamespaceController {
  constructor(namespaceService) {
    this.namespaceService = namespaceService;
  }

  getNamespace(root, {
    id
  }) {
    return this.namespaceService.getNamespaceById(id);
  }

  insertNamespace(root, {
    name
  }) {
    return __awaiter(this, void 0, void 0, function* () {
      const namespace = yield this.namespaceService.searchForDuplicates(name);

      if (namespace) {
        throw new Error('Namespace already exists!');
      }

      return yield this.namespaceService.insert({
        name
      });
    });
  }

  listNamespaces(root, {
    skip,
    limit
  }) {
    return __awaiter(this, void 0, void 0, function* () {
      const namespaces = yield this.namespaceService.listNamespaces(skip, limit);
      return {
        count: namespaces.length,
        rows: namespaces
      };
    });
  }

};

__decorate([core_1.Type(namespace_type_1.NamespaceType), core_1.Query({
  id: {
    type: core_1.GraphQLString
  }
}), __metadata("design:type", Function), __metadata("design:paramtypes", [Object, Object]), __metadata("design:returntype", void 0)], NamespaceController.prototype, "getNamespace", null);

__decorate([core_1.Type(namespace_type_1.NamespaceType), core_1.Mutation({
  name: {
    type: core_1.GraphQLString
  }
}), __metadata("design:type", Function), __metadata("design:paramtypes", [Object, Object]), __metadata("design:returntype", Promise)], NamespaceController.prototype, "insertNamespace", null);

__decorate([core_1.Type(namespace_list_type_1.NamespaceListType), core_1.Query({
  skip: {
    type: core_1.GraphQLInt
  },
  limit: {
    type: core_1.GraphQLInt
  }
}), __metadata("design:type", Function), __metadata("design:paramtypes", [Object, Object]), __metadata("design:returntype", typeof (_a = typeof Promise !== "undefined" && Promise) === "function" ? _a : Object)], NamespaceController.prototype, "listNamespaces", null);

NamespaceController = __decorate([core_1.Controller(), __metadata("design:paramtypes", [typeof (_b = typeof namespace_service_1.NamespaceService !== "undefined" && namespace_service_1.NamespaceService) === "function" ? _b : Object])], NamespaceController);
exports.NamespaceController = NamespaceController;
},{"./types/namespace.type":"app/server/namespace/types/namespace.type.ts","./services/namespace.service":"app/server/namespace/services/namespace.service.ts","./types/namespace-list.type":"app/server/namespace/types/namespace-list.type.ts"}],"app/server/namespace/namespace.module.ts":[function(require,module,exports) {
"use strict";

var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

const core_1 = require("@rxdi/core");

const namespace_controller_1 = require("./namespace.controller");

const namespace_service_1 = require("./services/namespace.service");

let NamespaceModule = class NamespaceModule {};
NamespaceModule = __decorate([core_1.Module({
  controllers: [namespace_controller_1.NamespaceController],
  services: [namespace_service_1.NamespaceService]
})], NamespaceModule);
exports.NamespaceModule = NamespaceModule;
},{"./namespace.controller":"app/server/namespace/namespace.controller.ts","./services/namespace.service":"app/server/namespace/services/namespace.service.ts"}],"app/server/build/types/build.type.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

const graphql_1 = require("graphql");

exports.BuildType = new graphql_1.GraphQLObjectType({
  name: 'BuildType',
  fields: {
    status: {
      type: graphql_1.GraphQLString
    }
  }
});
},{}],"app/server/history/types/history-list.type.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

const graphql_1 = require("graphql");

const history_type_1 = require("./history.type");

exports.HistoryListType = new graphql_1.GraphQLObjectType({
  name: 'HistoryListType',
  fields: {
    count: {
      type: graphql_1.GraphQLInt
    },
    rows: {
      type: new graphql_1.GraphQLList(history_type_1.HistoryType)
    }
  }
});
},{"./history.type":"app/server/history/types/history.type.ts"}],"app/server/build/types/process.type.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

const core_1 = require("@gapi/core");

exports.ProcessStdOutType = new core_1.GraphQLObjectType({
  name: 'ProcessStdOutType',
  fields: {
    stdout: {
      type: core_1.GraphQLString
    }
  }
});
},{}],"app/server/build/build.controller.ts":[function(require,module,exports) {
"use strict";

var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var __metadata = this && this.__metadata || function (k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : new P(function (resolve) {
        resolve(result.value);
      }).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _a, _b, _c, _d, _e, _f, _g;

const core_1 = require("@gapi/core");

const build_type_1 = require("./types/build.type");

const compile_service_1 = require("../services/compile.service");

const services_1 = require("../../services");

const history_list_type_1 = require("../history/types/history-list.type");

const built_status_type_1 = require("./types/built-status.type");

const process_type_1 = require("./types/process.type");

const fs_1 = require("fs");

const util_1 = require("util");

let BuildController = class BuildController {
  constructor(compileService, buildHistoryService, pubsub, fileService, tsGenerator, loggerService) {
    this.compileService = compileService;
    this.buildHistoryService = buildHistoryService;
    this.pubsub = pubsub;
    this.fileService = fileService;
    this.tsGenerator = tsGenerator;
    this.loggerService = loggerService;
  }

  triggerBuild(root, {
    folder,
    file,
    message,
    namespace,
    buildFolder
  }) {
    return __awaiter(this, void 0, void 0, function* () {
      return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        yield this.fileService.writeFile(folder + '/tsconfig.json', this.tsGenerator.getTsConfig(file.replace('.ts', '')));
        const log_file = fs_1.createWriteStream(`${folder}/${file}.log`, {
          flags: 'w'
        });
        const subscription = this.loggerService.stdout.subscribe(log => {
          log_file.write(util_1.format(log) + '\n');
          this.pubsub.publish('CREATE_SIGNAL_BASIC', {
            message: util_1.format(log)
          });
        });
        let sub;

        const cancelSubscription = () => {
          subscription.unsubscribe();
          log_file.close();
          sub.unsubscribe();
        };

        sub = this.compileService.buildFile(folder, file, message, namespace, buildFolder).subscribe(() => {
          resolve({
            status: 'Finish'
          });
          cancelSubscription();
        }, e => {
          cancelSubscription();
          reject(e || 'Build failed');
        });
      }));
    });
  }

  getBuildHistory(root, {
    skip,
    limit,
    where
  }) {
    return __awaiter(this, void 0, void 0, function* () {
      const items = yield this.buildHistoryService.findAll(skip, limit, null, where);
      return {
        count: items.length,
        rows: items
      };
    });
  }

  buildStatus(payload) {
    return {
      payload
    };
  }

  processStdOut(payload) {
    return {
      payload
    };
  }

};

__decorate([core_1.Type(build_type_1.BuildType), core_1.Mutation({
  folder: {
    type: new core_1.GraphQLNonNull(core_1.GraphQLString)
  },
  file: {
    type: new core_1.GraphQLNonNull(core_1.GraphQLString)
  },
  message: {
    type: new core_1.GraphQLNonNull(core_1.GraphQLString)
  },
  namespace: {
    type: new core_1.GraphQLNonNull(core_1.GraphQLString)
  },
  buildFolder: {
    type: core_1.GraphQLString
  }
}), __metadata("design:type", Function), __metadata("design:paramtypes", [Object, Object]), __metadata("design:returntype", Promise)], BuildController.prototype, "triggerBuild", null);

__decorate([core_1.Type(history_list_type_1.HistoryListType), core_1.Query({
  skip: {
    type: core_1.GraphQLInt
  },
  limit: {
    type: core_1.GraphQLInt
  },
  where: {
    type: new core_1.GraphQLInputObjectType({
      name: 'BuildWhereType',
      fields: {
        namespaceId: {
          type: core_1.GraphQLString
        },
        name: {
          type: core_1.GraphQLString
        }
      }
    })
  }
}), __metadata("design:type", Function), __metadata("design:paramtypes", [Object, Object]), __metadata("design:returntype", typeof (_a = typeof Promise !== "undefined" && Promise) === "function" ? _a : Object)], BuildController.prototype, "getBuildHistory", null);

__decorate([core_1.Type(built_status_type_1.BuildStatusType), core_1.Subscribe(self => self.pubsub.asyncIterator('LISTEN_FOR_BUILDS')), core_1.Subscription(), __metadata("design:type", Function), __metadata("design:paramtypes", [Object]), __metadata("design:returntype", void 0)], BuildController.prototype, "buildStatus", null);

__decorate([core_1.Type(process_type_1.ProcessStdOutType), core_1.Subscribe(self => self.pubsub.asyncIterator('PROCESS_STDOUT')), core_1.Subscription(), __metadata("design:type", Function), __metadata("design:paramtypes", [Object]), __metadata("design:returntype", void 0)], BuildController.prototype, "processStdOut", null);

BuildController = __decorate([core_1.Controller(), __metadata("design:paramtypes", [typeof (_b = typeof compile_service_1.CompileService !== "undefined" && compile_service_1.CompileService) === "function" ? _b : Object, typeof (_c = typeof services_1.BuildHistoryService !== "undefined" && services_1.BuildHistoryService) === "function" ? _c : Object, typeof (_d = typeof core_1.PubSubService !== "undefined" && core_1.PubSubService) === "function" ? _d : Object, typeof (_e = typeof services_1.FileService !== "undefined" && services_1.FileService) === "function" ? _e : Object, typeof (_f = typeof services_1.TsConfigGenratorService !== "undefined" && services_1.TsConfigGenratorService) === "function" ? _f : Object, typeof (_g = typeof services_1.LoggerService !== "undefined" && services_1.LoggerService) === "function" ? _g : Object])], BuildController);
exports.BuildController = BuildController;
},{"./types/build.type":"app/server/build/types/build.type.ts","../services/compile.service":"app/server/services/compile.service.ts","../../services":"app/services/index.ts","../history/types/history-list.type":"app/server/history/types/history-list.type.ts","./types/built-status.type":"app/server/build/types/built-status.type.ts","./types/process.type":"app/server/build/types/process.type.ts"}],"app/server/build/build.module.ts":[function(require,module,exports) {
"use strict";

var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

const core_1 = require("@rxdi/core");

const build_controller_1 = require("./build.controller");

let BuildModule = class BuildModule {};
BuildModule = __decorate([core_1.Module({
  controllers: [build_controller_1.BuildController]
})], BuildModule);
exports.BuildModule = BuildModule;
},{"./build.controller":"app/server/build/build.controller.ts"}],"app/server/file/types/file.arguments.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

const graphql_1 = require("graphql");

exports.FileArguments = {
  size: {
    type: graphql_1.GraphQLString
  },
  birthtime: {
    type: graphql_1.GraphQLString
  },
  ctime: {
    type: graphql_1.GraphQLString
  },
  mtime: {
    type: graphql_1.GraphQLString
  },
  atime: {
    type: graphql_1.GraphQLString
  },
  birthtimeMs: {
    type: graphql_1.GraphQLString
  },
  ctimeMs: {
    type: graphql_1.GraphQLString
  },
  mtimeMs: {
    type: graphql_1.GraphQLString
  },
  atimeMs: {
    type: graphql_1.GraphQLString
  },
  blocks: {
    type: graphql_1.GraphQLInt
  },
  ino: {
    type: graphql_1.GraphQLInt
  },
  blksize: {
    type: graphql_1.GraphQLInt
  },
  rdev: {
    type: graphql_1.GraphQLInt
  },
  gid: {
    type: graphql_1.GraphQLInt
  },
  uid: {
    type: graphql_1.GraphQLInt
  },
  nlink: {
    type: graphql_1.GraphQLInt
  },
  mode: {
    type: graphql_1.GraphQLInt
  },
  dev: {
    type: graphql_1.GraphQLInt
  }
};
},{}],"app/server/file/types/file-status.type.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

const core_1 = require("@gapi/core");

const file_arguments_1 = require("./file.arguments");

exports.FileStatusType = new core_1.GraphQLObjectType({
  name: 'FileStatusType',
  fields: file_arguments_1.FileArguments
});
},{"./file.arguments":"app/server/file/types/file.arguments.ts"}],"app/server/file/types/folder-structure.type.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

const graphql_1 = require("graphql");

const file_status_type_1 = require("./file-status.type");

exports.FolderStructureType = new graphql_1.GraphQLObjectType({
  name: 'FolderStructureType',
  fields: {
    path: {
      type: graphql_1.GraphQLString
    },
    directory: {
      type: graphql_1.GraphQLBoolean
    },
    file: {
      type: graphql_1.GraphQLBoolean
    },
    name: {
      type: graphql_1.GraphQLString
    },
    status: {
      type: file_status_type_1.FileStatusType
    }
  }
});
},{"./file-status.type":"app/server/file/types/file-status.type.ts"}],"app/server/file/types/file.type.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

const graphql_1 = require("graphql");

const folder_structure_type_1 = require("./folder-structure.type");

exports.FileType = new graphql_1.GraphQLObjectType({
  name: 'FileType',
  fields: {
    paths: {
      type: new graphql_1.GraphQLList(folder_structure_type_1.FolderStructureType)
    }
  }
});
},{"./folder-structure.type":"app/server/file/types/folder-structure.type.ts"}],"app/server/file/types/file-raw.type.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

const graphql_1 = require("graphql");

exports.FileRawType = new graphql_1.GraphQLObjectType({
  name: 'FileRawType',
  fields: {
    package: {
      type: graphql_1.GraphQLString
    },
    file: {
      type: graphql_1.GraphQLString
    }
  }
});
},{}],"app/server/file/file.controller.ts":[function(require,module,exports) {
"use strict";

var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var __metadata = this && this.__metadata || function (k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : new P(function (resolve) {
        resolve(result.value);
      }).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _a, _b;

const core_1 = require("@rxdi/core");

const core_2 = require("@gapi/core");

const file_type_1 = require("./types/file.type");

const file_service_1 = require("./services/file.service");

const file_service_2 = require("../../services/file/file.service");

const file_raw_type_1 = require("./types/file-raw.type");

const services_1 = require("../../services");

let FileController = class FileController {
  constructor(fileServiceInternal, fileService) {
    this.fileServiceInternal = fileServiceInternal;
    this.fileService = fileService;
  }

  listFiles(root, {
    folder
  }) {
    return __awaiter(this, void 0, void 0, function* () {
      let filePath;

      if (services_1.includes('--enable-full-folder-access')) {
        filePath = folder;
      } else {
        folder = folder.replace('.', '');
        filePath = process.cwd() + folder;
      }

      return {
        paths: yield this.fileServiceInternal.listFolder(filePath)
      };
    });
  }

  readFile(root, {
    folder
  }) {
    return __awaiter(this, void 0, void 0, function* () {
      let filePath;

      if (services_1.includes('--enable-full-folder-access')) {
        filePath = folder;
      } else {
        folder = folder.replace('.', '');
        filePath = process.cwd() + folder;
      }

      const extension = filePath.split('.').pop();
      const isImage = extension === 'jpg' || extension === 'jpeg' || extension === 'png';
      let file = yield this.fileService.readFile(filePath);
      ;

      if (isImage) {
        file = (yield this.fileService.readFileRaw(filePath)).toString('base64');
        file = `data:image/${extension};base64, ${file}`;
      }

      let reactivePackage = null;

      try {
        reactivePackage = yield this.fileService.readFile(filePath.substring(0, filePath.lastIndexOf('/')) + '/reactive.json');
      } catch (e) {}

      return {
        package: reactivePackage,
        file
      };
    });
  }

  saveFile(root, {
    folder,
    content
  }) {
    return __awaiter(this, void 0, void 0, function* () {
      let filePath;

      if (services_1.includes('--enable-full-folder-access')) {
        filePath = folder;
      } else {
        folder = folder.replace('.', '');
        filePath = process.cwd() + folder;
      }

      yield this.fileService.writeFile(filePath, content);
      return {
        file: yield this.fileService.readFile(filePath)
      };
    });
  }

};

__decorate([core_2.Type(file_type_1.FileType), core_2.Query({
  folder: {
    type: core_2.GraphQLString
  }
}), __metadata("design:type", Function), __metadata("design:paramtypes", [Object, Object]), __metadata("design:returntype", Promise)], FileController.prototype, "listFiles", null);

__decorate([core_2.Type(file_raw_type_1.FileRawType), core_2.Query({
  folder: {
    type: new core_2.GraphQLNonNull(core_2.GraphQLString)
  }
}), __metadata("design:type", Function), __metadata("design:paramtypes", [Object, Object]), __metadata("design:returntype", Promise)], FileController.prototype, "readFile", null);

__decorate([core_2.Type(file_raw_type_1.FileRawType), core_2.Query({
  folder: {
    type: new core_2.GraphQLNonNull(core_2.GraphQLString)
  },
  content: {
    type: new core_2.GraphQLNonNull(core_2.GraphQLString)
  }
}), __metadata("design:type", Function), __metadata("design:paramtypes", [Object, Object]), __metadata("design:returntype", Promise)], FileController.prototype, "saveFile", null);

FileController = __decorate([core_1.Controller(), __metadata("design:paramtypes", [typeof (_a = typeof file_service_1.FileService !== "undefined" && file_service_1.FileService) === "function" ? _a : Object, typeof (_b = typeof file_service_2.FileService !== "undefined" && file_service_2.FileService) === "function" ? _b : Object])], FileController);
exports.FileController = FileController;
},{"./types/file.type":"app/server/file/types/file.type.ts","./services/file.service":"app/server/file/services/file.service.ts","../../services/file/file.service":"app/services/file/file.service.ts","./types/file-raw.type":"app/server/file/types/file-raw.type.ts","../../services":"app/services/index.ts"}],"app/server/file/file.module.ts":[function(require,module,exports) {
"use strict";

var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

const core_1 = require("@rxdi/core");

const file_service_1 = require("./services/file.service");

const file_controller_1 = require("./file.controller");

let FileModule = class FileModule {};
FileModule = __decorate([core_1.Module({
  services: [file_service_1.FileService],
  controllers: [file_controller_1.FileController]
})], FileModule);
exports.FileModule = FileModule;
},{"./services/file.service":"app/server/file/services/file.service.ts","./file.controller":"app/server/file/file.controller.ts"}],"app/server/transactions/types/transaction-enum.type.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

const graphql_1 = require("graphql");

exports.TransactionTypeEnum = new graphql_1.GraphQLEnumType({
  name: 'TransactionsTypeEnum',
  values: {
    DEPLOYED: {
      value: 'DEPLOYED'
    },
    COMMITED: {
      value: 'COMMITED'
    },
    UNKNOWN: {
      value: 'UNKNOWN'
    },
    BUILD: {
      value: 'BUILD'
    }
  }
});
},{}],"app/server/transactions/types/transaction.type.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

const graphql_1 = require("graphql");

const transaction_enum_type_1 = require("./transaction-enum.type");

exports.TransactionType = new graphql_1.GraphQLObjectType({
  name: 'TransactionType',
  fields: {
    _id: {
      type: graphql_1.GraphQLString
    },
    status: {
      type: transaction_enum_type_1.TransactionTypeEnum
    },
    birthtime: {
      type: graphql_1.GraphQLString
    },
    path: {
      type: graphql_1.GraphQLString
    },
    repoFolder: {
      type: graphql_1.GraphQLString
    }
  }
});
},{"./transaction-enum.type":"app/server/transactions/types/transaction-enum.type.ts"}],"app/server/transactions/services/transaction/transaction.service.ts":[function(require,module,exports) {
"use strict";

var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var __metadata = this && this.__metadata || function (k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : new P(function (resolve) {
        resolve(result.value);
      }).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _a;

const core_1 = require("@rxdi/core");

const env_injection_tokens_1 = require("../../../../../env.injection.tokens");

let TransactionService = class TransactionService {
  getTransactionById(_id) {
    return new Promise((resolve, reject) => {
      this.transaction.findOne({
        _id
      }, (e, d) => {
        if (e) {
          reject(e);
        }

        console.log(d);
        resolve(d);
      });
    });
  }

  getTransactionByPath(path, repoFolder) {
    return new Promise((resolve, reject) => {
      this.transaction.findOne({
        path,
        repoFolder
      }, (e, d) => {
        if (e) {
          reject(e);
        }

        resolve(d);
      });
    });
  }

  insert(doc) {
    return __awaiter(this, void 0, void 0, function* () {
      const isExist = yield this.getTransactionByPath(doc.path, doc.repoFolder);

      if (isExist) {
        throw new Error(`File is already added to transaction ${isExist._id}: ${isExist.path}`);
      }

      return yield new Promise((resolve, reject) => {
        this.transaction.insert(doc, (e, d) => {
          if (e) {
            reject(e);
          }

          resolve(d);
        });
      });
    });
  }

  remove(doc) {
    return __awaiter(this, void 0, void 0, function* () {
      const transaction = yield this.getTransactionByPath(doc.path, doc.repoFolder);

      if (!transaction) {
        throw new Error(`Transaction doesn't exist ${doc.path}`);
      }

      return yield new Promise((resolve, reject) => {
        this.transaction.remove(transaction, (e, d) => {
          if (e) {
            reject(e);
          }

          resolve(d);
        });
      });
    });
  }

  listTransactions(status, repoFolder, skip = 0, limit = 100, sort = {
    createdAt: -1
  }) {
    const find = {};

    if (status !== 'UNKNOWN') {
      find.status = status;
    }

    find.repoFolder = repoFolder;
    console.log(find);
    return new Promise((resolve, reject) => {
      this.transaction.find(find).sort(sort).skip(skip).limit(limit).exec((e, d) => {
        if (e) {
          reject(e);
        }

        resolve(d);
      });
    });
  }

};

__decorate([core_1.Inject(env_injection_tokens_1.__TRANSACTIONS_DATABASE), __metadata("design:type", typeof (_a = typeof env_injection_tokens_1.__TRANSACTIONS_DATABASE !== "undefined" && env_injection_tokens_1.__TRANSACTIONS_DATABASE) === "function" ? _a : Object)], TransactionService.prototype, "transaction", void 0);

TransactionService = __decorate([core_1.Injectable()], TransactionService);
exports.TransactionService = TransactionService;
},{"../../../../../env.injection.tokens":"env.injection.tokens.ts"}],"app/core/api-introspection/index.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
},{}],"app/server/transactions/transactions.controller.ts":[function(require,module,exports) {
"use strict";

var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var __metadata = this && this.__metadata || function (k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _a, _b, _c;

const core_1 = require("@gapi/core");

const transaction_type_1 = require("./types/transaction.type");

const transaction_service_1 = require("./services/transaction/transaction.service");

const transaction_enum_type_1 = require("./types/transaction-enum.type");

const api_introspection_1 = require("../../core/api-introspection");

let TransactionsController = class TransactionsController {
  constructor(transactionSevice) {
    this.transactionSevice = transactionSevice;
  }

  addTransaction(root, payload) {
    return this.transactionSevice.insert(Object.assign({}, payload, {
      status: 'UNKNOWN'
    }));
  }

  checkoutTransaction(root, payload) {
    return this.transactionSevice.remove(payload);
  }

  listTransactions(root, {
    status,
    repoFolder
  }) {
    return this.transactionSevice.listTransactions(status, repoFolder);
  }

};

__decorate([core_1.Mutation({
  path: {
    type: new core_1.GraphQLNonNull(core_1.GraphQLString)
  },
  birthtime: {
    type: new core_1.GraphQLNonNull(core_1.GraphQLString)
  },
  repoFolder: {
    type: new core_1.GraphQLNonNull(core_1.GraphQLString)
  }
}), __metadata("design:type", Function), __metadata("design:paramtypes", [Object, typeof (_a = typeof api_introspection_1.ITransactionType !== "undefined" && api_introspection_1.ITransactionType) === "function" ? _a : Object]), __metadata("design:returntype", void 0)], TransactionsController.prototype, "addTransaction", null);

__decorate([core_1.Mutation({
  path: {
    type: new core_1.GraphQLNonNull(core_1.GraphQLString)
  },
  repoFolder: {
    type: new core_1.GraphQLNonNull(core_1.GraphQLString)
  }
}), __metadata("design:type", Function), __metadata("design:paramtypes", [Object, typeof (_b = typeof api_introspection_1.ITransactionType !== "undefined" && api_introspection_1.ITransactionType) === "function" ? _b : Object]), __metadata("design:returntype", void 0)], TransactionsController.prototype, "checkoutTransaction", null);

__decorate([core_1.Type(new core_1.GraphQLList(transaction_type_1.TransactionType)), core_1.Query({
  status: {
    type: transaction_enum_type_1.TransactionTypeEnum
  },
  repoFolder: {
    type: new core_1.GraphQLNonNull(core_1.GraphQLString)
  }
}), __metadata("design:type", Function), __metadata("design:paramtypes", [Object, Object]), __metadata("design:returntype", void 0)], TransactionsController.prototype, "listTransactions", null);

TransactionsController = __decorate([core_1.Controller({
  guards: [],
  type: transaction_type_1.TransactionType
}), __metadata("design:paramtypes", [typeof (_c = typeof transaction_service_1.TransactionService !== "undefined" && transaction_service_1.TransactionService) === "function" ? _c : Object])], TransactionsController);
exports.TransactionsController = TransactionsController;
},{"./types/transaction.type":"app/server/transactions/types/transaction.type.ts","./services/transaction/transaction.service":"app/server/transactions/services/transaction/transaction.service.ts","./types/transaction-enum.type":"app/server/transactions/types/transaction-enum.type.ts","../../core/api-introspection":"app/core/api-introspection/index.ts"}],"app/server/transactions/transactions.module.ts":[function(require,module,exports) {
"use strict";

var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

const core_1 = require("@gapi/core");

const transactions_controller_1 = require("./transactions.controller");

const transaction_service_1 = require("./services/transaction/transaction.service");

let TransactionsModule = class TransactionsModule {};
TransactionsModule = __decorate([core_1.Module({
  controllers: [transactions_controller_1.TransactionsController],
  providers: [transaction_service_1.TransactionService]
})], TransactionsModule);
exports.TransactionsModule = TransactionsModule;
},{"./transactions.controller":"app/server/transactions/transactions.controller.ts","./services/transaction/transaction.service":"app/server/transactions/services/transaction/transaction.service.ts"}],"app/server/server.module.ts":[function(require,module,exports) {
"use strict";

var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

const core_1 = require("@rxdi/core");

const webui_service_1 = require("./services/webui.service");

const server_push_service_1 = require("./services/server-push.service");

const user_queries_controller_1 = require("./user/user-queries.controller");

const history_module_1 = require("./history/history.module");

const compile_service_1 = require("./services/compile.service");

const namespace_module_1 = require("./namespace/namespace.module");

const build_module_1 = require("./build/build.module");

const file_module_1 = require("./file/file.module");

const transactions_module_1 = require("./transactions/transactions.module");

let ServerModule = class ServerModule {};
ServerModule = __decorate([core_1.Module({
  imports: [history_module_1.HistoryModule, namespace_module_1.NamespaceModule, build_module_1.BuildModule, file_module_1.FileModule, transactions_module_1.TransactionsModule],
  services: [webui_service_1.WebUiService, server_push_service_1.ServerPushService, compile_service_1.CompileService],
  controllers: [user_queries_controller_1.UserQueriesController]
})], ServerModule);
exports.ServerModule = ServerModule;
},{"./services/webui.service":"app/server/services/webui.service.ts","./services/server-push.service":"app/server/services/server-push.service.ts","./user/user-queries.controller":"app/server/user/user-queries.controller.ts","./history/history.module":"app/server/history/history.module.ts","./services/compile.service":"app/server/services/compile.service.ts","./namespace/namespace.module":"app/server/namespace/namespace.module.ts","./build/build.module":"app/server/build/build.module.ts","./file/file.module":"app/server/file/file.module.ts","./transactions/transactions.module":"app/server/transactions/transactions.module.ts"}],"app/app.module.ts":[function(require,module,exports) {
"use strict";

var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

const core_1 = require("@rxdi/core");

const ipfs_1 = require("@gapi/ipfs");

const ipfs_daemon_1 = require("@gapi/ipfs-daemon");

const ipfs_file_service_1 = require("./services/ipfs-file/ipfs-file.service");

const file_service_1 = require("./services/file/file.service");

const parcel_bundler_service_1 = require("./services/parcel-bundler/parcel-bundler.service");

const file_user_service_1 = require("./services/file/file-user.service");

const dts_generator_service_1 = require("./services/dts-generator/dts-generator.service");

const tsconfig_generator_service_1 = require("./services/tsconfig-generator/tsconfig-generator.service");

const table_service_1 = require("./services/table-service/table-service");

const status_module_1 = require("./status/status.module");

const build_history_service_1 = require("./services/build-history/build-history.service");

const error_reason_service_1 = require("./services/error-reason/error-reason.service");

const compile_plugin_1 = require("./plugins/compile/compile.plugin");

const time_service_1 = require("./services/time/time.service");

const services_1 = require("./services");

const server_module_1 = require("./server/server.module");

const _IMPORTS = [ipfs_daemon_1.IpfsDaemonModule.forRoot({
  type: services_1.nextOrDefault('--default-ipfs-node', 'go'),
  config: {
    Addresses: {
      API: process.env.IPFS_API_PORT ? process.env.IPFS_API_PORT : services_1.nextOrDefault('--ipfs-api-port', '/ip4/0.0.0.0/tcp/5002', a => `/ip4/0.0.0.0/tcp/${a}`),
      Gateway: process.env.IPFS_API_GATEWAY ? process.env.IPFS_API_GATEWAY : services_1.nextOrDefault('--ipfs-api-gateway', '/ip4/0.0.0.0/tcp/8081', a => `/ip4/0.0.0.0/tcp/${a}`),
      Swarm: services_1.nextOrDefault('--ipfs-swarms', ['/ip4/0.0.0.0/tcp/4001', '/ip6/::/tcp/4001'], a => a.split(','))
    }
  }
}), ipfs_1.IpfsModule.forRoot(), status_module_1.StatusModule];
services_1.includes('--webui') ? _IMPORTS.push(server_module_1.ServerModule) : null;
let AppModule = class AppModule {};
AppModule = __decorate([core_1.Module({
  imports: _IMPORTS,
  services: [ipfs_file_service_1.FileIpfsService, file_service_1.FileService, parcel_bundler_service_1.ParcelBundlerService, file_user_service_1.FileUserService, dts_generator_service_1.TypescriptDefinitionGeneratorService, tsconfig_generator_service_1.TsConfigGenratorService, table_service_1.TableService, build_history_service_1.BuildHistoryService, error_reason_service_1.ErrorReasonService, time_service_1.TimeService, services_1.HtmlTemplateBuilder, services_1.PackageJsonService, services_1.PreviousService, services_1.LoggerService],
  plugins: [compile_plugin_1.CompilePlugin]
})], AppModule);
exports.AppModule = AppModule;
},{"./services/ipfs-file/ipfs-file.service":"app/services/ipfs-file/ipfs-file.service.ts","./services/file/file.service":"app/services/file/file.service.ts","./services/parcel-bundler/parcel-bundler.service":"app/services/parcel-bundler/parcel-bundler.service.ts","./services/file/file-user.service":"app/services/file/file-user.service.ts","./services/dts-generator/dts-generator.service":"app/services/dts-generator/dts-generator.service.ts","./services/tsconfig-generator/tsconfig-generator.service":"app/services/tsconfig-generator/tsconfig-generator.service.ts","./services/table-service/table-service":"app/services/table-service/table-service.ts","./status/status.module":"app/status/status.module.ts","./services/build-history/build-history.service":"app/services/build-history/build-history.service.ts","./services/error-reason/error-reason.service":"app/services/error-reason/error-reason.service.ts","./plugins/compile/compile.plugin":"app/plugins/compile/compile.plugin.ts","./services/time/time.service":"app/services/time/time.service.ts","./services":"app/services/index.ts","./server/server.module":"app/server/server.module.ts"}],"gapi-framework-imports.ts":[function(require,module,exports) {
"use strict";

var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
var GapiFrameworkImports_1;

const core_1 = require("@gapi/core");

const helpers_1 = require("./app/services/helpers/helpers");

let GapiFrameworkImports = GapiFrameworkImports_1 = class GapiFrameworkImports {
  static forRoot(init) {
    let imports = [];

    if (init) {
      imports = [core_1.CoreModule.forRoot({
        server: {
          randomPort: !process.env.RANDOM_PORT ? helpers_1.nextOrDefault('--random-port', false, Boolean) : false,
          hapi: {
            port: process.env.API_PORT ? process.env.API_PORT : helpers_1.nextOrDefault('--graphql-api-port', 9300, Number),
            routes: {
              cors: {
                origin: ['*'],
                additionalHeaders: ['Host', 'User-Agent', 'Accept', 'Accept-Language', 'Accept-Encoding', 'Access-Control-Request-Method', 'Access-Control-Allow-Origin', 'Access-Control-Request-Headers', 'Origin', 'Connection', 'Pragma', 'Cache-Control']
              }
            }
          }
        },
        graphql: {
          path: helpers_1.nextOrDefault('--graphql-endpoint', '/graphql'),
          openBrowser: helpers_1.includes('--open-browser-graphiql'),
          watcherPort: helpers_1.nextOrDefault('--open-browser-graphiql', 8967),
          writeEffects: helpers_1.includes('--write-effects'),
          graphiql: helpers_1.includes('--graphiql'),
          graphiQlPlayground: helpers_1.includes('--graphiql-playground'),
          graphiQlPath: helpers_1.nextOrDefault('--graphiql-endpoint', '/graphiql'),
          graphiqlOptions: {
            endpointURL: helpers_1.nextOrDefault('--graphql-endpoint', '/graphql'),
            passHeader: `'Authorization':'${helpers_1.nextOrDefault('--graphiql-auth-token', '')}'`,
            subscriptionsEndpoint: helpers_1.nextOrDefault('--graphiql-subscription-endpoint', 'ws://localhost:9300/subscriptions'),
            websocketConnectionParams: {
              token: helpers_1.nextOrDefault('--graphiql-auth-token', '')
            }
          },
          graphqlOptions: {
            schema: null
          }
        }
      })];
    }

    return {
      module: GapiFrameworkImports_1,
      frameworkImports: imports
    };
  }

};
GapiFrameworkImports = GapiFrameworkImports_1 = __decorate([core_1.Module()], GapiFrameworkImports);
exports.GapiFrameworkImports = GapiFrameworkImports;
},{"./app/services/helpers/helpers":"app/services/helpers/helpers.ts"}],"app/server/index.ts":[function(require,module,exports) {
"use strict";

function __export(m) {
  for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}

Object.defineProperty(exports, "__esModule", {
  value: true
});

__export(require("./server.module"));
},{"./server.module":"app/server/server.module.ts"}],"app/index.ts":[function(require,module,exports) {
"use strict";

function __export(m) {
  for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}

Object.defineProperty(exports, "__esModule", {
  value: true
});

__export(require("./app.module"));

__export(require("./services/index"));

__export(require("./server/index"));
},{"./app.module":"app/app.module.ts","./services/index":"app/services/index.ts","./server/index":"app/server/index.ts"}],"main.ts":[function(require,module,exports) {
"use strict";

function __export(m) {
  for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}

Object.defineProperty(exports, "__esModule", {
  value: true
});
process.argv.push('--webui');
process.argv.push('--verbose');
process.argv.push('--write-effects');
process.argv.push('--graphiql-playground');
process.argv.push('--server-push-interval');
process.argv.push('--graphiql');

const check_arguments_1 = require("./check-arguments");

const core_1 = require("@rxdi/core");

const commands_description_1 = require("./commands-description");

const helpers_1 = require("./app/services/helpers/helpers");

const logger_service_1 = require("./app/services/logger/logger.service");

const Table = require('terminal-table');

const originalLog = console.log;

console.log = function (...a) {
  core_1.Container.get(logger_service_1.LoggerService).stdout.next(a.toString());
  return originalLog(...a);
};

helpers_1.includes('--silent') ? console.log = () => null : null;

if (helpers_1.includes('--help')) {
  const t = new Table({
    borderStyle: 2,
    horizontalLine: true,
    width: ['20%', '80%'],
    leftPadding: 1
  });
  t.push(['Command', 'Description']);
  t.push([`\Available arguments are:`]);
  Object.keys(commands_description_1.CommandDescription).forEach(c => t.push([c, commands_description_1.CommandDescription[c]]));
  t.attrRange({
    row: [0, 1]
  }, {
    align: 'center',
    color: 'green',
    bg: 'black'
  });
  console.log('' + t);
  process.exit(0);
}

check_arguments_1.checkArguments();

const environment_setter_module_1 = require("./environment-setter.module");

const app_module_1 = require("./app/app.module");

const gapi_framework_imports_1 = require("./gapi-framework-imports");

core_1.Container.get(core_1.ConfigService).setConfig(Object.assign({}, process.argv.toString().includes('-v') || process.argv.toString().includes('--verbose') ? {
  logger: {
    logging: true,
    hashes: false,
    date: true,
    exitHandler: true,
    fileService: true
  }
} : {}, {
  init: false,
  initOptions: {
    services: true,
    plugins: true,
    controllers: true
  }
}));
const _FRAMEWORK_IMPORTS = [environment_setter_module_1.EnvironemntSetterModule, gapi_framework_imports_1.GapiFrameworkImports.forRoot(helpers_1.includes('--webui') || helpers_1.includes('--graphql-server-only'))];
core_1.BootstrapFramework(app_module_1.AppModule, _FRAMEWORK_IMPORTS).subscribe(() => {
  console.log('Started! Use --open-browser argument! Enjoy! :)');
}, error => {
  throw new Error(error);
});

__export(require("./app/index"));

__export(require("./gapi-framework-imports"));

__export(require("./env.injection.tokens"));

__export(require("./commands"));

__export(require("./check-arguments"));

__export(require("./commands-description"));
},{"./check-arguments":"check-arguments.ts","./commands-description":"commands-description.ts","./app/services/helpers/helpers":"app/services/helpers/helpers.ts","./app/services/logger/logger.service":"app/services/logger/logger.service.ts","./environment-setter.module":"environment-setter.module.ts","./app/app.module":"app/app.module.ts","./gapi-framework-imports":"gapi-framework-imports.ts","./app/index":"app/index.ts","./env.injection.tokens":"env.injection.tokens.ts","./commands":"commands.ts"}]},{},["main.ts"], null)
//# sourceMappingURL=/main.js.map