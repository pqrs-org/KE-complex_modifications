// JavaScript should be written in ECMAScript 5.1.

function main() {
  console.log(
    JSON.stringify(
      {
        title: 'Richi - Select and Navigate Word PC Style (you must use swap COMMAND and CTRL in other case)',
        rules: [
          {
            description: 'richi - command+shift+right To options+shift+right ',
            manipulators: [
              {
                from: {
                  key_code: 'right_arrow',
                  modifiers: {
                    mandatory: ['left_command', 'left_shift'],
                  },
                },
                to: [
                  {
                    key_code: 'right_arrow',
                    modifiers: ['left_option', 'left_shift'],
                  },
                ],
                type: 'basic',
              },
            ],
          },
          {
            description: 'richi - command+shift+left To options+shift+left',
            manipulators: [
              {
                from: {
                  key_code: 'left_arrow',
                  modifiers: {
                    mandatory: ['left_command', 'left_shift'],
                  },
                },
                to: [
                  {
                    key_code: 'left_arrow',
                    modifiers: ['left_option', 'left_shift'],
                  },
                ],
                type: 'basic',
              },
            ],
          },
          {
            description: 'richi - command+shift+up To options+shift+up ',
            manipulators: [
              {
                from: {
                  key_code: 'up_arrow',
                  modifiers: {
                    mandatory: ['left_command', 'left_shift'],
                  },
                },
                to: [
                  {
                    key_code: 'up_arrow',
                    modifiers: ['left_option', 'left_shift'],
                  },
                ],
                type: 'basic',
              },
            ],
          },
          {
            description: 'richi - command+shift+down To options+shift+down',
            manipulators: [
              {
                from: {
                  key_code: 'down_arrow',
                  modifiers: {
                    mandatory: ['left_command', 'left_shift'],
                  },
                },
                to: [
                  {
                    key_code: 'down_arrow',
                    modifiers: ['left_option', 'left_shift'],
                  },
                ],
                type: 'basic',
              },
            ],
          },
          {
            description: 'richi - command+right To options+right ',
            manipulators: [
              {
                from: {
                  key_code: 'right_arrow',
                  modifiers: {
                    mandatory: ['left_command'],
                  },
                },
                to: [
                  {
                    key_code: 'right_arrow',
                    modifiers: ['left_option'],
                  },
                ],
                type: 'basic',
              },
            ],
          },
          {
            description: 'richi - command+left To options+left',
            manipulators: [
              {
                from: {
                  key_code: 'left_arrow',
                  modifiers: {
                    mandatory: ['left_command'],
                  },
                },
                to: [
                  {
                    key_code: 'left_arrow',
                    modifiers: ['left_option'],
                  },
                ],
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
