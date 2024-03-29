// JavaScript should be written in ECMAScript 5.1.

function main() {
  console.log(
    JSON.stringify(
      {
        title: 'Change Command_L Key (Left Command)',
        rules: [
          {
            description: 'Change Command_R + Command_L to escape only if pressed at the same time.',
            manipulators: [
              {
                type: 'basic',
                from: {
                  key_code: 'left_command',
                  modifiers: {
                    mandatory: ['right_command'],
                    optional: ['any'],
                  },
                },
                to: [{ key_code: 'escape' }],
                to_if_alone: [{ key_code: 'left_command' }],
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
