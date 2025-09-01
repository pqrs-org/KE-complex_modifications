// JavaScript should be written in ECMAScript 5.1.

const karabiner = require('../lib/karabiner')

function main() {
  console.log(
    JSON.stringify(
      {
        title: 'Personal rules (@tekezo)',
        maintainers: ['tekezo'],
        rules: [
          {
            description: 'Personal rules (@tekezo) (rev 59)',
            available_since: '15.2.3',
            manipulators: [].concat(
              coreConfiguration(),
              emacs(),
              mouse(),
              extraCursor(),
              holdingHyphen(),
              appVirtualMachine(),
              appFinder(),
              appTerminal(),
              appBrowser(),
              appMicrosoftOffice(),
              appVisualStudioCode()
            ),
          },
        ],
      },
      null,
      '  '
    )
  )
}

function coreConfiguration() {
  return [
    //
    // fn
    //

    // Launch 1Password when fn is pressed alone
    {
      type: 'basic',
      from: {
        key_code: 'fn',
        modifiers: { optional: ['any'] },
      },
      to: [{ key_code: 'fn' }],
      to_if_alone: [
        {
          software_function: {
            open_application: {
              bundle_identifier: 'com.1password.1password',
            },
          },
        },
      ],
      parameters: {
        'basic.to_if_alone_timeout_milliseconds': 250,
      },
    },

    //
    // left_control
    //

    // left_shift+left_control
    {
      type: 'basic',
      from: {
        key_code: 'left_control',
        modifiers: {
          mandatory: ['left_shift'],
          optional: ['any'],
        },
      },
      to: [
        {
          key_code: 'left_control',
          modifiers: ['left_shift'],
          lazy: true,
        },
      ],
      to_if_alone: [
        {
          key_code: 'grave_accent_and_tilde',
          modifiers: ['left_command'],
        },
      ],
      parameters: {
        'basic.to_if_alone_timeout_milliseconds': 250,
      },
    },

    // left_command+left_control
    {
      type: 'basic',
      from: {
        key_code: 'left_control',
        modifiers: {
          mandatory: ['left_command'],
          optional: ['any'],
        },
      },
      to: [
        {
          key_code: 'left_control',
          modifiers: ['left_command'],
          lazy: true,
        },
      ],
      to_if_alone: [
        {
          key_code: 'grave_accent_and_tilde',
          modifiers: ['left_command'],
        },
      ],
      parameters: {
        'basic.to_if_alone_timeout_milliseconds': 250,
      },
    },

    // left_control
    {
      type: 'basic',
      from: {
        key_code: 'left_control',
        modifiers: {
          optional: ['any'],
        },
      },
      to: [
        {
          key_code: 'left_control',
          lazy: true,
        },
      ],
      to_if_alone: [
        {
          key_code: 'spacebar',
        },
      ],
      parameters: {
        'basic.to_if_alone_timeout_milliseconds': 250,
      },
    },

    //
    // left_shift
    //

    // left_shift
    {
      type: 'basic',
      from: {
        key_code: 'left_shift',
        modifiers: {
          optional: ['any'],
        },
      },
      to: [
        {
          key_code: 'left_shift',
        },
      ],
      to_if_alone: [
        {
          key_code: 'spacebar',
        },
      ],
      parameters: {
        'basic.to_if_alone_timeout_milliseconds': 250,
      },
    },

    //
    // left_command, left_option
    //

    // input source switch
    {
      type: 'basic',
      from: {
        key_code: 'left_command',
        modifiers: {
          mandatory: ['left_option'],
          optional: ['any'],
        },
      },
      to: [
        {
          key_code: 'left_command',
          modifiers: ['left_option'],
        },
      ],
      to_if_alone: [
        {
          key_code: 'lang1',
        },
      ],
      parameters: {
        'basic.to_if_alone_timeout_milliseconds': 250,
      },
    },

    {
      type: 'basic',
      from: {
        key_code: 'left_option',
        modifiers: {
          mandatory: ['left_command'],
          optional: ['any'],
        },
      },
      to: [
        {
          key_code: 'left_option',
          modifiers: ['left_command'],
        },
      ],
      to_if_alone: [
        {
          key_code: 'lang2',
        },
      ],
      parameters: {
        'basic.to_if_alone_timeout_milliseconds': 250,
      },
    },

    //
    // command + button2
    //

    {
      type: 'basic',
      from: {
        pointing_button: 'button2',
        modifiers: {
          mandatory: ['command'],
          optional: ['any'],
        },
      },
      to: [
        {
          key_code: 'tab',
          modifiers: ['command'],
        },
      ],
    },

    //
    // control + command
    //

    // command+control+f -> command+shift+[
    // command+control+j -> command+shift+]
    // command+control+g -> command+[
    // command+control+h -> command+]

    //
    // command+control+f
    //

    // Excel (option+left_arrow)
    {
      type: 'basic',
      from: {
        key_code: 'f',
        modifiers: {
          mandatory: ['control', 'command'],
          optional: ['any'],
        },
      },
      to: [
        {
          key_code: 'left_arrow',
          modifiers: ['option'],
        },
      ],
      conditions: [
        {
          type: 'frontmost_application_if',
          bundle_identifiers: ['^com\\.microsoft\\.Excel$'],
        },
      ],
    },
    // General apps (command+shift+[)
    {
      type: 'basic',
      from: {
        key_code: 'f',
        modifiers: {
          mandatory: ['control', 'command'],
          optional: ['any'],
        },
      },
      to: [
        {
          key_code: 'open_bracket',
          modifiers: ['command', 'left_shift'],
        },
      ],
    },

    //
    // command+control+j
    //

    // Excel (option+right_arrow)
    {
      type: 'basic',
      from: {
        key_code: 'j',
        modifiers: {
          mandatory: ['control', 'command'],
          optional: ['any'],
        },
      },
      to: [
        {
          key_code: 'right_arrow',
          modifiers: ['option'],
        },
      ],
      conditions: [
        {
          type: 'frontmost_application_if',
          bundle_identifiers: ['^com\\.microsoft\\.Excel$'],
        },
      ],
    },
    // General apps (command+shift+])
    {
      type: 'basic',
      from: {
        key_code: 'j',
        modifiers: {
          mandatory: ['control', 'command'],
          optional: ['any'],
        },
      },
      to: [
        {
          key_code: 'close_bracket',
          modifiers: ['command', 'left_shift'],
        },
      ],
    },

    {
      type: 'basic',
      from: {
        key_code: 'g',
        modifiers: {
          mandatory: ['control', 'command'],
          optional: ['any'],
        },
      },
      to: [
        {
          key_code: 'open_bracket',
          modifiers: ['command'],
        },
      ],
    },
    {
      type: 'basic',
      from: {
        key_code: 'h',
        modifiers: {
          mandatory: ['control', 'command'],
          optional: ['any'],
        },
      },
      to: [
        {
          key_code: 'close_bracket',
          modifiers: ['command'],
        },
      ],
    },

    // f13 -> command+shift+4
    {
      type: 'basic',
      from: { key_code: 'f13' },
      to: [
        {
          key_code: '4',
          modifiers: ['left_command', 'left_shift'],
        },
      ],
    },
  ]
}

