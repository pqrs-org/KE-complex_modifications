// JavaScript should be written in ECMAScript 5.1.
const title = 'Map Caps -> Esc (when alone), L_Ctrl (when chorded)';
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
          description: title,
          from: {
            key_code: 'caps_lock',
            modifiers: {
              mandatory: [],
              optional: ['any'],
            },
          },
          to: [{ key_code: 'left_control', lazy: true }],
          to_if_alone: [{ key_code: 'escape' }],
          type: 'basic',
        },
      ],
    },
  ]
}

if (__main.endsWith('/torma_Caps_Lock_to_Escape_or_L_Ctrl_when_Chorded.json.js')) {
  main()
} else {
  exports.rules = rules()
}
