// JavaScript should be written in ECMAScript 5.1.

function main() {
  console.log(
    JSON.stringify(
      {
        title: 'Bepo CmdQwerty Toggle',
        rules: rules(),
      },
      null,
      '  '
    )
  )
}

function rules() {
  return [
    {
      description: 'While using Programmer Bepo, holding command temporarily switches to the Australian qwerty layout.',
      manipulators: [
        {
          type: 'basic',
          from: {
            key_code: 'left_command',
            modifiers: {
              optional: ['any'],
            },
          },
          conditions: [
            {
              type: 'input_source_if',
              input_sources: [
                {
                  input_source_id: '^com\\.apple\\.keyboardlayout\\.bepo\\.keylayout\\.bépo-QwertyCmd$',
                },
              ],
            },
          ],
          to: [
            {
              select_input_source: {
                input_source_id: '^com\\.apple\\.keylayout\\.Australian$',
              },
            },
            {
              key_code: 'left_command',
            },
          ],
          to_after_key_up: [
            {
              select_input_source: {
                input_source_id: '^com\\.apple\\.keyboardlayout\\.bepo\\.keylayout\\.bépo-QwertyCmd$',
              },
            },
          ],
        },
        {
          type: 'basic',
          from: {
            key_code: 'right_command',
            modifiers: {
              optional: ['any'],
            },
          },
          conditions: [
            {
              type: 'input_source_if',
              input_sources: [
                {
                  input_source_id: '^com\\.apple\\.keyboardlayout\\.bepo\\.keylayout\\.bépo-QwertyCmd$',
                },
              ],
            },
          ],
          to: [
            {
              select_input_source: {
                input_source_id: '^com\\.apple\\.keylayout\\.Australian$',
              },
            },
            {
              key_code: 'right_command',
            },
          ],
          to_after_key_up: [
            {
              select_input_source: {
                input_source_id: '^com\\.apple\\.keyboardlayout\\.bepo\\.keylayout\\.bépo-QwertyCmd$',
              },
            },
          ],
        },
      ],
    },
  ]
}

if (__main.endsWith('/bepo-cmdqwerty-toggle.json.js')) {
  main()
} else {
  exports.rules = rules()
}
