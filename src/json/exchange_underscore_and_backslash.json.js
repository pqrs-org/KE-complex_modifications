// JavaScript should be written in ECMAScript 5.1.

function main() {
  console.log(
    JSON.stringify(
      {
        title: 'Exchange underscore and backslash',
        rules: [
          {
            description: 'Exchange underscore and backslash',
            manipulators: [
              {
                type: 'basic',
                from: {
                  key_code: 'backslash',
                  modifiers: {
                    optional: ['caps_lock'],
                  },
                },
                to: [
                  {
                    key_code: 'hyphen',
                    modifiers: ['left_shift'],
                  },
                ],
              },

              {
                type: 'basic',
                from: {
                  key_code: 'hyphen',
                  modifiers: {
                    mandatory: ['shift'],
                    optional: ['caps_lock'],
                  },
                },
                to: [
                  {
                    key_code: 'backslash',
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
