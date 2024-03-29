// JavaScript should be written in ECMAScript 5.1.

function main() {
  console.log(
    JSON.stringify(
      {
        title: 'Change Keychron K2 keyboard layout to more closely resemble an Apple keyboard',
        rules: [
          {
            description: 'Post right_option if right_control is pressed alone.',
            manipulators: [
              {
                type: 'basic',
                from: {
                  key_code: 'right_control',
                  modifiers: { optional: ['any'] },
                },
                to: [{ key_code: 'right_option' }],
              },
            ],
          },
          {
            description: 'Exchange right_command and fn.',
            manipulators: [
              {
                type: 'basic',
                from: {
                  key_code: 'right_command',
                  modifiers: { optional: ['any'] },
                },
                to: [{ key_code: 'fn' }],
              },
              {
                type: 'basic',
                from: { key_code: 'fn', modifiers: { optional: ['any'] } },
                to: [{ key_code: 'right_command' }],
              },
            ],
          },
          {
            description: 'Disable page_up, page_down, home, and end.',
            manipulators: [
              {
                type: 'basic',
                from: { key_code: 'page_up', modifiers: { optional: ['any'] } },
                to: [{ key_code: 'vk_none' }],
              },
              {
                type: 'basic',
                from: {
                  key_code: 'page_down',
                  modifiers: { optional: ['any'] },
                },
                to: [{ key_code: 'vk_none' }],
              },
              {
                type: 'basic',
                from: { key_code: 'home', modifiers: { optional: ['any'] } },
                to: [{ key_code: 'vk_none' }],
              },
              {
                type: 'basic',
                from: { key_code: 'end', modifiers: { optional: ['any'] } },
                to: [{ key_code: 'vk_none' }],
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
