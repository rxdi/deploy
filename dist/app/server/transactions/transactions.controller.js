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
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@gapi/core");
const transaction_type_1 = require("./types/transaction.type");
const transaction_service_1 = require("./services/transaction/transaction.service");
const transaction_enum_type_1 = require("./types/transaction-enum.type");
let TransactionsController = class TransactionsController {
    constructor(transactionSevice) {
        this.transactionSevice = transactionSevice;
    }
    addTransaction(root, payload) {
        return this.transactionSevice.add(Object.assign({}, payload, { status: 'UNKNOWN' }));
    }
    checkoutTransaction(root, payload) {
        return this.transactionSevice.checkout(payload);
    }
    commitTransaction(root, payload) {
        return this.transactionSevice.commit(payload);
    }
    pushTransactionMutation(root, payload) {
        return this.transactionSevice.push(payload);
    }
    listTransactions(root, { status, repoFolder }) {
        return this.transactionSevice.listTransactions(status, repoFolder);
    }
};
__decorate([
    core_1.Mutation({
        path: {
            type: new core_1.GraphQLNonNull(core_1.GraphQLString)
        },
        birthtime: {
            type: new core_1.GraphQLNonNull(core_1.GraphQLString)
        },
        repoFolder: {
            type: new core_1.GraphQLNonNull(core_1.GraphQLString)
        },
        namespace: {
            type: new core_1.GraphQLNonNull(core_1.GraphQLString)
        },
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], TransactionsController.prototype, "addTransaction", null);
__decorate([
    core_1.Mutation({
        path: {
            type: new core_1.GraphQLNonNull(core_1.GraphQLString)
        },
        repoFolder: {
            type: new core_1.GraphQLNonNull(core_1.GraphQLString)
        },
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], TransactionsController.prototype, "checkoutTransaction", null);
__decorate([
    core_1.Mutation({
        message: {
            type: new core_1.GraphQLNonNull(core_1.GraphQLString)
        },
        repoFolder: {
            type: new core_1.GraphQLNonNull(core_1.GraphQLString)
        },
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], TransactionsController.prototype, "commitTransaction", null);
__decorate([
    core_1.Mutation({
        repoFolder: {
            type: new core_1.GraphQLNonNull(core_1.GraphQLString)
        },
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], TransactionsController.prototype, "pushTransactionMutation", null);
__decorate([
    core_1.Type(new core_1.GraphQLList(transaction_type_1.TransactionType)),
    core_1.Query({
        status: {
            type: transaction_enum_type_1.TransactionTypeEnum
        },
        repoFolder: {
            type: new core_1.GraphQLNonNull(core_1.GraphQLString)
        }
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], TransactionsController.prototype, "listTransactions", null);
TransactionsController = __decorate([
    core_1.Controller({
        guards: [],
        type: transaction_type_1.TransactionType
    }),
    __metadata("design:paramtypes", [transaction_service_1.TransactionService])
], TransactionsController);
exports.TransactionsController = TransactionsController;
//# sourceMappingURL=transactions.controller.js.map