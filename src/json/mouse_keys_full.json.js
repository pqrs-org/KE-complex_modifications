// JavaScript should be written in ECMAScript 5.1.

function main() {
  console.log(
    JSON.stringify(
      {
        title: 'Mouse keys (full) (rev 4)',
        rules: [
          {
            description: 'Mouse keys (full) (rev 4)',
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
  const result = [
    //
    // Unset mouse_keys_full variable when right_command is released
    //

    {
      type: 'basic',
      from: {
        key_code: 'right_command',
        modifiers: {
          optional: ['any'],
        },
      },
      to: [
        {
          key_code: 'right_command',
        },
      ],
      to_after_key_up: [{ set_variable: { name: 'mouse_keys_full', value: 0 } }],
    },

    //
    // enable mouse_keys_full by right_command+m
    //

    {
      type: 'basic',
      from: {
        key_code: 'm',
        modifiers: {
          mandatory: ['right_command'],
          optional: ['any'],
        },
      },
      to: [{ set_variable: { name: 'mouse_keys_full', value: 1 } }],
    },
  ]

  //
  // scroll
  //

  const scrollDefinitions = [
    { from: 'h', to: [{ mouse_key: { horizontal_wheel: 32 } }] },
    { from: 'j', to: [{ mouse_key: { vertical_wheel: 32 } }] },
    { from: 'k', to: [{ mouse_key: { vertical_wheel: -32 } }] },
    { from: 'l', to: [{ mouse_key: { horizontal_wheel: -32 } }] },
  ]

  scrollDefinitions.forEach(function (def) {
    result.push({
      type: 'basic',
      from: {
        key_code: def.from,
        modifiers: {
          mandatory: ['right_command'],
          optional: ['any'],
        },
      },
      to: def.to,
      conditions: [
        {
          type: 'variable_if',
          name: 'mouse_keys_full',
          value: 1,
        },
        {
          type: 'variable_if',
          name: 'mouse_keys_full_scroll',
          value: 1,
        },
      ],
    })
  })

  //
  // generic
  //

  const definitions = [
    { from: 'h', to: [{ mouse_key: { x: -1536 } }] },
    { from: 'j', to: [{ mouse_key: { y: 1536 } }] },
    { from: 'k', to: [{ mouse_key: { y: -1536 } }] },
    { from: 'l', to: [{ mouse_key: { x: 1536 } }] },

    { from: 'v', to: [{ pointing_button: 'button1' }] },
    { from: 'b', to: [{ pointing_button: 'button3' }] },
    { from: 'n', to: [{ pointing_button: 'button2' }] },

    { from: 'f', to: [{ mouse_key: { speed_multiplier: 2.0 } }] },
    { from: 'd', to: [{ mouse_key: { speed_multiplier: 0.5 } }] },
  ]

  definitions.forEach(function (def) {
    result.push({
      type: 'basic',
      from: {
        key_code: def.from,
        modifiers: {
          mandatory: ['right_command'],
          optional: ['any'],
        },
      },
      to: def.to,
      conditions: [
        {
          type: 'variable_if',
          name: 'mouse_keys_full',
          value: 1,
        },
      ],
    })
  })

  result.push({
    type: 'basic',
    from: {
      key_code: 's',
      modifiers: {
        mandatory: ['right_command'],
        optional: ['any'],
      },
    },
    to: [
      {
        set_variable: { name: 'mouse_keys_full_scroll', value: 1 },
      },
    ],
    to_after_key_up: [
      {
        set_variable: { name: 'mouse_keys_full_scroll', value: 0 },
      },
    ],
    conditions: [
      {
        type: 'variable_if',
        name: 'mouse_keys_full',
        value: 1,
      },
    ],
  })

  return result
}

main()
