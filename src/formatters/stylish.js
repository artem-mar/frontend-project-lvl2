import _ from 'lodash';

const stylish = (differencesTree) => {
  const iter = (node, deepth) => {
    const spacesCount = 4;
    const indentSize = deepth * spacesCount;
    const changedIndent = ' '.repeat(indentSize - spacesCount / 2); // для элементов с +/-
    const bracketIndent = ' '.repeat(indentSize - spacesCount);

    if (!_.isObject(node)) {
      return `${node}`;
    }
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
      return `${changedIndent}+ ${node.key}: ${iter(node.value, deepth + 1)}`;
    }
    if (node.type === 'removed') {
      return `${changedIndent}- ${node.key}: ${iter(node.value, deepth + 1)}`;
    }
    if (node.type === 'updated') {
      const line1 = `${changedIndent}- ${node.key}: ${iter(node.value1, deepth + 1)}`;

      const line2 = `${changedIndent}+ ${node.key}: ${iter(node.value2, deepth + 1)}`;
      return `${line1}\n${line2}`;
    }
    if (node.type === 'comparison object') {
      const lines = node.children.map((item) => iter(item, deepth + 1));
      return `  ${changedIndent}${node.key}: {\n${lines.join('\n')}\n  ${changedIndent}}`;
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
