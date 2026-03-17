// JavaScript should be written in ECMAScript 5.1.

function main() {
  console.log(
    JSON.stringify(
      {
        title: 'Disable alt+spacebar (nonbreaking space)',
        rules: [
          {
            description: 'Change alt+spacebar to spacebar',
            manipulators: [
              {
                type: 'basic',
                from: {
                  key_code: 'spacebar',
                  modifiers: {
                    mandatory: ['left_option'],
                    optional: ['left_shift', 'right_shift'],
                  },
                },
                to: [{ key_code: 'spacebar' }],
              },
              {
                type: 'basic',
                from: {
                  key_code: 'spacebar',
                  modifiers: {
                    mandatory: ['right_option'],
                    optional: ['left_shift', 'right_shift'],
                  },
                },
                to: [{ key_code: 'spacebar' }],
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
