const expectedResultStylish = [
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
].join('\n');

const expectedResultPlain = [
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
].join('\n');

const expectedResultJSON = {
  key: 'difference tree',
  type: 'root',
  children: [
    {
      key: 'common',
      type: 'comparison object',
      children: [
        {
          key: 'follow',
          type: 'added',
          value: false,
        },
        {
          key: 'setting1',
          type: 'equal',
          value: 'Value 1',
        },
        {
          key: 'setting2',
          type: 'removed',
          value: 200,
        },
        {
          key: 'setting3',
          type: 'updated',
          value1: true,
          value2: null,
        },
        {
          key: 'setting4',
          type: 'added',
          value: 'blah blah',
        },
        {
          key: 'setting5',
          type: 'added',
          value: {
            key5: 'value5',
          },
        },
        {
          key: 'setting6',
          type: 'comparison object',
          children: [
            {
              key: 'doge',
              type: 'comparison object',
              children: [
                {
                  key: 'wow',
                  type: 'updated',
                  value1: '',
                  value2: 'so much',
                },
              ],
            },
            {
              key: 'key',
              type: 'equal',
              value: 'value',
            },
            {
              key: 'ops',
              type: 'added',
              value: 'vops',
            },
          ],
        },
      ],
    },
    {
      key: 'group1',
      type: 'comparison object',
      children: [
        {
          key: 'baz',
          type: 'updated',
          value1: 'bas',
          value2: 'bars',
        },
        {
          key: 'foo',
          type: 'equal',
          value: 'bar',
        },
        {
          key: 'nest',
          type: 'updated',
          value1: {
            key: 'value',
          },
          value2: 'str',
        },
      ],
    },
    {
      key: 'group2',
      type: 'removed',
      value: {
        abc: 12345,
        deep: {
          id: 45,
        },
      },
    },
    {
      key: 'group3',
      type: 'added',
      value: {
        deep: {
          id: {
            number: 45,
          },
        },
        fee: 100500,
      },
    },
  ],
};

export { expectedResultStylish, expectedResultPlain, expectedResultJSON };
