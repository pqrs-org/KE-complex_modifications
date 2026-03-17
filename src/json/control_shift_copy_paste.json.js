// JavaScript should be written in ECMAScript 5.1.

const karabiner = require('../lib/karabiner')

function main() {
  console.log(
    JSON.stringify(
      {
        title: 'Map Control_Shift + C/V to copy/paste in term (ala Linux)',
        maintainers: ['jjo'],
        rules: [
          {
            description: 'Map Control_Shift + C/V to copy/paste in term (ala Linux)',
            manipulators: [
              {
                type: 'basic',
                conditions: [
                  {
                    type: 'frontmost_application_if',
                    bundle_identifiers: karabiner.bundleIdentifiers.terminal,
                  },
                ],
                from: {
                  key_code: 'c',
                  modifiers: {
                    mandatory: ['control', 'left_shift'],
                    optional: ['any'],
                  },
                },
                to: [{ key_code: 'c', modifiers: ['command'] }],
              },
              {
                type: 'basic',
                conditions: [
                  {
                    type: 'frontmost_application_if',
                    bundle_identifiers: karabiner.bundleIdentifiers.terminal,
                  },
                ],
                from: {
                  key_code: 'v',
                  modifiers: {
                    mandatory: ['control', 'left_shift'],
                    optional: ['any'],
                  },
                },
                to: [{ key_code: 'v', modifiers: ['command'] }],
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
