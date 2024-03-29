// JavaScript should be written in ECMAScript 5.1.

function main() {
  console.log(
    JSON.stringify(
      {
        title: 'Exchange semicolon and colon',
        rules: [
          {
            description: 'Exchange semicolon and colon',
            manipulators: [
              {
                type: 'basic',
                from: {
                  key_code: 'semicolon',
                  modifiers: { optional: ['caps_lock'] },
                },
                to: [{ key_code: 'semicolon', modifiers: ['left_shift'] }],
              },
              {
                type: 'basic',
                from: {
                  key_code: 'semicolon',
                  modifiers: { mandatory: ['shift'], optional: ['caps_lock'] },
                },
                to: [{ key_code: 'semicolon' }],
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
