// JavaScript should be written in ECMAScript 5.1.

function main() {
  console.log(
    JSON.stringify(
      {
        title: 'Personal rules (@rubocoptero)',
        rules: [
          {
            description: 'Change right_option to shift+control+f13',
            manipulators: [
              {
                type: 'basic',
                from: { key_code: 'right_option', modifiers: { optional: ['any'] } },
                to: [{ key_code: 'f13', modifiers: ['left_shift', 'left_control'] }],
              },
            ],
          },
          {
            description: 'Change application to shift+control+f13',
            manipulators: [
              {
                type: 'basic',
                from: { key_code: 'application', modifiers: { optional: ['any'] } },
                to: [{ key_code: 'f13', modifiers: ['left_shift', 'left_control'] }],
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
