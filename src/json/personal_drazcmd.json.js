// JavaScript should be written in ECMAScript 5.1.

function main() {
  console.log(
    JSON.stringify(
      {
        title: 'Personal rules (@drazcmd)',
        rules: [
          {
            description: 'Custom Easy Modifier Mode [F as Trigger Key] - for use with personal BTT setup',
            manipulators: [
              {
                from: { key_code: 'f', modifiers: { optional: ['caps_lock'] } },
                to: [{ set_variable: { name: 'easymod_mode', value: 1 } }],
                to_after_key_up: [{ set_variable: { name: 'easymod_mode', value: 0 } }],
                to_if_alone: [{ key_code: 'f' }],
                type: 'basic',
              },
              {
                conditions: [{ name: 'easymod_mode', type: 'variable_if', value: 1 }],
                from: { key_code: 'h', modifiers: { optional: ['caps_lock'] } },
                to: [{ key_code: 'h', modifiers: ['option'] }],
                type: 'basic',
              },
              {
                conditions: [{ name: 'easymod_mode', type: 'variable_if', value: 1 }],
                from: { key_code: 'j', modifiers: { optional: ['caps_lock'] } },
                to: [{ key_code: 'j', modifiers: ['option'] }],
                type: 'basic',
              },
              {
                conditions: [{ name: 'easymod_mode', type: 'variable_if', value: 1 }],
                from: { key_code: 'k', modifiers: { optional: ['caps_lock'] } },
                to: [{ key_code: 'k', modifiers: ['option'] }],
                type: 'basic',
              },
              {
                conditions: [{ name: 'easymod_mode', type: 'variable_if', value: 1 }],
                from: { key_code: 'l', modifiers: { optional: ['caps_lock'] } },
                to: [{ key_code: 'l', modifiers: ['option'] }],
                type: 'basic',
              },
              {
                conditions: [{ name: 'easymod_mode', type: 'variable_if', value: 1 }],
                from: { key_code: 'a', modifiers: { optional: ['caps_lock'] } },
                to: [{ key_code: 'f' }, { key_code: 'a' }],
                type: 'basic',
              },
              {
                conditions: [{ name: 'easymod_mode', type: 'variable_if', value: 1 }],
                from: { key_code: 'e', modifiers: { optional: ['caps_lock'] } },
                to: [{ key_code: 'f' }, { key_code: 'e' }],
                type: 'basic',
              },
              {
                conditions: [{ name: 'easymod_mode', type: 'variable_if', value: 1 }],
                from: { key_code: 'i', modifiers: { optional: ['caps_lock'] } },
                to: [{ key_code: 'f' }, { key_code: 'i' }],
                type: 'basic',
              },
              {
                conditions: [{ name: 'easymod_mode', type: 'variable_if', value: 1 }],
                from: { key_code: 'r', modifiers: { optional: ['caps_lock'] } },
                to: [{ key_code: 'f' }, { key_code: 'r' }],
                type: 'basic',
              },
              {
                conditions: [{ name: 'easymod_mode', type: 'variable_if', value: 1 }],
                from: { key_code: 'n', modifiers: { optional: ['caps_lock'] } },
                to: [{ key_code: 'f' }, { key_code: 'n' }],
                type: 'basic',
              },
              {
                conditions: [{ name: 'easymod_mode', type: 'variable_if', value: 1 }],
                from: { key_code: 'o', modifiers: { optional: ['caps_lock'] } },
                to: [{ key_code: 'f' }, { key_code: 'o' }],
                type: 'basic',
              },
              {
                conditions: [{ name: 'easymod_mode', type: 'variable_if', value: 1 }],
                from: { key_code: 'spacebar', modifiers: { optional: ['caps_lock'] } },
                to: [{ key_code: 'f' }, { key_code: 'spacebar' }],
                type: 'basic',
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
