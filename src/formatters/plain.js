import _ from 'lodash';

const valueFormatter = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return value;
};

const plain = (differencesTree) => {
  const iter = (node, nodeName) => {
    const path = nodeName ? `${nodeName}.${node.key}` : node.key;
    const value = valueFormatter(node.value);
    const value1 = valueFormatter(node.value1);
    const value2 = valueFormatter(node.value2);
    switch (node.type) {
      case 'root':
        return node.children.map((item) => iter(item)).join('');
      case 'added':
        return `Property '${path}' was added with value: ${value}\n`;
      case 'removed':
        return `Property '${path}' was removed\n`;
      case 'updated':
        return `Property '${path}' was updated. From ${value1} to ${value2}\n`;
      case 'comparison object':
        return node.children.map((item) => iter(item, path)).join('');
      default:
        return '';
    }
  };
  return iter(differencesTree).trim();
};

export default plain;
