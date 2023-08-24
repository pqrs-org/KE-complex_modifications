// JavaScript should be written in ECMAScript 5.1.

function main() {
  console.log(
    JSON.stringify(
      {
        title: 'Map fn + number keys to function keys (rev 2)',
        rules: rules(),
      },
      null,
      '  '
    )
  )
}

function rules() {
  const remapFromKeys = [].concat(['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'], ['hyphen', 'equal_sign'])

  const remapToKeys = [].concat(['f1', 'f2', 'f3', 'f4', 'f5', 'f6'], ['f7', 'f8', 'f9', 'f10', 'f11', 'f12'])

  return [
    {
      description: 'Map fn + number keys to their corresponding function keys (rev 1)',
      manipulators: eachKey({
        fromKeys: remapFromKeys,
        fromModifiers: {
          mandatory: ['fn'],
          optional: ['any'],
        },
        toKeys: remapToKeys,
        toModifiers: ['fn'],
      }),
    },
    {
      description: 'Map fn + number keys to their corresponding media control keys (rev 2)',
      manipulators: eachKey({
        fromKeys: remapFromKeys,
        fromModifiers: {
          mandatory: ['fn'],
          optional: ['any'],
        },
        toKeys: remapToKeys,
      }),
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
    })
  }

  return result
}

main()
