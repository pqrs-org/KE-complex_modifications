// JavaScript should be written in ECMAScript 5.1.

function main() {
  console.log(
    JSON.stringify(
      {
        title: 'Command-LR + Esc to Command + `',
        rules: [
          {
            description: 'Command-L/Command-R + Esc to Command + ` ',
            manipulators: [
              {
                type: 'basic',
                from: {
                  key_code: 'escape',
                  modifiers: {
                    mandatory: ['command'],
                  },
                },
                to: [
                  {
                    key_code: 'grave_accent_and_tilde',
                    modifiers: ['command'],
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
