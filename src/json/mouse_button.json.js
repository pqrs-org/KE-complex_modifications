// JavaScript should be written in ECMAScript 5.1.

function main() {
  console.log(
    JSON.stringify(
      {
        title: 'Change mouse buttons (rev 2)',
        rules: [
          {
            description: 'Change button4,5 to CTRL+C,CTRL+V (rev 1)',
            manipulators: [
              //
              // Change button4 to command+v
              //

              {
                type: 'basic',
                from: { pointing_button: 'button4', modifiers: { optional: ['caps_lock'] } },
                to: [{ key_code: 'v', modifiers: 'left_command' }],
                conditions: [{ type: 'keyboard_type_if', keyboard_types: ['ansi', 'iso'] }],
              },
              {
                type: 'basic',
                from: { pointing_button: 'button4', modifiers: { optional: ['caps_lock'] } },
                to: [{ key_code: 'v', modifiers: 'left_command' }],
                conditions: [{ type: 'keyboard_type_if', keyboard_types: ['jis'] }],
              },

              //
              // Change button5 to command+c
              //

              {
                type: 'basic',
                from: { pointing_button: 'button5', modifiers: { optional: ['caps_lock'] } },
                to: [{ key_code: 'c', modifiers: 'left_command' }],
                conditions: [{ type: 'keyboard_type_if', keyboard_types: ['ansi', 'iso'] }],
              },
              {
                type: 'basic',
                from: { pointing_button: 'button5', modifiers: { optional: ['caps_lock'] } },
                to: [{ key_code: 'c', modifiers: 'left_command' }],
                conditions: [{ type: 'keyboard_type_if', keyboard_types: ['jis'] }],
              },
            ],
          },
          {
            description: 'Change button4,5 to back,forward (rev 1)',
            manipulators: [
              //
              // Change button4 to command+[
              //

              {
                type: 'basic',
                from: { pointing_button: 'button4', modifiers: { optional: ['caps_lock'] } },
                to: [{ key_code: 'open_bracket', modifiers: 'left_command' }],
                conditions: [{ type: 'keyboard_type_if', keyboard_types: ['ansi', 'iso'] }],
              },
              {
                type: 'basic',
                from: { pointing_button: 'button4', modifiers: { optional: ['caps_lock'] } },
                to: [{ key_code: 'close_bracket', modifiers: 'left_command' }],
                conditions: [{ type: 'keyboard_type_if', keyboard_types: ['jis'] }],
              },

              //
              // Change button5 to command+]
              //

              {
                type: 'basic',
                from: { pointing_button: 'button5', modifiers: { optional: ['caps_lock'] } },
                to: [{ key_code: 'close_bracket', modifiers: 'left_command' }],
                conditions: [{ type: 'keyboard_type_if', keyboard_types: ['ansi', 'iso'] }],
              },
              {
                type: 'basic',
                from: { pointing_button: 'button5', modifiers: { optional: ['caps_lock'] } },
                to: [{ key_code: 'backslash', modifiers: 'left_command' }],
                conditions: [{ type: 'keyboard_type_if', keyboard_types: ['jis'] }],
              },
            ],
          },
          {
            description: 'Change button4,5 to forward,back (rev 1)',
            manipulators: [
              //
              // Change button4 to command+]
              //

              {
                type: 'basic',
                from: { pointing_button: 'button4', modifiers: { optional: ['caps_lock'] } },
                to: [{ key_code: 'close_bracket', modifiers: 'left_command' }],
                conditions: [{ type: 'keyboard_type_if', keyboard_types: ['ansi', 'iso'] }],
              },
              {
                type: 'basic',
                from: { pointing_button: 'button4', modifiers: { optional: ['caps_lock'] } },
                to: [{ key_code: 'backslash', modifiers: 'left_command' }],
                conditions: [{ type: 'keyboard_type_if', keyboard_types: ['jis'] }],
              },

              //
              // Change button5 to command+]
              //

              {
                type: 'basic',
                from: { pointing_button: 'button5', modifiers: { optional: ['caps_lock'] } },
                to: [{ key_code: 'open_bracket', modifiers: 'left_command' }],
                conditions: [{ type: 'keyboard_type_if', keyboard_types: ['ansi', 'iso'] }],
              },
              {
                type: 'basic',
                from: { pointing_button: 'button5', modifiers: { optional: ['caps_lock'] } },
                to: [{ key_code: 'close_bracket', modifiers: 'left_command' }],
                conditions: [{ type: 'keyboard_type_if', keyboard_types: ['jis'] }],
              },
            ],
          },
          {
            description: 'Change left button + right button to middle button if these buttons are pressed simultaneously (rev 1)',
            manipulators: [
              {
                type: 'basic',
                from: {
                  simultaneous: [{ pointing_button: 'button1' }, { pointing_button: 'button2' }],
                  modifiers: { optional: ['any'] },
                },
                to: [{ pointing_button: 'button3' }],
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
