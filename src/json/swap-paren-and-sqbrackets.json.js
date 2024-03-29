// JavaScript should be written in ECMAScript 5.1.

function main() {
  console.log(
    JSON.stringify(
      {
        title: 'Exchange paren and square bracket',
        rules: [
          {
            description: 'Exchange paren and square bracket',
            manipulators: [
              {
                type: 'basic',
                from: { key_code: 'open_bracket', modifiers: { optional: ['caps_lock'] } },
                to: [{ key_code: '9', modifiers: ['left_shift'] }],
              },
              {
                type: 'basic',
                from: { key_code: '9', modifiers: { mandatory: ['shift'], optional: ['caps_lock'] } },
                to: [{ key_code: 'open_bracket' }],
              },
              {
                type: 'basic',
                from: { key_code: 'close_bracket', modifiers: { optional: ['caps_lock'] } },
                to: [{ key_code: '0', modifiers: ['left_shift'] }],
              },
              {
                type: 'basic',
                from: { key_code: '0', modifiers: { mandatory: ['shift'], optional: ['caps_lock'] } },
                to: [{ key_code: 'close_bracket' }],
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
