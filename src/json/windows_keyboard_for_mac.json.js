// JavaScript should be written in ECMAScript 5.1.

const karabiner = require('../lib/karabiner')

function from(keyCode, mandatory, optional) {
  var result = { key_code: keyCode }
  if ((mandatory && mandatory.length) || (optional && optional.length)) {
    result.modifiers = {}
    if (mandatory && mandatory.length) {
      result.modifiers.mandatory = mandatory
    }
    if (optional && optional.length) {
      result.modifiers.optional = optional
    }
  }
  return result
}

function toKey(keyCode, modifiers, extra) {
  var result = { key_code: keyCode }
  if (modifiers && modifiers.length) {
    result.modifiers = modifiers
  }
  if (extra) {
    Object.keys(extra).forEach(function (key) {
      result[key] = extra[key]
    })
  }
  return result
}

function appIf(bundleIdentifiers) {
  return {
    type: 'frontmost_application_if',
    bundle_identifiers: bundleIdentifiers,
  }
}

function appUnless(bundleIdentifiers) {
  return {
    type: 'frontmost_application_unless',
    bundle_identifiers: bundleIdentifiers,
  }
}

function basic(keyCode, mandatory, to, conditions, description, optional) {
  var result = {
    type: 'basic',
    from: from(keyCode, mandatory || [], optional || ['caps_lock']),
    to: to,
  }
  if (conditions && conditions.length) {
    result.conditions = conditions
  }
  if (description) {
    result.description = description
  }
  return result
}

