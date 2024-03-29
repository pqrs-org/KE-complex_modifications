// JavaScript should be written in ECMAScript 5.1.

function main() {
  console.log(
    JSON.stringify(
      {
        title: 'F13 to copy & F14 to paste',
        rules: [
          {
            description: 'F13 to Copy',
            manipulators: [
              {
                from: { key_code: 'f13' },
                to: [
                  {
                    key_code: 'c',
                    modifiers: ['command'],
                  },
                ],
                type: 'basic',
              },
            ],
          },
          {
            description: 'F14 to Paste',
            manipulators: [
              {
                from: { key_code: 'f14' },
                to: [
                  {
                    key_code: 'v',
                    modifiers: ['command'],
                  },
                ],
                type: 'basic',
              },
            ],
          },
          {
            description: 'Shift-F14 to Paste and Match Style',
            manipulators: [
              {
                from: {
                  key_code: 'f14',
                  modifiers: {
                    mandatory: ['shift'],
                    optional: ['any'],
                  },
                },
                to: [
                  {
                    key_code: 'v',
                    modifiers: ['option', 'shift', 'command'],
                  },
                ],
                type: 'basic',
              },
            ],
          },
          {
            description: 'F15 to Paste and Match Style',
            manipulators: [
              {
                from: { key_code: 'f15' },
                to: [
                  {
                    key_code: 'v',
                    modifiers: ['option', 'shift', 'command'],
                  },
                ],
                type: 'basic',
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
