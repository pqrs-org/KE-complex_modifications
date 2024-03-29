// JavaScript should be written in ECMAScript 5.1.

function main() {

    const rules = [
        {
            description: 'Caps Lock -> LeftCommand+Control+Shift+Option, Caps Lock -> Escape (if held alone for > 500 ms)',
            manipulators: [
            {
                type: 'basic',
                from:
                    {
                        key_code: 'caps_lock',
                    modifiers: {
                        optional: ['any']
                    },
                    },
                
                to: [
                    {
                        key_code: 'left_shift',
                        modifiers: ['left_option', 'left_command', 'left_control'],
                    },
                ],
                
                to_if_alone: [
                    {
                        key_code: 'escape',
                        hold_down_milliseconds: 500,
                    },
                ],
            },
            ],
        },
        {
            description: 'Caps Lock + Shift -> Caps Lock, Caps Lock -> LeftCommand+Control+Shift+Option',
            manipulators: [
            {
                type: 'basic',
                from: {
                    key_code: 'caps_lock',
                    modifiers: {
                        mandatory: ['shift'],
                        optional: ['caps_lock'],
                    },
                },
                to: [
                    {
                        key_code: 'caps_lock',
                    },
                ],
            },
            {
                type: 'basic',
                from: {
                    key_code: 'caps_lock',
                    modifiers: {
                        optional: ['any']
                    },
                },
                to: [
                    {
                        key_code: 'left_shift',
                        modifiers: ['left_command', 'left_control', 'left_option'],
                    },
                ],
            },
            ],
        }
    ]

    const json = {
        title: 'Caps Lock + Shift -> Caps Lock, Caps Lock -> LeftCommand+Control+Shift+Option',
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
