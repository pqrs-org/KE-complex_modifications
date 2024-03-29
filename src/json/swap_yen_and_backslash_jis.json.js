// JavaScript should be written in ECMAScript 5.1.

function main() {
  console.log(
    JSON.stringify(
      {
        title: 'Swap ¥ and \\ always on JIS Keyboards',
        rules: [
          {
            description: 'Change ¥ to Alt+¥',
            manipulators: [
              {
                from: { key_code: 'international3' },
                to: [{ key_code: 'international3', modifiers: ['option'] }],
                type: 'basic',
              },
            ],
          },
          {
            description: 'Change Alt+¥ to ¥',
            manipulators: [
              {
                from: { key_code: 'international3', modifiers: { mandatory: ['option'] } },
                to: [{ key_code: 'international3' }],
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
