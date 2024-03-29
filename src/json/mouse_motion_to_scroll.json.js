// JavaScript should be written in ECMAScript 5.1.

function main() {
  console.log(
    JSON.stringify(
      {
        title: 'Change mouse motion to scroll (rev 3)',
        maintainers: ['tekezo'],
        rules: [
          {
            description: 'Change button3 + mouse motion to scroll wheel (rev 1)',
            available_since: '12.3.0',
            manipulators: [
              {
                type: 'basic',
                from: {
                  pointing_button: 'button3',
                  modifiers: {
                    optional: ['any'],
                  },
                },
                to: [
                  {
                    set_variable: {
                      name: 'enable_mouse_motion_to_scroll',
                      value: 1,
                    },
                  },
                ],
                to_after_key_up: [
                  {
                    set_variable: {
                      name: 'enable_mouse_motion_to_scroll',
                      value: 0,
                    },
                  },
                ],
              },
              {
                type: 'mouse_motion_to_scroll',
                from: {
                  modifiers: {
                    optional: ['any'],
                  },
                },
                conditions: [
                  {
                    type: 'variable_if',
                    name: 'enable_mouse_motion_to_scroll',
                    value: 1,
                  },
                ],
              },
            ],
          },
          {
            description: 'Change button4 + mouse motion to scroll wheel (rev 1)',
            available_since: '12.3.0',
            manipulators: [
              {
                type: 'basic',
                from: {
                  pointing_button: 'button4',
                  modifiers: {
                    optional: ['any'],
                  },
                },
                to: [
                  {
                    set_variable: {
                      name: 'enable_mouse_motion_to_scroll',
                      value: 1,
                    },
                  },
                ],
                to_after_key_up: [
                  {
                    set_variable: {
                      name: 'enable_mouse_motion_to_scroll',
                      value: 0,
                    },
                  },
                ],
              },
              {
                type: 'mouse_motion_to_scroll',
                from: {
                  modifiers: {
                    optional: ['any'],
                  },
                },
                conditions: [
                  {
                    type: 'variable_if',
                    name: 'enable_mouse_motion_to_scroll',
                    value: 1,
                  },
                ],
              },
            ],
          },
          {
            description: 'Change button5 + mouse motion to scroll wheel (rev 1)',
            available_since: '12.3.0',
            manipulators: [
              {
                type: 'basic',
                from: {
                  pointing_button: 'button5',
                  modifiers: {
                    optional: ['any'],
                  },
                },
                to: [
                  {
                    set_variable: {
                      name: 'enable_mouse_motion_to_scroll',
                      value: 1,
                    },
                  },
                ],
                to_after_key_up: [
                  {
                    set_variable: {
                      name: 'enable_mouse_motion_to_scroll',
                      value: 0,
                    },
                  },
                ],
              },
              {
                type: 'mouse_motion_to_scroll',
                from: {
                  modifiers: {
                    optional: ['any'],
                  },
                },
                conditions: [
                  {
                    type: 'variable_if',
                    name: 'enable_mouse_motion_to_scroll',
                    value: 1,
                  },
                ],
              },
            ],
          },
          {
            description: 'Change control + mouse motion to scroll wheel (rev 1)',
            available_since: '12.3.0',
            manipulators: [
              {
                type: 'mouse_motion_to_scroll',
                from: {
                  modifiers: {
                    mandatory: ['control'],
                  },
                },
              },
            ],
          },
          {
            description: 'Change fn + mouse motion to scroll wheel (rev 1)',
            available_since: '12.3.0',
            manipulators: [
              {
                type: 'mouse_motion_to_scroll',
                from: {
                  modifiers: {
                    mandatory: ['fn'],
                  },
                },
              },
            ],
          },
        ],
      },
      null,
      '  '
    )
  )
}

main()
