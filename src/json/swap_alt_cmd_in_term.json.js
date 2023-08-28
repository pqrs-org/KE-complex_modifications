// JavaScript should be written in ECMAScript 5.1.

const karabiner = require('../lib/karabiner')

function main() {
  console.log(
    JSON.stringify(
      {
        title: 'Swap CMD and Option keys in the terminal (useful for CMD + f/b/d/./_ shell keybindings)',
        maintainers: ['jjo'],
        rules: [
          {
            description: 'Swap CMD and Option keys in the terminal (useful for CMD + f/b/d/./_ shell keybindings)',
            manipulators: [
              {
                type: 'basic',
                conditions: [
                  {
                    type: 'frontmost_application_if',
                    bundle_identifiers: karabiner.bundleIdentifiers.terminal,
                  },
                ],
                from: { key_code: 'left_command', modifiers: { optional: ['any'] } },
                to: [{ key_code: 'left_option' }],
              },
              {
                type: 'basic',
                conditions: [
                  {
                    type: 'frontmost_application_if',
                    bundle_identifiers: karabiner.bundleIdentifiers.terminal,
                  },
                ],
                from: { key_code: 'right_command', modifiers: { optional: ['any'] } },
                to: [{ key_code: 'right_option' }],
              },
              {
                type: 'basic',
                conditions: [
                  {
                    type: 'frontmost_application_if',
                    bundle_identifiers: karabiner.bundleIdentifiers.terminal,
                  },
                ],
                from: { key_code: 'left_option', modifiers: { optional: ['any'] } },
                to: [{ key_code: 'left_command' }],
              },
              {
                type: 'basic',
                conditions: [
                  {
                    type: 'frontmost_application_if',
                    bundle_identifiers: karabiner.bundleIdentifiers.terminal,
                  },
                ],
                from: { key_code: 'right_option', modifiers: { optional: ['any'] } },
                to: [{ key_code: 'right_command' }],
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
