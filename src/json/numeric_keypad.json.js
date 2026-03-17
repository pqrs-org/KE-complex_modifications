// JavaScript should be written in ECMAScript 5.1.

function main() {
  console.log(
    JSON.stringify(
      {
        title: 'Numeric Keypad',
        rules: rules(),
      },
      null,
      '  '
    )
  )
}

function rules() {
  // standard key mapping where space is 0
  const fromKeys = [].concat(['7', '8', '9', '0'], ['u', 'i', 'o', 'p'], ['j', 'k', 'l', 'semicolon'], ['m', 'comma', 'period', 'slash'], ['spacebar', 'right_option'])

  const toKeys = [].concat(
    ['delete_or_backspace', 'keypad_equal_sign', 'keypad_slash', 'keypad_asterisk'],
    ['keypad_7', 'keypad_8', 'keypad_9', 'keypad_hyphen'],
    ['keypad_4', 'keypad_5', 'keypad_6', 'keypad_plus'],
    ['keypad_1', 'keypad_2', 'keypad_3', 'keypad_enter'],
    ['keypad_0', 'keypad_period']
  )

  const manipulators = eachKey({
    fromKeys,
    toKeys,
    conditions: [{ type: 'variable_if', name: 'numeric_keypad_mode', value: 1 }],
  })

  // alternative key mapping where right_command is 0
  const altFromKeys = [].concat(['7', '8', '9', '0'], ['u', 'i', 'o', 'p'], ['j', 'k', 'l', 'semicolon'], ['m', 'comma', 'period', 'slash'], ['right_command', 'right_option'])

  const altManipulators = eachKey({
    fromKeys: altFromKeys,
    toKeys,
    conditions: [{ type: 'variable_if', name: 'numeric_keypad_mode', value: 1 }],
  })

  return [
    {
      description: 'Numeric Keypad Trigger [Tab as trigger key]',
      manipulators: [
        {
          type: 'basic',
          from: { key_code: 'tab' },
          to: [{ set_variable: { name: 'numeric_keypad_mode', value: 1 } }],
          to_if_alone: [{ key_code: 'tab' }],
          to_after_key_up: [{ set_variable: { name: 'numeric_keypad_mode', value: 0 } }],
        },
      ],
    },
    {
      description: 'Numeric Keypad Trigger [Caps Lock as trigger key]',
      manipulators: [
        {
          type: 'basic',
          from: { key_code: 'caps_lock' },
          to: [{ set_variable: { name: 'numeric_keypad_mode', value: 1 } }],
          to_if_alone: [{ key_code: 'caps_lock' }],
          to_after_key_up: [{ set_variable: { name: 'numeric_keypad_mode', value: 0 } }],
        },
      ],
    },
    {
      description: 'Numeric Keypad Trigger [Escape as trigger key]',
      manipulators: [
        {
          type: 'basic',
          from: { key_code: 'escape' },
          to: [{ set_variable: { name: 'numeric_keypad_mode', value: 1 } }],
          to_if_alone: [{ key_code: 'escape' }],
          to_after_key_up: [{ set_variable: { name: 'numeric_keypad_mode', value: 0 } }],
        },
      ],
    },
    {
      description: 'Numeric Keypad Mode [spacebar as 0]',
      manipulators: manipulators,
    },
    {
      description: 'Numeric Keypad Mode [right_command as 0]',
      manipulators: altManipulators,
    },
    {
      description: 'Numeric Keypad Mode [Optional] Trigger + right_control to keypad_period',
      manipulators: [
        {
          type: 'basic',
          from: { key_code: 'right_control' },
          to: [{ key_code: 'keypad_period' }],
          conditions: [{ type: 'variable_if', name: 'numeric_keypad_mode', value: 1 }],
        },
      ],
    },
    {
      description: 'Numeric Keypad Mode [Optional] Trigger + left_command to spacebar',
      manipulators: [
        {
          type: 'basic',
          from: { key_code: 'left_command' },
          to: [{ key_code: 'spacebar' }],
          conditions: [{ type: 'variable_if', name: 'numeric_keypad_mode', value: 1 }],
        },
      ],
    },
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
        modifiers: options.fromModifiers,
      },
      to: [
        {
          key_code: toKey,
          modifiers: options.toModifiers,
        },
      ],
      conditions: options.conditions,
    })
  }

  return result
}

main()
