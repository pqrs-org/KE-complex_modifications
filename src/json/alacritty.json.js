// JavaScript should be written in ECMAScript 5.1.

function main() {
  console.log(
    JSON.stringify(
      {
        title: 'Map Option to soft-meta for Alacritty',
        rules: rules(),
      },
      null,
      '  '
    )
  )
}

function rules() {
  const modifiers = ['left_option', 'right_option']
  const key_codes = [].concat(
    ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'],
    ['k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't'],
    ['u', 'v', 'w', 'x', 'y', 'z'],
    ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
    [
      'backslash',
      'close_bracket',
      'comma',
      'down_arrow',
      'equal_sign',
      'grave_accent_and_tilde',
      'hyphen',
      'left_arrow',
      'open_bracket',
      'period',
      'right_arrow',
      'semicolon',
      'slash',
      'spacebar',
      'tab',
      'up_arrow',
    ]
  )

  const result = []
  modifiers.forEach(function (modifier) {
    result.push({
      description: 'Map ' + modifier + ' to soft-meta for Alacritty',
      manipulators: [
        {
          type: 'basic',
          from: { key_code: modifier },
          to: [
            {
              key_code: modifier,
              lazy: true,
            },
          ],
          conditions: [
            {
              type: 'frontmost_application_if',
              bundle_identifiers: ['^io\\.alacritty$', '^org\\.alacritty$'],
            },
          ],
        },
      ].concat(
        key_codes.map(function (key_code) {
          return {
            type: 'basic',
            from: {
              key_code: key_code,
              modifiers: {
                mandatory: [modifier],
                optional: ['shift'],
              },
            },
            to: [{ key_code: 'escape', modifiers: [] }, { key_code: key_code }],
            conditions: [
              {
                type: 'frontmost_application_if',
                bundle_identifiers: ['^io\\.alacritty$', '^org\\.alacritty$'],
              },
            ],
          }
        })
      ),
    })
  })

  return result
}

main()
