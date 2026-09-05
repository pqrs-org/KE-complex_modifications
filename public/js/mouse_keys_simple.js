// JavaScript should be written in ECMAScript 5.1.

function main() {
  return {
    description: 'Mouse keys (simple) (rev 1)',
    description_notes: [
      '- Available since Karabiner-Elements 16.0.0.',
      // Usage
      '- Hold right-shift: w/a/s/d = move cursor; r/v = scroll up/down; f/g = left/right click',
    ],
    maintainers: ['tekezo'],
    manipulators: manipulators(),
  }
}

function manipulators() {
  const definitions = [
    { from: 'w', to: [{ mouse_key: { y: -1536 } }] },
    { from: 'a', to: [{ mouse_key: { x: -1536 } }] },
    { from: 's', to: [{ mouse_key: { y: 1536 } }] },
    { from: 'd', to: [{ mouse_key: { x: 1536 } }] },
    { from: 'r', to: [{ mouse_key: { vertical_wheel: -32 } }] },
    { from: 'v', to: [{ mouse_key: { vertical_wheel: 32 } }] },
    { from: 'f', to: [{ pointing_button: 'button1' }] },
    { from: 'g', to: [{ pointing_button: 'button2' }] },
  ]

  return definitions.map(function (def) {
    return {
      type: 'basic',
      from: {
        key_code: def.from,
        modifiers: {
          mandatory: ['right_shift'],
          optional: ['any'],
        },
      },
      to: def.to,
    }
  })
}

main()
