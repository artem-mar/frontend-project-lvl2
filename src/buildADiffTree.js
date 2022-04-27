import _ from 'lodash';

const compare = (obj1, obj2) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  const allSortedUniqKeys = _.sortBy(_.union(keys1, keys2));

  const differences = allSortedUniqKeys.map((key) => {
    if (!keys1.includes(key)) {
      return { key, type: 'added', value: obj2[key] };
    }
    if (!keys2.includes(key)) {
      return { key, type: 'removed', value: obj1[key] };
    }
    if (_.isPlainObject(obj1[key]) && _.isPlainObject(obj2[key])) {
      return { key, type: 'comparison object', children: compare(obj1[key], obj2[key]) };
    }
    if (obj1[key] === obj2[key]) {
      return { key, type: 'equal', value: obj1[key] };
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
