// JavaScript should be written in ECMAScript 5.1.

function main() {
  console.log(
    JSON.stringify(
      {
        title: 'Right Cmd to Left Cmd + Left Option ',
        rules: [
          {
            description: 'Change Right CMD to Left CMD + Left Option, util for tab navigation with modification WASD or HJKL',
            manipulators: [
              {
                type: 'basic',
                from: { key_code: 'right_command', modifiers: { optional: ['any'] } },
                to: [{ key_code: 'left_command', modifiers: ['left_option'] }],
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
