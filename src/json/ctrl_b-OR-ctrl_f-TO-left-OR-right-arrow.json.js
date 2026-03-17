// JavaScript should be written in ECMAScript 5.1.

function main() {
  console.log(
    JSON.stringify(
      {
        title: 'Ctrl+b/Ctrl+f to left/right arrows',
        rules: [
          {
            description: 'Map ctrl+b/ctrl+f to left/right arrow',
            manipulators: [
              {
                from: {
                  key_code: 'b',
                  modifiers: { mandatory: ['control'] },
                },
                to: [{ key_code: 'left_arrow' }],
                type: 'basic',
              },
              {
                from: {
                  key_code: 'f',
                  modifiers: { mandatory: ['control'] },
                },
                to: [{ key_code: 'right_arrow' }],
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
