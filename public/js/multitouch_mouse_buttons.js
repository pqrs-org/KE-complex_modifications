// JavaScript should be written in ECMAScript 5.1.

function main() {
  return {
    description: 'Multitouch Mouse Buttons (rev 2)',
    description_notes: [
      '- Available since Karabiner-Elements 16.0.0.',
      // Usage
      '- While touching the trackpad: 1...9 = mouse buttons 1...9',
    ],
    maintainers: ['tekezo'],
    manipulators: manipulators(),
  }
}

function manipulators() {
  const result = []
  for (var i = 1; i <= 9; ++i) {
    result.push({
      type: 'basic',
      from: {
        key_code: i.toString(),
        modifiers: {
          optional: ['any'],
        },
      },
      to: [
        {
          pointing_button: 'button' + i.toString(),
        },
      ],
      conditions: [
        {
          type: 'variable_unless',
          name: 'multitouch_extension_finger_count_total',
          value: 0,
        },
      ],
    })
  }

  return result
}

main()
