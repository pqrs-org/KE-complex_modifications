// JavaScript should be written in ECMAScript 5.1.

const parameters = {
  simultaneous_threshold_milliseconds: 500,
}

function main() {
  console.log(
    JSON.stringify(
      {
        title: 'Mouse Keys Mode v4 (rev 3)',
        maintainers: ['tekezo'],
        rules: [
          {
            description: 'Mouse Keys Mode v4 (rev 3)',
            available_since: '13.6.0',
            manipulators: [].concat(
              // hjkl

              generateMouseKeysMode({
                from: 'j',
                to: [{ mouse_key: { y: 1536 } }],
                scrollTo: [{ mouse_key: { vertical_wheel: 32 } }],
              }),
              generateMouseKeysMode({
                from: 'k',
                to: [{ mouse_key: { y: -1536 } }],
                scrollTo: [{ mouse_key: { vertical_wheel: -32 } }],
              }),
              generateMouseKeysMode({
                from: 'h',
                to: [{ mouse_key: { x: -1536 } }],
                scrollTo: [{ mouse_key: { horizontal_wheel: 32 } }],
              }),
              generateMouseKeysMode({
                from: 'l',
                to: [{ mouse_key: { x: 1536 } }],
                scrollTo: [{ mouse_key: { horizontal_wheel: -32 } }],
              }),

              // buttons

              generateMouseKeysMode({
                from: 'v',
                to: [{ pointing_button: 'button1' }],
              }),

              generateMouseKeysMode({
                from: 'b',
                to: [{ pointing_button: 'button3' }],
              }),

              generateMouseKeysMode({
                from: 'n',
                to: [{ pointing_button: 'button2' }],
              }),

              // others

              generateMouseKeysMode({
                from: 's',
                to: [
                  {
                    set_variable: {
                      name: 'mouse_keys_mode_v4_scroll',
                      value: 1,
                    },
                  },
                ],
                toAfterKeyUp: [
                  {
                    set_variable: {
                      name: 'mouse_keys_mode_v4_scroll',
                      value: 0,
                    },
                  },
                ],
              }),
              generateMouseKeysMode({
                from: 'f',
                to: [{ mouse_key: { speed_multiplier: 2.0 } }],
              }),
              generateMouseKeysMode({
                from: 'g',
                to: [{ mouse_key: { speed_multiplier: 0.5 } }],
              }),
              generateMouseKeysMode({
                from: 'u',
                to: [
                  {
                    software_function: {
                      set_mouse_cursor_position: {
                        x: '50%',
                        y: '50%',
                      },
                    },
                  },
                ],
              }),
              generateMouseKeysMode({
                from: 'i',
                to: [
                  {
                    software_function: {
                      set_mouse_cursor_position: {
                        x: '50%',
                        y: '50%',
                        screen: 0,
                      },
                    },
                  },
                ],
              }),
              generateMouseKeysMode({
                from: 'o',
                to: [
                  {
                    software_function: {
                      set_mouse_cursor_position: {
                        x: '50%',
                        y: '50%',
                        screen: 1,
                      },
                    },
                  },
                ],
              }),
              generateMouseKeysMode({
                from: 'p',
                to: [
                  {
                    software_function: {
                      set_mouse_cursor_position: {
                        x: '50%',
                        y: '50%',
                        screen: 2,
                      },
                    },
                  },
                ],
              })
            ),
          },
        ],
      },
      null,
      '  '
    )
  )
}

function generateMouseKeysMode(options) {
  const result = []

  if (options.scrollTo !== undefined) {
    result.push({
      type: 'basic',
      from: {
        key_code: options.from,
        modifiers: {
          optional: ['any'],
        },
      },
      to: options.scrollTo,
      conditions: [
        {
          type: 'variable_if',
          name: 'mouse_keys_mode_v4',
          value: 1,
        },
        {
          type: 'variable_if',
          name: 'mouse_keys_mode_v4_scroll',
          value: 1,
        },
      ],
      to_after_key_up: options.toAfterKeyUp,
    })
  }

  result.push({
    type: 'basic',
    from: {
      key_code: options.from,
      modifiers: {
        optional: ['any'],
      },
    },
    to: options.to,
    conditions: [
      {
        type: 'variable_if',
        name: 'mouse_keys_mode_v4',
        value: 1,
      },
    ],
    to_after_key_up: options.toAfterKeyUp,
  })

  result.push({
    type: 'basic',
    from: {
      simultaneous: [
        {
          key_code: 'd',
        },
        {
          key_code: options.from,
        },
      ],
      simultaneous_options: {
        key_down_order: 'strict',
        key_up_order: 'strict_inverse',
        to_after_key_up: [
          {
            set_variable: {
              name: 'mouse_keys_mode_v4',
              value: 0,
            },
          },
          {
            set_variable: {
              name: 'mouse_keys_mode_v4_scroll',
              value: 0,
            },
          },
          {
            set_notification_message: {
              id: 'mouse_keys_mode_v4',
              text: '',
            },
          },
        ],
      },
      modifiers: {
        optional: ['any'],
      },
    },
    to: [
      {
        set_variable: {
          name: 'mouse_keys_mode_v4',
          value: 1,
        },
      },
      {
        set_notification_message: {
          id: 'mouse_keys_mode_v4',
          text: 'Mouse Keys Mode v4',
        },
      },
    ].concat(options.to),
    parameters: {
      'basic.simultaneous_threshold_milliseconds': parameters.simultaneous_threshold_milliseconds,
    },
    to_after_key_up: options.toAfterKeyUp,
  })

  return result
}

main()
