// JavaScript should be written in ECMAScript 5.1.

function main() {
  console.log(
    JSON.stringify(
      {
        title: 'select_input_source example',
        rules: [
          {
            description: 'Change input source to U.S. by left_command, RussianWin by right_command.',
            manipulators: [
              {
                type: 'basic',
                from: {
                  key_code: 'left_command',
                  modifiers: { optional: ['any'] },
                },
                to: [{ key_code: 'left_command' }],
                to_if_alone: [
                  {
                    select_input_source: {
                      input_source_id: '^com\\.apple\\.keylayout\\.US$',
                    },
                  },
                ],
              },
              {
                type: 'basic',
                from: {
                  key_code: 'right_command',
                  modifiers: { optional: ['any'] },
                },
                to: [{ key_code: 'right_command' }],
                to_if_alone: [
                  {
                    select_input_source: {
                      input_source_id: '^com\\.apple\\.keylayout\\.RussianWin$',
                    },
                  },
                ],
              },
            ],
          },
          {
            description: 'Change input source to French while right_option is pressed.',
            manipulators: [
              {
                type: 'basic',
                from: {
                  key_code: 'right_option',
                  modifiers: { optional: ['any'] },
                },
                to: [
                  {
                    select_input_source: {
                      language: '^fr$',
                    },
                  },
                ],
                to_after_key_up: [
                  {
                    select_input_source: {
                      language: '^en$',
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
      null,
      '  '
    )
  )
}

main()
