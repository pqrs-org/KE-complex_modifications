// JavaScript should be written in ECMAScript 5.1.

function main() {
  console.log(
    JSON.stringify(
      {
        title: 'Map Ctrl-Backspace to forward Delete (forward delete one character at a time).',
        rules: [
          {
            description: 'Map Ctrl-Backspace to forward Delete (forward delete one character at a time).',
            manipulators: [
              {
                type: 'basic',
                from: {
                  key_code: 'delete_or_backspace',
                  modifiers: { mandatory: ['control'], optional: ['any'] },
                },
                to: [{ key_code: 'delete_forward' }],
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
