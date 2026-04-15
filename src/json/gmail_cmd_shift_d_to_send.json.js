// JavaScript should be written in ECMAScript 5.1.

function main() {
  const browserBundleIdentifiers = [
    // Google Chrome (includes Chrome PWAs via prefix, e.g. com.google.Chrome.app.<id>)
    '^com\\.google\\.Chrome',
    // Safari
    '^com\\.apple\\.Safari$',
    // Arc
    '^company\\.thebrowser\\.Browser$',
    // Firefox
    '^org\\.mozilla\\.firefox$',
    // Microsoft Edge
    '^com\\.microsoft\\.edgemac$',
    // Brave
    '^com\\.brave\\.Browser$',
  ]

  console.log(
    JSON.stringify(
      {
        title: 'Gmail send email shortcut fix (Cmd+Shift+D → Cmd+Return in browsers)',
        maintainers: ['DanMelbourne'],
        rules: [
          {
            description: 'Gmail send email shortcut fix: remap Cmd+Shift+D (Command+Shift+D) to Cmd+Return in web browsers, so the Mac-standard send shortcut sends the email in Gmail instead of discarding the draft.',
            manipulators: [
              {
                type: 'basic',
                from: {
                  key_code: 'd',
                  modifiers: {
                    mandatory: ['command', 'shift'],
                    optional: ['any'],
                  },
                },
                to: [
                  {
                    key_code: 'return_or_enter',
                    modifiers: ['command'],
                  },
                ],
                conditions: [
                  {
                    type: 'frontmost_application_if',
                    bundle_identifiers: browserBundleIdentifiers,
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
