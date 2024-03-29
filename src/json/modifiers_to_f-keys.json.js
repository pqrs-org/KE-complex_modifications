// JavaScript should be written in ECMAScript 5.1.

function main() {
  console.log(
    JSON.stringify(
      {
        title: 'Tapping modifier-keys produces a f-key.',
        rules: [
          {
            description: 'Press left_shift alone produces F12',
            manipulators: [
              {
                type: 'basic',
                from: { key_code: 'left_shift', modifiers: { optional: ['any'] } },
                to: [{ key_code: 'left_shift' }],
                to_if_alone: [{ key_code: 'f12' }],
              },
            ],
          },
          {
            description: 'Press left_control alone produces F13',
            manipulators: [
              {
                type: 'basic',
                from: { key_code: 'left_control', modifiers: { optional: ['any'] } },
                to: [{ key_code: 'left_control' }],
                to_if_alone: [{ key_code: 'f13' }],
              },
            ],
          },
          {
            description: 'Press left_command alone produces F14',
            manipulators: [
              {
                type: 'basic',
                from: { key_code: 'left_command', modifiers: { optional: ['any'] } },
                to: [{ key_code: 'left_command' }],
                to_if_alone: [{ key_code: 'f14' }],
              },
            ],
          },
          {
            description: 'Press left_option alone produces F15',
            manipulators: [
              {
                type: 'basic',
                from: { key_code: 'left_option', modifiers: { optional: ['any'] } },
                to: [{ key_code: 'left_option' }],
                to_if_alone: [{ key_code: 'f15' }],
              },
            ],
          },
          {
            description: 'Press right_control alone produces F16',
            manipulators: [
              {
                type: 'basic',
                from: { key_code: 'right_control', modifiers: { optional: ['any'] } },
                to: [{ key_code: 'right_control' }],
                to_if_alone: [{ key_code: 'f16' }],
              },
            ],
          },
          {
            description: 'Press right_command alone produces F17',
            manipulators: [
              {
                type: 'basic',
                from: { key_code: 'right_command', modifiers: { optional: ['any'] } },
                to: [{ key_code: 'right_command' }],
                to_if_alone: [{ key_code: 'f17' }],
              },
            ],
          },
          {
            description: 'Press right_alt alone produces F18',
            manipulators: [
              {
                type: 'basic',
                from: { key_code: 'right_alt', modifiers: { optional: ['any'] } },
                to: [{ key_code: 'right_alt' }],
                to_if_alone: [{ key_code: 'f18' }],
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
