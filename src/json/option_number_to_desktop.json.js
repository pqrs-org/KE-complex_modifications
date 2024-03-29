// JavaScript should be written in ECMAScript 5.1.

function main() {
  console.log(
    JSON.stringify(
      {
        title: 'Focus desktops with option + numbers',
        rules: [
          {
            description: 'Change option + 1-5 to control + 1-5',
            manipulators: [
              {
                from: { key_code: '1', modifiers: { mandatory: ['left_option'] } },
                to: [{ key_code: '1', modifiers: 'left_control' }],
                type: 'basic',
              },
              {
                from: { key_code: '2', modifiers: { mandatory: ['left_option'] } },
                to: [{ key_code: '2', modifiers: 'left_control' }],
                type: 'basic',
              },
              {
                from: { key_code: '3', modifiers: { mandatory: ['left_option'] } },
                to: [{ key_code: '3', modifiers: 'left_control' }],
                type: 'basic',
              },
              {
                from: { key_code: '4', modifiers: { mandatory: ['left_option'] } },
                to: [{ key_code: '4', modifiers: 'left_control' }],
                type: 'basic',
              },
              {
                from: { key_code: '5', modifiers: { mandatory: ['left_option'] } },
                to: [{ key_code: '5', modifiers: 'left_control' }],
                type: 'basic',
              },
            ],
          },
          {
            description: 'Change control + 1-5 to option + 1-5 (for special characters)',
            manipulators: [
              {
                from: { key_code: '1', modifiers: { mandatory: ['left_control'] } },
                to: [{ key_code: '1', modifiers: 'left_option' }],
                type: 'basic',
              },
              {
                from: { key_code: '2', modifiers: { mandatory: ['left_control'] } },
                to: [{ key_code: '2', modifiers: 'left_option' }],
                type: 'basic',
              },
              {
                from: { key_code: '3', modifiers: { mandatory: ['left_control'] } },
                to: [{ key_code: '3', modifiers: 'left_option' }],
                type: 'basic',
              },
              {
                from: { key_code: '4', modifiers: { mandatory: ['left_control'] } },
                to: [{ key_code: '4', modifiers: 'left_option' }],
                type: 'basic',
              },
              {
                from: { key_code: '5', modifiers: { mandatory: ['left_control'] } },
                to: [{ key_code: '5', modifiers: 'left_option' }],
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
