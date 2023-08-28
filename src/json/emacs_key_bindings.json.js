// JavaScript should be written in ECMAScript 5.1.

const karabiner = require('../lib/karabiner')

function main() {
  const controlKeysRev = 'rev 11'
  const optionKeysRev = 'rev 5'
  const bashStyleRev = 'rev 2'

  console.log(
    JSON.stringify(
      {
        title: 'Emacs key bindings (rev 13)',
        maintainers: ['tekezo'],
        rules: [].concat(
          // generic
          controlKeys({
            type: 'generic',
            description: 'Emacs key bindings [control+keys] (' + controlKeysRev + ')',
            frontmostApplicationUnless: [
              {
                type: 'frontmost_application_unless',
                bundle_identifiers: karabiner.bundleIdentifiers.emacsKeyBindingsException,
              },
            ],
            frontmostApplicationIf: [],
          }),
          optionKeys({
            type: 'generic',
            description: 'Emacs key bindings [option+keys] (' + optionKeysRev + ')',
            frontmostApplicationUnless: [
              {
                type: 'frontmost_application_unless',
                bundle_identifiers: karabiner.bundleIdentifiers.emacsKeyBindingsException,
              },
            ],
            frontmostApplicationIf: [],
          }),
          cxKeyStrokes(),
          bashStyle({
            type: 'generic',
            description: 'Bash style Emacs key bindings (' + bashStyleRev + ')',
            frontmostApplicationUnless: [
              {
                type: 'frontmost_application_unless',
                bundle_identifiers: karabiner.bundleIdentifiers.emacsKeyBindingsException,
              },
            ],
            frontmostApplicationIf: [],
          }),

          // Visual Studio Code
          controlKeys({
            type: 'visualStudioCode',
            description: 'For Visual Studio Code: Emacs key bindings [control+keys] (' + controlKeysRev + ')',
            frontmostApplicationUnless: [],
            frontmostApplicationIf: [
              {
                type: 'frontmost_application_if',
                bundle_identifiers: karabiner.bundleIdentifiers.visualStudioCode,
              },
            ],
          }),
          optionKeys({
            type: 'visualStudioCode',
            description: 'For Visual Studio Code: Emacs key bindings [option+keys] (' + optionKeysRev + ')',
            frontmostApplicationUnless: [],
            frontmostApplicationIf: [
              {
                type: 'frontmost_application_if',
                bundle_identifiers: karabiner.bundleIdentifiers.visualStudioCode,
              },
            ],
          }),
          bashStyle({
            type: 'visualStudioCode',
            description: 'For Visual Studio Code: Bash style Emacs key bindings (' + bashStyleRev + ')',
            frontmostApplicationUnless: [],
            frontmostApplicationIf: [
              {
                type: 'frontmost_application_if',
                bundle_identifiers: karabiner.bundleIdentifiers.visualStudioCode,
              },
            ],
          })
        ),
      },
      null,
      '  '
    )
  )
}

