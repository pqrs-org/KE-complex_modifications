// JavaScript should be written in ECMAScript 5.1.

function main() {
  console.log(
    JSON.stringify(
      {
        title: 'Fine volume control (rev 2)',
        rules: [
          {
            description: 'Map volume controls to fine volume controls (Option + Shift + Volume)',
            manipulators: [
              {
                type: 'basic',
                from: { key_code: 'f11' },
                to: [
                  {
                    key_code: 'volume_decrement',
                    modifiers: ['left_shift', 'left_option'],
                  },
                ],
              },
              {
                type: 'basic',
                from: { key_code: 'f11', modifiers: { mandatory: ['fn'] } },
                to: [{ key_code: 'f11', modifiers: ['fn'] }],
              },
              {
                type: 'basic',
                from: { key_code: 'f12' },
                to: [
                  {
                    key_code: 'volume_increment',
                    modifiers: ['left_shift', 'left_option'],
                  },
                ],
              },
              {
                type: 'basic',
                from: { key_code: 'f12', modifiers: { mandatory: ['fn'] } },
                to: [{ key_code: 'f12', modifiers: ['fn'] }],
              },
            ],
          },
          {
            description: 'Map fn + volume controls to fine volume controls (Option + Shift + Volume)',
            manipulators: [
              {
                type: 'basic',
                from: { key_code: 'f11', modifiers: { mandatory: ['fn'] } },
                to: [
                  {
                    key_code: 'volume_decrement',
                    modifiers: ['left_shift', 'left_option'],
                  },
                ],
              },
              {
                type: 'basic',
                from: { key_code: 'f12', modifiers: { mandatory: ['fn'] } },
                to: [
                  {
                    key_code: 'volume_increment',
                    modifiers: ['left_shift', 'left_option'],
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
