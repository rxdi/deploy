import { Commands } from "./commands";
import { CommandDescription } from "./commands-description";


const compareString = (a: string, b: string, percentage: number = 32) => {
    const first = a.split('');
    const second = b.split('');
    const similarity = first.filter((string, index) => string === second[index]).length;
    const similarPercentage = (similarity / first.length) * 100;
    if (similarPercentage > percentage) {
        console.log('Command similarity', similarPercentage + '%');
        return a;
    } else {
        return false;
    }
};
const args = process.argv.slice(2);
const argumentCommands = args.filter(c => c.includes('--'));

export const checkArguments = () => {
    argumentCommands.map(command => {
        const commandExist = Object.keys(CommandDescription).filter(c => c === command).length;
        if (!commandExist && args.length) {
            const predicted = Object.keys(Commands).filter(c => compareString(c.split('--')[1], command.split('--')[1])).toString();
            let message = '';
            if (predicted.length) {
                message = `maybe you mean '${predicted}'`
            }
            console.error(`
            
Unknown option '${command}' ${message}?
More options you can find passing --help argument
            
            `);
            process.exit(0);
        }
    });
}