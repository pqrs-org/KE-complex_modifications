function main() {
  console.log(
    JSON.stringify(
      {
        title: 'German punctuation {}[]\\|~@ (braces, brackets, backslash, pipe, tilde, at) on non-Mac keyboards',
        rules: [
          {
            description: 'German keyboard: brackets, braces, pipe, tilde and backslash',
            manipulators: [
              // The opening brace '{'
              {
                from: {
                  key_code: '7',
                  modifiers: { mandatory: ['right_option'] }
                },
                to: [{ key_code: '8', modifiers: ['right_option'] }],
                type: 'basic',
                conditions: [{ identifiers: [{ vendor_id: 1452 }], type: 'device_unless' }],
              },
              // The closing brace '}'
              {
                from: {
                  key_code: '0',
                  modifiers: { mandatory: ['right_option'] }
                },
                to: [{ key_code: '9', modifiers: ['right_option'] }],
                type: 'basic',
                conditions: [{ identifiers: [{ vendor_id: 1452 }], type: 'device_unless' }],
              },
              // The opening bracket '['
              {
                from: {
                  key_code: '8',
                  modifiers: { mandatory: ['right_option'] }
                },
                to: [{ key_code: '5', modifiers: ['right_option'] }],
                type: 'basic',
                conditions: [{ identifiers: [{ vendor_id: 1452 }], type: 'device_unless' }],
              },
              // The closing bracket ']'
              {
                from: {
                  key_code: '9',
                  modifiers: { mandatory: ['right_option'] }
                },
                to: [{ key_code: '6', modifiers: ['right_option'] }],
                type: 'basic',
                conditions: [{ identifiers: [{ vendor_id: 1452 }], type: 'device_unless' }],
              },
              // The tilde '~'
              {
                from: {
                  key_code: 'close_bracket',
                  modifiers: { mandatory: ['right_option'] }
                },
                to: [{ key_code: 'n', modifiers: ['right_option'] }],
                type: 'basic',
                conditions: [{ identifiers: [{ vendor_id: 1452 }], type: 'device_unless' }],
              },
              // The backslash '\'
              {
                from: {
                  key_code: 'hyphen',
                  modifiers: { mandatory: ['right_option'] }
                },
                to: [{ key_code: '7', modifiers: ['shift', 'right_option'] }],
                type: 'basic',
                conditions: [{ identifiers: [{ vendor_id: 1452 }], type: 'device_unless' }],
              },
              // The pipe '|'
              {
                from: {
                  key_code: 'non_us_backslash',
                  modifiers: { mandatory: ['right_option'] }
                },
                to: [{ key_code: '7', modifiers: ['right_option'] }],
                type: 'basic',
                conditions: [{ identifiers: [{ vendor_id: 1452 }], type: 'device_unless' }],
              },
            ]
          },
          {
            description: 'German keyboard: at symbol',
            manipulators: [
              // The at-symbol '@'
              {
                from: {
                  key_code: 'q',
                  modifiers: { mandatory: ['right_option'] },
                },
                to: [{ key_code: 'l', modifiers: ['right_option'] }],
                type: 'basic',
                conditions: [{ identifiers: [{ vendor_id: 1452 }], type: 'device_unless' }],
              }
            ]
          }
        ]
      }
    )
  )
}

main()
