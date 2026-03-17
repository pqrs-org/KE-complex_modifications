// JavaScript should be written in ECMAScript 5.1.

const karabiner = require('../lib/karabiner')

function main() {
  console.log(
    JSON.stringify(
      {
        title: 'Use left control key as command key in Microsoft Office',
        rules: [
          {
            description: 'Use left control key as command key in Microsoft Office (rev 1)',
            manipulators: [
              {
                type: 'basic',
                from: { key_code: 'left_control' },
                to: [{ key_code: 'left_command' }],
                conditions: [
                  {
                    type: 'frontmost_application_if',
                    bundle_identifiers: karabiner.bundleIdentifiers.microsoftOffice,
                  },
                ],
              },
            ],
          },
          {
            description: 'Use right control key as command key in Microsoft Office (rev 1)',
            manipulators: [
              {
                type: 'basic',
                from: { key_code: 'right_control' },
                to: [{ key_code: 'right_command' }],
                conditions: [
                  {
                    type: 'frontmost_application_if',
                    bundle_identifiers: karabiner.bundleIdentifiers.microsoftOffice,
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
