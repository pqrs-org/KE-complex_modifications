// JavaScript should be written in ECMAScript 5.1.

function main() {
  console.log(
    JSON.stringify(
      {
        title: 'Change caps_lock to fn on press and hold',
        rules: [
          {
            description: 'Change caps_lock to Fn on press and hold',
            manipulators: [
              {
                type: 'basic',
                from: {
                  key_code: 'caps_lock',
                  modifiers: {
                    optional: ['any'],
                  },
                },
                to: [
                  {
                    key_code: 'fn',
                  },
                ],
                to_if_alone: [
                  {
                    key_code: 'caps_lock',
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
