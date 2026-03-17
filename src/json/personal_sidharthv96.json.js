// JavaScript should be written in ECMAScript 5.1.

function main() {
  console.log(
    JSON.stringify(
      {
        title: 'Personal rules (@sidharthv96)',
        rules: [
          {
            description: 'Diamond Nav Mode [; as Trigger Key]',
            manipulators: generateDiamondMode('semicolon'),
          },
          {
            description: 'Diamond Nav Mode [E as Trigger Key]',
            manipulators: generateDiamondMode('e'),
          },
          {
            description: 'Change delete_or_backspace key to hyper and caps_lock to delete_or_backspace.',
            manipulators: [
              {
                type: 'basic',
                from: from('delete_or_backspace', [], ['any']),
                to: to([['left_shift', ['left_command', 'left_control', 'left_option']]]),
              },
              {
                type: 'basic',
                from: from('caps_lock', [], ['any']),
                to: to([['delete_or_backspace', []]]),
              },
            ],
          },
        ],
      },
      null,
      '  '
    )
  )
}

function from(keyCode, mandatoryModifiers, optionalModifiers) {
  data = {
    key_code: keyCode,
  }

  if (mandatoryModifiers !== undefined && mandatoryModifiers.length > 0) {
    if (data.modifiers === undefined) {
      data.modifiers = {}
    }

    data.modifiers.mandatory = mandatoryModifiers
  }

  if (optionalModifiers !== undefined && optionalModifiers.length > 0) {
    if (data.modifiers === undefined) {
      data.modifiers = {}
    }

    data.modifiers.optional = optionalModifiers
  }

  return data
}

function to(events) {
  return events.map(function (e) {
    return {
      key_code: e[0],
      modifiers: e[1],
    }
  })
}

function generateDiamondMode(triggerKey) {
  return [].concat(
    generateDiamondModeSingleRule('i', 'up_arrow', [], triggerKey),
    generateDiamondModeSingleRule('k', 'down_arrow', [], triggerKey),
    generateDiamondModeSingleRule('j', 'left_arrow', [], triggerKey),
    generateDiamondModeSingleRule('l', 'right_arrow', [], triggerKey)
  )
}

function generateDiamondModeSingleRule(fromKeyCode, toKeyCode, toModifiers, triggerKey) {
  return [
    {
      type: 'basic',
      from: {
        key_code: fromKeyCode,
        modifiers: { optional: ['any'] },
      },
      to: [
        {
          key_code: toKeyCode,
          modifiers: toModifiers,
        },
      ],
      conditions: [{ type: 'variable_if', name: 'sidv_diamond_mode', value: 1 }],
    },

    {
      type: 'basic',
      from: {
        simultaneous: [{ key_code: triggerKey }, { key_code: fromKeyCode }],
        simultaneous_options: {
          key_down_order: 'strict',
          key_up_order: 'strict_inverse',
          detect_key_down_uninterruptedly: true,
          to_after_key_up: [{ set_variable: { name: 'sidv_diamond_mode', value: 0 } }],
        },
        modifiers: { optional: ['any'] },
      },
      to: [
        { set_variable: { name: 'sidv_diamond_mode', value: 1 } },
        {
          key_code: toKeyCode,
          modifiers: toModifiers,
        },
      ],
    },
  ]
}

main()
