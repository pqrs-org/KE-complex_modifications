// JavaScript should be written in ECMAScript 5.1.

function main() {
  console.log(
    JSON.stringify(
      {
        title: 'PC-Style Shortcuts',
        rules: [
          {
            description: 'PC-Style Copy(Ctrl+Insert) for JIS keyboard',
            manipulators: [
              {
                type: 'basic',
                from: {
                  key_code: 'insert',
                  modifiers: {
                    mandatory: ['control'],
                    optional: ['any'],
                  },
                },
                to: [
                  {
                    key_code: 'c',
                    modifiers: ['left_command'],
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
