// JavaScript should be written in ECMAScript 5.1.

function main() {
  console.log(
    JSON.stringify(
      {
        title: 'Personal rules (@funck)',
        rules: [
          {
            description: 'Map left_control to right_option',
            manipulators: [
              {
                type: 'basic',
                from: { key_code: 'left_control', modifiers: { optional: ['caps_lock'] } },
                to: [{ key_code: 'right_option' }],
              },
            ],
          },
          {
            description: 'Holding both Left Option+Left Control will map to Right Option + Right Shift',
            manipulators: [
              {
                type: 'basic',
                from: { key_code: 'left_option', modifiers: { mandatory: ['right_option'], optional: ['caps_lock'] } },
                to: [{ key_code: 'right_shift', modifiers: ['right_option'] }],
              },
            ],
          },
          {
            description: 'Holding both Left Option+Left Control will map to Right Option + Right Shift, 2 (enable both)',
            manipulators: [
              {
                type: 'basic',
                from: { key_code: 'left_control', modifiers: { mandatory: ['left_option'], optional: ['caps_lock'] } },
                to: [{ key_code: 'right_shift', modifiers: ['right_option'] }],
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
