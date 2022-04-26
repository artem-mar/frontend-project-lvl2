import yaml from 'js-yaml';

const parser = (data, dataType = 'json') => {
  if (dataType === 'yaml' || dataType === 'yml') {
    return yaml.load(data);
  }
  return JSON.parse(data);
};
export default parser;
