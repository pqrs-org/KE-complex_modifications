// JavaScript should be written in ECMAScript 5.1.

function main() {
  console.log(
    JSON.stringify(
      {
        title: 'Swap ¥ and \\ for Japanese Romaji input on US Keyboards',
        rules: [
          {
            description: 'Change Backslash to Alt+Backslash',
            manipulators: [
              {
                from: { key_code: 'backslash' },
                to: [{ key_code: 'backslash', modifiers: ['option'] }],
                type: 'basic',
              },
            ],
          },
          {
            description: 'Change Alt+Backslash to Backslash',
            manipulators: [
              {
                from: { key_code: 'backslash', modifiers: { mandatory: ['option'] } },
                to: [{ key_code: 'backslash' }],
                type: 'basic',
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
