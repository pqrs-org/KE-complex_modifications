// JavaScript should be written in ECMAScript 5.1.

function main() {
  console.log(
    JSON.stringify(
      {
        title: 'Change Modifier key + i/j/k/l to arrow keys',
        rules: [
          {
            description: 'Change Control + i/j/k/l to Arrows',
            manipulators: [
              {
                type: 'basic',
                from: {
                  key_code: 'j',
                  modifiers: { mandatory: ['control'], optional: ['any'] },
                },
                to: [{ key_code: 'left_arrow' }],
              },
              {
                type: 'basic',
                from: {
                  key_code: 'k',
                  modifiers: { mandatory: ['control'], optional: ['any'] },
                },
                to: [{ key_code: 'down_arrow' }],
              },
              {
                type: 'basic',
                from: {
                  key_code: 'i',
                  modifiers: { mandatory: ['control'], optional: ['any'] },
                },
                to: [{ key_code: 'up_arrow' }],
              },
              {
                type: 'basic',
                from: {
                  key_code: 'l',
                  modifiers: { mandatory: ['control'], optional: ['any'] },
                },
                to: [{ key_code: 'right_arrow' }],
              },
            ],
          },
          {
            description: 'Change Option + i/j/k/l to Arrows',
            manipulators: [
              {
                type: 'basic',
                from: {
                  key_code: 'j',
                  modifiers: { mandatory: ['option'], optional: ['any'] },
                },
                to: [{ key_code: 'left_arrow' }],
              },
              {
                type: 'basic',
                from: {
                  key_code: 'k',
                  modifiers: { mandatory: ['option'], optional: ['any'] },
                },
                to: [{ key_code: 'down_arrow' }],
              },
              {
                type: 'basic',
                from: {
                  key_code: 'i',
                  modifiers: { mandatory: ['option'], optional: ['any'] },
                },
                to: [{ key_code: 'up_arrow' }],
              },
              {
                type: 'basic',
                from: {
                  key_code: 'l',
                  modifiers: { mandatory: ['option'], optional: ['any'] },
                },
                to: [{ key_code: 'right_arrow' }],
              },
            ],
          },
          {
            description: 'Change Fn + i/j/k/l to Arrows',
            manipulators: [
              {
                type: 'basic',
                from: {
                  key_code: 'j',
                  modifiers: { mandatory: ['fn'], optional: ['any'] },
                },
                to: [{ key_code: 'left_arrow' }],
              },
              {
                type: 'basic',
                from: {
                  key_code: 'k',
                  modifiers: { mandatory: ['fn'], optional: ['any'] },
                },
                to: [{ key_code: 'down_arrow' }],
              },
              {
                type: 'basic',
                from: {
                  key_code: 'i',
                  modifiers: { mandatory: ['fn'], optional: ['any'] },
                },
                to: [{ key_code: 'up_arrow' }],
              },
              {
                type: 'basic',
                from: {
                  key_code: 'l',
                  modifiers: { mandatory: ['fn'], optional: ['any'] },
                },
                to: [{ key_code: 'right_arrow' }],
              },
            ],
          },
          {
            description: 'Change Command + i/j/k/l to Arrows',
            manipulators: [
              {
                type: 'basic',
                from: {
                  key_code: 'j',
                  modifiers: { mandatory: ['command'], optional: ['any'] },
                },
                to: [{ key_code: 'left_arrow' }],
              },
              {
                type: 'basic',
                from: {
                  key_code: 'k',
                  modifiers: { mandatory: ['command'], optional: ['any'] },
                },
                to: [{ key_code: 'down_arrow' }],
              },
              {
                type: 'basic',
                from: {
                  key_code: 'i',
                  modifiers: { mandatory: ['command'], optional: ['any'] },
                },
                to: [{ key_code: 'up_arrow' }],
              },
              {
                type: 'basic',
                from: {
                  key_code: 'l',
                  modifiers: { mandatory: ['command'], optional: ['any'] },
                },
                to: [{ key_code: 'right_arrow' }],
              },
            ],
          },
          {
            description: 'Change Ctrl + i to Cmd + i (italics shortcut)',
            manipulators: [
              {
                type: 'basic',
                from: {
                  key_code: 'i',
                  modifiers: { mandatory: ['control'], optional: ['any'] },
                },
                to: [{ key_code: 'i', modifiers: 'command' }],
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
