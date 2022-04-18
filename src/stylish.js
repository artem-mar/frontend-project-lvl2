import _ from 'lodash';

const stylish = (diffs) => {
  const iter = (currentValue, deepth) => {
    const indentSize = deepth * 4;
    // 4 - кол-во отступов (по заданию). я не придумал, как избавиться от магического числа
    // 2 отступа оставляем для +/-. если +/- нет, добавим 2 пробела по факту
    const currentIndent = ' '.repeat(indentSize);
    const changedIndent = ' '.repeat(indentSize - 2); // для элементов с +/-
    const bracketIndent = ' '.repeat(indentSize - 4);

    let lines = [];
    if (Array.isArray(currentValue)) {
      lines = currentValue.map((item) => {
        let line;
        switch (item.type) {
          case 'equal':
            line = `${currentIndent}${item.key}: ${item.value}`;
            break;

          case 'deleted':
            line = _.isPlainObject(item.value)
              ? `${changedIndent}- ${item.key}: ${iter(item.value, deepth + 1)}`
              : `${changedIndent}- ${item.key}: ${item.value}`;
            break;

          case 'added':
            line = _.isPlainObject(item.value)
              ? `${changedIndent}+ ${item.key}: ${iter(item.value, deepth + 1)}`
              : `${changedIndent}+ ${item.key}: ${item.value}`;
            break;

          case 'comparison object':
            line = `${currentIndent}${item.key}: ${iter(item.value, deepth + 1)}`;
            break;

          default:
            // сюда вроде ничего не должно попасть, но линтер требует
        }
        return line;
      });
    }
    /* ниже обрабатываем случаи, когда значение было скопировано "как есть" функцией
    compare. см. коменты в compare.js */
    if (_.isPlainObject(currentValue)) {
      lines = Object
        .entries(currentValue)
        .map(([key, val]) => {
          const value = _.isPlainObject(val) ? iter(val, deepth + 1) : val;
          return `${currentIndent}${key}: ${value}`;
        });
    }

    return [
      '{',
      ...lines,
      `${bracketIndent}}`,
    ].join('\n');
  };
  return iter(diffs, 1);
};

export default stylish;
