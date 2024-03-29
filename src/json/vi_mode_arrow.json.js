// JavaScript should be written in ECMAScript 5.1.

function main() {
  console.log(
    JSON.stringify(
      {
        title: 'Vi Mode, left_control + hjkl. shift/option/command + arrow working.',
        rules: [
          {
            description: 'Vi Mode [left_control + hjkl]',
            manipulators: [
              {
                from: {
                  key_code: 'h',
                  modifiers: {
                    mandatory: ['control'],
                    optional: ['caps_lock', 'command', 'option', 'shift', 'fn'],
                  },
                },
                to: [{ key_code: 'left_arrow' }],
                type: 'basic',
              },
              {
                from: {
                  key_code: 'j',
                  modifiers: {
                    mandatory: ['control'],
                    optional: ['caps_lock', 'command', 'option', 'shift', 'fn'],
                  },
                },
                to: [{ key_code: 'down_arrow' }],
                type: 'basic',
              },
              {
                from: {
                  key_code: 'k',
                  modifiers: {
                    mandatory: ['control'],
                    optional: ['caps_lock', 'command', 'option', 'shift', 'fn'],
                  },
                },
                to: [{ key_code: 'up_arrow' }],
                type: 'basic',
              },
              {
                from: {
                  key_code: 'l',
                  modifiers: {
                    mandatory: ['control'],
                    optional: ['caps_lock', 'command', 'option', 'shift', 'fn'],
                  },
                },
                to: [{ key_code: 'right_arrow' }],
                type: 'basic',
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
