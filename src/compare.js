import _ from 'lodash';

const compare = (obj1, obj2) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  const allSortedUniqKeys = _.sortedUniq(_.union(keys1, keys2).sort());

  const differences = allSortedUniqKeys.reduce((acc, key) => {
    if (keys1.includes(key) && !keys2.includes(key)) {
      const type = 'removed';
      const value = obj1[key];
      return [...acc, { key, value, type }];
    }
    if (!keys1.includes(key) && keys2.includes(key)) {
      const type = 'added';
      const value = obj2[key];
      return [...acc, { key, value, type }];
    }

    // далее рассматриваются случаи, когда ключ есть в 1м и 2м объектах

    if (_.isPlainObject(obj1[key]) && _.isPlainObject(obj2[key])) {
      const type = 'comparison object';
      const value = compare(obj1[key], obj2[key]);
      return [...acc, { key, value, type }];
    }

    if (obj1[key] === obj2[key]) {
      const type = 'equal'; // это примитив, т.к. объекты не могут быть равны
      const value = obj1[key];
      return [...acc, { key, value, type }];
    }

    // if (obj1[key] !== obj2[key]) - остается только этот вариант
    return [
      ...acc,
      { key, value: obj1[key], type: 'updRemoved' },
      { key, value: obj2[key], type: 'updAdded' },
    ];
  }, []);

  return differences;
};
/* в итоге некоторые свойства мы переписываем в виде массива объектов { key, value, type },
а некоторые - просто копируем "как есть". это происходит, например, при сравнении 2-х
свойств, одно из которых - примитив, а второе - объект (второе значение не будет
переписываться, а тупо скопипастится), или когда в одном файле есть пара ключ-значение
(значение которого - объект), а в другом нет */
export default compare;
