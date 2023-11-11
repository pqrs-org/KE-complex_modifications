// JavaScript should be written in ECMAScript 5.1.

function main() {
  console.log(
    JSON.stringify(
      {
        title: 'Change Poker Keyboard escape behavior',
        rules: [
          {
            description: 'Change left option+escape to escape',
            manipulators: [
              {
                type: 'basic',
                from: { key_code: 'escape', modifiers: { mandatory: ['left_option'], optional: ['any'] } },
                to: [{ key_code: 'escape' }],
              },
            ],
          },
          {
            description: 'Change escape to grave accent and tilde',
            manipulators: [
              {
                type: 'basic',
                from: { key_code: 'escape', modifiers: { optional: ['any'] } },
                to: [{ key_code: 'grave_accent_and_tilde' }],
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
