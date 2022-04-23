import parse from './parser.js';
import compare from './compare.js';
import readFile from './readFile.js';
import chooseFormat from './formatters/index.js';

const genDiff = (path1, path2, formatName = 'stylish') => {
  const file1 = parse(readFile(path1));
  const file2 = parse(readFile(path2));
  const differences = compare(file1, file2);
  const formatter = chooseFormat(formatName);

  return formatter(differences);
};

export default genDiff;
