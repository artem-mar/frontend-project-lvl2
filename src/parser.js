import * as fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import getAbsolutePath from './getAbsolutePath.js';

const parser = (filePath) => {
  const extension = path.extname(filePath);
  const content = fs.readFileSync(getAbsolutePath(filePath), 'utf8');

  if (extension === '.yaml' || extension === '.yml') {
    return yaml.load(content);
  }
  return JSON.parse(content);
};

export default parser;
