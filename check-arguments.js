"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commands_1 = require("./commands");
const commands_description_1 = require("./commands-description");
const compareString = (a, b, percentage = 32) => {
    const first = a.split('');
    const second = b.split('');
    const similarity = first.filter((string, index) => string === second[index]).length;
    const similarPercentage = (similarity / first.length) * 100;
    if (similarPercentage > percentage) {
        console.log('Command similarity', similarPercentage + '%');
        return a;
    }
    else {
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
//# sourceMappingURL=check-arguments.js.map