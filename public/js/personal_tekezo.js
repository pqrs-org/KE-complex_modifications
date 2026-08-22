// JavaScript should be written in ECMAScript 5.1.
// public/extra_descriptions/personal_tekezo.html mirrors the user-facing
// behavior documented by the section and rule comments in this file.

function main() {
  return {
    description: 'Personal rules (@tekezo) (rev 61)',
    description_notes: ['- Available since Karabiner-Elements 15.2.3.'],
    maintainers: ['tekezo'],
    manipulators: [].concat(
      coreConfiguration(),
      emacs(),
      mouse(),
      extraCursor(),
      holdToRepeatSymbols(),
      // App-specific settings (ordered as in personal_tekezo.html)
      appFinder(),
      appTerminal(),
      appBrowser(),
      appVisualStudioCode(),
      appMicrosoftExcel(),
      appRemoteDesktop()
    ),
  }
}

const bundleIdentifiers = {
  browser: ['^org\\.mozilla\\.firefox$', '^com\\.google\\.Chrome$', '^com\\.apple\\.Safari$'],
  excel: ['^com\\.microsoft\\.Excel$'],
  finder: ['^com\\.apple\\.finder$'],
  remoteDesktop: ['^com\\.microsoft\\.rdc\\.'],
  terminal: ['^com\\.apple\\.Terminal$'],
  visualStudioCode: ['^com\\.microsoft\\.VSCode$'],
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

    // Change left_control to lazy left_control.
    // Post spacebar when pressed alone, or command+` when tapped while holding
    // left_shift or left_command.
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
    // Post spacebar when left_shift is pressed alone.
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

    // Change input sources with left_option+left_command and
    // left_command+left_option.
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

    // Change command+control+g/h to command+[/].
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
    // control + command
    //

    // Switch tabs with command+control+f/j.
    // Excel uses option+left/right; other apps use command+shift+[/].
    // Navigate back/forward with command+control+g/h.

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
          bundle_identifiers: bundleIdentifiers.excel,
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
          bundle_identifiers: bundleIdentifiers.excel,
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

    // Capture a selected area with F13.
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
    // Change control+i/h to tab/delete.
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
  return [
    //
    // mouse_motion_to_scroll (button5)
    //

    // Hold button5 and move the mouse to scroll.
    // Post command+click when button5 is pressed alone.
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
  ]
}

function extraCursor() {
  return [
    // Change left_option+a/e to home/end.
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

function holdToRepeatSymbols() {
  // Hold -/= to type 20 hyphens/equal signs.
  return ['hyphen', 'equal_sign'].map(function (keyCode) {
    const heldDownEvents = []

    for (var i = 0; i < 20; ++i) {
      heldDownEvents.push({ key_code: keyCode })
    }
    heldDownEvents[heldDownEvents.length - 1].repeat = false

    return {
      type: 'basic',
      from: { key_code: keyCode },
      to_if_alone: [{ key_code: keyCode }],
      to_if_held_down: heldDownEvents,
      parameters: {
        'basic.to_if_alone_timeout_milliseconds': 250,
        'basic.to_if_held_down_threshold_milliseconds': 250,
      },
    }
  })
}

function appRemoteDesktop() {
  // Microsoft Remote Desktop
  // Change left_control+h/d to delete/forward delete.
  // Change left_control+i to tab.
  // Change left_control+b/f/n/p to left/right/down/up arrow.
  // Change left_control+a/e to home/end.
  return [
    { from: 'h', to: 'delete_or_backspace', optional: ['caps_lock', 'option'] },
    { from: 'd', to: 'delete_forward', optional: ['caps_lock', 'option'] },
    { from: 'i', to: 'tab', optional: ['caps_lock'] },
    { from: 'b', to: 'left_arrow', optional: ['caps_lock', 'shift', 'option'] },
    { from: 'f', to: 'right_arrow', optional: ['caps_lock', 'shift', 'option'] },
    { from: 'n', to: 'down_arrow', optional: ['caps_lock', 'shift', 'option'] },
    { from: 'p', to: 'up_arrow', optional: ['caps_lock', 'shift', 'option'] },
    { from: 'a', to: 'home', optional: ['caps_lock', 'shift'] },
    { from: 'e', to: 'end', optional: ['caps_lock', 'shift'] },
  ].map(function (definition) {
    return {
      type: 'basic',
      from: {
        key_code: definition.from,
        modifiers: {
          mandatory: ['left_control'],
          optional: definition.optional,
        },
      },
      to: [{ key_code: definition.to }],
      conditions: [
        {
          type: 'frontmost_application_if',
          bundle_identifiers: bundleIdentifiers.remoteDesktop,
        },
      ],
    }
  })
}

function appFinder() {
  return [
    // Finder
    // Disable command+l.
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
          bundle_identifiers: bundleIdentifiers.finder,
        },
      ],
    },

    // Change control+q to command+up arrow (move to the parent folder).
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
          bundle_identifiers: bundleIdentifiers.finder,
        },
      ],
    },
  ]
}

