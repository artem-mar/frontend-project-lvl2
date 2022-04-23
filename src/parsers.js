import path from 'path';
import * as fs from 'fs';
import yaml from 'js-yaml';
import getAbsolutePath from './getAbsolutePath.js';

const parseJson = (data) => JSON.parse(data);
const parseYaml = (data) => yaml.load(data);

const getData = (filePath) => {
  const extension = path.extname(filePath);
  const data = fs.readFileSync(getAbsolutePath(filePath), 'utf8');
  if (extension === '.yaml' || extension === '.yml') {
    return parseYaml(data);
  }
  return parseJson(data);
};
export default getData;
