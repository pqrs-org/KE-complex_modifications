// JavaScript should be written in ECMAScript 5.1.

function main() {
  console.log(
    JSON.stringify(
      {
        title: 'Personal rules (@itmammoth)',
        rules: [
          {
            description: 'Vi binding [Q + hjkl]',
            manipulators: generateViBindingRules('q'),
          },
          {
            description: "Emacs binding [' + aedhk]",
            manipulators: generateEmacsBindingRules('quote'),
          },
          {
            description: 'Media control [Fn + iop] (for HHKB)',
            manipulators: generateMediaControlRules('print_screen', 'scroll_lock', 'pause'),
          },
          {
            description: 'Mission control [Shift(R) *twice*]',
            manipulators: generateMissionControlRules('right_shift'),
          },
          {
            description: 'Quit application [Cmd + Q *twice*]',
            manipulators: generateQuitApplicationRules('q', ['command']),
          },
        ],
      },
      null,
      '  '
    )
  )
}

function generateViBindingRules(triggerKey) {
  const mode = 'vi_mode'

  return [].concat(
    generateSimultaneousBindingRule(triggerKey, 'h', mode, [['left_arrow', []]]),
    generateSimultaneousBindingRule(triggerKey, 'j', mode, [['down_arrow', []]]),
    generateSimultaneousBindingRule(triggerKey, 'k', mode, [['up_arrow', []]]),
    generateSimultaneousBindingRule(triggerKey, 'l', mode, [['right_arrow', []]])
  )
}

function generateEmacsBindingRules(triggerKey) {
  const mode = 'emacs_mode'

  return [].concat(
    generateSimultaneousBindingRule(triggerKey, 'a', mode, [['left_arrow', ['command']]]),
    generateSimultaneousBindingRule(triggerKey, 'e', mode, [['right_arrow', ['command']]]),
    generateSimultaneousBindingRule(triggerKey, 'd', mode, [['delete_forward', []]]),
    generateSimultaneousBindingRule(triggerKey, 'h', mode, [['delete_or_backspace', []]]),
    generateSimultaneousBindingRule(triggerKey, 'k', mode, [
      ['right_arrow', ['command', 'shift']],
      ['delete_forward', []],
    ])
  )
}

function generateSimultaneousBindingRule(triggerKey, fromKeyCode, mode, toKeysAndModifiers) {
  const toKeys = toKeysAndModifiers.map(function (pair) {
    return { key_code: pair[0], modifiers: pair[1] }
  })

  return [
    {
      type: 'basic',
      from: {
        key_code: fromKeyCode,
        modifiers: { optional: ['any'] },
      },
      to: toKeys,
      conditions: [
        {
          type: 'variable_if',
          name: mode,
          value: 1,
        },
      ],
    },
    simultaneousKeyBinding(triggerKey, fromKeyCode, mode, toKeys),
  ]
}

function generateMediaControlRules(rewindKeyCode, playOrPauseKeyCode, fastforwardKeyCode) {
  return [
    {
      type: 'basic',
      from: {
        key_code: rewindKeyCode,
        modifiers: { optional: ['any'] },
      },
      to: [
        {
          key_code: 'rewind',
          modifiers: [],
        },
      ],
    },
    {
      type: 'basic',
      from: {
        key_code: playOrPauseKeyCode,
        modifiers: { optional: ['any'] },
      },
      to: [
        {
          key_code: 'play_or_pause',
          modifiers: [],
        },
      ],
    },
    {
      type: 'basic',
      from: {
        key_code: fastforwardKeyCode,
        modifiers: { optional: ['any'] },
      },
      to: [
        {
          key_code: 'fastforward',
          modifiers: [],
        },
      ],
    },
  ]
}

function generateQuitApplicationRules(keyCode, modifiers) {
  const mode = 'quit_application_mode'
  const from = {
    key_code: keyCode,
    modifiers: {
      mandatory: modifiers,
      optional: ['caps_lock'],
    },
  }

  return [
    {
      type: 'basic',
      from: from,
      to: {
        key_code: keyCode,
        modifiers: modifiers,
      },
      conditions: [{ type: 'variable_if', name: mode, value: 1 }],
    },
    {
      type: 'basic',
      from: from,
      to: [{ set_variable: { name: mode, value: 1 } }],
      to_delayed_action: {
        to_if_invoked: [{ set_variable: { name: mode, value: 0 } }],
        to_if_canceled: [{ set_variable: { name: mode, value: 0 } }],
      },
    },
  ]
}

function generateMissionControlRules(keyCode) {
  const mode = 'mission_control_mode'
  const from = {
    key_code: keyCode,
    modifiers: { optional: ['any'] },
  }

  return [
    {
      type: 'basic',
      from: from,
      to: [
        {
          key_code: 'mission_control',
        },
      ],
      conditions: [{ type: 'variable_if', name: mode, value: 1 }],
    },
    {
      type: 'basic',
      from: from,
      to: [
        {
          set_variable: { name: mode, value: 1 },
        },
        {
          key_code: keyCode,
        },
      ],
      to_delayed_action: {
        to_if_invoked: [{ set_variable: { name: mode, value: 0 } }],
        to_if_canceled: [{ set_variable: { name: mode, value: 0 } }],
      },
    },
  ]
}

function simultaneousKeyBinding(triggerKey, fromKeyCode, mode, toKeys) {
  return {
    type: 'basic',
    from: {
      simultaneous: [{ key_code: triggerKey }, { key_code: fromKeyCode }],
      simultaneous_options: {
        key_down_order: 'strict',
        key_up_order: 'strict_inverse',
        detect_key_down_uninterruptedly: true,
        to_after_key_up: [{ set_variable: { name: mode, value: 0 } }],
      },
      modifiers: { optional: ['any'] },
    },
    to: [{ set_variable: { name: mode, value: 1 } }].concat(toKeys),
  }
}

main()
