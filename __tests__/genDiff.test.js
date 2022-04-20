/* eslint-disable no-undef */
import genDiff from '../src/genDiff';

/* я не уверен в правильности написания моих тестов. С одной стороны, такие тесты покрывают весь
код и, казалось бы, всё ок, но не лучше было бы протестировать каждую вспомогательную функцию
отдельно? Понятно, что если б доп. функции, используемые основной функцией genDiff, работали
некорректно, то результат работы genDiff тоже отличался бы от наших ожиданий. Однако, такой
подход написания тестов (проверить только итоговый вывод) не вяжется с идеей разработки через
тестирование. Потому как нам необходимо написать сразу весь код рабочим и только потом сравнивать
получившийся результат с ожидаемым. А иначе мы просто не поймем, в каком именно месте тесты
падают: на этапе создания дерева отличий? на этапе форматирования? или вообще парсер работает
криво? Верна ли моя логика? */

test('genDiff stylish', () => {
  const expected = [
    '{',
    '    common: {',
    '      + follow: false',
    '        setting1: Value 1',
    '      - setting2: 200',
    '      - setting3: true',
    '      + setting3: null',
    '      + setting4: blah blah',
    '      + setting5: {',
    '            key5: value5',
    '        }',
    '        setting6: {',
    '            doge: {',
    '              - wow: ',
    '              + wow: so much',
    '            }',
    '            key: value',
    '          + ops: vops',
    '        }',
    '    }',
    '    group1: {',
    '      - baz: bas',
    '      + baz: bars',
    '        foo: bar',
    '      - nest: {',
    '            key: value',
    '        }',
    '      + nest: str',
    '    }',
    '  - group2: {',
    '        abc: 12345',
    '        deep: {',
    '            id: 45',
    '        }',
    '    }',
    '  + group3: {',
    '        deep: {',
    '            id: {',
    '                number: 45',
    '            }',
    '        }',
    '        fee: 100500',
    '    }',
    '}',
  ];
  expect(genDiff('__fixtures__/file1.json', '__fixtures__/file2.json')).toBe(`${expected.join('\n')}`);
  expect(genDiff('__fixtures__/file1.yaml', '__fixtures__/file2.yml')).toBe(`${expected.join('\n')}`);
});

test('genDiff plain', () => {
  const expected = [
    "Property 'common.follow' was added with value: false",
    "Property 'common.setting2' was removed",
    "Property 'common.setting3' was updated. From true to null",
    "Property 'common.setting4' was added with value: 'blah blah'",
    "Property 'common.setting5' was added with value: [complex value]",
    "Property 'common.setting6.doge.wow' was updated. From '' to 'so much'",
    "Property 'common.setting6.ops' was added with value: 'vops'",
    "Property 'group1.baz' was updated. From 'bas' to 'bars'",
    "Property 'group1.nest' was updated. From [complex value] to 'str'",
    "Property 'group2' was removed",
    "Property 'group3' was added with value: [complex value]",
  ];
  expect(genDiff('__fixtures__/file1.json', '__fixtures__/file2.json', 'plain'))
    .toBe(`${expected.join('\n')}`);
  expect(genDiff('__fixtures__/file1.yaml', '__fixtures__/file2.yml', 'plain'))
    .toBe(`${expected.join('\n')}`);
});

test('genDiff json', () => {
  /* подозреваю, что эта проверка - какая-то фигня, т.к. тут фактически проверяется работа
  форматтера json с помощью самого себя, ведь он состоит из одной строки 'JSON.stringify(...)' */
  const expected = [
    {
      key: 'common',
      value: [
        { key: 'follow', value: false, type: 'added' },
        { key: 'setting1', value: 'Value 1', type: 'equal' },
        { key: 'setting2', value: 200, type: 'removed' },
        { key: 'setting3', value: true, type: 'updRemoved' },
        { key: 'setting3', value: null, type: 'updAdded' },
        { key: 'setting4', value: 'blah blah', type: 'added' },
        { key: 'setting5', value: { key5: 'value5' }, type: 'added' },
        {
          key: 'setting6',
          value: [
            {
              key: 'doge',
              value: [
                { key: 'wow', value: '', type: 'updRemoved' },
                { key: 'wow', value: 'so much', type: 'updAdded' },
              ],
              type: 'comparison object',
            },
            { key: 'key', value: 'value', type: 'equal' },
            { key: 'ops', value: 'vops', type: 'added' },
          ],
          type: 'comparison object',
        },
      ],
      type: 'comparison object',
    },
    {
      key: 'group1',
      value: [
        { key: 'baz', value: 'bas', type: 'updRemoved' },
        { key: 'baz', value: 'bars', type: 'updAdded' },
        { key: 'foo', value: 'bar', type: 'equal' },
        { key: 'nest', value: { key: 'value' }, type: 'updRemoved' },
        { key: 'nest', value: 'str', type: 'updAdded' },
      ],
      type: 'comparison object',
    },
    { key: 'group2', value: { abc: 12345, deep: { id: 45 } }, type: 'removed' },
    {
      key: 'group3',
      value: { deep: { id: { number: 45 } }, fee: 100500 },
      type: 'added',
    },
  ];
  expect(genDiff('__fixtures__/file1.json', '__fixtures__/file2.json', 'json'))
    .toBe(JSON.stringify(expected));
  expect(genDiff('__fixtures__/file1.yaml', '__fixtures__/file2.yml', 'json'))
    .toBe(JSON.stringify(expected));
});
