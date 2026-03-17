// JavaScript should be written in ECMAScript 5.1.

function main() {
  console.log(
    JSON.stringify(
      {
        title: 'Maps Prtscr to Screenshot',
        rules: [
          {
            description: 'Printscreen key to Screenshot',
            manipulators: [
              {
                from: { key_code: 'print_screen' },
                to: [{ key_code: '5', modifiers: ['left_command', 'left_shift'] }],
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
