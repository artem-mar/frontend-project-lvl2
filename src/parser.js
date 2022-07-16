import yaml from 'js-yaml';

const parsers = {
  json: (data) => JSON.parse(data),
  yaml: (data) => yaml.load(data),
  yml: (data) => yaml.load(data),
};

const parse = (data, extName) => parsers[extName](data);

export default parse;
