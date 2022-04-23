import _ from 'lodash';

const compare = (object1, object2) => {
  const buildATree = (obj1, obj2) => {
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);
    const allSortedUniqKeys = _.sortBy(_.union(keys1, keys2));

    const differences = allSortedUniqKeys.reduce((acc, key) => {
      if (!keys1.includes(key)) {
        const type = 'added';
        const value = obj2[key];
        return [...acc, { key, type, value }];
      }
      if (!keys2.includes(key)) {
        const type = 'removed';
        const value = obj1[key];
        return [...acc, { key, type, value }];
      }

      // далее рассматриваются случаи, когда ключ есть в 1м и 2м объектах

      if (_.isPlainObject(obj1[key]) && _.isPlainObject(obj2[key])) {
        const type = 'comparison object';
        const children = buildATree(obj1[key], obj2[key]);
        return [...acc, { key, type, children }];
      }

      if (obj1[key] === obj2[key]) {
        const type = 'equal';
        const value = obj1[key];
        return [...acc, { key, type, value }];
      }

      // if (obj1[key] !== obj2[key]) - остается только этот вариант
      // obj1[key] и obj2[key] могут быть как примитивами, так и объектами
      return [
        ...acc,
        {
          key,
          type: 'updated',
          value1: obj1[key],
          value2: obj2[key],
        },
      ];
    }, []);

    return differences;
  };
  return { key: 'difference tree', type: 'root', children: buildATree(object1, object2) };
};
/* в итоге некоторые свойства мы переписываем в виде массива объектов { key, value, type },
а некоторые - просто копируем "как есть". это происходит, например, при сравнении 2-х
свойств, одно из которых - примитив, а второе - объект (второе значение не будет
переписываться, а тупо скопипастится), или когда в одном файле есть пара ключ-значение
(значение которого - объект), а в другом нет */
export default compare;
