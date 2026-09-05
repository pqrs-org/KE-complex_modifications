// JavaScript should be written in ECMAScript 5.1.

function main() {
  return {
    description: 'Multitouch Diamond Cursor (rev 2)',
    description_notes: [
      '- Available since Karabiner-Elements 16.0.0.',
      // Usage
      '- Touch the trackpad: 1 finger + w/a/s/d = arrow keys; 2+ fingers + w/s/a/d = page up/page down/home/end',
    ],
    maintainers: ['tekezo'],
    manipulators: manipulators(),
  }
}

function manipulators() {
  //
  // conditions
  //

  const total1 = {
    type: 'variable_if',
    name: 'multitouch_extension_finger_count_total',
    value: 1,
  }

  const total2 = {
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
      from: { key_code: 'w', modifiers: { optional: ['any'] } },
      to: [{ key_code: 'up_arrow' }],
      conditions: [total1],
    },
    {
      from: { key_code: 's', modifiers: { optional: ['any'] } },
      to: [{ key_code: 'down_arrow' }],
      conditions: [total1],
    },
    {
      from: { key_code: 'a', modifiers: { optional: ['any'] } },
      to: [{ key_code: 'left_arrow' }],
      conditions: [total1],
    },
    {
      from: { key_code: 'd', modifiers: { optional: ['any'] } },
      to: [{ key_code: 'right_arrow' }],
      conditions: [total1],
    },

    //
    // Finger count >= 2
    //

    {
      from: { key_code: 'w', modifiers: { optional: ['any'] } },
      to: [{ key_code: 'page_up' }],
      conditions: [total2],
    },
    {
      from: { key_code: 's', modifiers: { optional: ['any'] } },
      to: [{ key_code: 'page_down' }],
      conditions: [total2],
    },
    {
      from: { key_code: 'a', modifiers: { optional: ['any'] } },
      to: [{ key_code: 'home' }],
      conditions: [total2],
    },
    {
      from: { key_code: 'd', modifiers: { optional: ['any'] } },
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
