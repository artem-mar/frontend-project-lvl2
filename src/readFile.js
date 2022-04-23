import * as fs from 'fs';
import path from 'path';
import getAbsolutePath from './getAbsolutePath.js';

const readFile = (filePath) => {
  const extension = path.extname(filePath);
  const data = fs.readFileSync(getAbsolutePath(filePath), 'utf8');
  return [data, extension];
};

export default readFile;
