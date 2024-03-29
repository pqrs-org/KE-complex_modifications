// JavaScript should be written in ECMAScript 5.1.

function main() {
  console.log(
    JSON.stringify(
      {
        title: 'Amethyst Mode',
        rules: [
          {
            description: 'Trigger Amethyst Mode/Amethyst Second Mode with 9/0',
            manipulators: [
              //
              // 9 as Amethyst Mode trigger
              //

              {
                type: 'basic',
                from: { key_code: '9', modifiers: { optional: ['caps_lock'] } },
                to: [{ set_variable: { name: 'amethyst_mode', value: 1 } }],
                to_after_key_up: [{ set_variable: { name: 'amethyst_mode', value: 0 } }],
                to_if_alone: [{ key_code: '9' }],
              },

              //
              // 0 as Amethyst Second Mode trigger
              //

              {
                type: 'basic',
                conditions: [{ type: 'variable_if', name: 'amethyst_mode', value: 1 }],
                from: { key_code: '0', modifiers: { optional: ['caps_lock'] } },
                to: [{ set_variable: { name: 'amethyst_second_mode', value: 1 } }],
                to_after_key_up: [{ set_variable: { name: 'amethyst_second_mode', value: 0 } }],
                to_if_alone: [{ key_code: '0' }],
              },
            ],
          },
          {
            description: '9+8 cycle layout forward 9+* backward',
            manipulators: [
              // 9+8 cycle layout forward 9+* backward

              {
                type: 'basic',
                from: { key_code: '8', modifiers: { optional: ['caps_lock'] } },
                to: [
                  {
                    key_code: 'spacebar',
                    modifiers: ['left_option', 'left_shift'],
                  },
                ],
                conditions: [{ type: 'variable_if', name: 'amethyst_mode', value: 1 }],
              },
              {
                type: 'basic',
                from: {
                  key_code: '8',
                  modifiers: {
                    mandatory: ['left_shift'],
                    optional: ['caps_lock'],
                  },
                },
                to: [
                  {
                    key_code: 'spacebar',
                    modifiers: ['left_control', 'left_option', 'left_shift'],
                  },
                ],
                conditions: [{ type: 'variable_if', name: 'amethyst_mode', value: 1 }],
              },
            ],
          },
          {
            description: '9+q/w shrink expand main pane',
            manipulators: [
              // 9+q/w shrink expand main pane
              {
                type: 'basic',
                from: { key_code: 'q', modifiers: { optional: ['caps_lock'] } },
                to: [
                  {
                    key_code: 'h',
                    modifiers: ['left_option', 'left_shift'],
                  },
                ],
                conditions: [{ type: 'variable_if', name: 'amethyst_mode', value: 1 }],
              },
              {
                type: 'basic',
                from: { key_code: 'w', modifiers: { optional: ['caps_lock'] } },
                to: [
                  {
                    key_code: 'l',
                    modifiers: ['left_option', 'left_shift'],
                  },
                ],
                conditions: [{ type: 'variable_if', name: 'amethyst_mode', value: 1 }],
              },
            ],
          },
          {
            description: '9+J/j move focuse clockwise / counter clockwise',
            manipulators: [
              // 9+J/j move focuse clockwise / counter clockwise
              {
                type: 'basic',
                from: {
                  key_code: 'j',
                  modifiers: {
                    mandatory: ['left_shift'],
                    optional: ['caps_lock'],
                  },
                },
                to: [
                  {
                    key_code: 'k',
                    modifiers: ['left_option', 'left_shift'],
                  },
                ],
                conditions: [{ type: 'variable_if', name: 'amethyst_mode', value: 1 }],
              },
              {
                type: 'basic',
                from: { key_code: 'j', modifiers: { optional: ['caps_lock'] } },
                to: [
                  {
                    key_code: 'j',
                    modifiers: ['left_option', 'left_shift'],
                  },
                ],
                conditions: [{ type: 'variable_if', name: 'amethyst_mode', value: 1 }],
              },
            ],
          },
          {
            description: '90+J/j swap focused window clockwise / counter clockwise',
            manipulators: [
              // 90+J/j swap focused window clockwise / counter clockwise
              {
                type: 'basic',
                from: {
                  key_code: 'j',
                  modifiers: {
                    mandatory: ['left_shift'],
                    optional: ['caps_lock'],
                  },
                },
                to: [
                  {
                    key_code: 'j',
                    modifiers: ['left_option', 'left_shift', 'left_control'],
                  },
                ],
                conditions: [
                  {
                    type: 'variable_if',
                    name: 'amethyst_second_mode',
                    value: 1,
                  },
                ],
              },
              {
                type: 'basic',
                from: { key_code: 'j', modifiers: { optional: ['caps_lock'] } },
                to: [
                  {
                    key_code: 'k',
                    modifiers: ['left_option', 'left_shift', 'left_control'],
                  },
                ],
                conditions: [
                  {
                    type: 'variable_if',
                    name: 'amethyst_second_mode',
                    value: 1,
                  },
                ],
              },
            ],
          },
          {
            description: '90+8/* swap focused window clockwise / counter clockwise screen',
            manipulators: [
              // 90+8/* swap focused window clockwise / counter clockwise screen
              {
                type: 'basic',
                from: {
                  key_code: '8',
                  modifiers: {
                    mandatory: ['left_shift'],
                    optional: ['caps_lock'],
                  },
                },
                to: [
                  {
                    key_code: 'h',
                    modifiers: ['left_option', 'left_shift', 'left_control'],
                  },
                ],
                conditions: [
                  {
                    type: 'variable_if',
                    name: 'amethyst_second_mode',
                    value: 1,
                  },
                ],
              },
              {
                type: 'basic',
                from: { key_code: '8', modifiers: { optional: ['caps_lock'] } },
                to: [
                  {
                    key_code: 'l',
                    modifiers: ['left_option', 'left_shift', 'left_control'],
                  },
                ],
                conditions: [
                  {
                    type: 'variable_if',
                    name: 'amethyst_second_mode',
                    value: 1,
                  },
                ],
              },
            ],
          },
          {
            description: '9+ui/UI focus screen 12 / throw focus window to screen 12',
            manipulators: [
              // 9+ui/UI focus screen 12 / throw focus window to screen 12
              {
                type: 'basic',
                from: { key_code: 'u', modifiers: { optional: ['caps_lock'] } },
                to: [
                  {
                    key_code: 'w',
                    modifiers: ['left_option', 'left_shift'],
                  },
                ],
                conditions: [{ type: 'variable_if', name: 'amethyst_mode', value: 1 }],
              },
              {
                type: 'basic',
                from: {
                  key_code: 'u',
                  modifiers: {
                    mandatory: ['left_shift'],
                    optional: ['caps_lock'],
                  },
                },
                to: [
                  {
                    key_code: 'w',
                    modifiers: ['left_option', 'left_shift', 'left_control'],
                  },
                ],
                conditions: [{ type: 'variable_if', name: 'amethyst_mode', value: 1 }],
              },
              {
                type: 'basic',
                from: { key_code: 'i', modifiers: { optional: ['caps_lock'] } },
                to: [
                  {
                    key_code: 'e',
                    modifiers: ['left_option', 'left_shift'],
                  },
                ],
                conditions: [{ type: 'variable_if', name: 'amethyst_mode', value: 1 }],
              },
              {
                type: 'basic',
                from: {
                  key_code: 'i',
                  modifiers: {
                    mandatory: ['left_shift'],
                    optional: ['caps_lock'],
                  },
                },
                to: [
                  {
                    key_code: 'e',
                    modifiers: ['left_option', 'left_shift', 'left_control'],
                  },
                ],
                conditions: [{ type: 'variable_if', name: 'amethyst_mode', value: 1 }],
              },
            ],
          },
          {
            description: '9+zxc/ZXC focus screen 123 / throw focus window to screen 123',
            manipulators: [
              // 9+zxc/ZXC focus screen 123 / throw focus window to screen 123
              {
                type: 'basic',
                from: { key_code: 'z', modifiers: { optional: ['caps_lock'] } },
                to: [
                  {
                    key_code: 'w',
                    modifiers: ['left_option', 'left_shift'],
                  },
                ],
                conditions: [{ type: 'variable_if', name: 'amethyst_mode', value: 1 }],
              },
              {
                type: 'basic',
                from: {
                  key_code: 'z',
                  modifiers: {
                    mandatory: ['left_shift'],
                    optional: ['caps_lock'],
                  },
                },
                to: [
                  {
                    key_code: 'w',
                    modifiers: ['left_option', 'left_shift', 'left_control'],
                  },
                ],
                conditions: [{ type: 'variable_if', name: 'amethyst_mode', value: 1 }],
              },
              {
                type: 'basic',
                from: { key_code: 'x', modifiers: { optional: ['caps_lock'] } },
                to: [
                  {
                    key_code: 'e',
                    modifiers: ['left_option', 'left_shift'],
                  },
                ],
                conditions: [{ type: 'variable_if', name: 'amethyst_mode', value: 1 }],
              },
              {
                type: 'basic',
                from: {
                  key_code: 'x',
                  modifiers: {
                    mandatory: ['left_shift'],
                    optional: ['caps_lock'],
                  },
                },
                to: [
                  {
                    key_code: 'e',
                    modifiers: ['left_option', 'left_shift', 'left_control'],
                  },
                ],
                conditions: [{ type: 'variable_if', name: 'amethyst_mode', value: 1 }],
              },
              {
                type: 'basic',
                from: { key_code: 'c', modifiers: { optional: ['caps_lock'] } },
                to: [
                  {
                    key_code: 'r',
                    modifiers: ['left_option', 'left_shift'],
                  },
                ],
                conditions: [{ type: 'variable_if', name: 'amethyst_mode', value: 1 }],
              },
              {
                type: 'basic',
                from: {
                  key_code: 'c',
                  modifiers: {
                    mandatory: ['left_shift'],
                    optional: ['caps_lock'],
                  },
                },
                to: [
                  {
                    key_code: 'r',
                    modifiers: ['left_option', 'left_shift', 'left_control'],
                  },
                ],
                conditions: [{ type: 'variable_if', name: 'amethyst_mode', value: 1 }],
              },
            ],
          },
          {
            description: '9+t toggle flot for current window',
            manipulators: [
              // 9+t toggle flot for current window

              {
                type: 'basic',
                from: { key_code: 't', modifiers: { optional: ['caps_lock'] } },
                to: [
                  {
                    key_code: 't',
                    modifiers: ['left_option', 'left_shift', 'left_control'],
                  },
                ],
                conditions: [{ type: 'variable_if', name: 'amethyst_mode', value: 1 }],
              },
            ],
          },
          {
            description: '9+asdf select tall/wide/column/fullscren layout',
            manipulators: [
              // 9+asdf select tall/wide/column/fullscren layout

              {
                type: 'basic',
                from: { key_code: 'a', modifiers: { optional: ['caps_lock'] } },
                to: [
                  {
                    key_code: 'a',
                    modifiers: ['left_option', 'left_shift'],
                  },
                ],
                conditions: [{ type: 'variable_if', name: 'amethyst_mode', value: 1 }],
              },
              {
                type: 'basic',
                from: { key_code: 's', modifiers: { optional: ['caps_lock'] } },
                to: [
                  {
                    key_code: 's',
                    modifiers: ['left_option', 'left_shift'],
                  },
                ],
                conditions: [{ type: 'variable_if', name: 'amethyst_mode', value: 1 }],
              },
              {
                type: 'basic',
                from: { key_code: 'd', modifiers: { optional: ['caps_lock'] } },
                to: [
                  {
                    key_code: 'f',
                    modifiers: ['left_option', 'left_shift'],
                  },
                ],
                conditions: [{ type: 'variable_if', name: 'amethyst_mode', value: 1 }],
              },
              {
                type: 'basic',
                from: { key_code: 'f', modifiers: { optional: ['caps_lock'] } },
                to: [
                  {
                    key_code: 'd',
                    modifiers: ['left_option', 'left_shift'],
                  },
                ],
                conditions: [{ type: 'variable_if', name: 'amethyst_mode', value: 1 }],
              },
            ],
          },
          {
            description: 'Amethyst Mode All in one',
            manipulators: [
              //
              // 9 as Amethyst Mode trigger
              //

              {
                type: 'basic',
                from: { key_code: '9', modifiers: { optional: ['caps_lock'] } },
                to: [
                  {
                    set_variable: {
                      name: 'amethyst_mode',
                      value: 1,
                    },
                  },
                ],
                to_after_key_up: [{ set_variable: { name: 'amethyst_mode', value: 0 } }],
                to_if_alone: [
                  {
                    key_code: '9',
                  },
                ],
              },

              //
              // 90 as Amethyst Second Mode trigger
              //

              {
                type: 'basic',
                conditions: [{ type: 'variable_if', name: 'amethyst_mode', value: 1 }],
                from: { key_code: '0', modifiers: { optional: ['caps_lock'] } },
                to: [
                  {
                    set_variable: {
                      name: 'amethyst_second_mode',
                      value: 1,
                    },
                  },
                ],
                to_after_key_up: [
                  {
                    set_variable: {
                      name: 'amethyst_second_mode',
                      value: 0,
                    },
                  },
                ],
                to_if_alone: [
                  {
                    key_code: '0',
                  },
                ],
              },

              //
              // 9+8 cycle layout forward 9+* backward
              //

              {
                type: 'basic',
                from: { key_code: '8', modifiers: { optional: ['caps_lock'] } },
                to: [
                  {
                    key_code: 'spacebar',
                    modifiers: ['left_option', 'left_shift'],
                  },
                ],
                conditions: [{ type: 'variable_if', name: 'amethyst_mode', value: 1 }],
              },
              {
                type: 'basic',
                from: {
                  key_code: '8',
                  modifiers: {
                    mandatory: ['left_shift'],
                    optional: ['caps_lock'],
                  },
                },
                to: [
                  {
                    key_code: 'spacebar',
                    modifiers: ['left_control', 'left_option', 'left_shift'],
                  },
                ],
                conditions: [{ type: 'variable_if', name: 'amethyst_mode', value: 1 }],
              },

              // 9+q/w shrink expand main pane
              {
                type: 'basic',
                from: { key_code: 'q', modifiers: { optional: ['caps_lock'] } },
                to: [
                  {
                    key_code: 'h',
                    modifiers: ['left_option', 'left_shift'],
                  },
                ],
                conditions: [{ type: 'variable_if', name: 'amethyst_mode', value: 1 }],
              },
              {
                type: 'basic',
                from: { key_code: 'w', modifiers: { optional: ['caps_lock'] } },
                to: [
                  {
                    key_code: 'l',
                    modifiers: ['left_option', 'left_shift'],
                  },
                ],
                conditions: [{ type: 'variable_if', name: 'amethyst_mode', value: 1 }],
              },

              // 9+J/j move focuse clockwise / counter clockwise
              {
                type: 'basic',
                from: {
                  key_code: 'j',
                  modifiers: {
                    mandatory: ['left_shift'],
                    optional: ['caps_lock'],
                  },
                },
                to: [
                  {
                    key_code: 'k',
                    modifiers: ['left_option', 'left_shift'],
                  },
                ],
                conditions: [{ type: 'variable_if', name: 'amethyst_mode', value: 1 }],
              },
              {
                type: 'basic',
                from: { key_code: 'j', modifiers: { optional: ['caps_lock'] } },
                to: [
                  {
                    key_code: 'j',
                    modifiers: ['left_option', 'left_shift'],
                  },
                ],
                conditions: [{ type: 'variable_if', name: 'amethyst_mode', value: 1 }],
              },

              // 90+J/j swap focused window clockwise / counter clockwise
              {
                type: 'basic',
                from: {
                  key_code: 'j',
                  modifiers: {
                    mandatory: ['left_shift'],
                    optional: ['caps_lock'],
                  },
                },
                to: [
                  {
                    key_code: 'j',
                    modifiers: ['left_option', 'left_shift', 'left_control'],
                  },
                ],
                conditions: [
                  {
                    type: 'variable_if',
                    name: 'amethyst_second_mode',
                    value: 1,
                  },
                ],
              },
              {
                type: 'basic',
                from: { key_code: 'j', modifiers: { optional: ['caps_lock'] } },
                to: [
                  {
                    key_code: 'k',
                    modifiers: ['left_option', 'left_shift', 'left_control'],
                  },
                ],
                conditions: [
                  {
                    type: 'variable_if',
                    name: 'amethyst_second_mode',
                    value: 1,
                  },
                ],
              },

              // 90+8/* swap focused window clockwise / counter clockwise screen
              {
                type: 'basic',
                from: {
                  key_code: '8',
                  modifiers: {
                    mandatory: ['left_shift'],
                    optional: ['caps_lock'],
                  },
                },
                to: [
                  {
                    key_code: 'h',
                    modifiers: ['left_option', 'left_shift', 'left_control'],
                  },
                ],
                conditions: [
                  {
                    type: 'variable_if',
                    name: 'amethyst_second_mode',
                    value: 1,
                  },
                ],
              },
              {
                type: 'basic',
                from: { key_code: '8', modifiers: { optional: ['caps_lock'] } },
                to: [
                  {
                    key_code: 'l',
                    modifiers: ['left_option', 'left_shift', 'left_control'],
                  },
                ],
                conditions: [
                  {
                    type: 'variable_if',
                    name: 'amethyst_second_mode',
                    value: 1,
                  },
                ],
              },

              // 9+ui/UI focus screen 12 / throw focus window to screen 12
              {
                type: 'basic',
                from: { key_code: 'u', modifiers: { optional: ['caps_lock'] } },
                to: [
                  {
                    key_code: 'w',
                    modifiers: ['left_option', 'left_shift'],
                  },
                ],
                conditions: [{ type: 'variable_if', name: 'amethyst_mode', value: 1 }],
              },
              {
                type: 'basic',
                from: {
                  key_code: 'u',
                  modifiers: {
                    mandatory: ['left_shift'],
                    optional: ['caps_lock'],
                  },
                },
                to: [
                  {
                    key_code: 'w',
                    modifiers: ['left_option', 'left_shift', 'left_control'],
                  },
                ],
                conditions: [{ type: 'variable_if', name: 'amethyst_mode', value: 1 }],
              },
              {
                type: 'basic',
                from: { key_code: 'i', modifiers: { optional: ['caps_lock'] } },
                to: [
                  {
                    key_code: 'e',
                    modifiers: ['left_option', 'left_shift'],
                  },
                ],
                conditions: [{ type: 'variable_if', name: 'amethyst_mode', value: 1 }],
              },
              {
                type: 'basic',
                from: {
                  key_code: 'i',
                  modifiers: {
                    mandatory: ['left_shift'],
                    optional: ['caps_lock'],
                  },
                },
                to: [
                  {
                    key_code: 'e',
                    modifiers: ['left_option', 'left_shift', 'left_control'],
                  },
                ],
                conditions: [{ type: 'variable_if', name: 'amethyst_mode', value: 1 }],
              },

              // 9+zxc/ZXC focus screen 123 / throw focus window to screen 123
              {
                type: 'basic',
                from: { key_code: 'z', modifiers: { optional: ['caps_lock'] } },
                to: [
                  {
                    key_code: 'w',
                    modifiers: ['left_option', 'left_shift'],
                  },
                ],
                conditions: [{ type: 'variable_if', name: 'amethyst_mode', value: 1 }],
              },
              {
                type: 'basic',
                from: {
                  key_code: 'z',
                  modifiers: {
                    mandatory: ['left_shift'],
                    optional: ['caps_lock'],
                  },
                },
                to: [
                  {
                    key_code: 'w',
                    modifiers: ['left_option', 'left_shift', 'left_control'],
                  },
                ],
                conditions: [{ type: 'variable_if', name: 'amethyst_mode', value: 1 }],
              },

              {
                type: 'basic',
                from: { key_code: 'x', modifiers: { optional: ['caps_lock'] } },
                to: [
                  {
                    key_code: 'e',
                    modifiers: ['left_option', 'left_shift'],
                  },
                ],
                conditions: [{ type: 'variable_if', name: 'amethyst_mode', value: 1 }],
              },
              {
                type: 'basic',
                from: {
                  key_code: 'x',
                  modifiers: {
                    mandatory: ['left_shift'],
                    optional: ['caps_lock'],
                  },
                },
                to: [
                  {
                    key_code: 'e',
                    modifiers: ['left_option', 'left_shift', 'left_control'],
                  },
                ],
                conditions: [{ type: 'variable_if', name: 'amethyst_mode', value: 1 }],
              },

              {
                type: 'basic',
                from: { key_code: 'c', modifiers: { optional: ['caps_lock'] } },
                to: [
                  {
                    key_code: 'r',
                    modifiers: ['left_option', 'left_shift'],
                  },
                ],
                conditions: [{ type: 'variable_if', name: 'amethyst_mode', value: 1 }],
              },
              {
                type: 'basic',
                from: {
                  key_code: 'c',
                  modifiers: {
                    mandatory: ['left_shift'],
                    optional: ['caps_lock'],
                  },
                },
                to: [
                  {
                    key_code: 'r',
                    modifiers: ['left_option', 'left_shift', 'left_control'],
                  },
                ],
                conditions: [{ type: 'variable_if', name: 'amethyst_mode', value: 1 }],
              },

              // 9+t toggle flot for current window

              {
                type: 'basic',
                from: { key_code: 't', modifiers: { optional: ['caps_lock'] } },
                to: [
                  {
                    key_code: 't',
                    modifiers: ['left_option', 'left_shift', 'left_control'],
                  },
                ],
                conditions: [{ type: 'variable_if', name: 'amethyst_mode', value: 1 }],
              },

              // 9+asdf select tall/wide/column/fullscren layout

              {
                type: 'basic',
                from: { key_code: 'a', modifiers: { optional: ['caps_lock'] } },
                to: [
                  {
                    key_code: 'a',
                    modifiers: ['left_option', 'left_shift'],
                  },
                ],
                conditions: [{ type: 'variable_if', name: 'amethyst_mode', value: 1 }],
              },
              {
                type: 'basic',
                from: { key_code: 's', modifiers: { optional: ['caps_lock'] } },
                to: [
                  {
                    key_code: 's',
                    modifiers: ['left_option', 'left_shift'],
                  },
                ],
                conditions: [{ type: 'variable_if', name: 'amethyst_mode', value: 1 }],
              },
              {
                type: 'basic',
                from: { key_code: 'd', modifiers: { optional: ['caps_lock'] } },
                to: [
                  {
                    key_code: 'f',
                    modifiers: ['left_option', 'left_shift'],
                  },
                ],
                conditions: [{ type: 'variable_if', name: 'amethyst_mode', value: 1 }],
              },
              {
                type: 'basic',
                from: { key_code: 'f', modifiers: { optional: ['caps_lock'] } },
                to: [
                  {
                    key_code: 'd',
                    modifiers: ['left_option', 'left_shift'],
                  },
                ],
                conditions: [{ type: 'variable_if', name: 'amethyst_mode', value: 1 }],
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
