// JavaScript should be written in ECMAScript 5.1.
const title = 'Map Ctrl+I/J/K/L -> Arrow Keys';
const maintainer = 'torma';

function main() {
  console.log(
    JSON.stringify(
      {
        title,
        maintainer,
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
      description: title,
      manipulators: [
        {
          description: 'Ctrl + i to Up Arrow',
          from: {
            key_code: 'i',
            modifiers: {
              mandatory: ['control'],
            },
          },
          to: [{ key_code: 'up_arrow' }],
          type: 'basic',
        },
        {
          description: 'Ctrl + j to Left Arrow',
          from: {
            key_code: 'j',
            modifiers: {
              mandatory: ['control'],
            },
          },
          to: [{ key_code: 'left_arrow' }],
          type: 'basic',
        },
        {
          description: 'Ctrl + k to Down Arrow',
          from: {
            key_code: 'k',
            modifiers: {
              mandatory: ['control'],
            },
          },
          to: [{ key_code: 'down_arrow' }],
          type: 'basic',
        },
        {
          description: 'Ctrl + l to Up Arrow',
          from: {
            key_code: 'l',
            modifiers: {
              mandatory: ['control'],
            },
          },
          to: [{ key_code: 'right_arrow' }],
          type: 'basic',
        },
      ],
    },
  ]
}

if (__main.endsWith('/torma_CTRL_I_J_K_L_to_Arrows.json.js')) {
  main()
} else {
  exports.rules = rules()
}
