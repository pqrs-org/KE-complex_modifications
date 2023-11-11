// JavaScript should be written in ECMAScript 5.1.

const karabiner = require('../lib/karabiner')

function main() {
  console.log(
    JSON.stringify(
      {
        title: 'Virtual Machine and Remote Desktop (Microsoft or other)',
        rules: rules(),
      },
      null,
      '  '
    )
  )
}

function rules() {
  const functionKeys = ['f1', 'f2', 'f3', 'f4', 'f5', 'f6', 'f7', 'f8', 'f9', 'f10', 'f11', 'f12']
  const virtualConditions = [
    {
      type: 'frontmost_application_if',
      bundle_identifiers: [].concat(karabiner.bundleIdentifiers.remoteDesktop, karabiner.bundleIdentifiers.virtualMachine, karabiner.bundleIdentifiers.vnc),
    },
  ]

  return [
    {
      description: 'Swap left command and control in virtual machine/remote desktop',
      manipulators: eachKey({
        fromKeys: ['left_control', 'left_command'],
        fromModifiers: { optional: ['any'] },
        toKeys: ['left_command', 'left_control'],
        conditions: virtualConditions,
      }),
    },
    {
      description: 'Swap right command and control in virtual machine/remote desktop',
      manipulators: eachKey({
        fromKeys: ['right_control', 'right_command'],
        fromModifiers: { optional: ['any'] },
        toKeys: ['right_command', 'right_control'],
        conditions: virtualConditions,
      }),
    },
    {
      description: 'Use standard function keys in virtual machine/remote desktop',
      manipulators: eachKey({
        fromKeys: functionKeys,
        fromModifiers: { optional: ['command', 'control', 'option', 'shift'] },
        toKeys: functionKeys,
        toModifiers: ['fn'],
        conditions: virtualConditions,
      }),
    },
    {
      description: 'Press Fn + function keys to use special features in virtual machine/remote desktop',
      manipulators: eachKey({
        fromKeys: functionKeys,
        fromModifiers: {
          mandatory: ['fn'],
          optional: ['command', 'control', 'option', 'shift'],
        },
        toKeys: functionKeys,
        conditions: virtualConditions,
      }),
    },
    {
      description: 'Swap >/< and °/§ in virtual machine/remote desktop',
      manipulators: [
        {
          type: 'basic',
          from: { key_code: 'grave_accent_and_tilde', modifiers: { optional: ['any'] } },
          to: [{ key_code: 'non_us_backslash' }],
          conditions: virtualConditions,
        },
        {
          type: 'basic',
          from: { key_code: 'non_us_backslash', modifiers: { optional: ['any'] } },
          to: [{ key_code: 'grave_accent_and_tilde' }],
          conditions: virtualConditions,
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
