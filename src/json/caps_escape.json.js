// JavaScript should be written in ECMAScript 5.1.

function main() {
  console.log(
    JSON.stringify(
      {
        title: 'Caps Lock to Escape, enable Caps Lock when held',
        rules: [
          {
            description: 'Caps Lock to Escape on single press, Caps Lock on press and hold.',
            manipulators: [
              {
                type: 'basic',
                from: {
                  key_code: 'caps_lock',
                  modifiers: {
                    optional: ['any'],
                  },
                },
                to: [
                  {
                    key_code: 'escape',
                  },
                ],
                to_if_held_down: [
                  {
                    key_code: 'caps_lock',
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
