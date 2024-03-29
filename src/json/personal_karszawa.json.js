// JavaScript should be written in ECMAScript 5.1.

function main() {
  console.log(
    JSON.stringify(
      {
        title: 'Personal rules (@karszawa)',
        rules: [
          {
            description: 'Post left_alt + left_arrow (word back) if left_control + , is pressed',
            manipulators: [
              {
                type: 'basic',
                from: { key_code: 'comma', modifiers: { mandatory: ['left_control'], optional: ['any'] } },
                to: [{ key_code: 'left_arrow', modifiers: ['left_alt'] }],
              },
            ],
          },
          {
            description: 'Post left_alt + right_arrow (word proceed) if left_control + . is pressed',
            manipulators: [
              {
                type: 'basic',
                from: { key_code: 'period', modifiers: { mandatory: ['left_control'], optional: ['any'] } },
                to: [{ key_code: 'right_arrow', modifiers: ['left_alt'] }],
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
