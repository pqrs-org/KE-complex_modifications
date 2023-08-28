// JavaScript should be written in ECMAScript 5.1.

const karabiner = require('../lib/karabiner')

function main() {
  console.log(
    JSON.stringify(
      {
        title: "Czech PC-Style Shortcuts (AltGr+V -> '@', AltGr+Q -> '\\', AltGr+B -> '{', AltGr+N -> '}' etc...)",
        rules: [
          {
            description: "AltGr+1 -> '~'",
            manipulators: [
              {
                from: {
                  key_code: '1',
                  modifiers: {
                    mandatory: ['right_option'],
                    optional: ['any'],
                  },
                },
                to: [{ key_code: '5', modifiers: ['option'] }],
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
          {
            description: "AltGr+3-> '^'",
            manipulators: [
              {
                from: {
                  key_code: '3',
                  modifiers: {
                    mandatory: ['right_option'],
                    optional: ['any'],
                  },
                },
                to: [{ key_code: '6', modifiers: ['option'] }],
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
          {
            description: "AltGr+Q -> '\\'",
            manipulators: [
              {
                from: {
                  key_code: 'q',
                  modifiers: {
                    mandatory: ['right_option'],
                    optional: ['any'],
                  },
                },
                to: [{ key_code: 'grave_accent_and_tilde' }],
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
          {
            description: "AltGr+W -> '|'",
            manipulators: [
              {
                from: {
                  key_code: 'w',
                  modifiers: {
                    mandatory: ['right_option'],
                    optional: ['any'],
                  },
                },
                to: [
                  {
                    key_code: 'grave_accent_and_tilde',
                    modifiers: ['shift'],
                  },
                ],
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
          {
            description: "AltGr+E -> '€'",
            manipulators: [
              {
                from: {
                  key_code: 'e',
                  modifiers: {
                    mandatory: ['right_option'],
                    optional: ['any'],
                  },
                },
                to: [
                  {
                    key_code: 'r',
                    modifiers: ['option'],
                  },
                ],
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
          {
            description: "AltGr+F -> '['",
            manipulators: [
              {
                from: {
                  key_code: 'f',
                  modifiers: {
                    mandatory: ['right_option'],
                    optional: ['any'],
                  },
                },
                to: [
                  {
                    key_code: 'open_bracket',
                    modifiers: ['option'],
                  },
                ],
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
          {
            description: "AltGr+G -> ']'",
            manipulators: [
              {
                from: {
                  key_code: 'g',
                  modifiers: {
                    mandatory: ['right_option'],
                    optional: ['any'],
                  },
                },
                to: [
                  {
                    key_code: 'close_bracket',
                    modifiers: ['option'],
                  },
                ],
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
          {
            description: "AltGr+; -> '$'",
            manipulators: [
              {
                from: {
                  key_code: 'semicolon',
                  modifiers: {
                    mandatory: ['right_option'],
                    optional: ['any'],
                  },
                },
                to: [
                  {
                    key_code: '4',
                    modifiers: ['option'],
                  },
                ],
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
          {
            description: "AltGr+X -> '#'",
            manipulators: [
              {
                from: {
                  key_code: 'x',
                  modifiers: {
                    mandatory: ['right_option'],
                    optional: ['any'],
                  },
                },
                to: [
                  {
                    key_code: '3',
                    modifiers: ['option'],
                  },
                ],
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
          {
            description: "AltGr+C -> '&'",
            manipulators: [
              {
                from: {
                  key_code: 'c',
                  modifiers: {
                    mandatory: ['right_option'],
                    optional: ['any'],
                  },
                },
                to: [
                  {
                    key_code: '7',
                    modifiers: ['option'],
                  },
                ],
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
          {
            description: "AltGr+V -> '@'",
            manipulators: [
              {
                from: {
                  key_code: 'v',
                  modifiers: {
                    mandatory: ['right_option'],
                    optional: ['any'],
                  },
                },
                to: [
                  {
                    key_code: '2',
                    modifiers: ['option'],
                  },
                ],
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
          {
            description: "AltGr+B -> '{'",
            manipulators: [
              {
                from: {
                  key_code: 'b',
                  modifiers: {
                    mandatory: ['right_option'],
                    optional: ['any'],
                  },
                },
                to: [
                  {
                    key_code: '9',
                    modifiers: ['option'],
                  },
                ],
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
          {
            description: "AltGr+N -> '}'",
            manipulators: [
              {
                from: {
                  key_code: 'n',
                  modifiers: {
                    mandatory: ['right_option'],
                    optional: ['any'],
                  },
                },
                to: [
                  {
                    key_code: '0',
                    modifiers: ['option'],
                  },
                ],
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
