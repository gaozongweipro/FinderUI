import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';

const packagePath = resolve(process.cwd(), 'package.json');
const pkg = JSON.parse(readFileSync(packagePath, 'utf-8'));

// 更新 patch 版本号
const [major, minor, patch] = pkg.version.split('.');
pkg.version = `${major}.${minor}.${parseInt(patch) + 1}`;

writeFileSync(packagePath, JSON.stringify(pkg, null, 2) + '\n');

console.log(`Version updated to ${pkg.version}`); 