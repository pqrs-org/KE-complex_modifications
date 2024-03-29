// JavaScript should be written in ECMAScript 5.1.

function main() {
  console.log(
    JSON.stringify(
      {
        title: 'Exchange single and double quote',
        rules: [
          {
            description: 'Exchange single and double quote',
            manipulators: [
              {
                type: 'basic',
                from: {
                  key_code: 'quote',
                  modifiers: { optional: ['caps_lock'] },
                },
                to: [{ key_code: 'quote', modifiers: ['left_shift'] }],
              },
              {
                type: 'basic',
                from: {
                  key_code: 'quote',
                  modifiers: { mandatory: ['shift'], optional: ['caps_lock'] },
                },
                to: [{ key_code: 'quote' }],
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
