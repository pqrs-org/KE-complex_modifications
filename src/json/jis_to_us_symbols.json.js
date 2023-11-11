// @ts-check
// JavaScript should be written in ECMAScript 5.1.

function main() {
  console.log(
    JSON.stringify(
      {
        title: 'Japanese JIS to US Keyboard: Remap Symbol Keys',
        maintainers: ['halfwhole'],
        rules: rules(),
      },
      null,
      '  '
    )
  )
}

function rules() {
  /**
   * @type {{
   *   description: string,
   *   fromKey: string,
   *   isFromShift?: boolean,
   *   toKey: string,
   *   isToShift?: boolean,
   *   isToOption?: boolean,
   * }[]} */
  const mappings = [
    // Number mappings
    {
      description: 'Change shift + 2 from " to @',
      fromKey: '2',
      isFromShift: true,
      toKey: 'open_bracket',
    },
    {
      description: 'Change shift + 6 from & to ^',
      fromKey: '6',
      isFromShift: true,
      toKey: 'equal_sign',
    },
    {
      description: "Change shift + 7 from ' to &",
      fromKey: '7',
      isFromShift: true,
      toKey: '6',
      isToShift: true,
    },
    {
      description: 'Change shift + 8 from ( to *',
      fromKey: '8',
      isFromShift: true,
      toKey: 'quote',
      isToShift: true,
    },
    {
      description: 'Change shift + 9 from ) to (',
      fromKey: '9',
      isFromShift: true,
      toKey: '8',
      isToShift: true,
    },
    {
      description: 'Change shift + 0 from 0 to )',
      fromKey: '0',
      isFromShift: true,
      toKey: '9',
      isToShift: true,
    },
    // Other symbol mappings
    {
      description: 'Change shift + - from = to _',
      fromKey: 'hyphen',
      isFromShift: true,
      toKey: 'international1',
    },
    {
      description: 'Change ^ to =',
      fromKey: 'equal_sign',
      toKey: 'hyphen',
      isToShift: true,
    },
    {
      description: 'Change shift + ^ from ~ to +',
      fromKey: 'equal_sign',
      isFromShift: true,
      toKey: 'semicolon',
      isToShift: true,
    },
    {
      description: 'Change ¥ to `',
      fromKey: 'international3',
      toKey: 'open_bracket',
      isToShift: true,
    },
    {
      description: 'Change shift + ¥ from | to ~',
      fromKey: 'international3',
      isFromShift: true,
      toKey: 'equal_sign',
      isToShift: true,
    },
    {
      description: 'Change @ to [',
      fromKey: 'open_bracket',
      toKey: 'close_bracket',
    },
    {
      description: 'Change shift + @ from ` to {',
      fromKey: 'open_bracket',
      isFromShift: true,
      toKey: 'close_bracket',
      isToShift: true,
    },
    {
      description: 'Change [ to ]',
      fromKey: 'close_bracket',
      toKey: 'backslash',
    },
    {
      description: 'Change shift + [ from { to }',
      fromKey: 'close_bracket',
      isFromShift: true,
      toKey: 'backslash',
      isToShift: true,
    },
    {
      description: 'Change shift + ; from + to :',
      fromKey: 'semicolon',
      isFromShift: true,
      toKey: 'quote',
    },
    {
      description: "Change : to '",
      fromKey: 'quote',
      toKey: '7',
      isToShift: true,
    },
    {
      description: 'Change shift + : from * to "',
      fromKey: 'quote',
      isFromShift: true,
      toKey: '2',
      isToShift: true,
    },
    {
      description: 'Change ] to \\',
      fromKey: 'backslash',
      toKey: 'international3',
      // \ is option +} ¥
      isToOption: true,
    },
    {
      description: 'Change shift + ] from } to |',
      fromKey: 'backslash',
      isFromShift: true,
      toKey: 'international3',
      isToShift: true,
    },
  ]

  return mappings.map(function (m) {
    return rule(m)
  })
}

function rule(mapping) {
  const from = {
    key_code: mapping.fromKey,
    modifiers: {
      optional: ['control', 'option', 'command'],
    },
  }
  if (mapping.isFromShift) {
    from.modifiers.mandatory = ['shift']
  }

  const to = { key_code: mapping.toKey }
  if (mapping.isToShift) {
    to.modifiers = ['left_shift']
  } else if (mapping.isToOption) {
    to.modifiers = ['left_option']
  }

  const condition = {
    type: 'keyboard_type_if',
    keyboard_types: ['jis'],
  }

  return {
    description: mapping.description,
    manipulators: [
      {
        type: 'basic',
        from: from,
        to: [to],
        conditions: [condition],
      },
    ],
  }
}

main()
