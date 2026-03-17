// JavaScript should be written in ECMAScript 5.1.

function main() {
  console.log(
    JSON.stringify(
      {
        title: 'Multitouch Mouse Buttons (rev 2)',
        maintainers: ['tekezo'],
        rules: [
          {
            description: 'Multitouch Mouse Buttons (rev 2)',
            available_since: '12.6.9',
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
  for (var i = 1; i <= 9; ++i) {
    result.push({
      type: 'basic',
      from: {
        key_code: i.toString(),
        modifiers: {
          optional: ['any'],
        },
      },
      to: [
        {
          pointing_button: 'button' + i.toString(),
        },
      ],
      conditions: [
        {
          type: 'variable_unless',
          name: 'multitouch_extension_finger_count_total',
          value: 0,
        },
      ],
    })
  }

  return result
}

main()
