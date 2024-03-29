// JavaScript should be written in ECMAScript 5.1.

function main() {
  console.log(
    JSON.stringify(
      {
        title: 'AquaSKK',
        rules: [
          {
            description: 'AquaSKK for JetBrains',
            manipulators: jetBrainsManipulators(),
          },
          {
            description: 'AquaSKK for Terminal/iTerm2',
            manipulators: [
              {
                type: 'basic',
                from: {
                  key_code: 'j',
                  modifiers: { mandatory: ['left_control'] },
                },
                to: [{ key_code: 'japanese_kana' }],
                conditions: [
                  {
                    type: 'frontmost_application_if',
                    bundle_identifiers: ['^com\\.googlecode\\.iterm2', '^com\\.apple\\.Terminal'],
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

function jetBrainsManipulators() {
  const conditions = [
    // jetbrains
    {
      type: 'frontmost_application_if',
      bundle_identifiers: ['^com\\.jetbrains\\.'],
    },
    // non_latin
    {
      type: 'input_source_if',
      input_sources: [
        {
          input_source_id: '^jp\\.sourceforge\\.inputmethod\\.aquaskk\\.(Hiragana|Katakana|HalfWidthKana)$',
        },
      ],
    },
  ]

  return [
    {
      type: 'basic',
      from: {
        key_code: 'l',
        modifiers: { mandatory: ['left_shift', 'right_shift'] },
      },
      to: [
        {
          select_input_source: {
            language: 'ja',
            input_source_id: 'jp.sourceforge.inputmethod.aquaskk.FullWidthRoman',
            input_mode_id: 'com.apple.inputmethod.Japanese.FullWidthRoman',
          },
        },
      ],
      conditions: conditions,
    },
    {
      type: 'basic',
      from: { key_code: 'l' },
      to: [
        {
          select_input_source: {
            language: 'en',
            input_source_id: 'jp.sourceforge.inputmethod.aquaskk.Ascii',
            input_mode_id: 'com.apple.inputmethod.Roman',
          },
        },
      ],
      conditions: conditions,
    },
    {
      type: 'basic',
      from: {
        key_code: 'q',
        modifiers: { mandatory: ['left_shift', 'right_shift'] },
      },
      to: [
        {
          select_input_source: {
            language: 'ja',
            input_source_id: 'jp.sourceforge.inputmethod.aquaskk.HalfWidthKana',
            input_mode_id: 'com.apple.inputmethod.Japanese.HalfWidthKana',
          },
        },
      ],
      conditions: conditions,
    },
    {
      type: 'basic',
      from: { key_code: 'q' },
      to: [
        {
          select_input_source: {
            language: 'ja',
            input_source_id: 'jp.sourceforge.inputmethod.aquaskk.Katakana',
            input_mode_id: 'com.apple.inputmethod.Japanese.Katakana',
          },
        },
      ],
      conditions: conditions,
    },
  ]
}

main()
