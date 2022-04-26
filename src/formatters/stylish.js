import _ from 'lodash';

const makeIndent = (depth, replacer = '  ') => {
  const spacesCount = 4;
  const indentSize = depth * spacesCount - replacer.length;
  const indent = ' '.repeat(indentSize) + replacer;
  return indent;
};

const stringify = (value, depth) => {
  if (!_.isObject(value)) {
    return `${value}`;
  }
  const lines = Object
    .entries(value)
    .map(([key, val]) => `${makeIndent(depth)}${key}: ${stringify(val, depth + 1)}`);

  return [
    '{',
    ...lines,
    `${makeIndent(depth - 1)}}`,
  ].join('\n');
};

const stylish = (differencesTree) => {
  const iter = (node, depth) => {
    if (node.type === 'equal') {
      return `${makeIndent(depth)}${node.key}: ${node.value}`;
    }
    if (node.type === 'added') {
      return `${makeIndent(depth, '+ ')}${node.key}: ${stringify(node.value, depth + 1)}`;
    }
    if (node.type === 'removed') {
      return `${makeIndent(depth, '- ')}${node.key}: ${stringify(node.value, depth + 1)}`;
    }
    if (node.type === 'updated') {
      const line1 = `${makeIndent(depth, '- ')}${node.key}: ${stringify(node.value1, depth + 1)}`;
      const line2 = `${makeIndent(depth, '+ ')}${node.key}: ${stringify(node.value2, depth + 1)}`;
      return `${line1}\n${line2}`;
    }
    if (node.type === 'comparison object') {
      const lines = node.children.map((item) => iter(item, depth + 1));
      return `${makeIndent(depth)}${node.key}: {\n${lines.join('\n')}\n${makeIndent(depth)}}`;
    }
    return ['{',
      ...node.children.map((item) => iter(item, 1)),
      '}',
    ].join('\n');
  };
  return iter(differencesTree, 1);
};

export default stylish;
