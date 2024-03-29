// JavaScript should be written in ECMAScript 5.1.

function main() {
  console.log(
    JSON.stringify(
      {
        title: 'Keypad as App Launcher',
        maintainers: ['Mikadifo'],
        rules: [
          {
            description: 'Remap your keypad as an app launcher, programmed keypads(1-9)',
            manipulators: [
              {
                type: 'basic',
                from: { key_code: 'keypad_1' },
                to: [{ shell_command: "open '/Applications/IntelliJ IDEA CE.app'" }],
              },
              {
                type: 'basic',
                from: { key_code: 'keypad_2' },
                to: [{ shell_command: "open '/Applications/Caffeine.app'" }],
              },
              {
                type: 'basic',
                from: { key_code: 'keypad_3' },
                to: [{ shell_command: "open '/Applications/Spotify.app'" }],
              },
              {
                type: 'basic',
                from: { key_code: 'keypad_4' },
                to: [{ shell_command: "open '/Applications/Android Studio.app'" }],
              },
              {
                type: 'basic',
                from: { key_code: 'keypad_5' },
                to: [{ shell_command: "open '/Applications/Launchpad.app'" }],
              },
              {
                type: 'basic',
                from: { key_code: 'keypad_6' },
                to: [{ shell_command: "open '/Applications/GitKraken.app'" }],
              },
              {
                type: 'basic',
                from: { key_code: 'keypad_7' },
                to: [{ shell_command: "open '/Applications/iTerm.app'" }],
              },
              {
                type: 'basic',
                from: { key_code: 'keypad_8' },
                to: [{ shell_command: "open '/Applications/Brave Browser.app'" }],
              },
              {
                type: 'basic',
                from: { key_code: 'keypad_9' },
                to: [{ shell_command: "open '/Applications/Calendar.app'" }],
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
