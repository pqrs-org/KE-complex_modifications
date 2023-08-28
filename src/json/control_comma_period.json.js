// JavaScript should be written in ECMAScript 5.1.

function main() {
  console.log(
    JSON.stringify(
      {
        title: 'Change control+comma & control+period',
        rules: [
          {
            description: 'Change control+comma to comma, control+period to period',
            manipulators: [
              {
                type: 'basic',
                from: {
                  key_code: 'comma',
                  modifiers: {
                    mandatory: ['control'],
                    optional: ['caps_lock', 'shift'],
                  },
                },
                to: [
                  {
                    key_code: 'comma',
                  },
                ],
              },
              {
                type: 'basic',
                from: {
                  key_code: 'period',
                  modifiers: {
                    mandatory: ['control'],
                    optional: ['caps_lock', 'shift'],
                  },
                },
                to: [
                  {
                    key_code: 'period',
                  },
                ],
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