function appTerminal() {
  // Terminal
  // Disable command+d/f/o.
  return ['d', 'f', 'o'].map(function (keyCode) {
    return {
      type: 'basic',
      from: {
        key_code: keyCode,
        modifiers: {
          mandatory: ['command'],
          optional: ['any'],
        },
      },
      conditions: [
        {
          type: 'frontmost_application_if',
          bundle_identifiers: bundleIdentifiers.terminal,
        },
      ],
    }
  })
}

function appBrowser() {
  // Firefox, Google Chrome, and Safari
  // Disable command+d, command+shift+d, and command+shift+i.
  const disabledShortcuts = [
    { keyCode: 'd', modifiers: ['command'] },
    { keyCode: 'd', modifiers: ['command', 'shift'] },
    { keyCode: 'i', modifiers: ['command', 'shift'] },
  ].map(function (definition) {
    return {
      type: 'basic',
      from: {
        key_code: definition.keyCode,
        modifiers: {
          mandatory: definition.modifiers,
          optional: ['caps_lock'],
        },
      },
      conditions: [
        {
          type: 'frontmost_application_if',
          bundle_identifiers: bundleIdentifiers.browser,
        },
      ],
    }
  })

  // Change control+a/e to command+left/right arrow.
  const cursorShortcuts = [
    { from: 'a', to: 'left_arrow' },
    { from: 'e', to: 'right_arrow' },
  ].map(function (definition) {
    return {
      type: 'basic',
      from: {
        key_code: definition.from,
        modifiers: {
          mandatory: ['control'],
          optional: ['caps_lock', 'shift'],
        },
      },
      to: [
        {
          key_code: definition.to,
          modifiers: ['left_command'],
        },
      ],
      conditions: [
        {
          type: 'frontmost_application_if',
          bundle_identifiers: bundleIdentifiers.browser,
        },
      ],
    }
  })

  return disabledShortcuts.concat(cursorShortcuts)
}

function appMicrosoftExcel() {
  // Microsoft Excel
  // Change command+e to F2 (edit the current cell).
  return [
    {
      use_fkeys_as_standard_function_keys: true,
      to: [{ key_code: 'f2' }],
    },
    {
      use_fkeys_as_standard_function_keys: false,
      to: [{ key_code: 'f2', modifiers: ['fn'] }],
    },
  ].map(function (definition) {
    return {
      type: 'basic',
      from: {
        key_code: 'e',
        modifiers: {
          mandatory: ['command'],
          optional: ['caps_lock'],
        },
      },
      to: definition.to,
      conditions: [
        {
          type: 'frontmost_application_if',
          bundle_identifiers: bundleIdentifiers.excel,
        },
        {
          type: 'variable_if',
          name: 'system.use_fkeys_as_standard_function_keys',
          value: definition.use_fkeys_as_standard_function_keys,
        },
      ],
    }
  })
}

function appVisualStudioCode() {
  // Visual Studio Code
  // Change option+n/p to control+page down/up.
  const rules = [
    { from: 'n', to: 'page_down' },
    { from: 'p', to: 'page_up' },
  ].map(function (definition) {
    return {
      type: 'basic',
      from: {
        key_code: definition.from,
        modifiers: {
          mandatory: ['option'],
          optional: ['caps_lock'],
        },
      },
      to: [
        {
          key_code: definition.to,
          modifiers: ['left_control'],
        },
      ],
      conditions: [
        {
          type: 'frontmost_application_if',
          bundle_identifiers: bundleIdentifiers.visualStudioCode,
        },
      ],
    }
  })

  // Disable control+t.
  rules.push({
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
        bundle_identifiers: bundleIdentifiers.visualStudioCode,
      },
    ],
  })

  return rules
}

main()
