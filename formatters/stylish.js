import _ from 'lodash';

const stylish = (diffs) => {
  const iter = (currentValue, deepth) => {
    const indentSize = deepth * 4;
    // 4 - кол-во отступов (по заданию). я не придумал, как избавиться от магического числа
    const currentIndent = ' '.repeat(indentSize);
    const changedIndent = ' '.repeat(indentSize - 2); // для элементов с +/-
    const bracketIndent = ' '.repeat(indentSize - 4);

    const lines = Array.isArray(currentValue)
      ? currentValue.map((item) => {
        switch (item.type) {
          case 'equal':
            return `${currentIndent}${item.key}: ${item.value}`;

          case 'removed':
          case 'updRemoved':
            return _.isPlainObject(item.value)
              ? `${changedIndent}- ${item.key}: ${iter(item.value, deepth + 1)}`
              : `${changedIndent}- ${item.key}: ${item.value}`;

          case 'added':
          case 'updAdded':
            return _.isPlainObject(item.value)
              ? `${changedIndent}+ ${item.key}: ${iter(item.value, deepth + 1)}`
              : `${changedIndent}+ ${item.key}: ${item.value}`;

          case 'comparison object':
            return `${currentIndent}${item.key}: ${iter(item.value, deepth + 1)}`;
          default:
            return '';
            // сюда вроде ничего не должно попасть, но линтер требует
        }
      })
    /* ниже обрабатываем случаи, когда значение было скопировано "как есть" функцией
    compare. см. коменты в compare.js */
      : Object
        .entries(currentValue)
        .map(([key, val]) => {
          const value = _.isPlainObject(val) ? iter(val, deepth + 1) : val;
          return `${currentIndent}${key}: ${value}`;
        });

    return [
      '{',
      ...lines,
      `${bracketIndent}}`,
    ].join('\n');
  };
  return iter(diffs, 1);
};

export default stylish;
