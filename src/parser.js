import * as fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import getAbsolutePath from './getAbsolutePath.js';

const parser = (filePath) => {
  const extension = path.extname(filePath);
  const content = fs.readFileSync(getAbsolutePath(filePath), 'utf8');
  let parse;

  if (extension === '.json') {
    parse = JSON.parse;
  } else if (extension === '.yaml' || extension === '.yml') {
    parse = yaml.load;
  }
  return parse(content);
};

export default parser;
