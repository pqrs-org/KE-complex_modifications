// JavaScript should be written in ECMAScript 5.1.

function main() {
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

  const manipulators = []
  definitions.forEach(function (def) {
    manipulators.push({
      type: 'basic',
      from: {
        key_code: def.from,
        modifiers: {
          mandatory: ['right_shift'],
          optional: ['any'],
        },
      },
      to: def.to,
    })
  })

  console.log(
    JSON.stringify(
      {
        title: 'Mouse keys (simple) (rev 1)',
        maintainers: ['tekezo'],
        rules: [
          {
            description: 'Mouse keys (simple) (rev 1)',
            manipulators: manipulators,
          },
        ],
      },
      null,
      '  '
    )
  )
}

main()