function emacs() {
  return [
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
    },
    {
      type: 'basic',
      from: {
        key_code: 'h',
        modifiers: {
          mandatory: ['control'],
          optional: ['caps_lock', 'shift'],
        },
      },
      to: [{ key_code: 'delete_or_backspace' }],
    },
  ]
}

function mouse() {
  const result = [
    //
    // mouse_motion_to_scroll (button5)
    //

    {
      type: 'basic',
      from: {
        pointing_button: 'button5',
        modifiers: {
          optional: ['any'],
        },
      },
      to: [
        {
          set_variable: {
            name: 'personal_tekezo_enable_mouse_motion_to_scroll',
            value: 1,
            key_up_value: 0,
          },
        },
      ],
      to_if_alone: [
        {
          pointing_button: 'button1',
          modifiers: ['left_command'],
        },
      ],
      parameters: {
        'basic.to_if_alone_timeout_milliseconds': 250,
      },
    },
    {
      type: 'mouse_motion_to_scroll',
      from: {
        modifiers: {
          optional: ['any'],
        },
      },
      conditions: [
        {
          type: 'variable_if',
          name: 'personal_tekezo_enable_mouse_motion_to_scroll',
          value: 1,
        },
      ],
    },
    // button6 -> command + click
    {
      type: 'basic',
      from: {
        pointing_button: 'button6',
      },
      to: [
        {
          pointing_button: 'button1',
          modifiers: ['left_command'],
        },
      ],
    },
  ]

  // hjkl -> fn+arrows
  ;[
    { from: 'h', to: 'left_arrow' },
    { from: 'j', to: 'down_arrow' },
    { from: 'k', to: 'up_arrow' },
    { from: 'l', to: 'right_arrow' },
  ].forEach(function (def) {
    result.push({
      type: 'basic',
      from: {
        key_code: def.from,
        modifiers: {
          optional: ['any'],
        },
      },
      to: [
        {
          key_code: def.to,
          modifiers: ['fn'],
        },
      ],
      conditions: [
        {
          type: 'variable_if',
          name: 'personal_tekezo_enable_mouse_motion_to_scroll',
          value: 1,
        },
      ],
    })
  })

  // ;+jkl -> mouse buttons
  result.push({
    type: 'basic',
    from: {
      key_code: 'semicolon',
      modifiers: {
        optional: ['any'],
      },
    },
    to: [
      {
        set_variable: {
          name: 'personal_tekezo_mouse_buttons',
          value: 1,
          key_up_value: 0,
        },
      },
    ],
    to_if_alone: [
      {
        key_code: 'semicolon',
      },
    ],
    parameters: {
      'basic.to_if_alone_timeout_milliseconds': 250,
    },
  })
  ;[
    { from: 'j', to: [{ pointing_button: 'button1' }] },
    { from: 'k', to: [{ pointing_button: 'button3' }] },
    { from: 'l', to: [{ pointing_button: 'button2' }] },
    { from: 'i', to: [{ software_function: { set_mouse_cursor_position: { screen: 0, x: '50%', y: '50%' } } }] },
  ].forEach(function (def) {
    result.push({
      type: 'basic',
      from: {
        key_code: def.from,
        modifiers: {
          optional: ['any'],
        },
      },
      to: def.to,
      conditions: [
        {
          type: 'variable_if',
          name: 'personal_tekezo_mouse_buttons',
          value: 1,
        },
      ],
    })
  })

  return result
}

