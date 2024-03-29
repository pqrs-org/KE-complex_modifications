// JavaScript should be written in ECMAScript 5.1.

function main() {
  console.log(
    JSON.stringify(
      {
        title: 'Simvi',
        rules: [
          {
            description: "Simvi Hyun's personal mod",
            manipulators: [
              {
                type: 'basic',
                from: { key_code: 'j', modifiers: { optional: ['any'] } },
                to: [{ key_code: 'down_arrow' }],
                conditions: [{ type: 'variable_if', name: 'simple_vi_mode', value: 1 }],
              },
              {
                type: 'basic',
                from: {
                  simultaneous: [{ key_code: 's' }, { key_code: 'j' }],
                  simultaneous_options: {
                    key_down_order: 'strict',
                    key_up_order: 'strict_inverse',
                    to_after_key_up: [{ set_variable: { name: 'simple_vi_mode', value: 0 } }],
                  },
                  modifiers: { optional: ['any'] },
                },
                to: [
                  {
                    set_variable: { name: 'simple_vi_mode', value: 1 },
                  },
                  {
                    key_code: 'down_arrow',
                  },
                ],
                parameters: { 'basic.simultaneous_threshold_milliseconds': 500 },
              },
              {
                type: 'basic',
                from: { key_code: 'k', modifiers: { optional: ['any'] } },
                to: [{ key_code: 'up_arrow' }],
                conditions: [{ type: 'variable_if', name: 'simple_vi_mode', value: 1 }],
              },
              {
                type: 'basic',
                from: {
                  simultaneous: [{ key_code: 's' }, { key_code: 'k' }],
                  simultaneous_options: {
                    key_down_order: 'strict',
                    key_up_order: 'strict_inverse',
                    to_after_key_up: [{ set_variable: { name: 'simple_vi_mode', value: 0 } }],
                  },
                  modifiers: { optional: ['any'] },
                },
                to: [
                  {
                    set_variable: { name: 'simple_vi_mode', value: 1 },
                  },
                  {
                    key_code: 'up_arrow',
                  },
                ],
                parameters: { 'basic.simultaneous_threshold_milliseconds': 500 },
              },
              {
                type: 'basic',
                from: { key_code: 'h', modifiers: { optional: ['any'] } },
                to: [{ key_code: 'left_arrow' }],
                conditions: [{ type: 'variable_if', name: 'simple_vi_mode', value: 1 }],
              },
              {
                type: 'basic',
                from: {
                  simultaneous: [{ key_code: 's' }, { key_code: 'h' }],
                  simultaneous_options: {
                    key_down_order: 'strict',
                    key_up_order: 'strict_inverse',
                    to_after_key_up: [{ set_variable: { name: 'simple_vi_mode', value: 0 } }],
                  },
                  modifiers: { optional: ['any'] },
                },
                to: [
                  {
                    set_variable: { name: 'simple_vi_mode', value: 1 },
                  },
                  {
                    key_code: 'left_arrow',
                  },
                ],
                parameters: { 'basic.simultaneous_threshold_milliseconds': 500 },
              },
              {
                type: 'basic',
                from: { key_code: 'l', modifiers: { optional: ['any'] } },
                to: [{ key_code: 'right_arrow' }],
                conditions: [{ type: 'variable_if', name: 'simple_vi_mode', value: 1 }],
              },
              {
                type: 'basic',
                from: {
                  simultaneous: [{ key_code: 's' }, { key_code: 'l' }],
                  simultaneous_options: {
                    key_down_order: 'strict',
                    key_up_order: 'strict_inverse',
                    to_after_key_up: [{ set_variable: { name: 'simple_vi_mode', value: 0 } }],
                  },
                  modifiers: { optional: ['any'] },
                },
                to: [
                  {
                    set_variable: { name: 'simple_vi_mode', value: 1 },
                  },
                  {
                    key_code: 'right_arrow',
                  },
                ],
                parameters: { 'basic.simultaneous_threshold_milliseconds': 500 },
              },
              {
                type: 'basic',
                from: { key_code: 'f', modifiers: { optional: ['any'] } },
                to: [{ key_code: 'fn' }],
                conditions: [{ type: 'variable_if', name: 'simple_vi_mode', value: 1 }],
              },
              {
                type: 'basic',
                from: {
                  simultaneous: [{ key_code: 's' }, { key_code: 'f' }],
                  simultaneous_options: {
                    key_down_order: 'strict',
                    key_up_order: 'strict_inverse',
                    to_after_key_up: [{ set_variable: { name: 'simple_vi_mode', value: 0 } }],
                  },
                  modifiers: { optional: ['any'] },
                },
                to: [
                  {
                    set_variable: { name: 'simple_vi_mode', value: 1 },
                  },
                  {
                    key_code: 'fn',
                  },
                ],
                parameters: { 'basic.simultaneous_threshold_milliseconds': 500 },
              },

              {
                type: 'basic',
                from: {
                  simultaneous: [{ key_code: 's' }, { key_code: 'left_shift' }],
                  simultaneous_options: {
                    key_down_order: 'strict',
                    key_up_order: 'strict_inverse',
                    to_after_key_up: [{ set_variable: { name: 'simple_vi_mode', value: 0 } }],
                  },
                  modifiers: { optional: ['any'] },
                },
                to: [
                  {
                    set_variable: { name: 'simple_vi_mode', value: 1 },
                  },
                  {
                    key_code: 'left_shift',
                  },
                ],
                parameters: { 'basic.simultaneous_threshold_milliseconds': 500 },
              },
              {
                type: 'basic',
                from: {
                  simultaneous: [{ key_code: 's' }, { key_code: 'left_command' }],
                  simultaneous_options: {
                    key_down_order: 'strict',
                    key_up_order: 'strict_inverse',
                    to_after_key_up: [{ set_variable: { name: 'simple_vi_mode', value: 0 } }],
                  },
                  modifiers: { optional: ['any'] },
                },
                to: [
                  {
                    set_variable: { name: 'simple_vi_mode', value: 1 },
                  },
                  {
                    key_code: 'left_command',
                  },
                ],
                parameters: { 'basic.simultaneous_threshold_milliseconds': 500 },
              },
              {
                type: 'basic',
                from: {
                  simultaneous: [{ key_code: 's' }, { key_code: 'left_option' }],
                  simultaneous_options: {
                    key_down_order: 'strict',
                    key_up_order: 'strict_inverse',
                    to_after_key_up: [
                      {
                        set_variable: { name: 'simple_vi_mode', value: 0 },
                      },
                    ],
                  },
                  modifiers: { optional: ['any'] },
                },
                to: [
                  {
                    set_variable: { name: 'simple_vi_mode', value: 1 },
                  },
                  {
                    key_code: 'left_option',
                  },
                ],
                parameters: { 'basic.simultaneous_threshold_milliseconds': 500 },
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
