import _ from 'lodash';

const plain = (differences) => {
  const iter = (diffs, pat = undefined) => {
    const lines = diffs.map((item) => {
      const path = pat ? `${pat}.${item.key}` : item.key;
      // тут мы добиваемся того, чтоб строки были в кавычках, а [complex] и boolean - без
      let value;
      if (_.isObject(item.value)) {
        value = '[complex value]';
      } else if (typeof item.value === 'string') {
        value = `'${item.value}'`;
      } else {
        value = item.value;
      }

      let string;
      switch (item.type) {
        case 'added': {
          string = `Property '${path}' was added with value: ${value}\n`;
          break;
        }
        case 'removed': {
          string = `Property '${path}' was removed\n`;
          break;
        }
        case 'updRemoved': {
          string = `Property '${path}' was updated. From ${value} to `;
          break;
        }
        case 'updAdded': {
          string = `${value}\n`;
          break;
        }
        case 'comparison object': {
          string = iter(item.value, path);
          break;
        }
        default: {
          break;
        }
      }
      return string;
    });
    return lines.join('');
  };
  return iter(differences).trim();
};

export default plain;