function extraCursor() {
  return [
    // option+a,e to home,end
    {
      type: 'basic',
      from: {
        key_code: 'a',
        modifiers: {
          mandatory: ['left_option'],
          optional: ['caps_lock', 'shift'],
        },
      },
      to: [{ key_code: 'home' }],
    },
    {
      type: 'basic',
      from: {
        key_code: 'e',
        modifiers: {
          mandatory: ['left_option'],
          optional: ['caps_lock', 'shift'],
        },
      },
      to: [{ key_code: 'end' }],
    },
  ]
}

function holdingHyphen() {
  // long press -,= to --------------------,====================
  return [
    {
      type: 'basic',
      from: {
        key_code: 'hyphen',
      },
      to_if_alone: [{ key_code: 'hyphen' }],
      to_if_held_down: [
        { key_code: 'hyphen' },
        { key_code: 'hyphen' },
        { key_code: 'hyphen' },
        { key_code: 'hyphen' },
        { key_code: 'hyphen' },
        { key_code: 'hyphen' },
        { key_code: 'hyphen' },
        { key_code: 'hyphen' },
        { key_code: 'hyphen' },
        { key_code: 'hyphen' },

        { key_code: 'hyphen' },
        { key_code: 'hyphen' },
        { key_code: 'hyphen' },
        { key_code: 'hyphen' },
        { key_code: 'hyphen' },
        { key_code: 'hyphen' },
        { key_code: 'hyphen' },
        { key_code: 'hyphen' },
        { key_code: 'hyphen' },
        {
          key_code: 'hyphen',
          repeat: false,
        },
      ],
      parameters: {
        'basic.to_if_alone_timeout_milliseconds': 250,
        'basic.to_if_held_down_threshold_milliseconds': 250,
      },
    },
    {
      type: 'basic',
      from: {
        key_code: 'equal_sign',
      },
      to_if_alone: [{ key_code: 'equal_sign' }],
      to_if_held_down: [
        { key_code: 'equal_sign' },
        { key_code: 'equal_sign' },
        { key_code: 'equal_sign' },
        { key_code: 'equal_sign' },
        { key_code: 'equal_sign' },
        { key_code: 'equal_sign' },
        { key_code: 'equal_sign' },
        { key_code: 'equal_sign' },
        { key_code: 'equal_sign' },
        { key_code: 'equal_sign' },

        { key_code: 'equal_sign' },
        { key_code: 'equal_sign' },
        { key_code: 'equal_sign' },
        { key_code: 'equal_sign' },
        { key_code: 'equal_sign' },
        { key_code: 'equal_sign' },
        { key_code: 'equal_sign' },
        { key_code: 'equal_sign' },
        { key_code: 'equal_sign' },
        {
          key_code: 'equal_sign',
          repeat: false,
        },
      ],
      parameters: {
        'basic.to_if_alone_timeout_milliseconds': 250,
        'basic.to_if_held_down_threshold_milliseconds': 250,
      },
    },
  ]
}

