import path from 'path';
import * as fs from 'fs';
import parser from './parser.js';
import chooseFormat from './formatters/index.js';
import buildADiffTree from './buildADiffTree.js';
import getAbsolutePath from './getAbsolutePath.js';

const genDiff = (path1, path2, formatName = 'stylish') => {
  const file1Data = fs.readFileSync(getAbsolutePath(path1), 'utf8');
  const file2Data = fs.readFileSync(getAbsolutePath(path2), 'utf8');

  const file1DataType = path.extname(getAbsolutePath(path1)).slice(1);
  const file2DataType = path.extname(getAbsolutePath(path2)).slice(1);

  const file1ParsedData = parser(file1Data, file1DataType);
  const file2ParsedData = parser(file2Data, file2DataType);

  const differences = buildADiffTree(file1ParsedData, file2ParsedData);
  const formatter = chooseFormat(formatName);

  return formatter(differences);
};

export default genDiff;
