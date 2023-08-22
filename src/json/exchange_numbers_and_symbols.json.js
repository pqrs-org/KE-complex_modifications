// JavaScript should be written in ECMAScript 5.1.

function main() {
  console.log(
    JSON.stringify(
      {
        title: 'Exchange numbers and symbols',
        maintainers: ['tekezo'],
        rules: [
          {
            description:
              'Exchange numbers and symbols (1234567890 and !@#$%^&*())',
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

  const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0']

  keys.forEach(function (key) {
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

  keys.forEach(function (key) {
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
