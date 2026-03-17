// JavaScript should be written in ECMAScript 5.1.

function main() {
  console.log(
    JSON.stringify(
      {
        title: 'Window Resizing',
        rules: [
          {
            description: 'Window Resize Mode [Cmd+Esc as trigger]',
            manipulators: manipulators(),
          },
        ],
      },
      null,
      '  '
    )
  )
}

function manipulators() {
  const remapFromKeys = [].concat(['u', 'i', 'o'], ['j', 'k', 'l'], ['m', 'comma', 'period'], ['spacebar'])
  const remapToKeys = [].concat(['1', '2', '3'], ['4', '5', '6'], ['7', '8', '9'], ['0'])

  return [
    {
      type: 'basic',

      from: {
        key_code: 'escape',
        modifiers: {
          mandatory: ['command'],
        },
      },
      to: [{ set_variable: { name: 'window_resize_mode', value: 1 } }],
      to_if_alone: [{ key_code: 'w' }, { key_code: 'e' }],
      to_after_key_up: [{ set_variable: { name: 'window_resize_mode', value: 0 } }],
    },
  ].concat(
    eachKey({
      fromKeys: remapFromKeys,
      fromModifiers: {
        optional: ['any'],
      },
      toKeys: remapToKeys,
      toModifiers: ['left_control', 'left_command', 'left_option'],
      conditions: [{ type: 'variable_if', name: 'window_resize_mode', value: 1 }],
    })
  )
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
