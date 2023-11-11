// JavaScript should be written in ECMAScript 5.1.

function main() {
  console.log(
    JSON.stringify(
      //
      // A much simplified copy of the vi_mode.json.js file, for TouchCursor
      //
      {
        title: 'TouchCursor Mode (rev 2)',
        rules: [
          {
            description: 'TouchCursor Mode [Space as Trigger Key] (rev 2)',
            manipulators: [].concat(
              [
                //
                // press spacebar to enter TouchCursor Mode, release to quit
                //

                {
                  type: 'basic',
                  from: { key_code: 'spacebar', modifiers: { optional: ['caps_lock'] } },
                  to: [{ set_variable: { name: 'touchcursor_mode', value: 1 } }],
                  to_if_alone: [{ key_code: 'spacebar' }],
                  to_after_key_up: [{ set_variable: { name: 'touchcursor_mode', value: 0 } }],
                },

                //
                // change j/k/i/l to arrow keys
                //

                {
                  type: 'basic',
                  from: { key_code: 'j', modifiers: { optional: ['any'] } },
                  to: [{ key_code: 'left_arrow' }],
                  conditions: [{ type: 'variable_if', name: 'touchcursor_mode', value: 1 }],
                },
                {
                  type: 'basic',
                  from: { key_code: 'k', modifiers: { optional: ['any'] } },
                  to: [{ key_code: 'down_arrow' }],
                  conditions: [{ type: 'variable_if', name: 'touchcursor_mode', value: 1 }],
                },
                {
                  type: 'basic',
                  from: { key_code: 'i', modifiers: { optional: ['any'] } },
                  to: [{ key_code: 'up_arrow' }],
                  conditions: [{ type: 'variable_if', name: 'touchcursor_mode', value: 1 }],
                },
                {
                  type: 'basic',
                  from: { key_code: 'l', modifiers: { optional: ['any'] } },
                  to: [{ key_code: 'right_arrow' }],
                  conditions: [{ type: 'variable_if', name: 'touchcursor_mode', value: 1 }],
                },

                //
                // change u/o to Home/End, y to Insert, and
                // m/p to delete_forward/delete_or_backspace
                //

                {
                  type: 'basic',
                  from: { key_code: 'u', modifiers: { optional: ['any'] } },
                  to: [{ key_code: 'left_arrow', modifiers: ['command'] }],
                  conditions: [{ type: 'variable_if', name: 'touchcursor_mode', value: 1 }],
                },
                {
                  type: 'basic',
                  from: { key_code: 'o', modifiers: { optional: ['any'] } },
                  to: [{ key_code: 'right_arrow', modifiers: ['command'] }],
                  conditions: [{ type: 'variable_if', name: 'touchcursor_mode', value: 1 }],
                },
                {
                  type: 'basic',
                  from: { key_code: 'y', modifiers: { optional: ['caps_lock'] } },
                  to: [{ key_code: 'insert' }],
                  conditions: [{ type: 'variable_if', name: 'touchcursor_mode', value: 1 }],
                },
                {
                  type: 'basic',
                  from: { key_code: 'm', modifiers: { optional: ['any'] } },
                  to: [{ key_code: 'delete_forward' }],
                  conditions: [{ type: 'variable_if', name: 'touchcursor_mode', value: 1 }],
                },
                {
                  type: 'basic',
                  from: { key_code: 'p', modifiers: { optional: ['any'] } },
                  to: [{ key_code: 'delete_or_backspace' }],
                  conditions: [{ type: 'variable_if', name: 'touchcursor_mode', value: 1 }],
                },

                //
                // change h/n page_up/page_down
                //

                {
                  type: 'basic',
                  from: { key_code: 'h', modifiers: { optional: ['any'] } },
                  to: [{ key_code: 'page_up' }],
                  conditions: [{ type: 'variable_if', name: 'touchcursor_mode', value: 1 }],
                },
                {
                  type: 'basic',
                  from: { key_code: 'n', modifiers: { optional: ['any'] } },
                  to: [{ key_code: 'page_down' }],
                  conditions: [{ type: 'variable_if', name: 'touchcursor_mode', value: 1 }],
                },
              ],

              //
              // normalize keys
              //

              []
                .concat(
                  ['return_or_enter', 'tab', 'hyphen', 'equal_sign', 'open_bracket', 'close_bracket'],
                  ['backslash', 'non_us_pound', 'semicolon', 'quote', 'grave_accent_and_tilde'],
                  ['comma', 'period', 'slash', 'non_us_backslash'],
                  ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
                  // except for h, i, j, k, l, m, n, o, p, u, y

                  ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'q', 'r', 's', 't', 'v', 'w', 'x', 'z']
                )
                .map(function (key) {
                  return {
                    type: 'basic',
                    from: { key_code: key, modifiers: { optional: ['caps_lock'] } },
                    to: [{ key_code: 'spacebar' }, { key_code: key }, { key_code: 'vk_none' }],
                    conditions: [{ type: 'variable_if', name: 'touchcursor_mode', value: 1 }],
                  }
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

main()
