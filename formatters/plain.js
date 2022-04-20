import _ from 'lodash';

const plain = (differences) => {
  const iter = (diffs, pat = undefined) => {
    const lines = diffs.map((item) => {
      const path = pat ? `${pat}.${item.key}` : item.key;
      // тут мы добиваемся того, чтоб строки были в кавычках, а [complex] и boolean - без
      const valueFormatter = (value) => {
        if (_.isObject(value)) {
          return '[complex value]';
        }
        if (typeof value === 'string') {
          return `'${item.value}'`;
        }
        return item.value;
      };
      const value = valueFormatter(item.value);

      switch (item.type) {
        case 'added': {
          return `Property '${path}' was added with value: ${value}\n`;
        }
        case 'removed': {
          return `Property '${path}' was removed\n`;
        }
        case 'updRemoved': {
          return `Property '${path}' was updated. From ${value} to `;
        }
        case 'updAdded': {
          return `${value}\n`;
        }
        case 'comparison object': {
          return iter(item.value, path);
        }
        default: {
          return '';
        }
      }
    });
    return lines.join('');
  };
  return iter(differences).trim();
};

export default plain;
