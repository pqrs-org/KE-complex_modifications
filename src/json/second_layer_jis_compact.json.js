// JavaScript should be written in ECMAScript 5.1.

const modifier_key_code = 'japanese_eisuu'
const modifier_variable_name = 'modifier_eisuu'
const modifier_label = 'Eisuu'

function add_virtual_modifier(key_code, variable_name) {
  return {
    type: 'basic',
    from: {
      key_code: key_code,
      modifiers: {
        optional: ['any'],
      },
    },
    to: [
      {
        set_variable: {
          name: variable_name,
          value: 1,
        },
      },
    ],
    to_after_key_up: [
      {
        set_variable: {
          name: variable_name,
          value: 0,
        },
      },
    ],
    to_if_alone: [
      {
        key_code: key_code,
      },
    ],
  }
}

function add_virtual_modified_key(variable_name, from_key_code, to_key_code) {
  return {
    type: 'basic',
    conditions: [
      {
        name: variable_name,
        type: 'variable_if',
        value: 1,
      },
    ],
    from: {
      key_code: from_key_code,
      modifiers: {
        optional: ['any'],
      },
    },
    to: [
      {
        key_code: to_key_code,
      },
    ],
  }
}

function add_key(from_key_code, to_key_code) {
  return {
    type: 'basic',
    from: {
      key_code: from_key_code,
      modifiers: {
        optional: ['any'],
      },
    },
    to: [
      {
        key_code: to_key_code,
      },
    ],
  }
}

function main() {
  console.log(
    JSON.stringify(
      {
        title: 'Second Layer for Japanese Compact Keyboards: Arrow keys, NumPad, IME, etc.',
        maintainers: ['susumuota'],
        rules: [
          {
            description: '[Cursor] ' + modifier_label + ' + esdf to arrow keys',
            manipulators: [
              add_virtual_modifier(modifier_key_code, modifier_variable_name),
              add_virtual_modified_key(modifier_variable_name, 'e', 'up_arrow'),
              add_virtual_modified_key(modifier_variable_name, 's', 'left_arrow'),
              add_virtual_modified_key(modifier_variable_name, 'd', 'down_arrow'),
              add_virtual_modified_key(modifier_variable_name, 'f', 'right_arrow'),
            ],
          },
          {
            description: '[Cursor] ' + modifier_label + ' + a to Home, ' + modifier_label + ' + g to End',
            manipulators: [
              add_virtual_modifier(modifier_key_code, modifier_variable_name),
              add_virtual_modified_key(modifier_variable_name, 'a', 'home'),
              add_virtual_modified_key(modifier_variable_name, 'g', 'end'),
            ],
          },
          {
            description: '[Cursor] ' + modifier_label + ' + r to PageUp, ' + modifier_label + ' + v to PageDown',
            manipulators: [
              add_virtual_modifier(modifier_key_code, modifier_variable_name),
              add_virtual_modified_key(modifier_variable_name, 'r', 'page_up'),
              add_virtual_modified_key(modifier_variable_name, 'v', 'page_down'),
            ],
          },
          {
            description: '[NumPad] ' + modifier_label + ' + m,./jkl;uiop7890- to keypad 0,.+123-456*789/= (like old MacBook NumLock)',
            manipulators: [
              add_virtual_modifier(modifier_key_code, modifier_variable_name),
              add_virtual_modified_key(modifier_variable_name, 'm', 'keypad_0'),
              add_virtual_modified_key(modifier_variable_name, 'comma', 'keypad_comma'),
              add_virtual_modified_key(modifier_variable_name, 'period', 'keypad_period'),
              add_virtual_modified_key(modifier_variable_name, 'slash', 'keypad_plus'),
              add_virtual_modified_key(modifier_variable_name, 'j', 'keypad_1'),
              add_virtual_modified_key(modifier_variable_name, 'k', 'keypad_2'),
              add_virtual_modified_key(modifier_variable_name, 'l', 'keypad_3'),
              add_virtual_modified_key(modifier_variable_name, 'semicolon', 'keypad_hyphen'),
              add_virtual_modified_key(modifier_variable_name, 'u', 'keypad_4'),
              add_virtual_modified_key(modifier_variable_name, 'i', 'keypad_5'),
              add_virtual_modified_key(modifier_variable_name, 'o', 'keypad_6'),
              add_virtual_modified_key(modifier_variable_name, 'p', 'keypad_asterisk'),
              add_virtual_modified_key(modifier_variable_name, '7', 'keypad_7'),
              add_virtual_modified_key(modifier_variable_name, '8', 'keypad_8'),
              add_virtual_modified_key(modifier_variable_name, '9', 'keypad_9'),
              add_virtual_modified_key(modifier_variable_name, '0', 'keypad_slash'),
              add_virtual_modified_key(modifier_variable_name, 'hyphen', 'keypad_equal_sign'),
            ],
          },
          {
            description: '[IME] ' + modifier_label + ' + Kana to Kana',
            manipulators: [add_virtual_modifier(modifier_key_code, modifier_variable_name), add_virtual_modified_key(modifier_variable_name, 'japanese_kana', 'japanese_kana')],
          },
          {
            description: '[Option] Kana to Enter',
            manipulators: [add_key('japanese_kana', 'return_or_enter')],
          },
          {
            description: '[Option] Right Command to Backspace',
            manipulators: [add_key('right_command', 'delete_or_backspace')],
          },
        ],
      },
      null,
      '  '
    )
  )
}

main()
