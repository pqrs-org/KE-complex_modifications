// JavaScript should be written in ECMAScript 5.1.

function main() {
  console.log(
    JSON.stringify(
      {
        title: 'Shift key training wheels',
        rules: [
          {
            description: 'Disable incorrect shift + letter combos',
            manipulators: generate_commands(),
          },
        ],
      },
      null,
      '  '
    )
  )
}

const generate_disable_left_shift_json = function (letter) {
  return {
    type: 'basic',
    from: {
      key_code: letter,
      modifiers: { mandatory: ['left_shift'] },
    },
    to: [{ key_code: 'vk_none' }],
  }
}

const generate_disable_right_shift_json = function (letter) {
  return {
    type: 'basic',
    from: {
      key_code: letter,
      modifiers: { mandatory: ['right_shift'] },
    },
    to: [{ key_code: 'vk_none' }],
  }
}

const generate_commands = function () {
  const all_letters = 'abcdefghijklmnopqrstuvwxyz'
  const left_shift_disabled_letters = 'qwertasdfgzxcv'

  var result = []
  result = result.concat(
    left_shift_disabled_letters.split('').map(function (letter) {
      return generate_disable_left_shift_json(letter)
    })
  )

  result = result.concat(
    all_letters
      .split('')
      .filter(function (letter) {
        return !left_shift_disabled_letters.includes(letter)
      })
      .map(function (letter) {
        return generate_disable_right_shift_json(letter)
      })
  )

  return result
}

main()
