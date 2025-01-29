import { writeFileSync } from 'fs';
import { join } from 'path';
import { execSync } from 'child_process';

const version = new Date().toISOString();
const commitHash = execSync('git rev-parse HEAD').toString().trim();
const commitMessage = execSync('git log -1 --pretty=%B').toString().trim();
const versionFilePath = join(process.cwd(), 'src', 'version.json');

const versionInfo = {
  version,
  commitHash,
  commitMessage
};

writeFileSync(versionFilePath, JSON.stringify(versionInfo, null, 2));

console.log(`Version generated: ${version}`);
console.log(`Commit hash: ${commitHash}`);
console.log(`Commit message: ${commitMessage}`);