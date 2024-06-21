// JavaScript should be written in ECMAScript 5.1.
// Handful link for key codes: https://github.com/JoshuaManuel/Karabiner-Elements-Key-List
// Docs link for from structure: https://karabiner-elements.pqrs.org/docs/json/complex-modifications-manipulator-definition/from/

function getBasicCapsManipulator(info) {
  return {
    type: info.type || 'basic',
    conditions: info.conditions || [ { 'name': 'caps_lock pressed', 'type': 'variable_if', 'value': 1 } ],
    from: typeof info.from == 'string' ? {
      key_code: info.from,
      modifiers: {
        optional: ['any'],
      },
    } : info.from,
    to: getToKeys()
  };

  function getToKeys() {
    const configKey = info.to
    if (typeof configKey == 'string') {
      return [
        {
          key_code: configKey,
        },
      ]
    } else if (typeof configKey == 'object' && configKey.key) {
      return [
        {
          key_code: configKey.key,
          modifiers: configKey.modifiers || [],
        },
      ]
    } else {
      throw 'To key should be a string or a specific interfaced object, ' + JSON.stringify(info.to) + ' given instead.'
    }
  }
}

function getDockApplicationManipulator(number, applicationName) {
  const normalizedValue = parseInt(number, 10)
  const applicationNameSanitized = applicationName.replace(/\"/g, '')

  if (normalizedValue < 0 || normalizedValue > 9) {
    throw 'Number passed to the getDockApplicationManipulator() function should be a number greater or equal 0 and less than 10'
  }

  return {
    type: 'basic',
    conditions: [{ name: 'caps_lock pressed', type: 'variable_if', value: 1 }],
    from: {
      key_code: String(normalizedValue),
      modifiers: {
        optional: ['any'],
      },
    },
    to: [
      {
        shell_command: 'open -a "' + applicationNameSanitized + '"',
      },
    ],
  }
}

const sections = [
  {
    name: 'Capslock override & caps lock toggle replacement (caps+\\) (required by all other groups)',
    manipulators: [
      {
        from: {
          key_code: 'caps_lock',
          modifiers: {
            optional: ['any'],
          },
        },
        to: [
          {
            set_variable: {
              name: 'caps_lock pressed',
              value: 1,
            },
          },
        ],
        to_after_key_up: [
          {
            set_variable: {
              name: 'caps_lock pressed',
              value: 0,
            },
          },
        ],
        type: 'basic',
      },
      getBasicCapsManipulator({ from: 'backslash', to: 'caps_lock' }),
    ],
  },
  {
    name: 'Typing base (j k l i → arrow keys, h→enter, space→backspace, ;→delete, ,→insert, n→home, m→end, u→pgup, p→pgdn)',
    manipulators: [
      getBasicCapsManipulator({ from: 'j', to: 'left_arrow' }),
      getBasicCapsManipulator({ from: 'k', to: 'down_arrow' }),
      getBasicCapsManipulator({ from: 'l', to: 'right_arrow' }),
      getBasicCapsManipulator({ from: 'i', to: 'up_arrow' }),
      getBasicCapsManipulator({ from: 'h', to: 'return_or_enter' }),
      getBasicCapsManipulator({ from: 'spacebar', to: 'delete_or_backspace' }),
      getBasicCapsManipulator({ from: 'semicolon', to: 'delete_forward' }),
      getBasicCapsManipulator({ from: 'comma', to: 'insert' }),
      getBasicCapsManipulator({ from: 'u', to: 'page_up' }),
      getBasicCapsManipulator({ from: 'o', to: 'page_down' }),
      getBasicCapsManipulator({ from: 'n', to: 'home' }),
      getBasicCapsManipulator({ from: 'm', to: 'end' }),
    ],
  },
  {
    name: 'Typing extras (caps+s→,, caps+d→., caps+w→(, caps+e→), caps+shift+w→{, caps+shift+e→}, caps+a→[, caps+shift+a→])',
    manipulators: [
      getBasicCapsManipulator({ from: { key_code: 'a', modifiers: { mandatory: [ 'left_shift' ] } }, to: 'close_bracket' }),
      getBasicCapsManipulator({ from: 'a', to: 'open_bracket' }),
      getBasicCapsManipulator({ from: 's', to: 'comma' }),
      getBasicCapsManipulator({ from: 'd', to: 'period' }),
      getBasicCapsManipulator({ from: { key_code: 'w', modifiers: { mandatory: [ 'left_shift' ] } }, to: { key: 'open_bracket', modifiers: [ 'left_shift' ] } }),
      getBasicCapsManipulator({ from: { key_code: 'e', modifiers: { mandatory: [ 'left_shift' ] } }, to: { key: 'close_bracket', modifiers: [ 'left_shift' ] } }),
      getBasicCapsManipulator({ from: 'w', to: { key: '9', modifiers: [ 'left_shift' ] } }),
      getBasicCapsManipulator({ from: 'e', to: { key: '0', modifiers: [ 'left_shift' ] } }),
    ],
  },
  {
    name: 'Media keys (caps+f1 → mute, caps+f2→rewind, caps+f3→next track)',
    manipulators: [
      getBasicCapsManipulator({ from: 'f1', to: 'mute' }),
      getBasicCapsManipulator({ from: 'f2', to: 'rewind' }),
      getBasicCapsManipulator({ from: 'f3', to: 'fastforward' }),
    ]
  },
  {
    name: 'os management (caps+t→focus dock, caps+b→focus icon tray, caps+~→pnt screen, caps+r→focus app menu)',
    manipulators: [
      getBasicCapsManipulator({ from: 't', to: { key: 'f3', modifiers: ['left_control'] } }),
      getBasicCapsManipulator({ from: 'b', to: { key: 'f8', modifiers: ['left_control'] } }),
      getBasicCapsManipulator({ from: 'r', to: { key: 'f2', modifiers: ['left_control'] } }),
      getBasicCapsManipulator({ from: 'grave_accent_and_tilde', to: 'print_screen' }),
      getBasicCapsManipulator({ from: 'f12', to: { key: 'f14', modifiers: ['left_command'] } } ) // sign out
    ],
  },
  {
    name: 'Dock app keys (hardcoded for my dock order, sorry!)',
    manipulators: [
      getDockApplicationManipulator(1, 'Firefox'),
      getDockApplicationManipulator(2, 'Google Chrome'),
      getDockApplicationManipulator(3, 'Slack'),
      getDockApplicationManipulator(4, 'Visual Studio Code'),
      getDockApplicationManipulator(5, 'Mail'),
      getDockApplicationManipulator(6, 'Spotify'),
      getDockApplicationManipulator(7, 'iTerm'),
      getDockApplicationManipulator(8, 'Notion'),
      getDockApplicationManipulator(9, 'System Settings'),
      getDockApplicationManipulator(0, 'Calendar'),
    ],
  },
  {
    name: 'Auxillary keys',
    manipulators: [
      getBasicCapsManipulator({ from: 'q', to: 'f18' }),
      getBasicCapsManipulator({ from: 'f', to: 'f17' }),
      getBasicCapsManipulator({ from: 'c', to: 'f16' }),
    ],
  },
]

const json = {
  title: 'Capslock as a modifier key - arrows emulation, media keys, basic os hotkeys (@mlewand)',
  maintainers: ['mlewand'],
  rules: sections.map(function (sectionItem) {
    return {
      description: sectionItem.name,
      manipulators: sectionItem.manipulators || [],
    }
  }),
}

console.log(JSON.stringify(json, null, '  '))
