// JavaScript should be written in ECMAScript 5.1.

function main() {
  console.log(
    JSON.stringify(
      {
        title: 'Change escape key (rev 4)',
        rules: [
          {
            description: 'Post caps_lock if escape is pressed alone. (rev 2)',
            manipulators: [
              {
                type: 'basic',
                from: {
                  key_code: 'escape',
                  modifiers: { optional: ['any'] },
                },
                to: [{ key_code: 'escape' }],
                to_if_alone: [
                  {
                    key_code: 'caps_lock',
                    hold_down_milliseconds: 500,
                  },
                ],
              },
            ],
          },
          {
            description: 'Change fn+escape to eject.',
            manipulators: [
              {
                type: 'basic',
                from: {
                  key_code: 'escape',
                  modifiers: {
                    mandatory: ['fn'],
                    optional: ['any'],
                  },
                },
                to: [{ key_code: 'eject' }],
              },
            ],
          },
          {
            description: 'Disable escape; Change shift + escape to escape (For avoiding mistyping on the Touch Bar)',
            manipulators: [
              {
                type: 'basic',
                from: {
                  key_code: 'escape',
                  modifiers: {
                    mandatory: ['shift'],
                    optional: ['any'],
                  },
                },
                to: [{ key_code: 'escape' }],
              },
              {
                type: 'basic',
                from: {
                  key_code: 'escape',
                },
                to: [{ key_code: 'vk_none' }],
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
