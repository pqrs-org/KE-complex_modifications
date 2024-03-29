// JavaScript should be written in ECMAScript 5.1.

function main() {
  console.log(
    JSON.stringify(
      {
        title: 'Shift + Arrow Keys',
        rules: [
          {
            description: 'Shift + Up to Page Up',
            manipulators: [
              {
                type: 'basic',
                from: {
                  key_code: 'up_arrow',
                  modifiers: {
                    mandatory: ['shift'],
                    optional: ['caps_lock', 'option'],
                  },
                },
                to: [
                  {
                    key_code: 'page_up',
                  },
                ],
              },
            ],
          },
          {
            description: 'Shift + Down to Page Down',
            manipulators: [
              {
                type: 'basic',
                from: {
                  key_code: 'down_arrow',
                  modifiers: {
                    mandatory: ['shift'],
                    optional: ['caps_lock', 'option'],
                  },
                },
                to: [
                  {
                    key_code: 'page_down',
                  },
                ],
              },
            ],
          },
          {
            description: 'Shift + Left to Home',
            manipulators: [
              {
                type: 'basic',
                from: {
                  key_code: 'left_arrow',
                  modifiers: {
                    mandatory: ['shift'],
                    optional: ['caps_lock', 'option'],
                  },
                },
                to: [
                  {
                    key_code: 'home',
                  },
                ],
              },
            ],
          },
          {
            description: 'Shift + Right to End',
            manipulators: [
              {
                type: 'basic',
                from: {
                  key_code: 'right_arrow',
                  modifiers: {
                    mandatory: ['shift'],
                    optional: ['caps_lock', 'option'],
                  },
                },
                to: [
                  {
                    key_code: 'end',
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
