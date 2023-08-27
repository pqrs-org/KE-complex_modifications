// JavaScript should be written in ECMAScript 5.1.

const karabiner = require('../lib/karabiner')

function main() {
  console.log(
    JSON.stringify(
      {
        title: 'Personal rules (@mingaldrichgan)',
        maintainers: ['mingaldrichgan'],
        rules: [symbolicFn(), sibelius()],
      },
      null,
      '  '
    )
  )
}

function symbolicFn() {
  const fromKeyCodes = ['escape', 'grave_accent_and_tilde', 'hyphen', 'equal_sign']
  const toKey = 'fn'

  return {
    description: 'Change ' + fromKeyCodes.join('/') + ' to ' + toKey + ' if pressed with f-keys or delete',
    manipulators: remapToModifiers({
      fromKeyCodes,
      fromModifiers: { optional: ['any'] },
      toModifiers: [toKey],
      modifiable: ['f1', 'f2', 'f3', 'f4', 'f5', 'f6', 'f7', 'f8', 'f9', 'f10', 'f11', 'f12', 'delete_or_backspace'],
      variable: 'personal_mingaldrichgan.use_symbols_as_' + toKey,
    }),
  }
}

function sibelius() {
  const appName = 'Sibelius'
  const appCondition = {
    type: 'frontmost_application_if',
    bundle_identifiers: ['^com\\.avid\\.sibelius$'],
  }

  return {
    description: appName + ': Nums keypad workarounds',
    manipulators: [
      {
        description: 'Change 5 to f5 if modified by shift',
        type: 'basic',
        from: { key_code: '5', modifiers: { mandatory: ['shift'], optional: ['any'] } },
        to: [{ key_code: 'f5', modifiers: ['left_shift'] }],
        conditions: [appCondition],
      },
      {
        description: 'Change return_or_enter to keypad_enter',
        type: 'basic',
        from: { key_code: 'return_or_enter' },
        to: [{ key_code: 'keypad_enter' }],
        conditions: [appCondition],
      },
    ],
  }
}

function remapToModifiers(options) {
  const modifiers = [].concat(
    ['caps_lock', 'fn', 'command', 'control', 'option', 'shift'],
    ['left_command', 'left_control', 'left_option', 'left_shift', 'left_alt', 'left_gui'],
    ['right_command', 'right_control', 'right_option', 'right_shift', 'right_alt', 'right_gui']
  )

  return [].concat(
    combination(options.fromKeyCodes).map(function (pair) {
      return {
        description: 'Set variable if ' + pair.join(' + ') + ' are pressed simultaneously',
        type: 'basic',
        from: {
          modifiers: options.fromModifiers,
          simultaneous: pair.map(function (key) {
            return { key_code: key }
          }),
          simultaneous_options: {
            to_after_key_up: [{ set_variable: { name: options.variable, value: 0 } }],
          },
        },
        to: [{ set_variable: { name: options.variable, value: 1 } }],
        conditions: [{ type: 'variable_unless', name: options.variable, value: 1 }],
      }
    }),

    product(
      options.fromKeyCodes,
      options.modifiable.filter(function (m) {
        return options.fromKeyCodes.indexOf(m) === -1
      })
    ).map(function (pair) {
      return {
        description: 'Change ' + pair[0] + ' to ' + options.toModifiers.join(' + ') + ' if pressed with ' + pair[1],
        type: 'basic',
        from: {
          modifiers: options.fromModifiers,
          simultaneous: pair.map(function (key) {
            return { key_code: key }
          }),
          simultaneous_options: {
            to_after_key_up: [{ set_variable: { name: options.variable, value: 0 } }],
          },
        },
        to: [{ set_variable: { name: options.variable, value: 1 } }, { key_code: pair[1], modifiers: options.toModifiers }],
        conditions: [{ type: 'variable_unless', name: options.variable, value: 1 }],
      }
    }),

    options.modifiable
      .filter(function (m) {
        return modifiers.indexOf(m) === -1
      })
      .map(function (key) {
        return {
          description: 'Modify ' + key + ' with ' + options.toModifiers.join(' + ') + ' if variable is set',
          type: 'basic',
          from: { key_code: key, modifiers: options.fromModifiers },
          to: [{ key_code: key, modifiers: options.toModifiers }],
          conditions: [{ type: 'variable_if', name: options.variable, value: 1 }],
        }
      })
  )
}

function combination(array) {
  return array.reduce(function (acc, a, i) {
    return acc.concat(
      array.slice(i + 1).map(function (b) {
        return [a, b]
      })
    )
  }, [])
}

function product(a, b) {
  return a.reduce(function (acc, x) {
    return acc.concat(
      b.map(function (y) {
        return [x, y]
      })
    )
  }, [])
}

main()
