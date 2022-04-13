/* eslint-disable no-undef */
import genDiff from '../src/genDiff';

test('reverse', () => {
  const result = '{\n - follow: false\n   host: hexlet.io\n - proxy: 123.234.53.22\n - timeout: 50\n + timeout: 20\n + verbose: true\n}';

  expect(genDiff('../__fixtures__/file1.json', '../__fixtures__/file2.json')).toBe(result);
});
