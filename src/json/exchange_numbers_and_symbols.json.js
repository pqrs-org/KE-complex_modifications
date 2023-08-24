// JavaScript should be written in ECMAScript 5.1.

const karabiner = require('../lib/karabiner')

function main() {
  console.log(
    JSON.stringify(
      {
        title: 'Exchange numbers and symbols',
        maintainers: ['tekezo'],
        rules: [
          {
            description: 'Exchange numbers and symbols (1234567890 and !@#$%^&*())',
            manipulators: manipulators(),
          },
        ],
      },
      null,
      '  '
    )
  )
}

function manipulators() {
  const result = []

  karabiner.numbers.forEach(function (key) {
    result.push({
      type: 'basic',
      from: {
        key_code: key,
        modifiers: {
          optional: ['caps_lock'],
        },
      },
      to: [
        {
          key_code: key,
          modifiers: ['left_shift'],
        },
      ],
    })
  })

  karabiner.numbers.forEach(function (key) {
    result.push({
      type: 'basic',
      from: {
        key_code: key,
        modifiers: {
          mandatory: ['shift'],
          optional: ['caps_lock'],
        },
      },
      to: [
        {
          key_code: key,
        },
      ],
    })
  })

  return result
}

main()
