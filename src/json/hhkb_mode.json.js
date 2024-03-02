// JavaScript should be written in ECMAScript 5.1.

function main() {
  console.log(
    JSON.stringify(
      {
        title: 'Happy Hacking Keyboard Compatible Mode (rev 2)',
        rules: [
          {
            description: 'HHKB Arrow Mode (fn + semicolon/slash/open_bracket/quote to arrow keys, etc)',
            manipulators: [].concat(
              // change fn + semicolon/slash/open_bracket/quote to arrow keys
              eachKey({
                fromKeys: ['semicolon', 'slash', 'open_bracket', 'quote'],
                fromModifiers: {
                  mandatory: ['fn'],
                  optional: ['caps_lock', 'option', 'command', 'shift', 'control'],
                },
                toKeys: ['left_arrow', 'down_arrow', 'up_arrow', 'right_arrow'],
              }),

              // change fn + l/period/k/comma to page_up/page_down/home/end
              eachKey({
                fromKeys: ['l', 'period'],
                fromModifiers: {
                  mandatory: ['fn'],
                  optional: ['caps_lock', 'option'],
                },
                toKeys: ['page_up', 'page_down'],
              }),
              eachKey({
                fromKeys: ['k', 'comma'],
                fromModifiers: {
                  mandatory: ['fn'],
                  optional: ['caps_lock'],
                },
                toKeys: ['home', 'end'],
              })
            ),
          },
          {
            description: 'HHKB Media Key Mode (fn + asdf to Volume down/up/mute, eject) (rev 2)',
            manipulators: [
              {
                type: 'basic',
                from: {
                  key_code: 'a',
                  modifiers: {
                    mandatory: ['fn'],
                    optional: ['any'],
                  },
                },
                to: [{ consumer_key_code: 'volume_decrement' }],
              },
              {
                type: 'basic',
                from: {
                  key_code: 's',
                  modifiers: {
                    mandatory: ['fn'],
                    optional: ['any'],
                  },
                },
                to: [{ consumer_key_code: 'volume_increment' }],
              },
              {
                type: 'basic',
                from: {
                  key_code: 'd',
                  modifiers: {
                    mandatory: ['fn'],
                    optional: ['any'],
                  },
                },
                to: [{ consumer_key_code: 'mute' }],
              },
              {
                type: 'basic',
                from: {
                  key_code: 'f',
                  modifiers: {
                    mandatory: ['fn'],
                    optional: ['any'],
                  },
                },
                to: [{ consumer_key_code: 'eject' }],
              },
            ],
          },
          {
            description: 'Map fn + i, o, p  to F13, F14, F15.',
            manipulators: eachKey({
              fromKeys: ['i', 'o', 'p'],
              fromModifiers: { mandatory: ['fn'] },
              toKeys: ['f13', 'f14', 'f15'],
            }),
          },
        ],
      },
      null,
      '  '
    )
  )
}

function eachKey(options) {
  const result = []
  for (var i in options.fromKeys) {
    const fromKey = options.fromKeys[i]
    const toKey = options.toKeys[i]

    result.push({
      type: 'basic',
      from: {
        key_code: fromKey,
        modifiers: options.fromModifiers,
      },
      to: [
        {
          key_code: toKey,
          modifiers: options.toModifiers,
        },
      ],
    })
  }

  return result
}

main()
