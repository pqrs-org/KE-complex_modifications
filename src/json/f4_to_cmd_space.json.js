// JavaScript should be written in ECMAScript 5.1.

// Maps F4 (defaults to Spotlight search on MacOS) to Command+Space.
// This is useful if you want F4 to use a Spotlight replacement like
// Raycast.

function main() {
  console.log(
    JSON.stringify(
      {
        title: '[macOS] Map F4 to Command+Space',
        rules: [
          {
            description: 'Map F4 to Command+Space',
            manipulators: [
              {
                type: 'basic',
                from: {
                  key_code: 'f4',
                  modifiers: { optional: ['any'] },
                },
                to: [
                  {
                    key_code: 'spacebar',
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
