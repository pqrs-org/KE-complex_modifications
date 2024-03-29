// JavaScript should be written in ECMAScript 5.1.

function main() {
  console.log(
    JSON.stringify(
      {
        title: 'Half-QWERTZ (German one-handed layout)',
        rules: [
          {
            description: 'Half-QWERTZ (German one-handed layout). Hold space to mirror the layout. The + and # keys are not mapped.',
            manipulators: [
              {
                from: {
                  key_code: 'spacebar',
                  modifiers: { optional: ['any'] },
                },
                to: [{ key_code: 'right_control' }],
                to_if_alone: [{ key_code: 'spacebar' }],
                type: 'basic',
              },
              {
                from: {
                  key_code: 'non_us_backslash',
                  modifiers: {
                    mandatory: ['right_control'],
                    optional: ['any'],
                  },
                },
                to: [{ key_code: 'delete_or_backspace' }],
                type: 'basic',
              },
              {
                from: {
                  key_code: '1',
                  modifiers: {
                    mandatory: ['right_control'],
                    optional: ['any'],
                  },
                },
                to: [{ key_code: 'equal_sign' }],
                type: 'basic',
              },
              {
                from: {
                  key_code: '2',
                  modifiers: {
                    mandatory: ['right_control'],
                    optional: ['any'],
                  },
                },
                to: [{ key_code: 'hyphen' }],
                type: 'basic',
              },
              {
                from: {
                  key_code: '3',
                  modifiers: {
                    mandatory: ['right_control'],
                    optional: ['any'],
                  },
                },
                to: [{ key_code: '0' }],
                type: 'basic',
              },
              {
                from: {
                  key_code: '4',
                  modifiers: {
                    mandatory: ['right_control'],
                    optional: ['any'],
                  },
                },
                to: [{ key_code: '9' }],
                type: 'basic',
              },
              {
                from: {
                  key_code: '5',
                  modifiers: {
                    mandatory: ['right_control'],
                    optional: ['any'],
                  },
                },
                to: [{ key_code: '8' }],
                type: 'basic',
              },
              {
                from: {
                  key_code: '6',
                  modifiers: {
                    mandatory: ['right_control'],
                    optional: ['any'],
                  },
                },
                to: [{ key_code: '7' }],
                type: 'basic',
              },
              {
                from: {
                  key_code: '7',
                  modifiers: {
                    mandatory: ['right_control'],
                    optional: ['any'],
                  },
                },
                to: [{ key_code: '6' }],
                type: 'basic',
              },
              {
                from: {
                  key_code: '8',
                  modifiers: {
                    mandatory: ['right_control'],
                    optional: ['any'],
                  },
                },
                to: [{ key_code: '5' }],
                type: 'basic',
              },
              {
                from: {
                  key_code: '9',
                  modifiers: {
                    mandatory: ['right_control'],
                    optional: ['any'],
                  },
                },
                to: [{ key_code: '4' }],
                type: 'basic',
              },
              {
                from: {
                  key_code: '0',
                  modifiers: {
                    mandatory: ['right_control'],
                    optional: ['any'],
                  },
                },
                to: [{ key_code: '3' }],
                type: 'basic',
              },
              {
                from: {
                  key_code: 'hyphen',
                  modifiers: {
                    mandatory: ['right_control'],
                    optional: ['any'],
                  },
                },
                to: [{ key_code: '2' }],
                type: 'basic',
              },
              {
                from: {
                  key_code: 'equal_sign',
                  modifiers: {
                    mandatory: ['right_control'],
                    optional: ['any'],
                  },
                },
                to: [{ key_code: '1' }],
                type: 'basic',
              },
              {
                from: {
                  key_code: 'delete_or_backspace',
                  modifiers: {
                    mandatory: ['right_control'],
                    optional: ['any'],
                  },
                },
                to: [{ key_code: 'non_us_backslash' }],
                type: 'basic',
              },
              {
                from: {
                  key_code: 'tab',
                  modifiers: {
                    mandatory: ['right_control'],
                    optional: ['any'],
                  },
                },
                to: [{ key_code: 'open_bracket' }],
                type: 'basic',
              },
              {
                from: {
                  key_code: 'q',
                  modifiers: {
                    mandatory: ['right_control'],
                    optional: ['any'],
                  },
                },
                to: [{ key_code: 'p' }],
                type: 'basic',
              },
              {
                from: {
                  key_code: 'w',
                  modifiers: {
                    mandatory: ['right_control'],
                    optional: ['any'],
                  },
                },
                to: [{ key_code: 'o' }],
                type: 'basic',
              },
              {
                from: {
                  key_code: 'e',
                  modifiers: {
                    mandatory: ['right_control'],
                    optional: ['any'],
                  },
                },
                to: [{ key_code: 'i' }],
                type: 'basic',
              },
              {
                from: {
                  key_code: 'r',
                  modifiers: {
                    mandatory: ['right_control'],
                    optional: ['any'],
                  },
                },
                to: [{ key_code: 'u' }],
                type: 'basic',
              },
              {
                from: {
                  key_code: 't',
                  modifiers: {
                    mandatory: ['right_control'],
                    optional: ['any'],
                  },
                },
                to: [{ key_code: 'y' }],
                type: 'basic',
              },
              {
                from: {
                  key_code: 'y',
                  modifiers: {
                    mandatory: ['right_control'],
                    optional: ['any'],
                  },
                },
                to: [{ key_code: 't' }],
                type: 'basic',
              },
              {
                from: {
                  key_code: 'u',
                  modifiers: {
                    mandatory: ['right_control'],
                    optional: ['any'],
                  },
                },
                to: [{ key_code: 'r' }],
                type: 'basic',
              },
              {
                from: {
                  key_code: 'i',
                  modifiers: {
                    mandatory: ['right_control'],
                    optional: ['any'],
                  },
                },
                to: [{ key_code: 'e' }],
                type: 'basic',
              },
              {
                from: {
                  key_code: 'o',
                  modifiers: {
                    mandatory: ['right_control'],
                    optional: ['any'],
                  },
                },
                to: [{ key_code: 'w' }],
                type: 'basic',
              },
              {
                from: {
                  key_code: 'p',
                  modifiers: {
                    mandatory: ['right_control'],
                    optional: ['any'],
                  },
                },
                to: [{ key_code: 'q' }],
                type: 'basic',
              },
              {
                from: {
                  key_code: 'open_bracket',
                  modifiers: {
                    mandatory: ['right_control'],
                    optional: ['any'],
                  },
                },
                to: [{ key_code: 'tab' }],
                type: 'basic',
              },
              {
                from: {
                  key_code: 'caps_lock',
                  modifiers: {
                    mandatory: ['right_control'],
                    optional: ['any'],
                  },
                },
                to: [{ key_code: 'return_or_enter' }],
                type: 'basic',
              },
              {
                from: {
                  key_code: 'a',
                  modifiers: {
                    mandatory: ['right_control'],
                    optional: ['any'],
                  },
                },
                to: [{ key_code: 'semicolon' }],
                type: 'basic',
              },
              {
                from: {
                  key_code: 's',
                  modifiers: {
                    mandatory: ['right_control'],
                    optional: ['any'],
                  },
                },
                to: [{ key_code: 'l' }],
                type: 'basic',
              },
              {
                from: {
                  key_code: 'd',
                  modifiers: {
                    mandatory: ['right_control'],
                    optional: ['any'],
                  },
                },
                to: [{ key_code: 'k' }],
                type: 'basic',
              },
              {
                from: {
                  key_code: 'f',
                  modifiers: {
                    mandatory: ['right_control'],
                    optional: ['any'],
                  },
                },
                to: [{ key_code: 'j' }],
                type: 'basic',
              },
              {
                from: {
                  key_code: 'g',
                  modifiers: {
                    mandatory: ['right_control'],
                    optional: ['any'],
                  },
                },
                to: [{ key_code: 'h' }],
                type: 'basic',
              },
              {
                from: {
                  key_code: 'h',
                  modifiers: {
                    mandatory: ['right_control'],
                    optional: ['any'],
                  },
                },
                to: [{ key_code: 'g' }],
                type: 'basic',
              },
              {
                from: {
                  key_code: 'j',
                  modifiers: {
                    mandatory: ['right_control'],
                    optional: ['any'],
                  },
                },
                to: [{ key_code: 'f' }],
                type: 'basic',
              },
              {
                from: {
                  key_code: 'k',
                  modifiers: {
                    mandatory: ['right_control'],
                    optional: ['any'],
                  },
                },
                to: [{ key_code: 'd' }],
                type: 'basic',
              },
              {
                from: {
                  key_code: 'l',
                  modifiers: {
                    mandatory: ['right_control'],
                    optional: ['any'],
                  },
                },
                to: [{ key_code: 's' }],
                type: 'basic',
              },
              {
                from: {
                  key_code: 'semicolon',
                  modifiers: {
                    mandatory: ['right_control'],
                    optional: ['any'],
                  },
                },
                to: [{ key_code: 'a' }],
                type: 'basic',
              },
              {
                from: {
                  key_code: 'quote',
                  modifiers: {
                    mandatory: ['right_control'],
                    optional: ['any'],
                  },
                },
                to: [{ key_code: 'grave_accent_and_tilde' }],
                type: 'basic',
              },
              {
                from: {
                  key_code: 'return_or_enter',
                  modifiers: {
                    mandatory: ['right_control'],
                    optional: ['any'],
                  },
                },
                to: [{ key_code: 'caps_lock' }],
                type: 'basic',
              },
              {
                from: {
                  key_code: 'grave_accent_and_tilde',
                  modifiers: {
                    mandatory: ['right_control'],
                    optional: ['any'],
                  },
                },
                to: [{ key_code: 'quote' }],
                type: 'basic',
              },
              {
                from: {
                  key_code: 'z',
                  modifiers: {
                    mandatory: ['right_control'],
                    optional: ['any'],
                  },
                },
                to: [{ key_code: 'slash' }],
                type: 'basic',
              },
              {
                from: {
                  key_code: 'x',
                  modifiers: {
                    mandatory: ['right_control'],
                    optional: ['any'],
                  },
                },
                to: [{ key_code: 'period' }],
                type: 'basic',
              },
              {
                from: {
                  key_code: 'c',
                  modifiers: {
                    mandatory: ['right_control'],
                    optional: ['any'],
                  },
                },
                to: [{ key_code: 'comma' }],
                type: 'basic',
              },
              {
                from: {
                  key_code: 'v',
                  modifiers: {
                    mandatory: ['right_control'],
                    optional: ['any'],
                  },
                },
                to: [{ key_code: 'm' }],
                type: 'basic',
              },
              {
                from: {
                  key_code: 'b',
                  modifiers: {
                    mandatory: ['right_control'],
                    optional: ['any'],
                  },
                },
                to: [{ key_code: 'n' }],
                type: 'basic',
              },
              {
                from: {
                  key_code: 'n',
                  modifiers: {
                    mandatory: ['right_control'],
                    optional: ['any'],
                  },
                },
                to: [{ key_code: 'b' }],
                type: 'basic',
              },
              {
                from: {
                  key_code: 'm',
                  modifiers: {
                    mandatory: ['right_control'],
                    optional: ['any'],
                  },
                },
                to: [{ key_code: 'v' }],
                type: 'basic',
              },
              {
                from: {
                  key_code: 'comma',
                  modifiers: {
                    mandatory: ['right_control'],
                    optional: ['any'],
                  },
                },
                to: [{ key_code: 'c' }],
                type: 'basic',
              },
              {
                from: {
                  key_code: 'period',
                  modifiers: {
                    mandatory: ['right_control'],
                    optional: ['any'],
                  },
                },
                to: [{ key_code: 'x' }],
                type: 'basic',
              },
              {
                from: {
                  key_code: 'slash',
                  modifiers: {
                    mandatory: ['right_control'],
                    optional: ['any'],
                  },
                },
                to: [{ key_code: 'z' }],
                type: 'basic',
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
