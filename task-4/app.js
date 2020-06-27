const readDir = require('./tree').readDir;

const path = process.argv[2];
if (path === null) {
  console.error('Missing path argument. Usage:  npm run tree <path>.');
  process.exit();
}

readDir(path)
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.log(error.message);
  });
