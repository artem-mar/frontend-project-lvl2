import _ from 'lodash';
import parse from './parse.js';

const genDiff = (path1, path2) => {
  const file1 = parse(path1);
  const keys1 = Object.keys(file1);
  const file2 = parse(path2);
  const keys2 = Object.keys(file2);

  const allSortedUniqKeys = _.sortedUniq(_.union(keys1, keys2).sort());

  const resultArray = allSortedUniqKeys.reduce((acc, key) => {
    if (keys1.includes(key) && keys2.includes(key)) {
      return file1[key] === file2[key]
        ? [...acc, `   ${key}: ${file1[key]}`]
        : [...acc, ` - ${key}: ${file1[key]}\n + ${key}: ${file2[key]}`];
    }
    if (keys1.includes(key) && !keys2.includes(key)) {
      return [...acc, ` - ${key}: ${file1[key]}`];
    }

    return [...acc, ` + ${key}: ${file2[key]}`];
  }, []);
  const resultString = _.join(resultArray, '\n');
  return `{\n${resultString}\n}`;
};

export default genDiff;