function cxKeyStrokes() {
  return {
    description: 'Emacs key bindings [C-x key strokes] (rev 2)',
    manipulators: [
      // C-x C-c (quit)
      {
        type: 'basic',
        from: {
          key_code: 'c',
          modifiers: {
            mandatory: ['control'],
            optional: ['caps_lock'],
          },
        },
        to: [
          {
            key_code: 'q',
            modifiers: ['left_command'],
          },
        ],
        conditions: [
          {
            type: 'variable_if',
            name: 'C-x',
            value: 1,
          },
        ],
      },

      // C-x C-f (open file)
      {
        type: 'basic',
        from: {
          key_code: 'f',
          modifiers: {
            mandatory: ['control'],
            optional: ['caps_lock'],
          },
        },
        to: [
          {
            key_code: 'o',
            modifiers: ['left_command'],
          },
        ],
        conditions: [
          {
            type: 'variable_if',
            name: 'C-x',
            value: 1,
          },
        ],
      },

      // C-x C-s (save file)
      {
        type: 'basic',
        from: {
          key_code: 's',
          modifiers: {
            mandatory: ['control'],
            optional: ['caps_lock'],
          },
        },
        to: [
          {
            key_code: 's',
            modifiers: ['left_command'],
          },
        ],
        conditions: [
          {
            type: 'variable_if',
            name: 'C-x',
            value: 1,
          },
        ],
      },

      // Ignore other keys after C-x
      {
        type: 'basic',
        from: {
          any: 'key_code',
          modifiers: {
            optional: ['any'],
          },
        },
        conditions: [
          {
            type: 'variable_if',
            name: 'C-x',
            value: 1,
          },
        ],
      },

      // C-x
      {
        type: 'basic',
        from: {
          key_code: 'x',
          modifiers: {
            mandatory: ['control'],
            optional: ['caps_lock'],
          },
        },
        to: [
          {
            set_variable: {
              name: 'C-x',
              value: 1,
            },
          },
        ],
        to_delayed_action: {
          to_if_invoked: [
            {
              set_variable: {
                name: 'C-x',
                value: 0,
              },
            },
          ],
          to_if_canceled: [
            {
              set_variable: {
                name: 'C-x',
                value: 0,
              },
            },
          ],
        },
        conditions: [
          {
            type: 'frontmost_application_unless',
            bundle_identifiers: karabiner.bundleIdentifiers.emacsKeyBindingsException,
          },
        ],
      },
    ],
  }
}

