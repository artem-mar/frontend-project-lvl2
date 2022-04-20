import stylish from './stylish.js';
import plain from './plain.js';

const chooseFormat = (format) => {
  let formatter;
  if (format === 'plain') {
    formatter = plain;
  } else {
    formatter = stylish;
  }

  return formatter;
};

export default chooseFormat;
