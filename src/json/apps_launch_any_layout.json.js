// JavaScript should be written in ECMAScript 5.1.

function main() {
  console.log(
    JSON.stringify(
      {
        title: 'Launch apps from any layout (Safari, Brave, Chrome, Finder, VS Code, PyCharm, Mail, Slack, Telegram, Figma, Sublime, iTerm, Activity Monitor)',
        rules: [
          {
            description: 'right_option + B -> Brave',
            manipulators: [
              {
                type: 'basic',
                from: {
                  key_code: 5,
                  modifiers: {
                    mandatory: ['right_option'],
                  },
                },
                to: [
                  {
                    shell_command: "open '/Applications/Brave Browser.app'",
                  },
                ],
              },
            ],
          },
          {
            description: 'right_option + S -> Safari',
            manipulators: [
              {
                type: 'basic',
                from: {
                  key_code: 22,
                  modifiers: {
                    mandatory: ['right_option'],
                  },
                },
                to: [
                  {
                    shell_command: "open '/Applications/Safari.app'",
                  },
                ],
              },
            ],
          },
          {
            description: 'right_option + C -> Chrome',
            manipulators: [
              {
                type: 'basic',
                from: {
                  key_code: 6,
                  modifiers: {
                    mandatory: ['right_option'],
                  },
                },
                to: [
                  {
                    shell_command: "open '/Applications/Google Chrome.app'",
                  },
                ],
              },
            ],
          },
          {
            description: 'right_option + V -> VS code',
            manipulators: [
              {
                type: 'basic',
                from: {
                  key_code: 25,
                  modifiers: {
                    mandatory: ['right_option'],
                  },
                },
                to: [
                  {
                    shell_command: "open '/Applications/Visual Studio Code.app'",
                  },
                ],
              },
            ],
          },
          {
            description: 'right_option + P -> PyCharm',
            manipulators: [
              {
                type: 'basic',
                from: {
                  key_code: 19,
                  modifiers: {
                    mandatory: ['right_option'],
                  },
                },
                to: [
                  {
                    shell_command: "open '/Applications/PyCharm.app'",
                  },
                ],
              },
            ],
          },
          {
            description: 'right_option + K -> Slack',
            manipulators: [
              {
                type: 'basic',
                from: {
                  key_code: 14,
                  modifiers: {
                    mandatory: ['right_option'],
                  },
                },
                to: [
                  {
                    shell_command: "open '/Applications/Slack.app'",
                  },
                ],
              },
            ],
          },
          {
            description: 'right_option + T -> Telegram',
            manipulators: [
              {
                type: 'basic',
                from: {
                  key_code: 23,
                  modifiers: {
                    mandatory: ['right_option'],
                  },
                },
                to: [
                  {
                    shell_command: "open '/Applications/Telegram.app'",
                  },
                ],
              },
            ],
          },
          {
            description: 'right_option + L -> Sublime Text',
            manipulators: [
              {
                type: 'basic',
                from: {
                  key_code: 15,
                  modifiers: {
                    mandatory: ['right_option'],
                  },
                },
                to: [
                  {
                    shell_command: "open '/Applications/Sublime Text.app'",
                  },
                ],
              },
            ],
          },
          {
            description: 'right_option + right_cmd + F -> Figma',
            manipulators: [
              {
                type: 'basic',
                from: {
                  key_code: 9,
                  modifiers: {
                    mandatory: ['right_option', 'right_command'],
                  },
                },
                to: [
                  {
                    shell_command: "open '/Applications/Figma.app'",
                  },
                ],
              },
            ],
          },
          {
            description: 'right_option + F -> Finder',
            manipulators: [
              {
                type: 'basic',
                from: {
                  key_code: 9,
                  modifiers: {
                    mandatory: ['right_option'],
                  },
                },
                to: [
                  {
                    shell_command: 'open ~',
                  },
                ],
              },
            ],
          },
          {
            description: 'right_option + M -> Mail',
            manipulators: [
              {
                type: 'basic',
                from: {
                  key_code: 16,
                  modifiers: {
                    mandatory: ['right_option'],
                  },
                },
                to: [
                  {
                    shell_command: "open '/System/Applications/Mail.app'",
                  },
                ],
              },
            ],
          },
          {
            description: 'right_option + ` -> iTerm',
            manipulators: [
              {
                type: 'basic',
                from: {
                  key_code: 53,
                  modifiers: {
                    mandatory: ['right_option'],
                  },
                },
                to: [
                  {
                    shell_command: "open '/Applications/iTerm.app'",
                  },
                ],
              },
            ],
          },
          {
            description: 'right_option + A -> Activity Monitor',
            manipulators: [
              {
                type: 'basic',
                from: {
                  key_code: 4,
                  modifiers: {
                    mandatory: ['right_option'],
                  },
                },
                to: [
                  {
                    shell_command: "open '/System/Applications/Utilities/Activity Monitor.app'",
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
