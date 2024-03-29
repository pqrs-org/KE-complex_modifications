// JavaScript should be written in ECMAScript 5.1.

function main() {
  console.log(
    JSON.stringify(
      {
        title: 'input_source_if,input_source_unless example',
        rules: [
          {
            description: 'Toggle input sources (English or Japanese) by grave_accent_and_tilde',
            manipulators: [
              {
                conditions: [
                  {
                    type: 'input_source_if',
                    input_sources: [
                      {
                        language: 'ja',
                      },
                    ],
                  },
                ],
                type: 'basic',
                from: {
                  key_code: 'grave_accent_and_tilde',
                  modifiers: { optional: ['caps_lock'] },
                },
                to: [{ key_code: 'japanese_eisuu' }],
              },
              {
                conditions: [
                  {
                    type: 'input_source_unless',
                    input_sources: [
                      {
                        language: 'ja',
                      },
                    ],
                  },
                ],
                type: 'basic',
                from: {
                  key_code: 'grave_accent_and_tilde',
                  modifiers: { optional: ['caps_lock'] },
                },
                to: [{ key_code: 'japanese_kana' }],
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