function appVirtualMachine() {
  return [
    {
      type: 'basic',
      from: {
        key_code: 'h',
        modifiers: {
          mandatory: ['left_control'],
          optional: ['caps_lock', 'option'],
        },
      },
      to: [{ key_code: 'delete_or_backspace' }],
      conditions: [
        {
          type: 'frontmost_application_if',
          bundle_identifiers: [].concat(karabiner.bundleIdentifiers.remoteDesktop, karabiner.bundleIdentifiers.virtualMachine),
        },
      ],
    },
    {
      type: 'basic',
      from: {
        key_code: 'd',
        modifiers: {
          mandatory: ['left_control'],
          optional: ['caps_lock', 'option'],
        },
      },
      to: [{ key_code: 'delete_forward' }],
      conditions: [
        {
          type: 'frontmost_application_if',
          bundle_identifiers: [].concat(karabiner.bundleIdentifiers.remoteDesktop, karabiner.bundleIdentifiers.virtualMachine),
        },
      ],
    },
    {
      type: 'basic',
      from: {
        key_code: 'i',
        modifiers: {
          mandatory: ['left_control'],
          optional: ['caps_lock'],
        },
      },
      to: [{ key_code: 'tab' }],
      conditions: [
        {
          type: 'frontmost_application_if',
          bundle_identifiers: [].concat(karabiner.bundleIdentifiers.remoteDesktop, karabiner.bundleIdentifiers.virtualMachine),
        },
      ],
    },
    {
      type: 'basic',
      from: {
        key_code: 'b',
        modifiers: {
          mandatory: ['left_control'],
          optional: ['caps_lock', 'shift', 'option'],
        },
      },
      to: [{ key_code: 'left_arrow' }],
      conditions: [
        {
          type: 'frontmost_application_if',
          bundle_identifiers: [].concat(karabiner.bundleIdentifiers.remoteDesktop, karabiner.bundleIdentifiers.virtualMachine),
        },
      ],
    },
    {
      type: 'basic',
      from: {
        key_code: 'f',
        modifiers: {
          mandatory: ['left_control'],
          optional: ['caps_lock', 'shift', 'option'],
        },
      },
      to: [{ key_code: 'right_arrow' }],
      conditions: [
        {
          type: 'frontmost_application_if',
          bundle_identifiers: [].concat(karabiner.bundleIdentifiers.remoteDesktop, karabiner.bundleIdentifiers.virtualMachine),
        },
      ],
    },
    {
      type: 'basic',
      from: {
        key_code: 'n',
        modifiers: {
          mandatory: ['left_control'],
          optional: ['caps_lock', 'shift', 'option'],
        },
      },
      to: [{ key_code: 'down_arrow' }],
      conditions: [
        {
          type: 'frontmost_application_if',
          bundle_identifiers: [].concat(karabiner.bundleIdentifiers.remoteDesktop, karabiner.bundleIdentifiers.virtualMachine),
        },
      ],
    },
    {
      type: 'basic',
      from: {
        key_code: 'p',
        modifiers: {
          mandatory: ['left_control'],
          optional: ['caps_lock', 'shift', 'option'],
        },
      },
      to: [{ key_code: 'up_arrow' }],
      conditions: [
        {
          type: 'frontmost_application_if',
          bundle_identifiers: [].concat(karabiner.bundleIdentifiers.remoteDesktop, karabiner.bundleIdentifiers.virtualMachine),
        },
      ],
    },
    {
      type: 'basic',
      from: {
        key_code: 'a',
        modifiers: {
          mandatory: ['left_control'],
          optional: ['caps_lock', 'shift'],
        },
      },
      to: [{ key_code: 'home' }],
      conditions: [
        {
          type: 'frontmost_application_if',
          bundle_identifiers: [].concat(karabiner.bundleIdentifiers.remoteDesktop, karabiner.bundleIdentifiers.virtualMachine),
        },
      ],
    },
    {
      type: 'basic',
      from: {
        key_code: 'e',
        modifiers: {
          mandatory: ['left_control'],
          optional: ['caps_lock', 'shift'],
        },
      },
      to: [{ key_code: 'end' }],
      conditions: [
        {
          type: 'frontmost_application_if',
          bundle_identifiers: [].concat(karabiner.bundleIdentifiers.remoteDesktop, karabiner.bundleIdentifiers.virtualMachine),
        },
      ],
    },
  ]
}

