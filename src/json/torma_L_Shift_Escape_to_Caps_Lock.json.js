// JavaScript should be written in ECMAScript 5.1.
const title = 'Map Left Shift + Esc -> Caps Lock';
const maintainers = ['alextorma'];
function main() {
  console.log(
    JSON.stringify(
      {
        title,
        maintainers,
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
          description: title,
          from: {
            key_code: 'escape',
            modifiers: {
              mandatory: ['left_shift'],
              optional: ['any'],
            },
          },
          to: [{ key_code: 'caps_lock' }],
          type: 'basic',
        },
      ],
    },
  ]
}

if (__main.endsWith('/torma_L_Shift_Escape_to_Caps_Lock.json.js')) {
  main()
} else {
  exports.rules = rules()
}
