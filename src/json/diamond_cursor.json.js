// JavaScript should be written in ECMAScript 5.1.

const karabiner = require('../lib/karabiner')

function main() {
  console.log(
    JSON.stringify(
      {
        title: 'Diamond Cursor',
        rules: [
          {
            description: 'Change fn + I/J/K/L to Arrow Keys',
            manipulators: [
              {
                type: 'basic',
                from: {
                  key_code: 'i',
                  modifiers: {
                    mandatory: ['fn'],
                    optional: ['any'],
                  },
                },
                to: [{ key_code: 'up_arrow' }],
              },
              {
                type: 'basic',
                from: {
                  key_code: 'j',
                  modifiers: {
                    mandatory: ['fn'],
                    optional: ['any'],
                  },
                },
                to: [{ key_code: 'left_arrow' }],
              },
              {
                type: 'basic',
                from: {
                  key_code: 'k',
                  modifiers: {
                    mandatory: ['fn'],
                    optional: ['any'],
                  },
                },
                to: [{ key_code: 'down_arrow' }],
              },
              {
                type: 'basic',
                from: {
                  key_code: 'l',
                  modifiers: {
                    mandatory: ['fn'],
                    optional: ['any'],
                  },
                },
                to: [{ key_code: 'right_arrow' }],
              },
            ],
          },
          {
            description: 'Change right_command+i/j/k/l to Arrows',
            manipulators: [
              {
                type: 'basic',
                from: {
                  key_code: 'j',
                  modifiers: {
                    mandatory: ['right_command'],
                    optional: ['any'],
                  },
                },
                to: [{ key_code: 'left_arrow' }],
              },
              {
                type: 'basic',
                from: {
                  key_code: 'k',
                  modifiers: {
                    mandatory: ['right_command'],
                    optional: ['any'],
                  },
                },
                to: [{ key_code: 'down_arrow' }],
              },
              {
                type: 'basic',
                from: {
                  key_code: 'i',
                  modifiers: {
                    mandatory: ['right_command'],
                    optional: ['any'],
                  },
                },
                to: [{ key_code: 'up_arrow' }],
              },
              {
                type: 'basic',
                from: {
                  key_code: 'l',
                  modifiers: {
                    mandatory: ['right_command'],
                    optional: ['any'],
                  },
                },
                to: [{ key_code: 'right_arrow' }],
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
