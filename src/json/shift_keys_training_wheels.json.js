const generate_disable_left_shift_json = (letter) => {
  return {
    type: 'basic',
    from: {
      key_code: letter,
      modifiers: { mandatory: ['left_shift'] },
    },
    to: [{ key_code: 'vk_none' }],
  }
}

const generate_disable_right_shift_json = (letter) => {
  return {
    type: 'basic',
    from: {
      key_code: letter,
      modifiers: { mandatory: ['right_shift'] },
    },
    to: [{ key_code: 'vk_none' }],
  }
}

const generate_commands = () => {
  const all_letters = 'abcdefghijklmnopqrstuvwxyz'
  const left_shift_disabled_letters = 'qwertasdfgzxcv'

  let result = []
  result = [
    ...result,
    ...left_shift_disabled_letters
      .split('')
      .map((letter) => generate_disable_left_shift_json(letter)),
  ]

  result = [
    ...result,
    ...all_letters
      .split('')
      .filter((letter) => !left_shift_disabled_letters.includes(letter))
      .map((letter) => generate_disable_right_shift_json(letter)),
  ]

  return result
}

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
