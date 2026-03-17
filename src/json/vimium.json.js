// JavaScript should be written in ECMAScript 5.1.

function main() {
  console.log(
    JSON.stringify(
      {
        title: 'Vimium',
        rules: [
          {
            description: 'System-wide Vimium',
            manipulators: [
              //
              // press esc to enter vimium mode, i to leave
              //

              {
                type: 'basic',
                from: { key_code: 'escape', modifiers: { optional: ['caps_lock'] } },
                to: [{ set_variable: { name: 'vimium', value: 1 } }],
                conditions: [{ type: 'variable_if', name: 'vimium', value: 0 }],
              },
              {
                type: 'basic',
                from: { key_code: 'escape', modifiers: { optional: ['caps_lock'] } },
                to: [{ key_code: 'escape' }],
                conditions: [{ type: 'variable_if', name: 'vimium', value: 1 }],
              },
              {
                type: 'basic',
                from: { key_code: 'i', modifiers: { optional: ['caps_lock'] } },
                to: [{ set_variable: { name: 'vimium', value: 0 } }],
                conditions: [{ type: 'variable_if', name: 'vimium', value: 1 }],
              },

              //
              // press g to trigger vimium_g_tapped (wait for another key)
              //

              {
                type: 'basic',
                from: { key_code: 'g', modifiers: { optional: ['caps_lock'] } },
                to: [{ set_variable: { name: 'vimium_g_tapped', value: 1 } }],
                conditions: [
                  { type: 'variable_if', name: 'vimium', value: 1 },
                  { type: 'variable_if', name: 'vimium_g_tapped', value: 0 },
                ],
              },

              //
              // change h/j/k/l to arrow keys
              //

              {
                type: 'basic',
                from: { key_code: 'h', modifiers: { optional: ['caps_lock'] } },
                to: [{ key_code: 'left_arrow' }],
                conditions: [{ type: 'variable_if', name: 'vimium', value: 1 }],
              },
              {
                type: 'basic',
                from: { key_code: 'j', modifiers: { optional: ['caps_lock'] } },
                to: [{ key_code: 'down_arrow' }],
                conditions: [{ type: 'variable_if', name: 'vimium', value: 1 }],
              },
              {
                type: 'basic',
                from: { key_code: 'k', modifiers: { optional: ['caps_lock'] } },
                to: [{ key_code: 'up_arrow' }],
                conditions: [{ type: 'variable_if', name: 'vimium', value: 1 }],
              },
              {
                type: 'basic',
                from: { key_code: 'l', modifiers: { optional: ['caps_lock'] } },
                to: [{ key_code: 'right_arrow' }],
                conditions: [{ type: 'variable_if', name: 'vimium', value: 1 }],
              },

              //
              // change gg/G to home/end
              //

              {
                type: 'basic',
                from: { key_code: 'g', modifiers: { optional: ['caps_lock'] } },
                to: [
                  {
                    key_code: 'home',
                  },
                  {
                    set_variable: { name: 'vimium_g_tapped', value: 0 },
                  },
                ],
                conditions: [{ type: 'variable_if', name: 'vimium_g_tapped', value: 1 }],
              },
              {
                type: 'basic',
                from: { key_code: 'g', modifiers: { mandatory: ['shift'], optional: ['caps_lock'] } },
                to: [{ key_code: 'end' }],
                conditions: [{ type: 'variable_if', name: 'vimium', value: 1 }],
              },

              //
              // change b/f to page_up/page_down
              //

              {
                type: 'basic',
                from: { key_code: 'b', modifiers: { optional: ['caps_lock', 'control'] } },
                to: [{ key_code: 'page_up' }],
                conditions: [{ type: 'variable_if', name: 'vimium', value: 1 }],
              },
              {
                type: 'basic',
                from: { key_code: 'f', modifiers: { optional: ['caps_lock', 'control'] } },
                to: [{ key_code: 'page_down' }],
                conditions: [{ type: 'variable_if', name: 'vimium', value: 1 }],
              },

              //
              // press control + u/d to scroll 20 lines up/down
              //

              {
                type: 'basic',
                from: { key_code: 'u', modifiers: { mandatory: ['control'], optional: ['caps_lock'] } },
                to: [].concat(
                  [{ key_code: 'up_arrow' }, { key_code: 'up_arrow' }, { key_code: 'up_arrow' }, { key_code: 'up_arrow' }, { key_code: 'up_arrow' }],
                  [{ key_code: 'up_arrow' }, { key_code: 'up_arrow' }, { key_code: 'up_arrow' }, { key_code: 'up_arrow' }, { key_code: 'up_arrow' }],
                  [{ key_code: 'up_arrow' }, { key_code: 'up_arrow' }, { key_code: 'up_arrow' }, { key_code: 'up_arrow' }, { key_code: 'up_arrow' }],
                  [{ key_code: 'up_arrow' }, { key_code: 'up_arrow' }, { key_code: 'up_arrow' }, { key_code: 'up_arrow' }, { key_code: 'up_arrow' }]
                ),
                to_after_key_up: [{ key_code: 'vk_none' }],
                conditions: [{ type: 'variable_if', name: 'vimium', value: 1 }],
              },
              {
                type: 'basic',
                from: { key_code: 'd', modifiers: { mandatory: ['control'], optional: ['caps_lock'] } },
                to: [].concat(
                  [{ key_code: 'down_arrow' }, { key_code: 'down_arrow' }, { key_code: 'down_arrow' }, { key_code: 'down_arrow' }, { key_code: 'down_arrow' }],
                  [{ key_code: 'down_arrow' }, { key_code: 'down_arrow' }, { key_code: 'down_arrow' }, { key_code: 'down_arrow' }, { key_code: 'down_arrow' }],
                  [{ key_code: 'down_arrow' }, { key_code: 'down_arrow' }, { key_code: 'down_arrow' }, { key_code: 'down_arrow' }, { key_code: 'down_arrow' }],
                  [{ key_code: 'down_arrow' }, { key_code: 'down_arrow' }, { key_code: 'down_arrow' }, { key_code: 'down_arrow' }, { key_code: 'down_arrow' }]
                ),
                to_after_key_up: [{ key_code: 'vk_none' }],
                conditions: [{ type: 'variable_if', name: 'vimium', value: 1 }],
              },

              //
              // press slash to search, n/N to cycle forward/backword
              //

              {
                type: 'basic',
                from: { key_code: 'slash', modifiers: { optional: ['caps_lock'] } },
                to: [
                  {
                    key_code: 'f',
                    modifiers: ['left_command'],
                  },
                  {
                    key_code: 'vk_none',
                  },
                  { set_variable: { name: 'vimium', value: 0 } },
                ],
                conditions: [{ type: 'variable_if', name: 'vimium', value: 1 }],
              },
              {
                type: 'basic',
                from: { key_code: 'n', modifiers: { optional: ['caps_lock'] } },
                to: [{ key_code: 'g', modifiers: ['left_command'] }],
                to_after_key_up: [{ key_code: 'vk_none' }],
                conditions: [{ type: 'variable_if', name: 'vimium', value: 1 }],
              },
              {
                type: 'basic',
                from: { key_code: 'n', modifiers: { mandatory: ['shift'], optional: ['caps_lock'] } },
                to: [{ key_code: 'g', modifiers: ['left_command', 'left_shift'] }],
                to_after_key_up: [{ key_code: 'vk_none' }],
                conditions: [{ type: 'variable_if', name: 'vimium', value: 1 }],
              },

              //
              // press J/K or gT/gt to switch between tabs
              //

              {
                type: 'basic',
                from: {
                  key_code: 'j',
                  modifiers: {
                    mandatory: ['shift'],
                    optional: ['caps_lock'],
                  },
                },
                to: [
                  {
                    key_code: 'tab',
                    modifiers: ['left_control', 'left_shift'],
                  },
                ],
                to_after_key_up: [
                  {
                    key_code: 'vk_none',
                  },
                ],
                conditions: [
                  {
                    type: 'variable_if',
                    name: 'vimium',
                    value: 1,
                  },
                ],
              },
              {
                type: 'basic',
                from: { key_code: 'k', modifiers: { mandatory: ['shift'], optional: ['caps_lock'] } },
                to: [{ key_code: 'tab', modifiers: ['left_control'] }],
                to_after_key_up: [{ key_code: 'vk_none' }],
                conditions: [{ type: 'variable_if', name: 'vimium', value: 1 }],
              },
              {
                type: 'basic',
                from: { key_code: 't', modifiers: { mandatory: ['shift'], optional: ['caps_lock'] } },
                to: [
                  {
                    key_code: 'tab',
                    modifiers: ['left_control', 'left_shift'],
                  },
                  {
                    set_variable: { name: 'vimium_g_tapped', value: 0 },
                  },
                ],
                to_after_key_up: [{ key_code: 'vk_none' }],
                conditions: [{ type: 'variable_if', name: 'vimium_g_tapped', value: 1 }],
              },
              {
                type: 'basic',
                from: { key_code: 't', modifiers: { optional: ['caps_lock'] } },
                to: [
                  {
                    key_code: 'tab',
                    modifiers: ['left_control'],
                  },
                  {
                    set_variable: { name: 'vimium_g_tapped', value: 0 },
                  },
                ],
                to_after_key_up: [{ key_code: 'vk_none' }],
                conditions: [{ type: 'variable_if', name: 'vimium_g_tapped', value: 1 }],
              },

              //
              // press g0/g$ to go to the first/last tab
              //

              {
                type: 'basic',
                from: { key_code: '0', modifiers: { optional: ['caps_lock'] } },
                to: [
                  {
                    key_code: '1',
                    modifiers: ['left_command'],
                  },
                  {
                    set_variable: { name: 'vimium_g_tapped', value: 0 },
                  },
                ],
                to_after_key_up: [{ key_code: 'vk_none' }],
                conditions: [{ type: 'variable_if', name: 'vimium_g_tapped', value: 1 }],
              },
              {
                type: 'basic',
                from: { key_code: '4', modifiers: { optional: ['caps_lock', 'shift'] } },
                to: [
                  {
                    key_code: '1',
                    modifiers: ['left_command'],
                  },
                  {
                    key_code: 'tab',
                    modifiers: ['left_control', 'left_shift'],
                  },
                  {
                    set_variable: { name: 'vimium_g_tapped', value: 0 },
                  },
                ],
                to_after_key_up: [{ key_code: 'vk_none' }],
                conditions: [{ type: 'variable_if', name: 'vimium_g_tapped', value: 1 }],
              },

              //
              // press x/X to close/restore tab
              //

              {
                type: 'basic',
                from: { key_code: 'x', modifiers: { optional: ['caps_lock'] } },
                to: [{ key_code: 'w', modifiers: ['left_command'] }],
                to_after_key_up: [{ key_code: 'vk_none' }],
                conditions: [{ type: 'variable_if', name: 'vimium', value: 1 }],
              },
              {
                type: 'basic',
                from: { key_code: 'x', modifiers: { mandatory: ['shift'], optional: ['caps_lock'] } },
                to: [{ key_code: 't', modifiers: ['left_command', 'left_shift'] }],
                to_after_key_up: [{ key_code: 'vk_none' }],
                conditions: [{ type: 'variable_if', name: 'vimium', value: 1 }],
              },

              //
              // change t to command + t, r to command + r
              //

              {
                type: 'basic',
                from: { key_code: 't', modifiers: { optional: ['caps_lock'] } },
                to: [{ key_code: 't', modifiers: ['left_command'] }],
                to_after_key_up: [{ key_code: 'vk_none' }],
                conditions: [{ type: 'variable_if', name: 'vimium', value: 1 }],
              },
              {
                type: 'basic',
                from: { key_code: 'r', modifiers: { optional: ['caps_lock'] } },
                to: [{ key_code: 'r', modifiers: ['left_command'] }],
                to_after_key_up: [{ key_code: 'vk_none' }],
                conditions: [{ type: 'variable_if', name: 'vimium', value: 1 }],
              },

              //
              // press u / control+r to undo/redo
              //

              {
                type: 'basic',
                from: { key_code: 'u', modifiers: { optional: ['caps_lock'] } },
                to: [{ key_code: 'z', modifiers: ['left_command'] }],
                to_after_key_up: [{ key_code: 'vk_none' }],
                conditions: [{ type: 'variable_if', name: 'vimium', value: 1 }],
              },
              {
                type: 'basic',
                from: { key_code: 'r', modifiers: { mandatory: ['control'], optional: ['caps_lock'] } },
                to: [{ key_code: 'z', modifiers: ['left_command', 'left_shift'] }],
                to_after_key_up: [{ key_code: 'vk_none' }],
                conditions: [{ type: 'variable_if', name: 'vimium', value: 1 }],
              },

              //
              // normallize shift specially so it won't cancel vimium_g_tapped
              //

              {
                type: 'basic',
                from: { key_code: 'left_shift' },
                to: [{ key_code: 'left_shift' }],
                conditions: [{ type: 'variable_if', name: 'vimium_g_tapped', value: 1 }],
              },
              {
                type: 'basic',
                from: { key_code: 'right_shift' },
                to: [{ key_code: 'right_shift' }],
                conditions: [{ type: 'variable_if', name: 'vimium_g_tapped', value: 1 }],
              },

              //
              // press other keys to cancel vimium_g_tapped
              //

              {
                type: 'basic',
                from: { any: 'key_code', modifiers: { optional: ['any'] } },
                to: [{ set_variable: { name: 'vimium_g_tapped', value: 0 } }],
                conditions: [{ type: 'variable_if', name: 'vimium_g_tapped', value: 1 }],
              },

              //
              // normallize shift and control so they won't be dropped
              //

              {
                type: 'basic',
                from: { key_code: 'left_shift' },
                to: [{ key_code: 'left_shift' }],
                conditions: [{ type: 'variable_if', name: 'vimium', value: 1 }],
              },
              {
                type: 'basic',
                from: { key_code: 'right_shift' },
                to: [{ key_code: 'right_shift' }],
                conditions: [{ type: 'variable_if', name: 'vimium', value: 1 }],
              },
              {
                type: 'basic',
                from: { key_code: 'left_control' },
                to: [{ key_code: 'left_control' }],
                conditions: [{ type: 'variable_if', name: 'vimium', value: 1 }],
              },
              {
                type: 'basic',
                from: { key_code: 'right_control' },
                to: [{ key_code: 'right_control' }],
                conditions: [{ type: 'variable_if', name: 'vimium', value: 1 }],
              },

              //
              // drop other keys in vimium mode
              //

              {
                type: 'basic',
                from: { any: 'key_code', modifiers: { optional: ['any'] } },
                to: [{ key_code: 'vk_none' }],
                conditions: [{ type: 'variable_if', name: 'vimium', value: 1 }],
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
