// JavaScript should be written in ECMAScript 5.1.

function main() {
  return {
    description: 'ComboStick (rev 1)',
    description_notes: ['- Available since Karabiner-Elements 16.0.0.'],
    maintainers: ['tekezo'],
    manipulators: manipulators(),
  }
}

function manipulators() {
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

  return [
    //
    // Simultaneous button1+button2 => button3
    //

    // button1+button2 => command+click in specific apps
    {
      type: 'basic',
      conditions: conditions.concat([
        {
          type: 'frontmost_application_if',
          bundle_identifiers: [
            // Visual Studio Code
            '^com\\.microsoft\\.VSCode$',
          ],
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
    // button1+button2 => button3
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
  ]
}

main()
