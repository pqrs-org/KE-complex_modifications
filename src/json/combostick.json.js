// JavaScript should be written in ECMAScript 5.1.

const karabiner = require('../lib/karabiner')

function main() {
  const conditions = [
    {
      // The sub keyboard
      type: 'device_if',
      identifiers: [
        {
          vendor_id: 1133, // Logitech
          product_id: 49686, // F310 Gamepad
        },
      ],
    },
  ]

  console.log(
    JSON.stringify(
      {
        title: 'ComboStick',
        maintainers: ['tekezo'],
        rules: [
          {
            description: 'ComboStick (rev 1)',
            manipulators: [
              //
              // Simultaneous button1 + button2 => button3
              //

              {
                type: 'basic',
                conditions: conditions.concat([
                  {
                    type: 'frontmost_application_if',
                    bundle_identifiers: karabiner.bundleIdentifiers.visualStudioCode,
                  },
                ]),
                from: {
                  simultaneous: [
                    { pointing_button: 'button5' }, // button1
                    { pointing_button: 'button6' }, // button2
                  ],
                  modifiers: { optional: ['any'] },
                },
                to: [{ pointing_button: 'button1', modifiers: ['left_command'] }],
              },
              {
                type: 'basic',
                conditions,
                from: {
                  simultaneous: [
                    { pointing_button: 'button5' }, // button1
                    { pointing_button: 'button6' }, // button2
                  ],
                  modifiers: { optional: ['any'] },
                  simultaneous_options: {
                    key_up_when: 'all',
                  },
                },
                to: [{ pointing_button: 'button3' }],
              },

              //
              // Buttons
              //

              {
                type: 'basic',
                conditions,
                from: { pointing_button: 'button5', modifiers: { optional: ['any'] } },
                to: [{ pointing_button: 'button1' }],
              },
              {
                type: 'basic',
                conditions,
                from: { pointing_button: 'button6', modifiers: { optional: ['any'] } },
                to: [{ pointing_button: 'button2' }],
              },
              {
                type: 'basic',
                conditions,
                from: { pointing_button: 'button11', modifiers: { optional: ['any'] } },
                to: [{ software_function: { set_mouse_cursor_position: { screen: 0, x: '50%', y: '50%' } } }],
              },
              {
                type: 'basic',
                conditions,
                from: { pointing_button: 'button12', modifiers: { optional: ['any'] } },
                to: [{ software_function: { set_mouse_cursor_position: { screen: 0, x: '50%', y: '50%' } } }],
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
