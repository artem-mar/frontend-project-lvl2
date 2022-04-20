import stylish from './stylish.js';
import plain from './plain.js';
import toJSON from './json.js';

const chooseFormat = (format) => {
  let formatter;
  if (format === 'plain') {
    formatter = plain;
  } else if (format === 'json') {
    formatter = toJSON;
  } else {
    formatter = stylish;
  }

  return formatter;
};

export default chooseFormat;
