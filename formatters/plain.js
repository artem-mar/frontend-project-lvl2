import _ from 'lodash';

const plain = (differences) => {
  const iter = (diffs, pat = undefined) => {
    const lines = diffs.map((item) => {
      const path = pat ? `${pat}.${item.key}` : item.key;
      // тут мы добиваемся того, чтоб строки были в кавычках, а [complex] и boolean - без
      let { value } = item;
      if (_.isObject(item.value)) {
        value = '[complex value]';
      } else if (typeof item.value === 'string') {
        value = `'${item.value}'`;
      }

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
