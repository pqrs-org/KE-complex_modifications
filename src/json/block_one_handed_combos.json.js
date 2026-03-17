// JavaScript should be written in ECMAScript 5.1.

function main() {
  console.log(
    JSON.stringify(
      {
        title: 'Force the user to make key combination with two hands (rev 2)',
        rules: rules(),
      },
      null,
      '  '
    )
  )
}

function rules() {
  const result = []

  const modifiers = ['shift', 'control', 'option', 'command']

  modifiers.forEach(function (modifier) {
    const leftManipulators = []

    const leftKeyCodes = [].concat(['grave_accent_and_tilde', '1', '2', '3', '4', '5'], ['q', 'w', 'e', 'r', 't'], ['a', 's', 'd', 'f', 'g'], ['z', 'x', 'c', 'v'])

    leftKeyCodes.forEach(function (keyCode) {
      leftManipulators.push({
        type: 'basic',
        from: {
          key_code: keyCode,
          modifiers: { mandatory: ['left_' + modifier], optional: ['any'] },
        },
        to: [{ key_code: 'vk_none' }],
      })
    })

    const rightManipulators = []

    const rightKeyCodes = [].concat(
      ['7', '8', '9', '0', 'hyphen', 'equal_sign'],
      ['y', 'u', 'i', 'o', 'p', 'open_bracket', 'close_bracket'],
      ['h', 'j', 'k', 'l', 'semicolon', 'quote', 'backslash'],
      ['n', 'm', 'comma', 'period', 'slash']
    )
    rightKeyCodes.forEach(function (keyCode) {
      rightManipulators.push({
        type: 'basic',
        from: {
          key_code: keyCode,
          modifiers: { mandatory: ['right_' + modifier], optional: ['any'] },
        },
        to: [{ key_code: 'vk_none' }],
      })
    })

    result.push({
      description: 'Block left-handed ' + modifier + ' + left-handed key (rev 2)',
      manipulators: leftManipulators,
    })

    result.push({
      description: 'Block right-handed ' + modifier + ' + right-handed key (rev 2)',
      manipulators: rightManipulators,
    })
  })

  return result
}

main()
