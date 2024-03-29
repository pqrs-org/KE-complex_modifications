// JavaScript should be written in ECMAScript 5.1.

function main() {
  console.log(
    JSON.stringify(
      {
        title: 'Personal rules (@kbdluv) (rev 2)',
        rules: [
          {
            description: 'Post Escape if Command_L is pressed alone.',
            manipulators: [
              {
                type: 'basic',
                from: { key_code: 'left_command', modifiers: { optional: ['any'] } },
                to: [{ key_code: 'left_command', lazy: true }],
                to_if_alone: [{ key_code: 'escape' }],
              },
            ],
          },
          {
            description: 'Post Escape if Command_R is pressed alone.',
            manipulators: [
              {
                type: 'basic',
                from: { key_code: 'right_command', modifiers: { optional: ['any'] } },
                to: [{ key_code: 'right_command', lazy: true }],
                to_if_alone: [{ key_code: 'escape' }],
              },
            ],
          },
          {
            description: 'Post left_control if Spacebar is held down.',
            manipulators: [
              {
                type: 'basic',
                from: { key_code: 'spacebar', modifiers: { optional: ['any'] } },
                to_if_alone: [{ key_code: 'spacebar' }],
                to: [{ key_code: 'left_control', lazy: true }],
              },
            ],
          },
          {
            description: 'Post grave_accent_and_tilde if Caps Lock is pressed alone, left_shift if held down. (rev 2)',
            manipulators: [
              {
                type: 'basic',
                from: { key_code: 'caps_lock', modifiers: { optional: ['any'] } },
                to: [{ key_code: 'left_shift', lazy: true }],
                to_if_alone: [{ key_code: 'grave_accent_and_tilde' }],
              },
            ],
          },
          {
            description: 'Post return_or_enter if Enter is pressed alone, right_shift if held down. (rev 2)',
            manipulators: [
              {
                type: 'basic',
                from: { key_code: 'return_or_enter', modifiers: { optional: ['any'] } },
                to: [{ key_code: 'right_shift', lazy: true }],
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
