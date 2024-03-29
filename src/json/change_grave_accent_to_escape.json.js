// JavaScript should be written in ECMAScript 5.1.

function main() {
  console.log(
    JSON.stringify(
      {
        title: 'Change grave accent (backtick) to escape, option grave accent to grave accent',
        rules: [
          {
            description: 'Post Escape if grave_accent_and_tilde (backtick) is pressed alone; post grave_accent (backtick) if Option + grave_accent_and_tilde is pressed.',
            manipulators: [
              {
                type: 'basic',
                from: {
                  key_code: 'grave_accent_and_tilde',
                  modifiers: {
                    mandatory: ['left_command'],
                  },
                },
                to: [
                  {
                    key_code: 'grave_accent_and_tilde',
                    modifiers: ['left_command'],
                  },
                ],
              },
              {
                type: 'basic',
                from: {
                  key_code: 'grave_accent_and_tilde',
                  modifiers: {
                    mandatory: ['right_command'],
                  },
                },
                to: [
                  {
                    key_code: 'grave_accent_and_tilde',
                    modifiers: ['right_command'],
                  },
                ],
              },
              {
                type: 'basic',
                from: {
                  key_code: 'grave_accent_and_tilde',
                  modifiers: {
                    mandatory: ['left_option'],
                  },
                },
                to: [
                  {
                    key_code: 'grave_accent_and_tilde',
                    modifiers: ['left_option'],
                  },
                ],
              },
              {
                type: 'basic',
                from: {
                  key_code: 'grave_accent_and_tilde',
                  modifiers: {
                    mandatory: ['right_option'],
                  },
                },
                to: [
                  {
                    key_code: 'grave_accent_and_tilde',
                    modifiers: ['right_option'],
                  },
                ],
              },
              {
                type: 'basic',
                from: {
                  key_code: 'grave_accent_and_tilde',
                  modifiers: {
                    mandatory: ['left_control'],
                  },
                },
                to: [
                  {
                    key_code: 'grave_accent_and_tilde',
                    modifiers: ['left_control'],
                  },
                ],
              },
              {
                type: 'basic',
                from: {
                  key_code: 'grave_accent_and_tilde',
                },
                to: [{ key_code: 'escape' }],
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
