// JavaScript should be written in ECMAScript 5.1.

function main() {

    const rules = [
        {
            description: 'Command + fn + Delete -> Forward Delete Line v1',
            manipulators: [
            {
                type: 'basic',
                from:
                    {
                        key_code: 'delete_or_backspace',
                        modifiers: {
                            mandatory: ['left_command', 'fn'],
                        },
                    },
                
                to: [
                    {
                      key_code: 'delete_forward',
                      modifiers: [
                        'left_command'
                      ]
                    }
                ],

                },
                
            ],
        },
        {
            description: 'Command + fn + Delete -> Forward Delete Line v2',
            manipulators: [
            {
                type: 'basic',
                from:
                    {
                        key_code: 'delete_or_backspace',
                        modifiers: {
                            mandatory: ['left_command', 'fn'],
                        },
                    },
                
                to: [
                    {
                      key_code: 'k',
                      modifiers: [
                        'left_control'
                      ]
                    }
                ],

                },
                
            ],
        },
    ]

    const json = {
        title: 'Command + fn + Delete -> Forward Delete Line',
        maintainers: ["DeafSpy"],
        rules: rules.map(function (rule) {
            return {
                description: rule.description,
                manipulators: rule.manipulators || []
            }
        })
    }

  console.log(
    JSON.stringify(
      json,
      null,
      '  '
    )
  )
}

main()
