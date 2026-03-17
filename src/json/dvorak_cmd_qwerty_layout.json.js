// JavaScript should be written in ECMAScript 5.1.

function main() {
  console.log(
    JSON.stringify(
      {
        title: 'Dvorak-CmdQwerty Keyboard',
        rules: [
          {
            description: 'Remap keys to use Dvorak-CmdQwerty keyboard layout',
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
  const remapFromKeys = [].concat(
    ['grave_accent_and_tilde', '1', '2', '4', '5', '6', '7', '8', '9', '0', 'hyphen', 'equal_sign'],
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'open_bracket', 'close_bracket', 'backslash'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'semicolon', 'quote'],
    ['z', 'x', 'c', 'v', 'b', 'n', 'm', 'comma', 'period', 'slash']
  )

  const remapToKeys = [].concat(
    ['grave_accent_and_tilde', '1', '2', '4', '5', '6', '7', '8', '9', '0', 'open_bracket', 'close_bracket'],
    ['quote', 'comma', 'period', 'p', 'y', 'f', 'g', 'c', 'r', 'l', 'slash', 'equal_sign', 'backslash'],
    ['a', 'o', 'e', 'u', 'i', 'd', 'h', 't', 'n', 's', 'hyphen'],
    ['semicolon', 'q', 'j', 'k', 'x', 'b', 'm', 'w', 'v', 'z']
  )

  return [].concat(
    eachKey({
      fromKeys: remapFromKeys,
      toKeys: remapToKeys,
    }),
    eachKey({
      fromKeys: remapFromKeys,
      fromModifiers: {
        mandatory: ['left_shift'],
      },
      toKeys: remapToKeys,
      toModifiers: ['left_shift'],
    }),
    eachKey({
      fromKeys: remapFromKeys,
      fromModifiers: {
        mandatory: ['right_shift'],
      },
      toKeys: remapToKeys,
      toModifiers: ['right_shift'],
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
