// JavaScript should be written in ECMAScript 5.1.

function main() {
  console.log(
    JSON.stringify(
      {
        title: 'Map Left Option with j/k/l/; to Arrows (QWERTY alt)',
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
      description: 'Map Left Option with j/k/l/; to Arrows (QWERTY alt)',
      manipulators: [
        {
          type: 'basic',
          from: {
            key_code: 'j',
            modifiers: {
              mandatory: ['left_option'],
              optional: ['any'],
            },
          },
          to: [
            {
              key_code: 'left_arrow',
            },
          ],
        },
        {
          type: 'basic',
          from: {
            key_code: 'k',
            modifiers: {
              mandatory: ['left_option'],
              optional: ['any'],
            },
          },
          to: [
            {
              key_code: 'down_arrow',
            },
          ],
        },
        {
          type: 'basic',
          from: {
            key_code: 'l',
            modifiers: {
              mandatory: ['left_option'],
              optional: ['any'],
            },
          },
          to: [
            {
              key_code: 'up_arrow',
            },
          ],
        },
        {
          type: 'basic',
          from: {
            key_code: 'semicolon',
            modifiers: {
              mandatory: ['left_option'],
              optional: ['any'],
            },
          },
          to: [
            {
              key_code: 'right_arrow',
            },
          ],
        },
      ],
    },
  ]
}

if (__main.endsWith('/map_left_option_with_j_k_l_semicolon_to_arrows.json.js')) {
  main()
} else {
  exports.rules = rules()
}
