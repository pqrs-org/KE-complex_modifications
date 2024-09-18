// JavaScript should be written in ECMAScript 5.1.

function main() {
  console.log(
    JSON.stringify(
      {
        title: 'Change return to control',
        rules: [
          {
            description: 'Change return to control if pressed with other keys, to return if pressed alone',
            manipulators: [
              {
                from: {
                  key_code: 'return_or_enter',
                  modifiers: { optional: ['any'] },
                },
                to: [{ key_code: 'right_control' }],
                to_if_alone: [{ key_code: 'return_or_enter' }],
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