function controlKeys(options) {
  const result = {
    description: options.description,
    manipulators: [
      {
        type: 'basic',
        from: {
          key_code: 'd',
          modifiers: {
            mandatory: ['control'],
            optional: ['caps_lock', 'option'],
          },
        },
        to: [{ key_code: 'delete_forward' }],
        conditions: [].concat(options.frontmostApplicationUnless, options.frontmostApplicationIf),
      },
      {
        type: 'basic',
        from: {
          key_code: 'h',
          modifiers: {
            mandatory: ['control'],
            optional: ['caps_lock', 'option'],
          },
        },
        to: [{ key_code: 'delete_or_backspace' }],
        conditions: [].concat(options.frontmostApplicationUnless, options.frontmostApplicationIf),
      },
      {
        type: 'basic',
        from: {
          key_code: 'i',
          modifiers: {
            mandatory: ['control'],
            optional: ['caps_lock', 'shift'],
          },
        },
        to: [{ key_code: 'tab' }],
        conditions: [].concat(options.frontmostApplicationUnless, options.frontmostApplicationIf),
      },
      {
        type: 'basic',
        from: {
          key_code: 'open_bracket',
          modifiers: {
            mandatory: ['control'],
            optional: ['caps_lock'],
          },
        },
        to: [{ key_code: 'escape' }],
        // Skip options.frontmostApplicationUnless in order to enable escape key anywhere.
        conditions: [
          {
            type: 'keyboard_type_if',
            keyboard_types: ['ansi', 'iso'],
          },
        ].concat(options.frontmostApplicationIf),
      },
      {
        type: 'basic',
        from: {
          key_code: 'close_bracket',
          modifiers: {
            mandatory: ['control'],
            optional: ['caps_lock'],
          },
        },
        to: [{ key_code: 'escape' }],
        // Skip options.frontmostApplicationUnless in order to enable escape key anywhere.
        conditions: [
          {
            type: 'keyboard_type_if',
            keyboard_types: ['jis'],
          },
        ].concat(options.frontmostApplicationIf),
      },
      {
        type: 'basic',
        from: {
          key_code: 'm',
          modifiers: {
            mandatory: ['control'],
            optional: ['caps_lock', 'shift', 'option'],
          },
        },
        to: [{ key_code: 'return_or_enter' }],
        // Skip options.frontmostApplicationUnless in order to enable return_or_enter key anywhere.
        conditions: options.frontmostApplicationIf,
      },
      {
        type: 'basic',
        from: {
          key_code: 'b',
          modifiers: {
            mandatory: ['control'],
            optional: ['caps_lock', 'shift', 'option'],
          },
        },
        to: [{ key_code: 'left_arrow' }],
        conditions: [].concat(options.frontmostApplicationUnless, options.frontmostApplicationIf),
      },
      {
        type: 'basic',
        from: {
          key_code: 'f',
          modifiers: {
            mandatory: ['control'],
            optional: ['caps_lock', 'shift', 'option'],
          },
        },
        to: [{ key_code: 'right_arrow' }],
        conditions: [].concat(options.frontmostApplicationUnless, options.frontmostApplicationIf),
      },
      {
        type: 'basic',
        from: {
          key_code: 'n',
          modifiers: {
            mandatory: ['control'],
            optional: ['caps_lock', 'shift', 'option'],
          },
        },
        to: [{ key_code: 'down_arrow' }],
        conditions: [].concat(options.frontmostApplicationUnless, options.frontmostApplicationIf),
      },
      {
        type: 'basic',
        from: {
          key_code: 'p',
          modifiers: {
            mandatory: ['control'],
            optional: ['caps_lock', 'shift', 'option'],
          },
        },
        to: [{ key_code: 'up_arrow' }],
        conditions: [].concat(options.frontmostApplicationUnless, options.frontmostApplicationIf),
      },
      {
        type: 'basic',
        from: {
          key_code: 'v',
          modifiers: {
            mandatory: ['control'],
            optional: ['caps_lock', 'shift'],
          },
        },
        to: [{ key_code: 'page_down' }],
        conditions: [].concat(options.frontmostApplicationUnless, options.frontmostApplicationIf),
      },
      {
        type: 'basic',
        from: {
          key_code: 'a',
          modifiers: {
            mandatory: ['control'],
            optional: ['caps_lock', 'shift'],
          },
        },
        to: [{ key_code: 'home' }],
        conditions: [
          {
            type: 'frontmost_application_if',
            bundle_identifiers: karabiner.bundleIdentifiers.microsoftOffice,
          },
        ].concat(options.frontmostApplicationIf),
      },
      {
        type: 'basic',
        from: {
          key_code: 'e',
          modifiers: {
            mandatory: ['control'],
            optional: ['caps_lock', 'shift'],
          },
        },
        to: [{ key_code: 'end' }],
        conditions: [
          {
            type: 'frontmost_application_if',
            bundle_identifiers: karabiner.bundleIdentifiers.microsoftOffice,
          },
        ].concat(options.frontmostApplicationIf),
      },
      {
        type: 'basic',
        from: {
          key_code: 'k',
          modifiers: {
            mandatory: ['control'],
            optional: ['caps_lock', 'shift'],
          },
        },
        to: [
          {
            key_code: 'end',
            modifiers: ['left_shift'],
          },
          {
            key_code: 'delete_forward',
          },
        ],
        conditions: [
          {
            type: 'frontmost_application_if',
            bundle_identifiers: karabiner.bundleIdentifiers.microsoftOffice,
          },
        ].concat(options.frontmostApplicationIf),
      },
      {
        type: 'basic',
        from: {
          key_code: 'a',
          modifiers: {
            mandatory: ['control'],
            optional: ['caps_lock', 'shift'],
          },
        },
        to: [
          {
            key_code: 'left_arrow',
            modifiers: ['left_command'],
          },
        ],
        conditions: [
          {
            type: 'frontmost_application_if',
            bundle_identifiers: karabiner.bundleIdentifiers.eclipse,
          },
        ].concat(options.frontmostApplicationIf),
      },
      {
        type: 'basic',
        from: {
          key_code: 'e',
          modifiers: {
            mandatory: ['control'],
            optional: ['caps_lock', 'shift'],
          },
        },
        to: [
          {
            key_code: 'right_arrow',
            modifiers: ['left_command'],
          },
        ],
        conditions: [
          {
            type: 'frontmost_application_if',
            bundle_identifiers: karabiner.bundleIdentifiers.eclipse,
          },
        ].concat(options.frontmostApplicationIf),
      },
    ],
  }

  if (options.type === 'visualStudioCode') {
    result.manipulators = result.manipulators.concat([
      {
        type: 'basic',
        from: {
          key_code: 'a',
          modifiers: {
            mandatory: ['control'],
            optional: ['caps_lock', 'shift'],
          },
        },
        to: [
          {
            key_code: 'left_arrow',
            modifiers: ['left_command'],
          },
        ],
        conditions: [
          {
            type: 'frontmost_application_if',
            bundle_identifiers: karabiner.bundleIdentifiers.visualStudioCode,
          },
        ],
      },
      {
        type: 'basic',
        from: {
          key_code: 'e',
          modifiers: {
            mandatory: ['control'],
            optional: ['caps_lock', 'shift'],
          },
        },
        to: [
          {
            key_code: 'right_arrow',
            modifiers: ['left_command'],
          },
        ],
        conditions: [
          {
            type: 'frontmost_application_if',
            bundle_identifiers: karabiner.bundleIdentifiers.visualStudioCode,
          },
        ],
      },
    ])
  }

  return removeEmptyConditions(result)
}

