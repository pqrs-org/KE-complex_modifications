// JavaScript should be written in ECMAScript 5.1.

function main() {
  console.log(
    JSON.stringify(
      {
        title: 'Exchange command + arrows keys with option + arrows keys',
        rules: [
          {
            description: 'Exchange command + arrow keys with option + arrow keys',
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
  const result = []

  const arrowKeys = ['right_arrow', 'left_arrow', 'up_arrow', 'down_arrow']

  arrowKeys.forEach(function (arrowKey) {
    result.push({
      type: 'basic',
      from: {
        key_code: arrowKey,
        modifiers: {
          mandatory: ['command'],
          optional: ['any'],
        },
      },
      to: [{ key_code: arrowKey, modifiers: ['option'] }],
    })
  })

  arrowKeys.forEach(function (arrowKey) {
    result.push({
      type: 'basic',
      from: {
        key_code: arrowKey,
        modifiers: {
          mandatory: ['option'],
          optional: ['any'],
        },
      },
      to: [{ key_code: arrowKey, modifiers: ['command'] }],
    })
  })

  return result
}

main()
