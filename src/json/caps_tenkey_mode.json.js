// JavaScript should be written in ECMAScript 5.1.

function main() {
  console.log(
    JSON.stringify(
      {
        title: 'CAPS 4 Tenkey',
        maintainers: ['IvanShamatov'],
        rules: [].concat(tenkeyToggle(), tenkeyMapping(), arithmeticSymbolsMapping()),
      },
      null,
      '  '
    )
  )
}

function tenkeyToggle() {
  return {
    description: 'CAPS Tenkey: TenkeyMode on/off toggle',
    manipulators: [
      // Turning on Tenkey mode
      {
        from: {
          key_code: 'caps_lock',
          modifiers: {
            optional: ['any'],
          },
        },
        type: 'basic',
        to: {
          set_variable: {
            name: 'tenkey_mode',
            value: 1,
          },
        },
        conditions: tenkeyModeOff(),
      },
      // Turning off Tenkey mode
      {
        from: {
          key_code: 'caps_lock',
          modifiers: {
            mandatory: [],
            optional: ['any'],
          },
        },
        type: 'basic',
        to: {
          set_variable: {
            name: 'tenkey_mode',
            value: 0,
          },
        },
        conditions: tenkeyModeOn(),
      },
    ],
  }
}

function tenkeyMapping() {
  const mapping = [
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
  ]

  return {
    description: 'CAPS Tenkey: if TenkeyMode ON m,.jkluio maps to keypad_[1234567890]',
    manipulators: mapKeys(mapping, tenkeyModeOn()),
  }
}

function arithmeticSymbolsMapping() {
  const mapping = [
    { from: 'semicolon', to: 'keypad_plus' },
    { from: 'p', to: 'keypad_hyphen' },
    { from: 'slash', to: 'keypad_equal_sign' },
    { from: '9', to: 'keypad_slash' },
    { from: '0', to: 'keypad_asterisk' },
  ]

  return {
    description: 'CAPS Tenkey: if TenkeyMode ON 90p;/ maps to /*-+=',
    manipulators: mapKeys(mapping, tenkeyModeOn()),
  }
}

function mapKeys(mapping, conditions) {
  return mapping.map(function (m) {
    return {
      type: 'basic',
      from: { key_code: m.from },
      to: { key_code: m.to },
      conditions: conditions,
    }
  })
}

function tenkeyModeOn() {
  return [{ type: 'variable_if', name: 'tenkey_mode', value: 1 }]
}

function tenkeyModeOff() {
  return [{ type: 'variable_if', name: 'tenkey_mode', value: 0 }]
}

main()
