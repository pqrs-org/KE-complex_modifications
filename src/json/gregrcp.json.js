// JavaScript should be written in ECMAScript 5.1.

function main() {
  console.log(
    JSON.stringify(
      {
        title: 'keypad_0 to copy & keypad_plus to paste',
        rules: [
          {
            description: 'keypad_0 to Copy',
            manipulators: [
              {
                from: { key_code: 'keypad_0' },
                to: [{ key_code: 'c', modifiers: ['command'] }],
                type: 'basic',
              },
            ],
          },
          {
            description: 'keypad_plus to Paste',
            manipulators: [
              {
                from: { key_code: 'keypad_plus' },
                to: [{ key_code: 'v', modifiers: ['command'] }],
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
