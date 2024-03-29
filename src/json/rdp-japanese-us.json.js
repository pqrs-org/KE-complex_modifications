// JavaScript should be written in ECMAScript 5.1.

function main() {
  console.log(
    JSON.stringify(
      {
        title: 'RDP for Japanese, US Keyboard （リモートデスクトップとUSキーボード、日本語環境の設定）',
        rules: [
          {
            description: '[RDP] RDPアプリ以外では、コマンドキーを単体で押したときに、英数・かなキーを送信する。（左コマンドキーは英数、右コマンドキーはかな） (rev 3)',
            manipulators: [
              {
                type: 'basic',
                from: { key_code: 'left_command', modifiers: { optional: ['any'] } },
                parameters: { 'basic.to_if_held_down_threshold_milliseconds': 100 },
                to: [{ key_code: 'left_command', lazy: true }],
                to_if_held_down: [{ key_code: 'left_command' }],
                to_if_alone: [{ key_code: 'japanese_eisuu' }],
                conditions: [
                  {
                    type: 'frontmost_application_unless',
                    bundle_identifiers: ['^com\\.2X\\.Client\\.Mac$', '^com\\.microsoft\\.rdc\\.macos$'],
                  },
                ],
              },
              {
                type: 'basic',
                from: { key_code: 'right_command', modifiers: { optional: ['any'] } },
                parameters: { 'basic.to_if_held_down_threshold_milliseconds': 100 },
                to: [{ key_code: 'right_command', lazy: true }],
                to_if_held_down: [{ key_code: 'right_command' }],
                to_if_alone: [{ key_code: 'japanese_kana' }],
                conditions: [
                  {
                    type: 'frontmost_application_unless',
                    bundle_identifiers: ['^com\\.2X\\.Client\\.Mac$', '^com\\.microsoft\\.rdc\\.macos$'],
                  },
                ],
              },
            ],
          },
          {
            description: '[RDP] RDPアプリではCommandをAlt, OptionをWindowsキーに入れ替える',
            manipulators: [
              {
                type: 'basic',
                from: { key_code: 'left_command', modifiers: { optional: ['any'] } },
                to: [{ key_code: 'left_option' }],
                conditions: [
                  {
                    type: 'frontmost_application_if',
                    bundle_identifiers: ['^com\\.2X\\.Client\\.Mac$', '^com\\.microsoft\\.rdc\\.macos$'],
                  },
                ],
              },
              {
                type: 'basic',
                from: { key_code: 'left_option', modifiers: { optional: ['any'] } },
                to: [{ key_code: 'left_command' }],
                conditions: [
                  {
                    type: 'frontmost_application_if',
                    bundle_identifiers: ['^com\\.2X\\.Client\\.Mac$', '^com\\.microsoft\\.rdc\\.macos$'],
                  },
                ],
              },
              {
                type: 'basic',
                from: { key_code: 'right_command', modifiers: { optional: ['any'] } },
                to: [{ key_code: 'right_option' }],
                conditions: [
                  {
                    type: 'frontmost_application_if',
                    bundle_identifiers: ['^com\\.2X\\.Client\\.Mac$', '^com\\.microsoft\\.rdc\\.macos$'],
                  },
                ],
              },
              {
                type: 'basic',
                from: { key_code: 'right_option', modifiers: { optional: ['any'] } },
                to: [{ key_code: 'right_command' }],
                conditions: [
                  {
                    type: 'frontmost_application_if',
                    bundle_identifiers: ['^com\\.2X\\.Client\\.Mac$', '^com\\.microsoft\\.rdc\\.macos$'],
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
