import compare from './compare.js';
import getData from './parsers.js';
import chooseFormat from './formatters/index.js';

const genDiff = (path1, path2, formatName = 'stylish') => {
  const file1Data = getData(path1);
  const file2Data = getData(path2);
  const differences = compare(file1Data, file2Data);
  const formatter = chooseFormat(formatName);

  return formatter(differences);
};

export default genDiff;
