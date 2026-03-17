// JavaScript should be written in ECMAScript 5.1.

function main() {
  console.log(
    JSON.stringify(
      {
        title: 'Map Left Option + Spacebar to Enter',
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
      description: 'Map Left Option + Spacebar to Enter',
      manipulators: [
        {
          type: 'basic',
          from: {
            modifiers: {
              mandatory: ['left_alt'],
            },
            key_code: 'spacebar',
          },
          to: [
            {
              repeat: true,
              key_code: 'return_or_enter',
            },
          ],
        },
      ],
    },
  ]
}

if (__main.endsWith('/map_left_option_plus_spacebar_to_enter.json.js')) {
  main()
} else {
  exports.rules = rules()
}
