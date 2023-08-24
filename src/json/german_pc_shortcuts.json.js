// JavaScript should be written in ECMAScript 5.1.

const karabiner = require('../lib/karabiner')

function main() {
  console.log(
    JSON.stringify(
      {
        title: 'German PC-Style Shortcuts (Enable various Alt Gr key combinations)',
        rules: [
          {
            description: 'PC-Style German Alt Gr (Backslash, @, pipe, tilde, brackets)',
            manipulators: [
              {
                from: {
                  key_code: 'hyphen',
                  modifiers: {
                    mandatory: ['right_option'],
                    optional: ['any'],
                  },
                },
                to: [{ key_code: '7', modifiers: ['shift', 'left_option'] }],
                type: 'basic',
                conditions: [
                  {
                    type: 'frontmost_application_unless',
                    bundle_identifiers: [].concat(karabiner.bundleIdentifiers.remoteDesktop, karabiner.bundleIdentifiers.virtualMachine),
                  },
                ],
              },
              {
                from: {
                  key_code: 'q',
                  modifiers: {
                    mandatory: ['right_option'],
                    optional: ['any'],
                  },
                },
                to: [{ key_code: 'l', modifiers: ['left_option'] }],
                type: 'basic',
                conditions: [
                  {
                    type: 'frontmost_application_unless',
                    bundle_identifiers: [].concat(karabiner.bundleIdentifiers.remoteDesktop, karabiner.bundleIdentifiers.virtualMachine),
                  },
                ],
              },
              {
                from: {
                  key_code: 'grave_accent_and_tilde',
                  modifiers: {
                    mandatory: ['right_option'],
                    optional: ['any'],
                  },
                },
                to: [{ key_code: '7', modifiers: ['left_option'] }],
                type: 'basic',
                conditions: [
                  {
                    type: 'frontmost_application_unless',
                    bundle_identifiers: [].concat(karabiner.bundleIdentifiers.remoteDesktop, karabiner.bundleIdentifiers.virtualMachine),
                  },
                ],
              },
              {
                from: {
                  key_code: 'close_bracket',
                  modifiers: {
                    mandatory: ['right_option'],
                    optional: ['any'],
                  },
                },
                to: [{ key_code: 'n', modifiers: ['left_option'] }],
                type: 'basic',
                conditions: [
                  {
                    type: 'frontmost_application_unless',
                    bundle_identifiers: [].concat(karabiner.bundleIdentifiers.remoteDesktop, karabiner.bundleIdentifiers.virtualMachine),
                  },
                ],
              },
              {
                from: {
                  key_code: '7',
                  modifiers: {
                    mandatory: ['right_option'],
                    optional: ['any'],
                  },
                },
                to: [{ key_code: '8', modifiers: ['right_option'] }],
                type: 'basic',
                conditions: [
                  {
                    type: 'frontmost_application_unless',
                    bundle_identifiers: [].concat(karabiner.bundleIdentifiers.remoteDesktop, karabiner.bundleIdentifiers.virtualMachine),
                  },
                ],
              },
              {
                from: {
                  key_code: '0',
                  modifiers: {
                    mandatory: ['right_option'],
                    optional: ['any'],
                  },
                },
                to: [{ key_code: '9', modifiers: ['right_option'] }],
                type: 'basic',
                conditions: [
                  {
                    type: 'frontmost_application_unless',
                    bundle_identifiers: [].concat(karabiner.bundleIdentifiers.remoteDesktop, karabiner.bundleIdentifiers.virtualMachine),
                  },
                ],
              },
              {
                from: {
                  key_code: '8',
                  modifiers: {
                    mandatory: ['right_option'],
                    optional: ['any'],
                  },
                },
                to: [{ key_code: '5', modifiers: ['right_option'] }],
                type: 'basic',
                conditions: [
                  {
                    type: 'frontmost_application_unless',
                    bundle_identifiers: [].concat(karabiner.bundleIdentifiers.remoteDesktop, karabiner.bundleIdentifiers.virtualMachine),
                  },
                ],
              },
              {
                from: {
                  key_code: '9',
                  modifiers: {
                    mandatory: ['right_option'],
                    optional: ['any'],
                  },
                },
                to: [{ key_code: '6', modifiers: ['right_option'] }],
                type: 'basic',
                conditions: [
                  {
                    type: 'frontmost_application_unless',
                    bundle_identifiers: [].concat(karabiner.bundleIdentifiers.remoteDesktop, karabiner.bundleIdentifiers.virtualMachine),
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
