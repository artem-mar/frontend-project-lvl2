import * as fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import getAbsolutePath from './getAbsolutePath.js';

const parse = (filePath) => {
  let fileContent = null;
  switch (path.extname(filePath)) {
    case '.json':
      fileContent = JSON.parse(fs.readFileSync(getAbsolutePath(filePath), 'utf8'));
      break;

    case '.yaml':
    case '.yml':
      fileContent = yaml.load(fs.readFileSync(getAbsolutePath(filePath), 'utf8'));
      break;

    default:
  }
  return fileContent;
};

export default parse;