function appFinder() {
  return [
    // Disable command+L
    {
      type: 'basic',
      from: {
        key_code: 'l',
        modifiers: {
          mandatory: ['command'],
          optional: ['caps_lock'],
        },
      },
      conditions: [
        {
          type: 'frontmost_application_if',
          bundle_identifiers: karabiner.bundleIdentifiers.finder,
        },
      ],
    },

    // Move to the parent directory by control+Q.
    {
      type: 'basic',
      from: {
        key_code: 'q',
        modifiers: {
          mandatory: ['control'],
          optional: ['caps_lock'],
        },
      },
      to: [
        {
          key_code: 'up_arrow',
          modifiers: ['left_command'],
        },
      ],
      conditions: [
        {
          type: 'frontmost_application_if',
          bundle_identifiers: karabiner.bundleIdentifiers.finder,
        },
      ],
    },
  ]
}

function appTerminal() {
  return [
    // Disable command+d
    {
      type: 'basic',
      from: {
        key_code: 'd',
        modifiers: {
          mandatory: ['command'],
          optional: ['any'],
        },
      },
      conditions: [
        {
          type: 'frontmost_application_if',
          bundle_identifiers: karabiner.bundleIdentifiers.terminal,
        },
      ],
    },

    // Disable command+f
    {
      type: 'basic',
      from: {
        key_code: 'f',
        modifiers: {
          mandatory: ['command'],
          optional: ['any'],
        },
      },
      conditions: [
        {
          type: 'frontmost_application_if',
          bundle_identifiers: karabiner.bundleIdentifiers.terminal,
        },
      ],
    },

    // Disable command+o
    {
      type: 'basic',
      from: {
        key_code: 'o',
        modifiers: {
          mandatory: ['command'],
          optional: ['any'],
        },
      },
      conditions: [
        {
          type: 'frontmost_application_if',
          bundle_identifiers: karabiner.bundleIdentifiers.terminal,
        },
      ],
    },

    // Disable command+w
    {
      type: 'basic',
      from: {
        key_code: 'w',
        modifiers: {
          mandatory: ['command'],
          optional: ['any'],
        },
      },
      conditions: [
        {
          type: 'frontmost_application_if',
          bundle_identifiers: karabiner.bundleIdentifiers.terminal,
        },
      ],
    },

    // Change command+t to option+t
    {
      type: 'basic',
      from: {
        key_code: 't',
        modifiers: {
          mandatory: ['command'],
          optional: ['any'],
        },
      },
      to: {
        key_code: 't',
        modifiers: ['left_option'],
      },
      conditions: [
        {
          type: 'frontmost_application_if',
          bundle_identifiers: karabiner.bundleIdentifiers.terminal,
        },
      ],
    },
  ]
}

