import parse from './parse.js';
import compare from './compare.js';
import stylish from './stylish.js';

const genDiff = (path1, path2, style = stylish) => {
  const file1 = parse(path1);
  const file2 = parse(path2);
  const differences = compare(file1, file2);

  return style(differences);
};

export default genDiff;
