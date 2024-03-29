// JavaScript should be written in ECMAScript 5.1.

function main() {
  console.log(
    JSON.stringify(
      {
        title: 'PC-Style Modifiers',
        rules: [
          {
            description: 'Swap Command with Ctrl',
            manipulators: [
              {
                type: 'basic',
                from: { key_code: 'left_command', modifiers: { optional: ['any'] } },
                to: [{ key_code: 'left_control' }],
              },
              {
                type: 'basic',
                from: { key_code: 'left_control', modifiers: { optional: ['any'] } },
                to: [{ key_code: 'left_command' }],
              },
              {
                type: 'basic',
                from: { key_code: 'left_shift', modifiers: { optional: ['any'] } },
                to: [{ key_code: 'left_shift', lazy: true }],
              },
              {
                type: 'basic',
                from: { key_code: 'right_command', modifiers: { optional: ['any'] } },
                to: [{ key_code: 'right_control' }],
              },
              {
                type: 'basic',
                from: { key_code: 'right_control', modifiers: { optional: ['any'] } },
                to: [{ key_code: 'right_command' }],
              },
              {
                type: 'basic',
                from: { key_code: 'right_shift', modifiers: { optional: ['any'] } },
                to: [{ key_code: 'right_shift', lazy: true }],
              },
            ],
          },
          {
            description: 'Option+Tab to Command+Tab',
            manipulators: [
              {
                type: 'basic',
                from: { key_code: 'tab', modifiers: { mandatory: ['left_option'], optional: ['any'] } },
                to: [{ key_code: 'tab', modifiers: 'command' }],
              },
              {
                type: 'basic',
                from: { key_code: 'tab', modifiers: { mandatory: ['right_option'], optional: ['any'] } },
                to: [{ key_code: 'tab', modifiers: 'command' }],
              },
            ],
          },
          {
            description: 'Option+Backtick to Command+Backtick',
            manipulators: [
              {
                type: 'basic',
                from: { key_code: 'grave_accent_and_tilde', modifiers: { mandatory: ['left_option'], optional: ['any'] } },
                to: [{ key_code: 'grave_accent_and_tilde', modifiers: 'command' }],
              },
              {
                type: 'basic',
                from: { key_code: 'grave_accent_and_tilde', modifiers: { mandatory: ['right_option'], optional: ['any'] } },
                to: [{ key_code: 'grave_accent_and_tilde', modifiers: 'command' }],
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