function appBrowser() {
  return [
    // Disable command+d (bookmark this tab @ Google Chrome)
    {
      type: 'basic',
      from: {
        key_code: 'd',
        modifiers: {
          mandatory: ['command'],
          optional: ['caps_lock'],
        },
      },
      conditions: [
        {
          type: 'frontmost_application_if',
          bundle_identifiers: karabiner.bundleIdentifiers.browser,
        },
      ],
    },

    // Disable command+shift+d (bookmark all tabs @ Google Chrome)
    {
      type: 'basic',
      from: {
        key_code: 'd',
        modifiers: {
          mandatory: ['command', 'shift'],
          optional: ['caps_lock'],
        },
      },
      conditions: [
        {
          type: 'frontmost_application_if',
          bundle_identifiers: karabiner.bundleIdentifiers.browser,
        },
      ],
    },

    // Disable command+shift+i (share email link @ Google Chrome)
    {
      type: 'basic',
      from: {
        key_code: 'i',
        modifiers: {
          mandatory: ['command', 'shift'],
          optional: ['caps_lock'],
        },
      },
      conditions: [
        {
          type: 'frontmost_application_if',
          bundle_identifiers: karabiner.bundleIdentifiers.browser,
        },
      ],
    },

    // Change control+a,e to command+arrow keys
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
          bundle_identifiers: karabiner.bundleIdentifiers.browser,
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
          bundle_identifiers: karabiner.bundleIdentifiers.browser,
        },
      ],
    },
  ]
}

function appMicrosoftOffice() {
  const rules = []

  // Edit cell by command+e in Excel
  ;[
    {
      use_fkeys_as_standard_function_keys: true,
      to: [{ key_code: 'f2' }],
    },
    {
      use_fkeys_as_standard_function_keys: false,
      to: [{ key_code: 'f2', modifiers: ['fn'] }],
    },
  ].forEach(function (def) {
    rules.push({
      type: 'basic',
      from: {
        key_code: 'e',
        modifiers: {
          mandatory: ['command'],
          optional: ['caps_lock'],
        },
      },
      to: def.to,
      conditions: [
        {
          type: 'frontmost_application_if',
          bundle_identifiers: ['^com\\.microsoft\\.Excel$'],
        },
        {
          type: 'variable_if',
          name: 'system.use_fkeys_as_standard_function_keys',
          value: def.use_fkeys_as_standard_function_keys,
        },
      ],
    })
  })

  return rules
}

function appVisualStudioCode() {
  return [
    // option+n -> control+page_down
    {
      type: 'basic',
      from: {
        key_code: 'n',
        modifiers: {
          mandatory: ['option'],
          optional: ['caps_lock'],
        },
      },
      to: [
        {
          key_code: 'page_down',
          modifiers: ['left_control'],
        },
      ],
      conditions: [
        {
          type: 'frontmost_application_if',
          bundle_identifiers: karabiner.bundleIdentifiers.visualStudioCode,
        },
      ],
    },

    // option+p -> control+page_up
    {
      type: 'basic',
      from: {
        key_code: 'p',
        modifiers: {
          mandatory: ['option'],
          optional: ['caps_lock'],
        },
      },
      to: [
        {
          key_code: 'page_up',
          modifiers: ['left_control'],
        },
      ],
      conditions: [
        {
          type: 'frontmost_application_if',
          bundle_identifiers: karabiner.bundleIdentifiers.visualStudioCode,
        },
      ],
    },

    // disable control+t
    {
      type: 'basic',
      from: {
        key_code: 't',
        modifiers: {
          mandatory: ['control'],
          optional: ['caps_lock'],
        },
      },
      conditions: [
        {
          type: 'frontmost_application_if',
          bundle_identifiers: karabiner.bundleIdentifiers.visualStudioCode,
        },
      ],
    },
  ]
}

main()
