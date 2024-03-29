// JavaScript should be written in ECMAScript 5.1.

function main() {
  console.log(
    JSON.stringify(
      {
        title: 'Change Command_L (Left Command) and Command_R (Right Command) to Esc Key ',
        rules: [
          {
            description: 'Change Command_L + Command_R to escape only if pressed at the same time.',
            manipulators: [
              {
                type: 'basic',
                from: {
                  key_code: 'right_command',
                  modifiers: {
                    mandatory: ['left_command'],
                    optional: ['any'],
                  },
                },
                to: [{ key_code: 'escape' }],
                to_if_alone: [{ key_code: 'caps_lock' }],
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
