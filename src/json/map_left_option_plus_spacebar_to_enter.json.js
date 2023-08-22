// JavaScript should be written in ECMAScript 5.1.

function main() {
  console.log(
    JSON.stringify(
      {
        title: 'Map Left Option + Spacebar to Enter',
        rules: [
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
        ],
      },
      null,
      '  '
    )
  )
}

if (__filename.endsWith('map_left_option_plus_spacebar_to_enter.json.js')) {
  main()
}
