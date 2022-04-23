import _ from 'lodash';

const stylish = (differencesTree) => {
  const iter = (node, deepth) => {
    const spacesCount = 4;
    const indentSize = deepth * spacesCount;
    const changedIndent = ' '.repeat(indentSize - spacesCount / 2); // для элементов с +/-
    const bracketIndent = ' '.repeat(indentSize - spacesCount);

    if (node.type === 'root') {
      return ['{',
        ...node.children.map((item) => iter(item, 1)),
        '}',
      ].join('\n');
    }
    if (node.type === 'equal') {
      return `  ${changedIndent}${node.key}: ${node.value}`;
    }
    if (node.type === 'added') {
      const line = _.isPlainObject(node.value)
        ? `${changedIndent}+ ${node.key}: ${iter(node.value, deepth + 1)}`
        : `${changedIndent}+ ${node.key}: ${node.value}`;
      return line;
    }
    if (node.type === 'removed') {
      const line = _.isPlainObject(node.value)
        ? `${changedIndent}- ${node.key}: ${iter(node.value, deepth + 1)}`
        : `${changedIndent}- ${node.key}: ${node.value}`;
      return line;
    }
    if (node.type === 'updated') {
      const line1 = _.isPlainObject(node.value1)
        ? `${changedIndent}- ${node.key}: ${iter(node.value1, deepth + 1)}`
        : `${changedIndent}- ${node.key}: ${node.value1}`;

      const line2 = _.isPlainObject(node.value2)
        ? `${changedIndent}+ ${node.key}: ${iter(node.value2, deepth + 1)}`
        : `${changedIndent}+ ${node.key}: ${node.value2}`;
      return `${line1}\n${line2}`;
    }
    if (node.type === 'comparison object') {
      const lines = node.children.map((item) => iter(item, deepth + 1));
      return `  ${changedIndent}${node.key}: {\n${lines.join('\n')}\n  ${changedIndent}}`;
    }
    if (!_.isObject(node)) {
      return `${node}`;
    }
    const lines = Object
      .entries(node)
      .map(([key, val]) => `  ${changedIndent}${key}: ${iter(val, deepth + 1)}`);

    return [
      '{',
      ...lines,
      `${bracketIndent}}`,
    ].join('\n');
  };
  return iter(differencesTree, 1);
};

export default stylish;
