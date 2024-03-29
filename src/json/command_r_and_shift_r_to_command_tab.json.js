// JavaScript should be written in ECMAScript 5.1.

function main() {
  console.log(
    JSON.stringify(
      {
        title: 'Command_R + Shift_R to Command + Tab',
        rules: [
          {
            description: 'Command_R + Shift_R to Command +Tab',
            manipulators: [
              {
                type: 'basic',
                from: {
                  key_code: 'right_shift',
                  modifiers: {
                    mandatory: ['right_command'],
                  },
                },
                to: {
                  key_code: 'tab',
                  modifiers: ['command'],
                },
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
