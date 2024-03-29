// JavaScript should be written in ECMAScript 5.1.

function main() {
  console.log(
    JSON.stringify(
      {
        title: 'Command_L|Command_R + Return to Backslash',
        rules: [
          {
            description: 'Command_[L|R] (⌘) + Return (⏎) to Backslash and Command_[L|R] (⌘) + Shift (⇧) + Return (⏎) to Pipe (|)',
            manipulators: [
              {
                type: 'basic',
                from: {
                  key_code: 'return_or_enter',
                  modifiers: {
                    mandatory: ['command'],
                    optional: ['left_shift', 'right_shift'],
                  },
                },
                to: [{ key_code: 'backslash' }],
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
