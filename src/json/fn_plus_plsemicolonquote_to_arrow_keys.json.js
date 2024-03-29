// JavaScript should be written in ECMAScript 5.1.

function main() {
  console.log(
    JSON.stringify(
      {
        title: "Change fn + p/l/;/' to arrow keys",
        rules: [
          {
            description: "Change fn + p/l/;/' to arrow keys",
            manipulators: [
              {
                type: 'basic',
                from: {
                  key_code: 'p',
                  modifiers: {
                    mandatory: ['fn'],
                    optional: ['any'],
                  },
                },
                to: [{ key_code: 'up_arrow' }],
              },
              {
                type: 'basic',
                from: {
                  key_code: 'l',
                  modifiers: {
                    mandatory: ['fn'],
                    optional: ['any'],
                  },
                },
                to: [{ key_code: 'left_arrow' }],
              },
              {
                type: 'basic',
                from: {
                  key_code: 'semicolon',
                  modifiers: {
                    mandatory: ['fn'],
                    optional: ['any'],
                  },
                },
                to: [{ key_code: 'down_arrow' }],
              },
              {
                type: 'basic',
                from: {
                  key_code: 'quote',
                  modifiers: {
                    mandatory: ['fn'],
                    optional: ['any'],
                  },
                },
                to: [{ key_code: 'right_arrow' }],
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
