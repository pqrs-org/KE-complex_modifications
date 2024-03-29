// JavaScript should be written in ECMAScript 5.1.

function main() {
  console.log(
    JSON.stringify(
      {
        title: 'Command_L + backslash to slash',
        rules: [
          {
            description: 'Command_L + backslash to slash and Command_L + backslash + left_shift to ? due to dead button',
            manipulators: [
              {
                type: 'basic',
                from: {
                  key_code: 'backslash',
                  modifiers: { mandatory: ['left_command'] },
                },
                to: [{ key_code: 'slash' }],
                to_if_alone: [{ key_code: 'backslash' }],
              },
              {
                type: 'basic',
                from: {
                  key_code: 'backslash',
                  modifiers: {
                    mandatory: ['left_command'],
                    optional: ['left_shift'],
                  },
                },
                to: [{ key_code: 'slash', modifiers: ['left_shift'] }],
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
