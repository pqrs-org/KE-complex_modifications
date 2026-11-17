// JavaScript should be written in ECMAScript 5.1.

// Covert Reaction, a remake of Sid Meier's Covert Action (1990): the break-in
// mini-game's actions are on F1-F10, so make them work without holding fn.

function main() {
  return {
    description: 'Covert Reaction: use F1-F10 as standard function keys',
    maintainers: ['bertrandom'],
    manipulators: manipulators(),
  }
}

function manipulators() {
  const conditions = [
    {
      type: 'frontmost_application_if',
      bundle_identifiers: ['^org\\.bert\\.covertreaction$'],
    },
  ]
  const result = []
  for (var i = 1; i <= 10; i++) {
    const key = 'f' + i
    // fn + F-key: the media function instead.
    result.push({
      type: 'basic',
      conditions: conditions,
      from: { key_code: key, modifiers: { mandatory: ['fn'], optional: ['any'] } },
      to: [{ key_code: key }],
    })
    // F-key alone: the function key.
    result.push({
      type: 'basic',
      conditions: conditions,
      from: {
        key_code: key,
        modifiers: { optional: ['caps_lock', 'command', 'control', 'option', 'shift'] },
      },
      to: [{ key_code: key, modifiers: ['fn'] }],
    })
  }
  return result
}

main()
