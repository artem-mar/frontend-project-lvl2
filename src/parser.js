import yaml from 'js-yaml';

const parse = ([data, extension]) => {
  if (extension === '.yaml' || extension === '.yml') {
    return yaml.load(data);
  }
  return JSON.parse(data);
};

export default parse;
