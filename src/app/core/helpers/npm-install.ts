import { spawn } from 'child_process';
import { dirname, join } from 'path';
import { promisify } from 'util';
import { exists, readdir, readFile } from 'fs';

export const NpmInstall = async (packages: string[] = []) => {
  const args = [];
  if (await promisify(exists)(join(process.cwd(), 'package.json'))) {
    const packageJson: {dependencies: {[key: string]: string}} = JSON.parse((await promisify(readFile)(join(process.cwd(), 'package.json'), {encoding: 'utf-8'})));
    if (packageJson.dependencies) {
      const packages = Object.keys(packageJson.dependencies).map(key => `${key}@${packageJson.dependencies[key]}`);
      args.push(...packages);
    }
  } else {
    args.push(...packages);
  }
  console.log('Packages to be installed: ', args.join(' '));
  return new Promise((resolve, reject) => {
    const child = spawn('npm', ['install', ...args], {cwd: process.cwd().replace('files', '')});
    child.stdout.pipe(process.stdout);
    child.stderr.pipe(process.stderr);
    child.on('close', (code: number) => resolve(code));
  });
};