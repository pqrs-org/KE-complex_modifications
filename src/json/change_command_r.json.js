// JavaScript should be written in ECMAScript 5.1.

function main() {
  console.log(
    JSON.stringify(
      {
        title: 'Change Command_R Key (Right Command)',
        rules: [
          {
            description: 'Post Escape if Command_R is pressed alone.',
            manipulators: [
              {
                type: 'basic',
                from: {
                  key_code: 'right_command',
                  modifiers: { optional: ['any'] },
                },
                to: [{ key_code: 'right_command' }],
                to_if_alone: [{ key_code: 'escape' }],
              },
            ],
          },
          {
            description: 'Post Escape if Command_R is pressed alone. Control Left if held',
            manipulators: [
              {
                type: 'basic',
                from: {
                  key_code: 'right_command',
                  modifiers: { optional: ['any'] },
                },
                to_if_held_down: [{ key_code: 'left_control' }],
                to_if_alone: [{ key_code: 'escape' }],
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
