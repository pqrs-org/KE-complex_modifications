// JavaScript should be written in ECMAScript 5.1.

function main() {
  console.log(
    JSON.stringify(
      {
        title: 'to_if_held_down example',
        rules: [
          {
            description: 'Open Mission Control by hold tab key',
            manipulators: [
              {
                type: 'basic',
                from: {
                  key_code: 'tab',
                },
                to_after_key_up: [
                  {
                    key_code: 'tab',
                  },
                ],
                to_if_held_down: [
                  {
                    key_code: 'mission_control',
                    halt: true,
                  },
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