function main() {
  var remoteBundles = [].concat(
    karabiner.bundleIdentifiers.remoteDesktop,
    karabiner.bundleIdentifiers.virtualMachine,
    karabiner.bundleIdentifiers.vnc,
    [
      '^com\\.microsoft\\.windowsapp$',
      '^com\\.jumpdesktop\\.JumpDesktop$',
      '^tv\\.parsec\\.www$',
    ]
  )
  var terminalBundles = [].concat(karabiner.bundleIdentifiers.terminal, [
    '^com\\.github\\.wez\\.wezterm$',
    '^dev\\.warp\\.Warp$',
    '^dev\\.warp\\.Warp-Stable$',
  ])
  var browserBundles = [].concat(karabiner.bundleIdentifiers.browser, [
    '^com\\.google\\.Chrome\\.beta$',
    '^com\\.google\\.Chrome\\.canary$',
    '^com\\.operasoftware\\.Opera',
    '^company\\.thebrowser\\.Browser$',
  ])
  var finderBundles = karabiner.bundleIdentifiers.finder
  var remoteUnless = appUnless(remoteBundles)
  var genericControlUnless = appUnless(
    remoteBundles.concat(terminalBundles)
  )
  var finderItemConditions = [
    appIf(finderBundles),
    {
      type: 'variable_unless',
      name: 'accessibility.focused_ui_element.role_string',
      value: 0,
    },
    {
      type: 'variable_unless',
      name: 'accessibility.focused_ui_element.role_string',
      value: '',
    },
    {
      type: 'expression_unless',
      expression: "accessibility.focused_ui_element.role_string like 'AXText*'",
    },
  ]
  var manipulators = []

  // Terminal application shortcuts. All other Ctrl chords remain native in
  // terminal applications, including Ctrl+C as Interrupt.
  ;['c', 'v', 'n', 't', 'w'].forEach(function (keyCode) {
    manipulators.push(
      basic(
        keyCode,
        ['control', 'shift'],
        [toKey(keyCode, ['left_command'])],
        [appIf(terminalBundles)],
        'Ctrl+Shift+' + keyCode.toUpperCase() +
          ' uses the corresponding terminal application command.'
      )
    )
  })

  // Global Windows system chords that must run before the generic Ctrl rules.
  manipulators.push(
    basic(
      'escape',
      ['control', 'shift'],
      [
        {
          software_function: {
            open_application: {
              bundle_identifier: 'com.apple.ActivityMonitor',
            },
          },
        },
      ],
      [remoteUnless],
      'Ctrl+Shift+Escape opens Activity Monitor.'
    )
  )
  manipulators.push(
    basic(
      'delete_forward',
      ['control', 'option'],
      [toKey('q', ['left_control', 'left_command'])],
      [remoteUnless],
      'Ctrl+Alt+Delete locks the Mac.'
    )
  )
  ;['3', '4', '5'].forEach(function (keyCode) {
    manipulators.push(
      basic(
        keyCode,
        ['control', 'shift'],
        [toKey(keyCode, ['left_command', 'left_shift'])],
        [remoteUnless],
        'Ctrl+Shift+' + keyCode + ' uses the corresponding macOS screenshot command.'
      )
    )
  })

  // Finder file operations. The Accessibility guards keep filename and search
  // field editing native.
  manipulators.push(
    basic(
      'x',
      ['control'],
      [
        toKey('c', ['left_command']),
        {
          set_variable: {
            name: 'windows_keyboard_for_mac_finder_cut',
            value: 1,
          },
        },
      ],
      finderItemConditions,
      'Ctrl+X marks selected Finder items for moving.'
    )
  )
  manipulators.push(
    basic(
      'v',
      ['control'],
      [
        toKey('v', ['left_command', 'left_option']),
        {
          set_variable: {
            name: 'windows_keyboard_for_mac_finder_cut',
            value: 0,
          },
        },
      ],
      finderItemConditions.concat([
        {
          type: 'variable_if',
          name: 'windows_keyboard_for_mac_finder_cut',
          value: 1,
        },
      ]),
      'Ctrl+V moves Finder items after Ctrl+X.'
    )
  )
  manipulators.push(
    basic(
      'v',
      ['control'],
      [toKey('v', ['left_command'])],
      finderItemConditions.concat([
        {
          type: 'variable_unless',
          name: 'windows_keyboard_for_mac_finder_cut',
          value: 1,
        },
      ]),
      'Ctrl+V remains normal paste when no Finder cut is pending.'
    )
  )
  manipulators.push(
    basic(
      'f2',
      [],
      [toKey('return_or_enter')],
      finderItemConditions,
      'F2 renames the selected Finder item.'
    )
  )
  manipulators.push(
    basic(
      'return_or_enter',
      [],
      [toKey('down_arrow', ['left_command'])],
      finderItemConditions,
      'Enter opens the selected Finder item.'
    )
  )
  manipulators.push(
    basic(
      'delete_forward',
      ['shift'],
      [toKey('delete_or_backspace', ['left_command', 'left_option'])],
      finderItemConditions,
      'Shift+Delete requests immediate Finder deletion.'
    )
  )
  manipulators.push(
    basic(
      'delete_forward',
      [],
      [toKey('delete_or_backspace', ['left_command'])],
      finderItemConditions,
      'Delete moves the selected Finder item to Trash.'
    )
  )
  manipulators.push(
    basic(
      'delete_or_backspace',
      [],
      [toKey('open_bracket', ['left_command'])],
      finderItemConditions,
      'Backspace navigates back in Finder outside text editing.'
    )
  )

  // Windows text navigation and deletion.
  manipulators.push(
    basic('home', ['control', 'shift'], [toKey('up_arrow', ['left_command', 'left_shift'])], [remoteUnless], 'Ctrl+Shift+Home selects to the start of the document.'),
    basic('home', ['control'], [toKey('up_arrow', ['left_command'])], [remoteUnless], 'Ctrl+Home moves to the start of the document.'),
    basic('home', ['shift'], [toKey('left_arrow', ['left_command', 'left_shift'])], [remoteUnless], 'Shift+Home selects to the start of the line.'),
    basic('home', [], [toKey('left_arrow', ['left_command'])], [remoteUnless], 'Home moves to the start of the line.'),
    basic('end', ['control', 'shift'], [toKey('down_arrow', ['left_command', 'left_shift'])], [remoteUnless], 'Ctrl+Shift+End selects to the end of the document.'),
    basic('end', ['control'], [toKey('down_arrow', ['left_command'])], [remoteUnless], 'Ctrl+End moves to the end of the document.'),
    basic('end', ['shift'], [toKey('right_arrow', ['left_command', 'left_shift'])], [remoteUnless], 'Shift+End selects to the end of the line.'),
    basic('end', [], [toKey('right_arrow', ['left_command'])], [remoteUnless], 'End moves to the end of the line.')
  )
  ;['left_arrow', 'right_arrow', 'up_arrow', 'down_arrow'].forEach(function (keyCode) {
    manipulators.push(
      basic(keyCode, ['control', 'shift'], [toKey(keyCode, ['left_option', 'left_shift'])], [remoteUnless], 'Ctrl+Shift+Arrow selects by word or paragraph.'),
      basic(keyCode, ['control'], [toKey(keyCode, ['left_option'])], [remoteUnless], 'Ctrl+Arrow moves by word or paragraph.')
    )
  })
  manipulators.push(
    basic('delete_or_backspace', ['control'], [toKey('delete_or_backspace', ['left_option'])], [remoteUnless], 'Ctrl+Backspace deletes the previous word.'),
    basic('delete_forward', ['control'], [toKey('delete_forward', ['left_option'])], [remoteUnless], 'Ctrl+Delete deletes the next word.'),
    basic('delete_forward', ['shift'], [toKey('delete_forward')], [remoteUnless], 'Shift+Delete deletes the next character in text controls.'),
    basic('insert', ['control'], [toKey('c', ['left_command'])], [remoteUnless], 'Ctrl+Insert copies.'),
    basic('insert', ['shift'], [toKey('v', ['left_command'])], [remoteUnless], 'Shift+Insert pastes.'),
    basic('f4', ['control'], [toKey('w', ['left_command'])], [remoteUnless], 'Ctrl+F4 closes the active document or tab.'),
    basic('y', ['control'], [toKey('z', ['left_command', 'left_shift'])], [genericControlUnless], 'Ctrl+Y performs Redo.')
  )

  // Browser and top-level window behavior.
  manipulators.push(
    basic('f4', ['option'], [toKey('w', ['left_command', 'left_shift'])], [appIf(browserBundles)], 'Alt+F4 closes the current browser window, including all tabs.')
  )
  manipulators.push(
    basic(
      'f4',
      ['option'],
      [
        {
          shell_command:
            "/usr/bin/osascript -e 'tell application id \"com.apple.finder\"' -e 'if (count of Finder windows) > 0 then close front Finder window' -e 'end tell'",
        },
      ],
      [appIf(finderBundles)],
      'Alt+F4 closes the front Finder window regardless of tab count.'
    )
  )
  manipulators.push(
    basic('f5', [], [toKey('r', ['left_command'])], [appIf(browserBundles)], 'F5 reloads the browser page.'),
    basic('f5', ['shift'], [toKey('r', ['left_command', 'left_shift'])], [appIf(browserBundles)], 'Shift+F5 reloads without cache where supported.'),
    basic('tab', ['option', 'shift'], [toKey('tab', ['left_command', 'left_shift'])], [remoteUnless], 'Alt+Shift+Tab switches applications backward.'),
    basic('tab', ['option'], [toKey('tab', ['left_command'])], [remoteUnless], 'Alt+Tab switches applications.'),
    basic('f4', ['option'], [toKey('w', ['left_command'])], [appUnless(remoteBundles.concat(browserBundles, finderBundles))], 'Alt+F4 closes the active window.'),
    basic('left_arrow', ['option'], [toKey('open_bracket', ['left_command'])], [remoteUnless], 'Alt+Left navigates back.'),
    basic('right_arrow', ['option'], [toKey('close_bracket', ['left_command'])], [remoteUnless], 'Alt+Right navigates forward.')
  )

  // Windows-key actions. Standard PC keyboards report the Windows key as
  // Command on macOS, so no modifier swap is required by this edition.
  manipulators.push(
    basic('spacebar', ['command'], [toKey('spacebar', ['left_control'])], [remoteUnless], 'Win+Space invokes the standard macOS next-input-source shortcut.'),
    basic('e', ['command'], [{ software_function: { open_application: { bundle_identifier: 'com.apple.finder' } } }], [remoteUnless], 'Win+E opens Finder.'),
    basic('i', ['command'], [{ software_function: { open_application: { bundle_identifier: 'com.apple.systempreferences' } } }], [remoteUnless], 'Win+I opens System Settings.'),
    basic('r', ['command'], [{ software_function: { open_application: { bundle_identifier: 'com.apple.Spotlight' } } }], [remoteUnless], 'Win+R opens Spotlight.'),
    basic('s', ['command'], [{ software_function: { open_application: { bundle_identifier: 'com.apple.Spotlight' } } }], [remoteUnless], 'Win+S opens Spotlight.'),
    basic('l', ['command'], [toKey('q', ['left_control', 'left_command'])], [remoteUnless], 'Win+L locks the Mac.'),
    basic('tab', ['command'], [toKey('mission_control')], [remoteUnless], 'Win+Tab opens Mission Control.'),
    basic('d', ['command'], [toKey('f11', ['fn'])], [remoteUnless], 'Win+D shows the desktop.'),
    basic('m', ['command'], [toKey('m', ['left_command', 'left_option'])], [remoteUnless], 'Win+M minimizes the active application windows.'),
    basic('period', ['command'], [toKey('spacebar', ['left_control', 'left_command'])], [remoteUnless], 'Win+Period opens Emoji & Symbols.'),
    basic('left_arrow', ['command'], [toKey('left_arrow', ['fn', 'left_control'])], [remoteUnless], 'Win+Left tiles the window left on macOS 15 or newer.'),
    basic('right_arrow', ['command'], [toKey('right_arrow', ['fn', 'left_control'])], [remoteUnless], 'Win+Right tiles the window right on macOS 15 or newer.'),
    basic('up_arrow', ['command'], [toKey('f', ['fn', 'left_control'])], [remoteUnless], 'Win+Up fills the desktop on macOS 15 or newer.'),
    basic('down_arrow', ['command'], [toKey('r', ['fn', 'left_control'])], [remoteUnless], 'Win+Down restores the window on macOS 15 or newer.'),
    basic('s', ['command', 'shift'], [toKey('4', ['left_command', 'left_shift'])], [remoteUnless], 'Win+Shift+S captures a selected area.')
  )

  ;['left_command', 'right_command'].forEach(function (keyCode) {
    var tap = basic(
      keyCode,
      [],
      [toKey(keyCode, [], { lazy: true })],
      [remoteUnless],
      'Tap the Windows key to open Spotlight.',
      []
    )
    tap.to_if_alone = [
      {
        software_function: {
          open_application: { bundle_identifier: 'com.apple.Spotlight' },
        },
      },
    ]
    tap.parameters = { 'basic.to_if_alone_timeout_milliseconds': 250 }
    manipulators.push(tap)
  })

  // Print Screen and F-row compatibility.
  manipulators.push(
    basic('print_screen', ['option'], [toKey('4', ['left_command', 'left_shift']), toKey('spacebar')], [remoteUnless], 'Alt+Print Screen captures a window.'),
    basic('print_screen', [], [toKey('3', ['left_command', 'left_shift'])], [remoteUnless], 'Print Screen captures the full screen.')
  )

  // Explicit Ctrl-to-Command application shortcuts preserve Ctrl+Space,
  // Ctrl+Tab, terminal control sequences, and remote-session modifiers.
  var applicationKeys = karabiner.letters.concat(karabiner.numbers, [
    'hyphen',
    'equal_sign',
    'open_bracket',
    'close_bracket',
    'backslash',
    'semicolon',
    'quote',
    'grave_accent_and_tilde',
    'comma',
    'period',
    'slash',
  ])
  applicationKeys.forEach(function (keyCode) {
    manipulators.push(
      basic(keyCode, ['control', 'shift'], [toKey(keyCode, ['left_command', 'left_shift'])], [genericControlUnless], 'Ctrl+Shift application shortcut.'),
      basic(keyCode, ['control'], [toKey(keyCode, ['left_command'])], [genericControlUnless], 'Ctrl application shortcut.')
    )
  })

  for (var index = 1; index <= 12; index += 1) {
    var functionKey = 'f' + index
    manipulators.push(
      basic(
        functionKey,
        [],
        [toKey(functionKey, ['fn'])],
        [
          {
            type: 'variable_unless',
            name: 'system.use_fkeys_as_standard_function_keys',
            value: true,
          },
        ],
        functionKey.toUpperCase() + ' remains a standard function key when media-key mode is enabled.',
        ['any']
      )
    )
  }

  console.log(
    JSON.stringify(
      {
        title: 'Windows Keyboard for Mac (community edition)',
        maintainers: ['Fuzzy-and-Fluffy'],
        rules: [
          {
            description:
              'Windows Keyboard for Mac: complete Windows-style shortcuts (all keyboards)',
            manipulators: manipulators,
          },
        ],
      },
      null,
      '  '
    )
  )
}

main()
