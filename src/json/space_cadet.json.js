// JavaScript should be written in ECMAScript 5.1.

function main() {
  console.log(
    JSON.stringify(
      {
        title: 'Modern Space Cadet (rev 3)',
        rules: [
          {
            description: 'Caps Lock to Escape on single press, Control on press and hold.',
            manipulators: [
              {
                type: 'basic',
                from: { key_code: 'caps_lock', modifiers: { optional: ['any'] } },
                to: [{ key_code: 'left_control' }],
                to_if_alone: [{ key_code: 'escape' }],
              },
            ],
          },
          {
            description: "Control to Caps Lock on single press, 'Hyper Key' on press and hold. (rev 2)",
            manipulators: [
              {
                type: 'basic',
                from: { key_code: 'left_control', modifiers: { optional: ['any'] } },
                to: [{ key_code: 'left_shift', modifiers: ['left_command', 'left_control', 'left_option'] }],
                to_if_alone: [{ key_code: 'caps_lock', hold_down_milliseconds: 500 }],
              },
            ],
          },
          {
            description: 'Better Shifting: Parentheses on shift keys',
            manipulators: [
              {
                type: 'basic',
                from: { key_code: 'left_shift' },
                to: [{ key_code: 'left_shift' }],
                to_if_alone: [{ key_code: '9', modifiers: ['left_shift'] }],
              },
              {
                type: 'basic',
                from: { key_code: 'right_shift' },
                to: [{ key_code: 'right_shift' }],
                to_if_alone: [{ key_code: '0', modifiers: ['right_shift'] }],
              },
            ],
          },
          {
            description: 'Better Shifting: Shift rolls',
            manipulators: [
              {
                type: 'basic',
                from: { key_code: 'left_shift', modifiers: { mandatory: ['right_shift'] } },
                to: [
                  {
                    key_code: 'left_shift',
                  },
                  {
                    key_code: 'right_shift',
                  },
                ],
                to_if_alone: [
                  {
                    key_code: '0',
                    modifiers: ['right_shift', 'left_shift'],
                  },
                  {
                    key_code: '9',
                    modifiers: ['right_shift', 'left_shift'],
                  },
                ],
              },
              {
                type: 'basic',
                from: { key_code: 'right_shift', modifiers: { mandatory: ['left_shift'] } },
                to: [
                  {
                    key_code: 'right_shift',
                  },
                  {
                    key_code: 'left_shift',
                  },
                ],
                to_if_alone: [
                  {
                    key_code: '9',
                    modifiers: ['right_shift'],
                  },
                  {
                    key_code: '0',
                    modifiers: ['right_shift'],
                  },
                ],
              },
            ],
          },
          {
            description: 'Better Shifting: End parenthesis on shift + space',
            manipulators: [
              {
                type: 'basic',
                from: { key_code: 'spacebar', modifiers: { mandatory: ['right_shift'] } },
                to: [
                  {
                    key_code: '0',
                    modifiers: ['right_shift'],
                  },
                  {
                    key_code: 'spacebar',
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
