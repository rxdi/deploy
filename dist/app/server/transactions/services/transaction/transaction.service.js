"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@rxdi/core");
const env_injection_tokens_1 = require("../../../../../env.injection.tokens");
const compile_service_1 = require("../../../services/compile.service");
const core_2 = require("@gapi/core");
const services_1 = require("../../../..//services");
const file_service_1 = require("../../../file/services/file.service");
const util_1 = require("util");
const fs_1 = require("fs");
let TransactionService = class TransactionService {
    constructor(compileService, pubsub, fileService, appFileService, tsGenerator, loggerService) {
        this.compileService = compileService;
        this.pubsub = pubsub;
        this.fileService = fileService;
        this.appFileService = appFileService;
        this.tsGenerator = tsGenerator;
        this.loggerService = loggerService;
    }
    getTransactionById(_id) {
        return new Promise((resolve, reject) => {
            this.transaction.findOne({ _id }, (e, d) => {
                if (e) {
                    reject(e);
                }
                console.log(d);
                resolve(d);
            });
        });
    }
    getTransactionByPath(path, repoFolder, payload) {
        return new Promise((resolve, reject) => {
            this.transaction.findOne({ path, repoFolder }, (e, d) => {
                if (e) {
                    reject(e);
                }
                resolve(d);
            });
        });
    }
    getTransactionByRepo(repoFolder, payload = {}) {
        return new Promise((resolve, reject) => {
            this.transaction.findOne(Object.assign({ repoFolder }, payload), (e, d) => {
                if (e) {
                    reject(e);
                }
                resolve(d);
            });
        });
    }
    add(doc) {
        return __awaiter(this, void 0, void 0, function* () {
            const isExist = (yield this.getTransactionByPath(doc.path, doc.repoFolder, {
                status: "UNKNOWN"
            }));
            if (isExist) {
                throw new Error(`File is already added to transaction ${isExist._id}: ${isExist.path} and not commited use (rxdi commit "my-message")`);
            }
            return yield new Promise((resolve, reject) => {
                this.transaction.insert(doc, (e, d) => __awaiter(this, void 0, void 0, function* () {
                    if (e) {
                        reject(e);
                    }
                    try {
                        yield this.fileService.copyTransactionFiles(d._id, d.repoFolder, d.path);
                    }
                    catch (e) {
                        return reject(e);
                    }
                    resolve(d);
                }));
            });
        });
    }
    checkout(doc) {
        return __awaiter(this, void 0, void 0, function* () {
            const transaction = (yield this.getTransactionByPath(doc.path, doc.repoFolder));
            if (!transaction) {
                throw new Error(`Transaction doesn't exist ${doc.path}`);
            }
            yield this.fileService
                .removeTransaction(transaction._id, transaction.repoFolder, transaction.path)
                .toPromise();
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
    update(repoFolder, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield new Promise((resolve, reject) => {
                this.transaction.update({ repoFolder }, payload, {}, (e, d) => __awaiter(this, void 0, void 0, function* () {
                    if (e) {
                        reject(e);
                    }
                    resolve(d);
                }));
            });
        });
    }
    commit({ repoFolder, message }) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(repoFolder, message);
            const transaction = (yield this.getTransactionByRepo(repoFolder));
            if (!transaction) {
                throw new Error(`Transaction doesn't exist ${repoFolder}`);
            }
            transaction.message = message;
            transaction.status = "COMMITED";
            const isUpdated = yield this.update(repoFolder, transaction);
            if (!isUpdated) {
                throw new Error("Transaction not commited");
            }
            return transaction;
        });
    }
    deploy(transactionId, repoFolder, fileName, message, namespace) {
        const { filename, transactionFolder, filePath } = this.fileService.prepareCopyData(transactionId, repoFolder, fileName);
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            yield this.appFileService.writeFile(filePath + "/tsconfig.json", this.tsGenerator.getTsConfig(filename.replace(".ts", "")));
            const log_file = fs_1.createWriteStream(`${transactionFolder}/${filename}.log`, { flags: "w" });
            const subscription = this.loggerService.stdout.subscribe(log => {
                log_file.write(util_1.format(log) + "\n");
                this.pubsub.publish("CREATE_SIGNAL_BASIC", { message: util_1.format(log) });
            });
            let sub;
            const cancelSubscription = () => {
                subscription.unsubscribe();
                log_file.close();
                sub.unsubscribe();
            };
            sub = this.compileService
                .pushTransaction(transactionFolder, fileName, message, namespace, "build")
                .subscribe(({ module }) => {
                resolve({
                    message,
                    _id: transactionId,
                    hash: module.hash
                });
                cancelSubscription();
            }, e => {
                cancelSubscription();
                reject(e || "Build failed");
            });
        }));
    }
    push({ repoFolder }) {
        return __awaiter(this, void 0, void 0, function* () {
            const transaction = (yield this.getTransactionByRepo(repoFolder, {
                status: "COMMITED"
            }));
            if (!transaction) {
                throw new Error(`No commited transactions inside ${repoFolder} \n✎ Maybe you forgot to commit? example: (rxdi commit "my-message")`);
            }
            yield this.deploy(transaction._id, transaction.repoFolder, transaction.path, transaction.message, transaction.namespace);
            transaction.status = "DEPLOYED";
            const isUpdated = yield this.update(repoFolder, transaction);
            if (!isUpdated) {
                throw new Error("Transaction not commited");
            }
            return transaction;
        });
    }
    listTransactions(status, repoFolder, skip = 0, limit = 100, sort = { createdAt: -1 }) {
        const find = {};
        if (status !== "UNKNOWN") {
            find.status = status;
        }
        find.repoFolder = repoFolder;
        console.log(find);
        return new Promise((resolve, reject) => {
            this.transaction
                .find(find)
                .sort(sort)
                .skip(skip)
                .limit(limit)
                .exec((e, d) => {
                if (e) {
                    reject(e);
                }
                resolve(d);
            });
        });
    }
};
__decorate([
    core_1.Inject(env_injection_tokens_1.__TRANSACTIONS_DATABASE),
    __metadata("design:type", Object)
], TransactionService.prototype, "transaction", void 0);
TransactionService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [compile_service_1.CompileService,
        core_2.PubSubService,
        file_service_1.FileService,
        services_1.FileService,
        services_1.TsConfigGenratorService,
        services_1.LoggerService])
], TransactionService);
exports.TransactionService = TransactionService;
//# sourceMappingURL=transaction.service.js.map