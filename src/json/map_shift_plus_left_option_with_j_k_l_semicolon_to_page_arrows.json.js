// JavaScript should be written in ECMAScript 5.1.

function main() {
  console.log(
    JSON.stringify(
      {
        title: 'Map Left Shift plus Left Option with j/k/l/; to Page Arrows (QWERTY alt)',
        rules: rules(),
      },
      null,
      '  '
    )
  )
}

function rules() {
  return [
    {
      description: 'Map Left Shift plus Left Option with j/k/l/; to Page Arrows (QWERTY alt)',
      manipulators: [
        {
          type: 'basic',
          from: {
            key_code: 'k',
            modifiers: {
              mandatory: ['left_option', 'left_shift'],
              optional: ['any'],
            },
          },
          to: [
            {
              key_code: 'down_arrow',
              modifiers: ['fn'],
            },
          ],
        },
        {
          type: 'basic',
          from: {
            key_code: 'l',
            modifiers: {
              mandatory: ['left_option', 'left_shift'],
              optional: ['any'],
            },
          },
          to: [
            {
              key_code: 'up_arrow',
              modifiers: ['fn'],
            },
          ],
        },
      ],
    },
  ]
}

if (__main.endsWith('/map_shift_plus_left_option_with_j_k_l_semicolon_to_page_arrows.json.js')) {
  main()
} else {
  exports.rules = rules()
}
