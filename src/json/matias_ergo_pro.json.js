// JavaScript should be written in ECMAScript 5.1.

const karabiner = require('../lib/karabiner')

function main() {
  console.log(
    JSON.stringify(
      {
        title: device.name,
        maintainers: ['mingaldrichgan'],
        rules: [navKeys(), rightControl()],
      },
      null,
      '  '
    )
  )
}

const device = {
  name: 'Matias Ergo Pro Keyboard',

  condition: {
    description: 'Matias Ergo Pro Keyboard',
    type: 'device_if',
    identifiers: [{ vendor_id: 1452, product_id: 591 }],
  },

  navToKey: 'right_option',
  navVariable: function () {
    return 'matias_ergo_pro.use_nav_keys_as_' + device.navToKey
  },

  topRow: ['f1', 'f2', 'f3', 'f4', 'f5', 'f6', 'f7', 'f8', 'f9', 'f10', 'f11', 'f12', 'escape', 'delete_forward'],

  typingKeys: [].concat(
    karabiner.numbers,
    karabiner.letters,
    ['grave_accent_and_tilde', 'hyphen', 'equal_sign', 'delete_or_backspace', 'tab'],
    ['open_bracket', 'close_bracket', 'backslash', 'semicolon', 'quote'],
    ['return_or_enter', 'comma', 'period', 'slash', 'spacebar']
  ),
}

function navKeys() {
  const toKey = device.navToKey
  const navKeys = ['home', 'end', 'page_up', 'page_down']
  const navModifiers = ['right_command', 'right_shift']
  const variable = device.navVariable()

  return {
    description: device.name + ': Change navigation keys to ' + toKey + ' if pressed with another key',
    manipulators: remapToModifiers({
      fromKeyCodes: navKeys,
      fromModifiers: { optional: ['any'] },
      toModifiers: [toKey],
      modifiable: [].concat(device.topRow, device.typingKeys, navKeys, navModifiers, karabiner.arrows),
      variable,
    }),
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

function rightControl() {
  const fromKey = 'right_control'
  const toKey = 'b'
  const variable = 'matias_ergo_pro.use_' + fromKey + '_as_' + toKey
  const typingModifiers = { optional: ['caps_lock', 'shift'] }

  return {
    description: device.name + ': Change ' + fromKey + ' to ' + toKey + ' if pressed alone, or while typing',
    manipulators: [].concat(
      device.typingKeys.map(function (key) {
        return {
          description: 'Set variable if ' + key + ' is pressed',
          type: 'basic',
          from: { key_code: key, modifiers: typingModifiers },
          to: [
            {
              set_variable: { name: variable, value: 1 },
            },
            { key_code: key },
          ],
          to_delayed_action: {
            to_if_invoked: [{ set_variable: { name: variable, value: 0 } }],
          },
          conditions: [
            device.condition,
            {
              type: 'variable_unless',
              name: device.navVariable(),
              value: 1,
            },
          ],
        }
      }),
      [
        {
          description: 'Change ' + fromKey + ' to ' + toKey + ' if variable is set',
          type: 'basic',
          from: { key_code: fromKey, modifiers: { optional: ['any'] } },
          to: [
            {
              set_variable: { name: variable, value: 1 },
            },
            { key_code: toKey },
          ],
          to_delayed_action: { to_if_invoked: [{ set_variable: { name: variable, value: 0 } }] },
          conditions: [
            device.condition,
            {
              type: 'variable_if',
              name: variable,
              value: 1,
            },
          ],
        },
        {
          description: 'Change ' + fromKey + ' to ' + toKey + ' if pressed alone and not held down',
          type: 'basic',
          from: { key_code: fromKey, modifiers: { optional: ['any'] } },
          to: [{ key_code: fromKey, lazy: true }],
          to_if_alone: [
            {
              set_variable: { name: variable, value: 1 },
            },
            { key_code: toKey },
          ],
          to_if_held_down: [{ key_code: fromKey }],
          to_delayed_action: { to_if_invoked: [{ set_variable: { name: variable, value: 0 } }] },
          conditions: [
            device.condition,
            {
              type: 'variable_unless',
              name: variable,
              value: 1,
            },
          ],
          parameters: {
            // Set these parameters to the same value.
            'basic.to_if_alone_timeout_milliseconds': 500, // Default value is 1000.
            'basic.to_if_held_down_threshold_milliseconds': 500, // Default value.
          },
        },
      ]
    ),
  }
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
