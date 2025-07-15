// JavaScript should be written in ECMAScript 5.1.

function main() {
  var mouseMovement = 1536
  var mouseScroll = 96

  console.log(
    JSON.stringify(
      {
        title: 'Mouse Keys Mode v4 (tweaked from @tekezo rev 3)',
        maintainers: ['ronaldsuwandi'],
        rules: [
          {
            description: 'Use capslock to enter mouse keys mode for Mouse Keys Mode v4',
            manipulators: [
              // Capslock toggle - enter mouse mode
              {
                type: 'basic',
                conditions: [
                  {
                    type: 'variable_if',
                    name: 'mouse_keys_mode_v4',
                    value: 0,
                  },
                ],
                from: {
                  key_code: 'caps_lock',
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
                      id: 'mouse_keys',
                      text: 'Mouse Keys Mode',
                    },
                  },
                ],
              },
              // Capslock toggle - exit mouse mode
              {
                type: 'basic',
                conditions: [
                  {
                    type: 'variable_if',
                    name: 'mouse_keys_mode_v4',
                    value: 1,
                  },
                ],
                from: {
                  key_code: 'caps_lock',
                },
                to: [
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
                      id: 'mouse_keys',
                      text: '',
                    },
                  },
                ],
              },
            ],
          },
          {
            description: 'Optional keys (arrow, shift, ctrl, option) as alternative for Mouse Keys Mode v4',
            manipulators: [].concat(
              // arrow movement keys
              generateMouseKeysMode({
                from: 'down_arrow',
                to: [{ mouse_key: { y: mouseMovement } }],
                scrollTo: [{ mouse_key: { vertical_wheel: mouseScroll } }],
              }),
              generateMouseKeysMode({
                from: 'up_arrow',
                to: [{ mouse_key: { y: -mouseMovement } }],
                scrollTo: [{ mouse_key: { vertical_wheel: -mouseScroll } }],
              }),
              generateMouseKeysMode({
                from: 'left_arrow',
                to: [{ mouse_key: { x: -mouseMovement } }],
                scrollTo: [{ mouse_key: { horizontal_wheel: mouseScroll } }],
              }),
              generateMouseKeysMode({
                from: 'right_arrow',
                to: [{ mouse_key: { x: mouseMovement } }],
                scrollTo: [{ mouse_key: { horizontal_wheel: -mouseScroll } }],
              }),

              // Scroll mode toggle
              generateMouseKeysMode({
                from: 'left_control',
                to: [
                  {
                    set_variable: {
                      name: 'mouse_keys_mode_v4_scroll',
                      value: 1,
                    },
                  },
                  {
                    set_notification_message: {
                      id: 'mouse_keys',
                      text: 'Mouse Keys Mode (Scroll Mode)',
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
                  {
                    set_notification_message: {
                      id: 'mouse_keys',
                      text: 'Mouse Keys Mode',
                    },
                  },
                ],
              }),
              generateMouseKeysMode({
                from: 'right_control',
                to: [
                  {
                    set_variable: {
                      name: 'mouse_keys_mode_v4_scroll',
                      value: 1,
                    },
                  },
                  {
                    set_notification_message: {
                      id: 'mouse_keys',
                      text: 'Mouse Keys Mode (Scroll Mode)',
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
                  {
                    set_notification_message: {
                      id: 'mouse_keys',
                      text: 'Mouse Keys Mode',
                    },
                  },
                ],
              }),

              // Speed modifiers
              generateMouseKeysMode({
                from: 'left_shift',
                to: [{ mouse_key: { speed_multiplier: 2.0 } }],
              }),
              generateMouseKeysMode({
                from: 'right_shift',
                to: [{ mouse_key: { speed_multiplier: 2.0 } }],
              }),
              generateMouseKeysMode({
                from: 'left_option',
                to: [{ mouse_key: { speed_multiplier: 0.5 } }],
              }),
              generateMouseKeysMode({
                from: 'right_option',
                to: [{ mouse_key: { speed_multiplier: 0.5 } }],
              })
            ),
          },
          {
            description: 'Mouse Keys Mode v4 (tweaked from @tekezo rev 3)',
            manipulators: [].concat(
              // Ctrl+Option+Cmd+M toggle
              generateToggleShortcut(),

              // Escape to exit
              generateEscapeExit(),

              // hjkl movement keys
              generateMouseKeysMode({
                from: 'j',
                to: [{ mouse_key: { y: mouseMovement } }],
                scrollTo: [{ mouse_key: { vertical_wheel: mouseScroll } }],
              }),
              generateMouseKeysMode({
                from: 'k',
                to: [{ mouse_key: { y: -mouseMovement } }],
                scrollTo: [{ mouse_key: { vertical_wheel: -mouseScroll } }],
              }),
              generateMouseKeysMode({
                from: 'h',
                to: [{ mouse_key: { x: -mouseMovement } }],
                scrollTo: [{ mouse_key: { horizontal_wheel: mouseScroll } }],
              }),
              generateMouseKeysMode({
                from: 'l',
                to: [{ mouse_key: { x: mouseMovement } }],
                scrollTo: [{ mouse_key: { horizontal_wheel: -mouseScroll } }],
              }),

              // Click buttons
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

              // Scroll mode toggle
              generateMouseKeysMode({
                from: 's',
                to: [
                  {
                    set_variable: {
                      name: 'mouse_keys_mode_v4_scroll',
                      value: 1,
                    },
                  },
                  {
                    set_notification_message: {
                      id: 'mouse_keys',
                      text: 'Mouse Keys Mode (Scroll Mode)',
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
                  {
                    set_notification_message: {
                      id: 'mouse_keys',
                      text: 'Mouse Keys Mode',
                    },
                  },
                ],
              }),

              // Speed modifiers
              generateMouseKeysMode({
                from: 'f',
                to: [{ mouse_key: { speed_multiplier: 2.0 } }],
              }),
              generateMouseKeysMode({
                from: 'd',
                to: [{ mouse_key: { speed_multiplier: 0.5 } }],
              }),

              // Screen positioning
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
                        screen: 0,
                        x: '50%',
                        y: '50%',
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
                        screen: 1,
                        x: '50%',
                        y: '50%',
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
                        screen: 2,
                        x: '50%',
                        y: '50%',
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

function generateToggleShortcut() {
  return [
    // Enter mouse mode
    {
      type: 'basic',
      conditions: [
        {
          type: 'variable_if',
          name: 'mouse_keys_mode_v4',
          value: 0,
        },
      ],
      from: {
        key_code: 'm',
        modifiers: { mandatory: ['left_command', 'left_option', 'left_control'] },
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
            id: 'mouse_keys',
            text: 'Mouse Keys Mode',
          },
        },
      ],
    },
    // Exit mouse mode
    {
      type: 'basic',
      conditions: [
        {
          type: 'variable_if',
          name: 'mouse_keys_mode_v4',
          value: 1,
        },
      ],
      from: {
        key_code: 'm',
        modifiers: { mandatory: ['left_command', 'left_option', 'left_control'] },
      },
      to: [
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
            id: 'mouse_keys',
            text: '',
          },
        },
      ],
    },
  ]
}

function generateEscapeExit() {
  return [
    {
      type: 'basic',
      conditions: [
        {
          type: 'variable_if',
          name: 'mouse_keys_mode_v4',
          value: 1,
        },
      ],
      from: { key_code: 'escape' },
      to: [
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
            id: 'mouse_keys',
            text: '',
          },
        },
      ],
    },
  ]
}

function generateMouseKeysMode(options) {
  const result = []

  // Add scroll mode version if scrollTo is defined
  if (options.scrollTo !== undefined) {
    result.push({
      type: 'basic',
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
      from: {
        key_code: options.from,
        modifiers: { optional: ['any'] },
      },
      to: options.scrollTo,
      to_after_key_up: options.toAfterKeyUp,
    })
  }

  // Add normal mode version
  result.push({
    type: 'basic',
    conditions: [
      {
        type: 'variable_if',
        name: 'mouse_keys_mode_v4',
        value: 1,
      },
    ],
    from: { key_code: options.from },
    to: options.to,
    to_after_key_up: options.toAfterKeyUp,
  })

  return result
}

main()
