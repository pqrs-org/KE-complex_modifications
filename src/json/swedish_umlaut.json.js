// JavaScript should be written in ECMAScript 5.1.

function main() {
  console.log(
    JSON.stringify(
      {
        title: 'Swedish Umlaut',
        rules: [
          {
            description: 'Change option + q/o to ä/ö',
            manipulators: [
              {
                type: 'basic',
                from: { key_code: 'q', modifiers: { mandatory: ['option'], optional: ['caps_lock'] } },
                to: [
                  {
                    key_code: 'u',
                    modifiers: ['left_option'],
                  },
                  {
                    key_code: 'a',
                  },
                  {
                    key_code: 'vk_none',
                  },
                ],
              },
              {
                type: 'basic',
                from: { key_code: 'q', modifiers: { mandatory: ['option', 'shift'] } },
                to: [
                  {
                    key_code: 'u',
                    modifiers: ['left_option'],
                  },
                  {
                    key_code: 'a',
                    modifiers: ['left_shift'],
                  },
                  {
                    key_code: 'vk_none',
                  },
                ],
              },
              {
                type: 'basic',
                from: { key_code: 'o', modifiers: { mandatory: ['option'], optional: ['caps_lock'] } },
                to: [
                  {
                    key_code: 'u',
                    modifiers: ['left_option'],
                  },
                  {
                    key_code: 'o',
                  },
                  {
                    key_code: 'vk_none',
                  },
                ],
              },
              {
                type: 'basic',
                from: { key_code: 'o', modifiers: { mandatory: ['option', 'shift'] } },
                to: [
                  {
                    key_code: 'u',
                    modifiers: ['left_option'],
                  },
                  {
                    key_code: 'o',
                    modifiers: ['left_shift'],
                  },
                  {
                    key_code: 'vk_none',
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
