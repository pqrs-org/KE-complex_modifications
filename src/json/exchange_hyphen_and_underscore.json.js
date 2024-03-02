// JavaScript should be written in ECMAScript 5.1.

function main() {
  console.log(
    JSON.stringify(
      {
        title: 'Exchange hyphen and underscore',
        rules: [
          {
            description: 'Exchange hyphen and underscore',
            manipulators: [
              {
                type: 'basic',
                from: {
                  key_code: 'hyphen',
                  modifiers: { optional: ['caps_lock'] },
                },
                to: [
                  {
                    key_code: 'hyphen',
                    modifiers: ['left_shift'],
                  },
                ],
              },
              {
                type: 'basic',
                from: {
                  key_code: 'hyphen',
                  modifiers: {
                    mandatory: ['shift'],
                    optional: ['caps_lock'],
                  },
                },
                to: [
                  {
                    key_code: 'hyphen',
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
