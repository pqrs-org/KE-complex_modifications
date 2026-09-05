// JavaScript should be written in ECMAScript 5.1.

function main() {
  return {
    description: 'Exchange numbers and symbols (1234567890 and !@#$%^&*())',
    description_notes: ['- Available since Karabiner-Elements 16.0.0.'],
    maintainers: ['tekezo'],
    manipulators: manipulators(),
  }
}

function manipulators() {
  const result = []
  const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']

  numbers.forEach(function (key) {
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
