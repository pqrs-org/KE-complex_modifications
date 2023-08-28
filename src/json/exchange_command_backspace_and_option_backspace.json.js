// JavaScript should be written in ECMAScript 5.1.

function main() {
  console.log(
    JSON.stringify(
      {
        title: 'Exchange Command+Backward-Delete (delete current line) and Option+Backward-Delete (delete current word)',
        rules: [
          {
            description: 'Change Command+Backward-Delete and Option+Backward-Delete',
            manipulators: [
              {
                from: {
                  key_code: 'delete_or_backspace',
                  modifiers: {
                    mandatory: ['command'],
                    optional: ['any'],
                  },
                },
                to: [
                  {
                    key_code: 'delete_or_backspace',
                    modifiers: ['option'],
                  },
                ],
                type: 'basic',
              },
            ],
          },
          {
            description: 'Change Option+Backward-Delete to Command+Backward-Delete',
            manipulators: [
              {
                from: {
                  key_code: 'delete_or_backspace',
                  modifiers: {
                    mandatory: ['option'],
                    optional: ['any'],
                  },
                },
                to: [
                  {
                    key_code: 'delete_or_backspace',
                    modifiers: ['command'],
                  },
                ],
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
