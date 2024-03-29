// JavaScript should be written in ECMAScript 5.1.

function main() {
  console.log(
    JSON.stringify(
      {
        title: 'Personal rules (@wgj)',
        rules: [
          {
            description: 'Change insert to left_option+escape (VoiceOver)',
            manipulators: [
              {
                type: 'basic',
                from: { key_code: 'insert', modifiers: { optional: ['any'] } },
                to: [
                  {
                    key_code: 'escape',
                    modifiers: ['left_option'],
                  },
                  { key_code: 'vk_none' },
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
