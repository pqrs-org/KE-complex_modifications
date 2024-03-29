// JavaScript should be written in ECMAScript 5.1.

function main() {
  console.log(
    JSON.stringify(
      {
        title: 'Change delete key (rev 3)',
        rules: [
          {
            description: 'Change shift + delete to forward delete (rev 2)',
            manipulators: [
              {
                type: 'basic',
                from: {
                  key_code: 'delete_or_backspace',
                  modifiers: {
                    mandatory: ['shift'],
                    optional: ['caps_lock', 'option'],
                  },
                },
                to: [{ key_code: 'delete_forward' }],
              },
            ],
          },
          {
            description: 'Change shift + delete to tilde (rev 1)',
            manipulators: [
              {
                type: 'basic',
                from: {
                  key_code: 'delete_or_backspace',
                  modifiers: {
                    mandatory: ['shift'],
                    optional: ['caps_lock', 'option'],
                  },
                },
                to: [
                  {
                    key_code: 'grave_accent_and_tilde',
                    modifiers: ['left_shift'],
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