function optionKeys(options) {
  const result = {
    description: options.description,
    manipulators: [
      {
        type: 'basic',
        from: {
          key_code: 'v',
          modifiers: {
            mandatory: ['option'],
            optional: ['caps_lock', 'shift'],
          },
        },
        to: [{ key_code: 'page_up' }],
        conditions: [].concat(options.frontmostApplicationUnless, options.frontmostApplicationIf),
      },
      {
        type: 'basic',
        from: {
          key_code: 'b',
          modifiers: {
            mandatory: ['option'],
            optional: ['caps_lock', 'shift'],
          },
        },
        to: [{ key_code: 'left_arrow', modifiers: ['left_option'] }],
        conditions: [].concat(options.frontmostApplicationUnless, options.frontmostApplicationIf),
      },
      {
        type: 'basic',
        from: {
          key_code: 'f',
          modifiers: {
            mandatory: ['option'],
            optional: ['caps_lock', 'shift'],
          },
        },
        to: [{ key_code: 'right_arrow', modifiers: ['left_option'] }],
        conditions: [].concat(options.frontmostApplicationUnless, options.frontmostApplicationIf),
      },
      {
        type: 'basic',
        from: {
          key_code: 'd',
          modifiers: {
            mandatory: ['option'],
            optional: ['caps_lock'],
          },
        },
        to: [{ key_code: 'delete_forward', modifiers: ['left_option'] }],
        conditions: [].concat(options.frontmostApplicationUnless, options.frontmostApplicationIf),
      },
    ],
  }

  return removeEmptyConditions(result)
}

function bashStyle(options) {
  const result = {
    description: options.description,
    manipulators: [
      {
        type: 'basic',
        from: {
          key_code: 'w',
          modifiers: {
            mandatory: ['control'],
            optional: ['caps_lock'],
          },
        },
        to: [{ key_code: 'delete_or_backspace', modifiers: ['left_option'] }],
        conditions: [].concat(options.frontmostApplicationUnless, options.frontmostApplicationIf),
      },
      {
        type: 'basic',
        from: {
          key_code: 'u',
          modifiers: {
            mandatory: ['control'],
            optional: ['caps_lock'],
          },
        },
        to: [
          {
            key_code: 'left_arrow',
            modifiers: ['left_command', 'left_shift'],
          },
          {
            key_code: 'delete_or_backspace',
            repeat: false,
          },
        ],
        conditions: [].concat(options.frontmostApplicationUnless, options.frontmostApplicationIf),
      },
    ],
  }

  return removeEmptyConditions(result)
}

function removeEmptyConditions(data) {
  data.manipulators = data.manipulators.map(function (m) {
    if (m.conditions !== undefined && m.conditions.length === 0) {
      delete m.conditions
    }

    return m
  })

  return data
}

main()
