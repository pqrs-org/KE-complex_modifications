// JavaScript should be written in ECMAScript 5.1.

function main() {
  console.log(
    JSON.stringify(
      {
        title: 'Personal rules (@apm1467)',
        rules: [
          {
            description: 'right_command + j/k → switch between tabs in applications',
            manipulators: [
              {
                type: 'basic',
                from: { key_code: 'k', modifiers: { mandatory: ['right_command'], optional: ['caps_lock'] } },
                to: [{ key_code: 'close_bracket', modifiers: ['right_command', 'right_shift'] }],
                to_after_key_up: [{ key_code: 'vk_none' }],
              },
              {
                type: 'basic',
                from: { key_code: 'j', modifiers: { mandatory: ['right_command'], optional: ['caps_lock'] } },
                to: [{ key_code: 'open_bracket', modifiers: ['right_command', 'right_shift'] }],
                to_after_key_up: [{ key_code: 'vk_none' }],
              },
            ],
          },
          {
            description: 'right_option → shift + command + option',
            manipulators: [
              {
                type: 'basic',
                from: { key_code: 'right_option', modifiers: { optional: ['caps_lock'] } },
                to: [{ key_code: 'left_shift', modifiers: ['left_option', 'left_command'] }],
              },
            ],
          },
          {
            description: 'shift + command + option + s → redo with sudo',
            manipulators: [
              {
                type: 'basic',
                from: { key_code: 's', modifiers: { mandatory: ['shift', 'option', 'command'], optional: ['caps_lock'] } },
                to: [
                  { key_code: 'up_arrow' },
                  { key_code: 'a', modifiers: ['left_control'] },
                  { key_code: 's' },
                  { key_code: 'u' },
                  { key_code: 'd' },
                  { key_code: 'o' },
                  { key_code: 'spacebar' },
                  { key_code: 'return_or_enter' },
                ],
              },
            ],
          },
          {
            description: 'shift + command + option + spacebar → open screenshot panel',
            manipulators: [
              {
                type: 'basic',
                from: { key_code: 'spacebar', modifiers: { mandatory: ['shift', 'option', 'command'], optional: ['caps_lock'] } },
                to: [{ key_code: '5', modifiers: ['left_shift', 'left_command'] }],
              },
            ],
          },
          {
            description: 'shift + command + option + equal_sign → 20 equal signs',
            manipulators: [
              {
                type: 'basic',
                from: { key_code: 'equal_sign', modifiers: { mandatory: ['shift', 'option', 'command'], optional: ['caps_lock'] } },
                to: [
                  { key_code: 'equal_sign' },
                  { key_code: 'equal_sign' },
                  { key_code: 'equal_sign' },
                  { key_code: 'equal_sign' },
                  { key_code: 'equal_sign' },
                  { key_code: 'equal_sign' },
                  { key_code: 'equal_sign' },
                  { key_code: 'equal_sign' },
                  { key_code: 'equal_sign' },
                  { key_code: 'equal_sign' },
                  { key_code: 'equal_sign' },
                  { key_code: 'equal_sign' },
                  { key_code: 'equal_sign' },
                  { key_code: 'equal_sign' },
                  { key_code: 'equal_sign' },
                  { key_code: 'equal_sign' },
                  { key_code: 'equal_sign' },
                  { key_code: 'equal_sign' },
                  { key_code: 'equal_sign' },
                  { key_code: 'equal_sign' },
                  { key_code: 'vk_none' },
                ],
              },
            ],
          },
          {
            description: 'shift + command + option + hyphen → 20 hyphens',
            manipulators: [
              {
                type: 'basic',
                from: { key_code: 'hyphen', modifiers: { mandatory: ['shift', 'option', 'command'], optional: ['caps_lock'] } },
                to: [
                  { key_code: 'hyphen' },
                  { key_code: 'hyphen' },
                  { key_code: 'hyphen' },
                  { key_code: 'hyphen' },
                  { key_code: 'hyphen' },
                  { key_code: 'hyphen' },
                  { key_code: 'hyphen' },
                  { key_code: 'hyphen' },
                  { key_code: 'hyphen' },
                  { key_code: 'hyphen' },
                  { key_code: 'hyphen' },
                  { key_code: 'hyphen' },
                  { key_code: 'hyphen' },
                  { key_code: 'hyphen' },
                  { key_code: 'hyphen' },
                  { key_code: 'hyphen' },
                  { key_code: 'hyphen' },
                  { key_code: 'hyphen' },
                  { key_code: 'hyphen' },
                  { key_code: 'hyphen' },
                  { key_code: 'vk_none' },
                ],
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
