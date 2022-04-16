import path from 'path';

const getAbsolutePath = (fileName) => (
  path.resolve(process.cwd(), fileName)
);

export default getAbsolutePath;
