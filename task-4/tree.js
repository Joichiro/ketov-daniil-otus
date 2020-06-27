const fs = require('fs');
const util = require('util');

const statPromise = util.promisify(fs.stat);
const readDirPromise = util.promisify(fs.readdir);

const readDir = async path => {
  const nodes = await readDirPromise(path);
  let files = [];
  let dirs = [];

  dirs.push(path);
  let statPromises = nodes.map(async node => {
    const stat = await statPromise(path + '/' + node);
    return {
      node: path + '/' + node,
      isFile: stat.isFile()
    };
  });

  const statResults = await Promise.all(statPromises);
  const readPromises = [];

  statResults.forEach(({ node, isFile }) => {
    isFile ? files.push(node) : readPromises.push(readDir(node));
  });

  const readResults = await Promise.all(readPromises);
  readResults.forEach(result => {
    files = files.concat(result.files);
    dirs = dirs.concat(result.dirs);
  });
  return {
    files,
    dirs
  };
};

exports.readDir = readDir;
