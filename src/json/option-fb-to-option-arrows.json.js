// JavaScript should be written in ECMAScript 5.1.

function main() {
  console.log(
    JSON.stringify(
      {
        title: 'Change option + f/b to option + left arrow/right arrow',
        rules: [
          {
            description: 'option + f/b to option + arrows',
            manipulators: [
              {
                type: 'basic',
                from: { key_code: 'f', modifiers: { mandatory: ['option'] } },
                to: [{ key_code: 'right_arrow', modifiers: ['option'] }],
              },
              {
                type: 'basic',
                from: { key_code: 'b', modifiers: { mandatory: ['option'] } },
                to: [{ key_code: 'left_arrow', modifiers: ['option'] }],
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
