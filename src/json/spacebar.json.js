// JavaScript should be written in ECMAScript 5.1.

function main() {
  console.log(
    JSON.stringify(
      {
        title: 'Change spacebar',
        rules: [
          {
            description: 'Change spacebar to left_shift if pressed with other keys (Post spacebar when pressed alone)',
            manipulators: [
              {
                type: 'basic',
                from: { key_code: 'spacebar', modifiers: { optional: ['any'] } },
                to: [{ key_code: 'left_shift' }],
                to_if_alone: [{ key_code: 'spacebar' }],
              },
            ],
          },
          {
            description: 'Change spacebar to left_ctrl if pressed with other keys (Post spacebar when pressed alone)',
            manipulators: [
              {
                from: { key_code: 'spacebar', modifiers: { optional: ['any'] } },
                to: [{ key_code: 'left_control' }],
                to_if_alone: [{ key_code: 'spacebar' }],
                type: 'basic',
              },
            ],
          },
          {
            description: 'Change spacebar to left_option if pressed with other keys (Post spacebar when pressed alone)',
            manipulators: [
              {
                from: { key_code: 'spacebar', modifiers: { optional: ['any'] } },
                to: [{ key_code: 'left_option' }],
                to_if_alone: [{ key_code: 'spacebar' }],
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
