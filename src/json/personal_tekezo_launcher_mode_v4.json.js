// JavaScript should be written in ECMAScript 5.1.

const parameters = {
  simultaneous_threshold_milliseconds: 500,
  trigger_key: 'o',
}

function main() {
  console.log(
    JSON.stringify(
      {
        title: 'Personal rules (@tekezo) Launcher Mode v4',
        maintainers: ['tekezo'],
        rules: [
          {
            description: 'Launcher Mode v4 (rev 19)',
            available_since: '13.1.4',
            manipulators: [].concat(
              generateLauncherMode('1', [
                {
                  shell_command:
                    'open "$(dirname $(dirname $(xcode-select -p)))"',
                },
              ]),
              generateLauncherMode('3', [
                { shell_command: "open -a 'Firefox.app'" },
              ]),
              generateLauncherMode('5', [
                { shell_command: "open -a 'Microsoft Word.app'" },
              ]),
              generateLauncherMode('6', [
                { shell_command: "open -a 'Microsoft Excel.app'" },
              ]),
              generateLauncherMode('a', [
                { shell_command: "open -a 'Activity Monitor.app'" },
              ]),
              generateLauncherMode('c', [
                { shell_command: "open -a 'Google Chrome.app'" },
              ]),
              generateLauncherMode('e', [
                { shell_command: "open -a 'Visual Studio Code.app'" },
              ]),
              generateLauncherMode('f', [
                { shell_command: "open -a 'Finder.app'" },
              ]),
              generateLauncherMode('m', [
                { shell_command: "open -a 'Thunderbird.app'" },
              ]),
              generateLauncherMode('q', [
                { shell_command: "open -a 'Dictionary.app'" },
              ]),
              generateLauncherMode('s', [
                { shell_command: "open -a 'Safari.app'" },
              ]),
              generateLauncherMode('t', [
                { shell_command: "open -a 'Terminal.app'" },
              ]),
              generateLauncherMode('v', [
                { shell_command: "open -a 'Slack.app'" },
              ]),

              generateLauncherMode('left_control', [
                { key_code: 'mission_control' },
              ]),
              generateLauncherMode('left_shift', [
                { apple_vendor_keyboard_key_code: 'launchpad' },
              ])
            ),
          },
        ],
      },
      null,
      '  '
    )
  )
}

function generateLauncherMode(from_key_code, to) {
  return [
    {
      type: 'basic',
      from: {
        key_code: from_key_code,
        modifiers: { optional: ['any'] },
      },
      to: to,
      conditions: [
        {
          type: 'variable_if',
          name: 'launcher_mode_v4',
          value: 1,
        },
      ],
    },
    {
      type: 'basic',
      from: {
        simultaneous: [
          { key_code: parameters.trigger_key },
          { key_code: from_key_code },
        ],
        simultaneous_options: {
          key_down_order: 'strict',
          key_up_order: 'strict_inverse',
          to_after_key_up: [
            {
              set_variable: {
                name: 'launcher_mode_v4',
                value: 0,
              },
            },
          ],
        },
        modifiers: { optional: ['any'] },
      },
      to: [
        {
          set_variable: {
            name: 'launcher_mode_v4',
            value: 1,
          },
        },
      ].concat(to),
      parameters: {
        'basic.simultaneous_threshold_milliseconds':
          parameters.simultaneous_threshold_milliseconds,
      },
    },
  ]
}

main()
