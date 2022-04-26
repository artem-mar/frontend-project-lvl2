import _ from 'lodash';

const compare = (obj1, obj2) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  const allSortedUniqKeys = _.sortBy(_.union(keys1, keys2));

  const differences = allSortedUniqKeys.map((key) => {
    if (!keys1.includes(key)) {
      const type = 'added';
      const value = obj2[key];
      return { key, type, value };
    }
    if (!keys2.includes(key)) {
      const type = 'removed';
      const value = obj1[key];
      return { key, type, value };
    }

    if (_.isPlainObject(obj1[key]) && _.isPlainObject(obj2[key])) {
      const type = 'comparison object';
      const children = compare(obj1[key], obj2[key]);
      return { key, type, children };
    }

    if (obj1[key] === obj2[key]) {
      const type = 'equal';
      const value = obj1[key];
      return { key, type, value };
    }

    return {
      key,
      type: 'updated',
      value1: obj1[key],
      value2: obj2[key],
    };
  });

  return differences;
};

const buildADiffTree = (object1, object2) => ({
  key: 'difference tree',
  type: 'root',
  children: compare(object1, object2),
});

export default buildADiffTree;
