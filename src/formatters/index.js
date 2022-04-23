import stylish from './stylish.js';
import plain from './plain.js';
import toJSON from './json.js';

const chooseFormat = (format) => {
  if (format === 'plain') {
    return plain;
  }
  if (format === 'json') {
    return toJSON;
  }

  return stylish;
};

export default chooseFormat;
