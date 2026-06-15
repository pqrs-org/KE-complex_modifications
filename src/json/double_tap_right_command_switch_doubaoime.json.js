// JavaScript should be written in ECMAScript 5.1.

var doubaoInputSourceId = '^com\\.bytedance\\.inputmethod\\.doubaoime\\.pinyin$'
var returnInputSourceId = '^im\\.rime\\.inputmethod\\.Squirrel\\.Hans$'
var returnInputSourceName = 'Rime'

function main() {
  console.log(
    JSON.stringify(
      {
        title: 'Double tap right_command to switch DoubaoIME voice input (rev 2)',
        maintainers: ['Coldin04'],
        rules: [
          {
            description:
              'Double tap right_command to enter DoubaoIME voice input; double tap again to stop voice input and switch back to ' +
              returnInputSourceName +
              '.',
            manipulators: [
              {
                type: 'basic',
                conditions: [
                  {
                    type: 'variable_if',
                    name: 'double_tap_right_command_switch_doubaoime_tapped_once',
                    value: 1,
                  },
                  {
                    type: 'variable_unless',
                    name: 'double_tap_right_command_switch_doubaoime_active',
                    value: 1,
                  },
                ],
                from: {
                  key_code: 'right_command',
                  modifiers: { optional: ['any'] },
                },
                to: [
                  {
                    select_input_source: {
                      input_source_id: doubaoInputSourceId,
                    },
                  },
                  {
                    key_code: 'vk_none',
                    hold_down_milliseconds: 800,
                  },
                  {
                    key_code: 'right_option',
                    hold_down_milliseconds: 60,
                  },
                  {
                    set_variable: {
                      name: 'double_tap_right_command_switch_doubaoime_active',
                      value: 1,
                    },
                  },
                  {
                    set_variable: {
                      name: 'double_tap_right_command_switch_doubaoime_tapped_once',
                      value: 0,
                    },
                  },
                ],
              },
              {
                type: 'basic',
                conditions: [
                  {
                    type: 'variable_if',
                    name: 'double_tap_right_command_switch_doubaoime_tapped_once',
                    value: 1,
                  },
                  {
                    type: 'variable_if',
                    name: 'double_tap_right_command_switch_doubaoime_active',
                    value: 1,
                  },
                ],
                from: {
                  key_code: 'right_command',
                  modifiers: { optional: ['any'] },
                },
                to: [
                  {
                    key_code: 'right_option',
                    hold_down_milliseconds: 60,
                  },
                  {
                    key_code: 'vk_none',
                    hold_down_milliseconds: 3500,
                  },
                  {
                    select_input_source: {
                      input_source_id: returnInputSourceId,
                    },
                  },
                  {
                    set_variable: {
                      name: 'double_tap_right_command_switch_doubaoime_active',
                      value: 0,
                    },
                  },
                  {
                    set_variable: {
                      name: 'double_tap_right_command_switch_doubaoime_tapped_once',
                      value: 0,
                    },
                  },
                ],
              },
              {
                type: 'basic',
                from: {
                  key_code: 'right_command',
                  modifiers: { optional: ['any'] },
                },
                parameters: {
                  'basic.to_delayed_action_delay_milliseconds': 450,
                  'basic.to_if_alone_timeout_milliseconds': 250,
                },
                to: [
                  {
                    key_code: 'right_command',
                    lazy: true,
                  },
                ],
                to_if_alone: [
                  {
                    set_variable: {
                      name: 'double_tap_right_command_switch_doubaoime_tapped_once',
                      value: 1,
                    },
                  },
                ],
                to_delayed_action: {
                  to_if_canceled: [
                    {
                      set_variable: {
                        name: 'double_tap_right_command_switch_doubaoime_tapped_once',
                        value: 0,
                      },
                    },
                  ],
                  to_if_invoked: [
                    {
                      set_variable: {
                        name: 'double_tap_right_command_switch_doubaoime_tapped_once',
                        value: 0,
                      },
                    },
                  ],
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
