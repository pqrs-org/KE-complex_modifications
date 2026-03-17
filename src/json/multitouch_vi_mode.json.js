// JavaScript should be written in ECMAScript 5.1.

function main() {
  console.log(
    JSON.stringify(
      {
        title: 'Multitouch Vi Mode (rev 2)',
        maintainers: ['tekezo'],
        rules: [
          {
            description: 'Multitouch Vi Mode (rev 2)',
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
  //
  // conditions
  //

  total1 = {
    type: 'variable_if',
    name: 'multitouch_extension_finger_count_total',
    value: 1,
  }
  total2 = {
    type: 'variable_unless',
    name: 'multitouch_extension_finger_count_total',
    value: 0,
  }

  //
  // manipulators
  //

  const definitions = [
    //
    // Finger count == 1
    //

    {
      from: { key_code: 'k', modifiers: { optional: ['any'] } },
      to: [{ key_code: 'up_arrow' }],
      conditions: [total1],
    },
    {
      from: { key_code: 'j', modifiers: { optional: ['any'] } },
      to: [{ key_code: 'down_arrow' }],
      conditions: [total1],
    },
    {
      from: { key_code: 'h', modifiers: { optional: ['any'] } },
      to: [{ key_code: 'left_arrow' }],
      conditions: [total1],
    },
    {
      from: { key_code: 'l', modifiers: { optional: ['any'] } },
      to: [{ key_code: 'right_arrow' }],
      conditions: [total1],
    },

    //
    // Finger count >= 2
    //

    {
      from: { key_code: 'k', modifiers: { optional: ['any'] } },
      to: [{ key_code: 'page_up' }],
      conditions: [total2],
    },
    {
      from: { key_code: 'j', modifiers: { optional: ['any'] } },
      to: [{ key_code: 'page_down' }],
      conditions: [total2],
    },
    {
      from: { key_code: 'h', modifiers: { optional: ['any'] } },
      to: [{ key_code: 'home' }],
      conditions: [total2],
    },
    {
      from: { key_code: 'l', modifiers: { optional: ['any'] } },
      to: [{ key_code: 'end' }],
      conditions: [total2],
    },
  ]

  const result = []

  definitions.forEach(function (def) {
    result.push({
      type: 'basic',
      from: def.from,
      to: def.to,
      conditions: def.conditions,
    })
  })

  return result
}

main()
