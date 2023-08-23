// JavaScript should be written in ECMAScript 5.1.

const karabiner = require('../lib/karabiner')

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
  const key_codes = [].concat(karabiner.letters, karabiner.numbers, [
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
  ])

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
