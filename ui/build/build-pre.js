const path = require('path');
const colors = require('colors/safe');
const fs = require('fs');
const appVersion = require('./version-seed.json').version + 1;

console.log(colors.cyan('\nRunning pre-build tasks'));

const versionFilePath = path.join(__dirname + '/../src/app/app-version.ts');

const src = `export class AppVersion { static readonly VERSION = "${appVersion}"; }\n`;

// ensure version module pulls value from package.json
fs.writeFile(versionFilePath, src, {
  flat: 'w'
}, function (err) {
  if (err) {
    return console.log(colors.red(err));
  }

  console.log(colors.green(`Updating application version ${colors.yellow(appVersion)}`));
  console.log(`${colors.green('Writing version module to ')}${colors.yellow(versionFilePath)}\n`);
});


const seedFilePath = path.join(__dirname + '/version-seed.json');
fs.writeFile(seedFilePath, `{"version": ${appVersion}}`, {
  flat: 'w'
}, function (err) {
  if (err) {
    return console.log(colors.red(err));
  }
  console.log(`${colors.green('Writing version-seed module to ')}${colors.yellow(seedFilePath)}\n`);

});
