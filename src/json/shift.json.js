// JavaScript should be written in ECMAScript 5.1.

function main() {
  console.log(
    JSON.stringify(
      {
        title: 'Change shift key (rev 2)',
        rules: [
          {
            description: 'Change left_shift to caps_lock if pressed alone (rev 2)',
            manipulators: [
              {
                type: 'basic',
                from: {
                  key_code: 'left_shift',
                  modifiers: { optional: ['any'] },
                },
                to: [{ key_code: 'left_shift' }],
                to_if_alone: [{ key_code: 'caps_lock', hold_down_milliseconds: 500 }],
              },
            ],
          },
          {
            description: 'Change right_shift to caps_lock if pressed alone',
            manipulators: [
              {
                type: 'basic',
                from: {
                  key_code: 'right_shift',
                  modifiers: { optional: ['any'] },
                },
                to: [{ key_code: 'right_shift' }],
                to_if_alone: [{ key_code: 'caps_lock', hold_down_milliseconds: 500 }],
              },
            ],
          },
          {
            description: 'Toggle caps_lock by pressing left_shift + right_shift at the same time',
            manipulators: [
              {
                type: 'basic',
                from: {
                  key_code: 'left_shift',
                  modifiers: {
                    mandatory: ['right_shift'],
                    optional: ['caps_lock'],
                  },
                },
                to: [{ key_code: 'caps_lock' }],
                to_if_alone: [{ key_code: 'left_shift' }],
              },
              {
                type: 'basic',
                from: {
                  key_code: 'right_shift',
                  modifiers: {
                    mandatory: ['left_shift'],
                    optional: ['caps_lock'],
                  },
                },
                to: [{ key_code: 'caps_lock' }],
                to_if_alone: [{ key_code: 'right_shift' }],
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
