/* eslint-disable no-undef */
import { fileURLToPath } from 'url';
import path from 'path';
import * as fs from 'fs';
import genDiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (fileName) => path.join(__dirname, '..', '__fixtures__', fileName);
const readFile = (fileName) => fs.readFileSync(getFixturePath(fileName), 'utf8');

describe('genDiff', () => {
  const expectedResultStylish = readFile('expected_stylish.txt');
  const expectedResultPlain = readFile('expected_plain.txt');
  const expectedResultJSON = readFile('expected_json.txt');

  const pathToFile1Json = getFixturePath('file1.json');
  const pathToFile2Json = getFixturePath('file2.json');
  const pathToFile1Yaml = getFixturePath('file1.yaml');
  const pathToFile2Yml = getFixturePath('file2.yml');

  test('genDiff stylish', () => {
    expect(genDiff(pathToFile1Json, pathToFile2Json)).toBe(expectedResultStylish);
    expect(genDiff(pathToFile1Yaml, pathToFile2Yml)).toBe(expectedResultStylish);
  });

  test('genDiff plain', () => {
    expect(genDiff(pathToFile1Json, pathToFile2Json, 'plain')).toBe(expectedResultPlain);
    expect(genDiff(pathToFile1Yaml, pathToFile2Yml, 'plain')).toBe(expectedResultPlain);
  });

  test('genDiff json', () => {
    expect(genDiff(pathToFile1Json, pathToFile2Json, 'json')).toBe(expectedResultJSON);
    expect(genDiff(pathToFile1Yaml, pathToFile2Yml, 'json')).toBe(expectedResultJSON);
  });
});
