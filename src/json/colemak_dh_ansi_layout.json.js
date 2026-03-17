// JavaScript should be written in ECMAScript 5.1.

function main() {
  console.log(
    JSON.stringify(
      {
        title: 'Colemak Mod-DH Keyboard (ANSI)',
        rules: [
          {
            description: 'Colemak Mod-DH Standard (ANSI)',
            manipulators: manipulators(
              [].concat(
                ['grave_accent_and_tilde', '1', '2', '4', '5', '6', '7', '8', '9', '0', 'hyphen', 'equal_sign'],
                ['q', 'w', 'f', 'p', 'b', 'j', 'l', 'u', 'y', 'semicolon', 'open_bracket', 'close_bracket', 'backslash'],
                ['a', 'r', 's', 't', 'g', 'm', 'n', 'e', 'i', 'o', 'quote'],
                ['x', 'c', 'd', 'v', 'z', 'k', 'h', 'comma', 'period', 'slash']
              )
            ),
          },
          {
            description: 'Colemak Mod-DH Wide (ANSI)',
            manipulators: manipulators(
              [].concat(
                ['grave_accent_and_tilde', '1', '2', '4', '5', 'equal_sign', '6', '7', '8', '9', '0', 'hyphen'],
                ['q', 'w', 'f', 'p', 'b', 'open_bracket', 'j', 'l', 'u', 'y', 'semicolon', 'quote', 'backslash'],
                ['a', 'r', 's', 't', 'g', 'close_bracket', 'm', 'n', 'e', 'i', 'o'],
                ['x', 'c', 'd', 'v', 'z', 'slash', 'k', 'h', 'comma', 'period']
              )
            ),
          },
          {
            description: 'Colemak Mod-DH Alt-Home (ANSI)',
            manipulators: manipulators(
              [].concat(
                ['grave_accent_and_tilde', 'hyphen', '1', '2', '4', '5', '6', '7', '8', '9', '0', 'equal_sign'],
                ['close_bracket', 'q', 'w', 'f', 'p', 'b', 'j', 'l', 'u', 'y', 'semicolon', 'quote', 'backslash'],
                ['open_bracket', 'a', 'r', 's', 't', 'g', 'm', 'n', 'e', 'i', 'o'],
                ['z', 'x', 'c', 'd', 'v', 'slash', 'k', 'h', 'comma', 'period', 'slash']
              )
            ),
          },
          {
            description: 'Colemak Mod-DHk (ANSI)',
            manipulators: manipulators(
              [].concat(
                ['grave_accent_and_tilde', '1', '2', '4', '5', '6', '7', '8', '9', '0', 'hyphen', 'equal_sign'],
                ['q', 'w', 'f', 'p', 'b', 'j', 'l', 'u', 'y', 'semicolon', 'open_bracket', 'close_bracket', 'backslash'],
                ['a', 'r', 's', 't', 'g', 'k', 'n', 'e', 'i', 'o', 'quote'],
                ['x', 'c', 'd', 'v', 'z', 'm', 'h', 'comma', 'period', 'slash']
              )
            ),
          },
          {
            description: 'Colemak Mod-DHm (matrix / ortho keyboards)',
            manipulators: manipulators(
              [].concat(
                ['grave_accent_and_tilde', '1', '2', '4', '5', '6', '7', '8', '9', '0', 'hyphen', 'equal_sign'],
                ['q', 'w', 'f', 'p', 'b', 'j', 'l', 'u', 'y', 'semicolon', 'open_bracket', 'close_bracket', 'backslash'],
                ['a', 'r', 's', 't', 'g', 'm', 'n', 'e', 'i', 'o', 'quote'],
                ['z', 'x', 'c', 'd', 'v', 'k', 'h', 'comma', 'period', 'slash']
              )
            ),
          },
        ],
      },
      null,
      '  '
    )
  )
}

function manipulators(toKeys) {
  const optionalModifiers = ['caps_lock', 'left_command', 'left_control', 'left_alt', 'right_command', 'right_control', 'right_alt']

  const remapFromKeys = [].concat(
    ['grave_accent_and_tilde', '1', '2', '4', '5', '6', '7', '8', '9', '0', 'hyphen', 'equal_sign'],
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'open_bracket', 'close_bracket', 'backslash'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'semicolon', 'quote'],
    ['z', 'x', 'c', 'v', 'b', 'n', 'm', 'comma', 'period', 'slash']
  )

  return [].concat(
    eachKey({
      fromKeys: remapFromKeys,
      fromModifiers: {
        optional: optionalModifiers,
      },
      toKeys: toKeys,
    }),
    eachKey({
      fromKeys: remapFromKeys,
      fromModifiers: {
        mandatory: ['left_shift'],
        optional: optionalModifiers,
      },
      toKeys: toKeys,
      toModifiers: ['left_shift'],
    }),
    eachKey({
      fromKeys: remapFromKeys,
      fromModifiers: {
        mandatory: ['right_shift'],
        optional: optionalModifiers,
      },
      toKeys: toKeys,
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
