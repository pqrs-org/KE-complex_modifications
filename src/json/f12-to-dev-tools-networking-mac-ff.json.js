// JavaScript should be written in ECMAScript 5.1.

const karabiner = require('../lib/karabiner')

function main() {
  console.log(
    JSON.stringify(
      {
        title: 'Use F12 to open Dev Tools',
        rules: [
          {
            description: 'Use F12 to open Dev Tools Network Tab (Mac + Firefox)',
            manipulators: [
              {
                type: 'basic',
                from: {
                  key_code: 'f12',
                  modifiers: { optional: ['caps_lock'] },
                },
                to: [
                  {
                    key_code: 'e',
                    modifiers: ['option', 'left_command'],
                  },
                ],
                conditions: [
                  {
                    type: 'frontmost_application_if',
                    bundle_identifiers: ['^org\\.mozilla\\.firefox$'],
                  },
                ],
              },
            ],
          },
          {
            description: 'Use F12 to open Dev Tools (all browsers)',
            manipulators: [
              {
                type: 'basic',
                from: { key_code: 'f12' },
                to: [
                  {
                    key_code: 'i',
                    modifiers: ['option', 'left_command'],
                  },
                ],
                conditions: [
                  {
                    type: 'frontmost_application_if',
                    bundle_identifiers: karabiner.bundleIdentifiers.browser,
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

main()
