// JavaScript should be written in ECMAScript 5.1.

function main() {
  console.log(
    JSON.stringify(
      {
        title: 'Launch new Chrome or iTerm2 windows via keybindings',
        rules: [
          {
            description: 'left control + left shift + ` (backtick) - launches a new iTerm2 window with the default profile',
            manipulators: [
              {
                from: { key_code: 'grave_accent_and_tilde', modifiers: { mandatory: ['left_control', 'left_shift'] } },
                to: [{ shell_command: "osascript -e 'tell app \"iTerm2\"' -e 'create window with default profile' -e activate -e end" }],
                type: 'basic',
              },
            ],
          },
          {
            description: 'left control + left shift + 1 - launches a new Google Chrome window',
            manipulators: [
              {
                from: { key_code: '1', modifiers: { mandatory: ['left_control', 'left_shift'] } },
                to: [{ shell_command: "osascript -e 'tell app \"Google Chrome\"' -e 'make new window' -e activate -e end" }],
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
