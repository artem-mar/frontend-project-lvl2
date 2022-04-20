import parser from './parser.js';
import compare from './compare.js';
import chooseFormat from '../formatters/index.js';

const genDiff = (path1, path2, formatName = 'stylish') => {
  const file1 = parser(path1);
  const file2 = parser(path2);
  const differences = compare(file1, file2);
  const formatter = chooseFormat(formatName);

  return formatter(differences);
};

export default genDiff;
