// JavaScript should be written in ECMAScript 5.1.

function main() {
  console.log(
    JSON.stringify(
      {
        title: 'Colemak Keyboard',
        rules: [
          {
            description: 'Remap keys to use Colemak keyboard layout',
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
  const optionalModifiers = ['caps_lock', 'left_command', 'left_control', 'left_alt', 'right_command', 'right_control', 'right_alt']

  const remapFromKeys = [].concat(
    ['grave_accent_and_tilde', '1', '2', '4', '5', '6', '7', '8', '9', '0', 'hyphen', 'equal_sign'],
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'open_bracket', 'close_bracket', 'backslash'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'semicolon', 'quote'],
    ['z', 'x', 'c', 'v', 'b', 'n', 'm', 'comma', 'period', 'slash']
  )

  const remapToKeys = [].concat(
    ['grave_accent_and_tilde', '1', '2', '4', '5', '6', '7', '8', '9', '0', 'hyphen', 'equal_sign'],
    ['q', 'w', 'f', 'p', 'g', 'j', 'l', 'u', 'y', 'semicolon', 'open_bracket', 'close_bracket', 'backslash'],
    ['a', 'r', 's', 't', 'd', 'h', 'n', 'e', 'i', 'o', 'quote'],
    ['z', 'x', 'c', 'v', 'b', 'k', 'm', 'comma', 'period', 'slash']
  )

  return [].concat(
    eachKey({
      fromKeys: remapFromKeys,
      fromModifiers: {
        optional: optionalModifiers,
      },
      toKeys: remapToKeys,
    }),
    eachKey({
      fromKeys: remapFromKeys,
      fromModifiers: {
        mandatory: ['left_shift'],
        optional: optionalModifiers,
      },
      toKeys: remapToKeys,
      toModifiers: ['left_shift'],
    }),
    eachKey({
      fromKeys: remapFromKeys,
      fromModifiers: {
        mandatory: ['right_shift'],
        optional: optionalModifiers,
      },
      toKeys: remapToKeys,
      toModifiers: ['right_shift'],
    }),
    eachKey({
      fromKeys: ['caps_lock'],
      toKeys: ['delete_or_backspace'],
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
    })
  }

  return result
}

main()
