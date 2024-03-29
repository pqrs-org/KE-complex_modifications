// JavaScript should be written in ECMAScript 5.1.

function main() {
  console.log(
    JSON.stringify(
      {
        title: 'Change control key',
        rules: [
          {
            description: 'Post escape if left_control is pressed alone.',
            manipulators: [
              {
                type: 'basic',
                from: {
                  key_code: 'left_control',
                  modifiers: { optional: ['any'] },
                },
                to: [{ key_code: 'left_control' }],
                to_if_alone: [{ key_code: 'escape' }],
              },
            ],
          },
          {
            description: 'Post caps_lock if left_control is pressed alone.',
            manipulators: [
              {
                type: 'basic',
                from: {
                  key_code: 'left_control',
                  modifiers: { optional: ['any'] },
                },
                to: [{ key_code: 'left_control' }],
                to_if_alone: [{ key_code: 'caps_lock' }],
              },
            ],
          },
          {
            description: 'Post return_or_enter if right_control is pressed alone.',
            manipulators: [
              {
                type: 'basic',
                from: {
                  key_code: 'right_control',
                  modifiers: { optional: ['any'] },
                },
                to: [{ key_code: 'right_control' }],
                to_if_alone: [{ key_code: 'return_or_enter' }],
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
