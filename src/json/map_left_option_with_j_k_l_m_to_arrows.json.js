// JavaScript should be written in ECMAScript 5.1.

function main() {
  console.log(
    JSON.stringify(
      {
        title: 'Map Left Option with j/k/l/m to Arrows',
        rules: [
          {
            description: 'Map Left Option with j/k/l/m to Arrows',
            manipulators: [
              {
                type: 'basic',
                from: { key_code: 'j', modifiers: { mandatory: ['left_option'], optional: ['any'] } },
                to: [{ key_code: 'left_arrow' }],
              },
              {
                type: 'basic',
                from: { key_code: 'k', modifiers: { mandatory: ['left_option'], optional: ['any'] } },
                to: [{ key_code: 'down_arrow' }],
              },
              {
                type: 'basic',
                from: { key_code: 'l', modifiers: { mandatory: ['left_option'], optional: ['any'] } },
                to: [{ key_code: 'up_arrow' }],
              },
              {
                type: 'basic',
                from: { key_code: 'm', modifiers: { mandatory: ['left_option'], optional: ['any'] } },
                to: [{ key_code: 'right_arrow' }],
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
