// JavaScript should be written in ECMAScript 5.1.

function main() {
  console.log(
    JSON.stringify(
      {
        title: 'ThumbSense (rev 3)',
        maintainers: ['tekezo'],
        rules: [
          {
            description: 'ThumbSense (rev 3)',
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
  const definitions = [
    //
    // Mouse left button (F, J, SPACE)
    //

    {
      from: { key_code: 'f', modifiers: { optional: ['any'] } },
      to: { pointing_button: 'button1' },
    },
    {
      from: { key_code: 'j', modifiers: { optional: ['any'] } },
      to: { pointing_button: 'button1' },
    },
    {
      from: { key_code: 'spacebar', modifiers: { optional: ['any'] } },
      to: { pointing_button: 'button1' },
    },

    //
    // Mouse right button (D, K)
    //

    {
      from: { key_code: 'd', modifiers: { optional: ['any'] } },
      to: { pointing_button: 'button2' },
    },
    {
      from: { key_code: 'k', modifiers: { optional: ['any'] } },
      to: { pointing_button: 'button2' },
    },

    // Scroll (S, L) is not supported.
    // Window Maximize (R) is not supported.
    // Change Window Order (E) is not supported.
    // Task switch (T) is not supported.

    //
    // Next (G)
    //

    {
      from: { key_code: 'g' },
      to: {
        key_code: 'close_bracket',
        modifiers: ['left_command'],
      },
      conditions: [{ type: 'keyboard_type_if', keyboard_types: ['ansi', 'iso'] }],
    },
    {
      from: { key_code: 'g' },
      to: {
        key_code: 'backslash',
        modifiers: ['left_command'],
      },
      conditions: [{ type: 'keyboard_type_if', keyboard_types: ['jis'] }],
    },

    //
    // Previous (H)
    //

    {
      from: { key_code: 'h' },
      to: {
        key_code: 'open_bracket',
        modifiers: ['left_command'],
      },
      conditions: [{ type: 'keyboard_type_if', keyboard_types: ['ansi', 'iso'] }],
    },
    {
      from: { key_code: 'h' },
      to: {
        key_code: 'close_bracket',
        modifiers: ['left_command'],
      },
      conditions: [{ type: 'keyboard_type_if', keyboard_types: ['jis'] }],
    },

    //
    // Window close (W)
    //

    {
      from: { key_code: 'w' },
      to: {
        key_code: 'w',
        modifiers: ['left_command'],
      },
    },

    // start IE (I) is not supported.
    // start OutlookExpress (O) is not supported.
    // open the My Document folder (M) is not supported.
  ]

  const result = []

  definitions.forEach(function (def) {
    var conditions = [
      {
        type: 'variable_unless',
        name: 'multitouch_extension_finger_count_total',
        value: 0,
      },
    ]

    if (def.conditions !== undefined) {
      conditions = conditions.concat(def.conditions)
    }

    result.push({
      type: 'basic',
      from: def.from,
      to: [def.to],
      conditions: conditions,
    })
  })

  return result
}

main()
