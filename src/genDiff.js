import path from 'path';
import * as fs from 'fs';
import parse from './parser.js';
import chooseFormat from './formatters/index.js';
import buildADiffTree from './buildADiffTree.js';
import getAbsolutePath from './getAbsolutePath.js';

const genDiff = (path1, path2, formatName = 'stylish') => {
  const file1Data = fs.readFileSync(getAbsolutePath(path1), 'utf8');
  const file2Data = fs.readFileSync(getAbsolutePath(path2), 'utf8');

  const file1Extension = path.extname(getAbsolutePath(path1)).slice(1);
  const file2Extension = path.extname(getAbsolutePath(path2)).slice(1);

  const file1ParsedData = parse(file1Data, file1Extension);
  const file2ParsedData = parse(file2Data, file2Extension);

  const differences = buildADiffTree(file1ParsedData, file2ParsedData);
  const formatter = chooseFormat(formatName);

  return formatter(differences);
};

export default genDiff;
