/* eslint-disable no-undef */
import { fileURLToPath } from 'url';
import path from 'path';
import genDiff from '../index.js';
import {
  expectedResultStylish,
  expectedResultPlain,
  expectedResultJSON,
} from '../__fixtures__/expectedResults.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const file1Json = getFixturePath('file1.json');
const file2Json = getFixturePath('file2.json');
const file1Yaml = getFixturePath('file1.yaml');
const file2Yml = getFixturePath('file2.yml');

test('genDiff stylish', () => {
  expect(genDiff(file1Json, file2Json)).toBe(expectedResultStylish);
  expect(genDiff(file1Yaml, file2Yml)).toBe(expectedResultStylish);
});

test('genDiff plain', () => {
  expect(genDiff(file1Json, file2Json, 'plain')).toBe(expectedResultPlain);
  expect(genDiff(file1Yaml, file2Yml, 'plain')).toBe(expectedResultPlain);
});

test('genDiff json', () => {
  expect(genDiff(file1Json, file2Json, 'json')).toBe(JSON.stringify(expectedResultJSON));
  expect(genDiff(file1Yaml, file2Yml, 'json')).toBe(JSON.stringify(expectedResultJSON));
});
