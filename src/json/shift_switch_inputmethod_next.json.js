// JavaScript should be written in ECMAScript 5.1.

function main() {
  console.log(
    JSON.stringify(
      {
        title: 'shift switch input method',
        rules: [
          {
            description: "shift switch input method for Mac default next",
            manipulators: [
              {
                type: "basic",
                from: {
                  key_code: "left_shift"
                },
                to: [
                  {
                    key_code: "right_shift",
                    lazy: true
                  }
                ],
                to_if_alone: [
                  {
                    key_code: "spacebar",
                    modifiers: ["control", "option"]
                  }
                ]
              },
              {
                type: "basic",
                from: {
                  key_code: "right_shift"
                },
                to: [
                  {
                    key_code: "right_shift",
                    lazy: true
                  }
                ],
                to_if_alone: [
                  {
                    key_code: "spacebar",
                    modifiers: ["control", "option"]
                  }
                ]
              }
            ]
          }
        ],
      },
      null,
      '  '
    )
  )
}

main()


