// JavaScript should be written in ECMAScript 5.1.

const karabiner = require('../lib/karabiner')

function main() {
  console.log(
    JSON.stringify(
      {
        title: 'Neo2',
        rules: rules()
      },
      null,
      '  '
    )
  )
}

main()

function rules() {
  // halt defaults to 'false'
  const setMod4 = function(value, halt) {
    return { set_variable: { name: 'neo2_mod_4', value: value }, halt: halt === true ? true : undefined }
  }

  const ifMod4On = { type: 'variable_unless', name: 'neo2_mod_4', value: 0 }
  const ifMod4Locked = { type: 'variable_if', name: 'neo2_mod_4', value: 2 }
  const ifMod4NotLocked = { type: 'variable_unless', name: 'neo2_mod_4', value: 2 }
  const isLayoutActive = {
    type: 'input_source_if',
    input_sources: [
      { input_source_id: '^org\\.sil\\.ukelele.keyboardlayout\\.neo.*$' }, // match any layout in the Ukelele Neo bundle
      { input_source_id: '^org\\.unknown\\.keylayout\\.DeutschNeo2$' },
      { input_source_id: '^org\\.unknown\\.keylayout\\.DeutschBone$' },
      { input_source_id: '^org\\.unknown\\.keylayout\\.DeutschNeoQwertz$' },
      { input_source_id: '^org\\.unknown\\.keylayout\\.DeutschADNW$' },
    ],
  }
  const isNotExcludedApp = {
    type: 'frontmost_application_unless',
    bundle_identifiers: ['com.apple.Terminal', 'org.gnu.Emacs', 'com.googlecode.iterm2', 'dev.warp.Warp-Stable', 'com.github.wez.wezterm']
  }

  const neo2Layer4 = function(condition) {
    const l4Mappings = [
      // navigation keys
      { from: 'd', to: 'down_arrow' },
      { from: 'e', to: 'up_arrow' },
      { from: 's', to: 'left_arrow' },
      { from: 'f', to: 'right_arrow' },
      { from: 'q', to: 'page_up' },
      { from: 't', to: 'page_down' },

      // escape
      { from: 'z', to: 'escape' },

      // deletion
      { from: 'w', to: 'delete_or_backspace' },
      { from: 'r', to: 'delete_forward' },

      // Neo num pad in layer 4
      { from: 'm', to: 'keypad_1' },
      { from: 'comma', to: 'keypad_2' },
      { from: 'period', to: 'keypad_3' },
      { from: 'j', to: 'keypad_4' },
      { from: 'k', to: 'keypad_5' },
      { from: 'l', to: 'keypad_6' },
      { from: 'u', to: 'keypad_7' },
      { from: 'i', to: 'keypad_8' },
      { from: 'o', to: 'keypad_9' },
      { from: 'spacebar', to: 'keypad_0' },
      { from: '9', to: 'keypad_slash' },
      { from: '0', to: 'keypad_asterisk' },
      { from: 'hyphen', to: 'keypad_hyphen' },
      { from: 'p', to: 'keypad_plus' },
      { from: 'v', to: 'return_or_enter' },
      { from: 'quote', to: 'period' },
      { from: 'semicolon', to: 'comma' },

      // tab
      { from: 'x', to: 'tab' },
      { from: '8', to: 'tab' },

      // physical num pad layer 4
      { from: 'keypad_0', to: 'insert' },
      { from: 'keypad_1', to: 'end' },
      { from: 'keypad_2', to: 'down_arrow' },
      { from: 'keypad_3', to: 'page_down' },
      { from: 'keypad_4', to: 'left_arrow' },
      { from: 'keypad_5', to: 'page_down' },
      { from: 'keypad_6', to: 'right_arrow' },
      { from: 'keypad_7', to: 'home' },
      { from: 'keypad_8', to: 'up_arrow' },
      { from: 'keypad_9', to: 'page_up' },
      { from: 'keypad_period', to: 'delete_or_backspace' }
    ]

    const l4DeadKeyMappings = [
      'non_us_backslash',
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      'hyphen',
      'equal_sign',
      'open_bracket',
      'close_bracket',
      'y',
      'h',
      'keypad_plus',
      'keypad_hyphen',
      'keypad_asterisk',
      'keypad_slash',
      'keypad_num_lock'
    ]

    return [].concat(
      eachKey({
        fromKeys: l4Mappings.map(function(m) {
          return m.from
        }),
        fromModifiers: { optional: ['shift', 'caps_lock', 'command', 'left_option'] },
        toKeys: l4Mappings.map(function(m) {
          return m.to
        }),
        conditions: condition === undefined ? [isLayoutActive, ifMod4On] : [isLayoutActive, ifMod4On, condition]
      }),
      eachKey({
        fromKeys: ['n', 'slash'],
        fromModifiers: { optional: ['shift', 'caps_lock', 'command', 'left_option'] },
        toKeys: ['semicolon', 'slash'],
        toModifiers: ['right_option'],
        conditions: condition === undefined ? [isLayoutActive, ifMod4On] : [isLayoutActive, ifMod4On, condition]
      }),
      eachKey({
        fromKeys: ['b', 'c', 'a', 'g'],
        fromModifiers: { optional: ['shift', 'caps_lock', 'left_option'] },
        toKeys: ['b', 'w', 'left_arrow', 'right_arrow'],
        toModifiers: ['left_command'],
        conditions: condition === undefined ? [isLayoutActive, ifMod4On] : [isLayoutActive, ifMod4On, condition]
      }),
      eachKey({
        fromKeys: l4DeadKeyMappings,
        toPreKeys: [{ key_code: 'page_down', modifiers: ['left_option', 'left_shift'] }],
        toKeys: l4DeadKeyMappings,
        toModifiers: ['left_shift'],
        conditions: condition === undefined ? [isLayoutActive, ifMod4On] : [isLayoutActive, ifMod4On, condition]
      })
    )
  }

  const neo2Modifiers = function(mod3Key, mod4Key, condition) {
    return [].concat(
      eachKey({
        fromKeys: [mod3Key, 'caps_lock', 'right_option'],
        fromModifiers: { optional: ['any'] },
        toKeys: ['right_option', 'right_option', 'right_command'],
        conditions: [isLayoutActive]
      }),
      {
        type: 'basic',
        from: { simultaneous: [{ key_code: mod4Key }, { key_code: 'right_command' }] },
        to: [setMod4(2, true)],
        conditions: condition === undefined ? [isLayoutActive, ifMod4NotLocked] : [isLayoutActive, ifMod4NotLocked, condition]
      },
      {
        type: 'basic',
        from: { simultaneous: [{ key_code: mod4Key }, { key_code: 'right_command' }] },
        to: [setMod4(0)],
        conditions: condition === undefined ? [isLayoutActive, ifMod4Locked] : [isLayoutActive, ifMod4Locked, condition]
      },
      [mod4Key, 'right_command'].map(function(key) {
        return {
          type: 'basic',
          from: { key_code: key, modifiers: { optional: ['any'] } },
          to: [setMod4(1)],
          to_after_key_up: [setMod4(0)],
          conditions: condition === undefined ? [isLayoutActive, ifMod4NotLocked] : [isLayoutActive, ifMod4NotLocked, condition]
        }
      })
    )
  }

  const l6DeadKeyMappings = [].concat(
    ['non_us_backslash'],
    ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
    ['hyphen', 'equal_sign'],
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    ['open_bracket', 'close_bracket'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
    ['semicolon', 'quote'],
    ['z', 'x', 'c', 'v', 'b', 'n', 'm'],
    ['comma', 'period', 'slash'],
    ['keypad_0', 'keypad_1', 'keypad_2', 'keypad_3', 'keypad_4'],
    ['keypad_5', 'keypad_6', 'keypad_7', 'keypad_8', 'keypad_9'],
    ['keypad_period', 'keypad_plus', 'keypad_hyphen'],
    ['keypad_asterisk', 'keypad_slash', 'keypad_num_lock']
  )

  return [
    {
      description: 'Neo2 mod 3 and layer 4. Rule applied to all keyboards.',
      manipulators: [].concat(
        // --- Comment to prevent line combination by Prettier ---
        neo2Modifiers('backslash', 'grave_accent_and_tilde'),
        neo2Layer4()
      )
    },
    {
      description: 'Neo2 layer 6',
      manipulators: eachKey({
        fromKeys: l6DeadKeyMappings,
        fromModifiers: { mandatory: ['right_option'] },
        toPreKeys: [{ key_code: 'page_down', modifiers: ['left_option', 'left_shift'] }],
        toKeys: l6DeadKeyMappings,
        toModifiers: ['left_shift', 'left_option'],
        conditions: [isLayoutActive, ifMod4On]
      })
    },
    {
      description: 'Toggle caps_lock by pressing left_shift + right_shift at the same time',
      manipulators: [
        {
          type: 'basic',
          from: { key_code: 'left_shift', modifiers: { mandatory: ['right_shift'], optional: ['caps_lock'] } },
          to: [{ key_code: 'caps_lock' }],
          to_if_alone: [{ key_code: 'left_shift' }]
        },
        {
          type: 'basic',
          from: { key_code: 'right_shift', modifiers: { mandatory: ['left_shift'], optional: ['caps_lock'] } },
          to: [{ key_code: 'caps_lock' }],
          to_if_alone: [{ key_code: 'right_shift' }]
        }
      ]
    },
    {
      description: 'Tab acts as Ctrl if pressed with another key',
      manipulators: [
        {
          type: 'basic',
          from: { key_code: 'tab', modifiers: { optional: ['shift', 'option', 'command'] } },
          to: [{ key_code: 'left_control' }],
          to_if_alone: [{ key_code: 'tab' }]
        }
      ]
    },
    {
      description: 'Prevent problematic keys (?, /, #, =, and \')\') from being treated as option key shortcut',
      manipulators: eachKey({
        fromKeys: ['h', 's', 'z', 'o', 'k'],
        fromModifiers: { mandatory: ['right_option'] },
        toPreKeys: [{ key_code: 'page_up', modifiers: ['left_option', 'left_shift'] }],
        toKeys: ['h', 's', 'z', 'o', 'k'],
        conditions: [isLayoutActive, isNotExcludedApp]
      })
    },
    {
      description: 'Prevent all layer 3 keys from being treated as option key shortcut.',
      manipulators: (function() {
        const keys = [
          'a',
          'b',
          'c',
          'd',
          'e',
          'f',
          'g',
          'h',
          'i',
          'j',
          'k',
          'l',
          'm',
          'n',
          'o',
          'p',
          'q',
          'r',
          's',
          't',
          'u',
          'v',
          'w',
          'x',
          'y',
          'z',
          'open_bracket',
          'semicolon',
          'quote',
          'comma',
          'period',
          'slash'
        ]
        return eachKey({
          fromKeys: keys,
          fromModifiers: { mandatory: ['right_option'] },
          toPreKeys: [{ key_code: 'page_up', modifiers: ['left_option', 'left_shift'] }],
          toKeys: keys,
          conditions: [isLayoutActive, isNotExcludedApp]
        })
      })()
    },
    {
      description: 'Neo2 mod 4: Map ↖ to Home and ↘︎ to End in terminal apps, remote desktop apps and virtual machines.  (move this rule above other Neo2 rules).',
      manipulators: eachKey({
        fromKeys: ['a', 'g'],
        fromModifiers: { optional: ['shift', 'caps_lock', 'left_option'] },
        toKeys: ['home', 'end'],
        conditions: [
          isLayoutActive,
          ifMod4On,
          {
            type: 'frontmost_application_if',
            bundle_identifiers: [].concat(
              // --- Comment to prevent line combination by Prettier ---
              karabiner.bundleIdentifiers.terminal,
              karabiner.bundleIdentifiers.remoteDesktop,
              karabiner.bundleIdentifiers.virtualMachine
            )
          }
        ]
      })
    }
  ]
}

function eachKey(options) {
  const result = []

  for (var i in options.fromKeys) {
    const fromKey = options.fromKeys[i]
    const toKey = options.toKeys[i]

    result.push({
      type: 'basic',
      from: {
        key_code: fromKey,
        modifiers: options.fromModifiers
      },
      to: [].concat(options.toPreKeys !== undefined ? options.toPreKeys : [], [
        {
          key_code: toKey,
          modifiers: options.toModifiers
        }
      ]),
      conditions: options.conditions
    })
  }

  return result
}
