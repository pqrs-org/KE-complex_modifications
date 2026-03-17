// JavaScript should be written in ECMAScript 5.1.

const karabiner = require('../lib/karabiner')

const parameters = {
  to_if_alone_timeout_milliseconds: 300,
  to_delayed_action_delay_milliseconds: 0,
  to_if_held_down_threshold_milliseconds: 0,
  simultaneous_threshold_milliseconds: 300,
}

function main() {
  console.log(
    JSON.stringify(
      {
        title: 'Ergo Fly Keys',
        maintainers: ['marlonrichert'],
        rules: [
          {
            description: 'Ergo Fly Keys',
            manipulators: manipulators('spacebar'),
          },
        ],
      },
      null,
      '  '
    )
  )
}

function manipulators(triggerKeyCode) {
  variable = 'ergo_fly_keys_' + triggerKeyCode

  return [].concat(
    dualKey('left_option', 'open_bracket', 'left_command'),
    dualKey('left_command', 'close_bracket', 'left_shift'),
    dualKey('right_command', 'hyphen', 'right_shift'),
    dualKey('right_option', 'equal_sign', 'right_command'),

    dualKey('caps_lock', 'grave_accent_and_tilde', 'left_option'),
    dualKey('quote', 'quote', 'right_option'),

    dualKey('grave_accent_and_tilde', 'backslash', 'left_control'),
    dualKey('left_shift', 'backslash', 'left_control'),
    dualKey('slash', 'slash', 'right_control'),

    twoPartTriggerCombo(triggerKeyCode, variable, 'b', 'tab', []),

    twoPartTriggerCombo(triggerKeyCode, variable, 'i', 'up_arrow', []),
    twoPartTriggerCombo(triggerKeyCode, variable, 'k', 'down_arrow', []),
    twoPartTriggerCombo(triggerKeyCode, variable, 'j', 'left_arrow', []),
    twoPartTriggerCombo(triggerKeyCode, variable, 'l', 'right_arrow', []),
    fourPartTriggerCombo(triggerKeyCode, variable, 'u', [{ key_code: 'left_arrow', modifiers: ['left_option'] }], [{ key_code: 'escape' }, { key_code: 'b' }]),
    fourPartTriggerCombo(triggerKeyCode, variable, 'o', [{ key_code: 'right_arrow', modifiers: ['left_option'] }], [{ key_code: 'escape' }, { key_code: 'f' }]),
    twoPartTriggerCombo(triggerKeyCode, variable, 'h', 'a', ['right_control']),
    twoPartTriggerCombo(triggerKeyCode, variable, 'semicolon', 'e', ['right_control']),
    fourPartTriggerCombo(triggerKeyCode, variable, 'y', [{ key_code: 'left_arrow', modifiers: ['left_command'] }], [{ key_code: 'escape' }, { key_code: 'b', modifiers: ['right_control'] }]),
    fourPartTriggerCombo(triggerKeyCode, variable, 'p', [{ key_code: 'right_arrow', modifiers: ['left_command'] }], [{ key_code: 'escape' }, { key_code: 'f', modifiers: ['right_control'] }]),
    twoPartTriggerCombo(triggerKeyCode, variable, 'n', 'home', []),
    twoPartTriggerCombo(triggerKeyCode, variable, 'm', 'page_up', []),
    twoPartTriggerCombo(triggerKeyCode, variable, 'comma', 'page_down', []),
    twoPartTriggerCombo(triggerKeyCode, variable, 'period', 'end', []),

    twoPartTriggerCombo(triggerKeyCode, variable, 'd', 'delete_or_backspace', []),
    twoPartTriggerCombo(triggerKeyCode, variable, 'f', 'delete_forward', []),
    fourPartTriggerCombo(triggerKeyCode, variable, 'e', [{ key_code: 'delete_or_backspace', modifiers: ['left_option'] }], [{ key_code: 'escape' }, { key_code: 'delete_or_backspace' }]),
    fourPartTriggerCombo(triggerKeyCode, variable, 'r', [{ key_code: 'delete_forward', modifiers: ['left_option'] }], [{ key_code: 'escape' }, { key_code: 'd' }]),
    fourPartTriggerCombo(
      triggerKeyCode,
      variable,
      's',
      [
        { key_code: 'a', modifiers: ['right_control', 'right_shift'] },
        { key_code: 'k', modifiers: ['left_control'] },
      ],
      [{ key_code: 'u', modifiers: ['left_control'] }]
    ),
    twoPartTriggerCombo(triggerKeyCode, variable, 'g', 'k', ['left_control']),
    fourPartTriggerCombo(triggerKeyCode, variable, 'w', [{ key_code: 'delete_or_backspace', modifiers: ['left_command'] }], [{ key_code: 'w', modifiers: ['left_control'] }]),
    fourPartTriggerCombo(
      triggerKeyCode,
      variable,
      't',
      [{ key_code: 'right_arrow', modifiers: ['left_command', 'left_shift'] }, { key_code: 'delete_forward' }],
      [{ key_code: 'escape' }, { key_code: 'd', modifiers: ['left_control'] }]
    ),
    twoPartTriggerCombo(triggerKeyCode, variable, 'z', 'escape', []),
    twoPartTriggerCombo(triggerKeyCode, variable, 'x', 'up_arrow', ['left_command']),
    twoPartTriggerCombo(triggerKeyCode, variable, 'c', 'down_arrow', ['left_command']),
    twoPartTriggerCombo(triggerKeyCode, variable, 'v', 'return_or_enter', []),
    fourPartTriggerCombo(triggerKeyCode, variable, 'q', [{ key_code: 'up_arrow', modifiers: ['left_option'] }], [{ key_code: 'escape' }, { key_code: 'comma', modifiers: ['left_shift'] }]),
    fourPartTriggerCombo(triggerKeyCode, variable, 'a', [{ key_code: 'down_arrow', modifiers: ['left_option'] }], [{ key_code: 'escape' }, { key_code: 'period', modifiers: ['left_shift'] }]),

    triggerKey(triggerKeyCode, variable)
  )
}

function dualKey(input, alone, held_down) {
  return [
    {
      type: 'basic',
      from: { key_code: input, modifiers: { optional: ['any'] } },
      to_if_alone: [{ key_code: alone }],
      to_if_held_down: [{ key_code: held_down }],
      parameters: {
        'basic.to_if_alone_timeout_milliseconds': parameters.to_if_alone_timeout_milliseconds,
        'basic.to_if_held_down_threshold_milliseconds': parameters.to_if_held_down_threshold_milliseconds,
      },
    },
  ]
}

function triggerKey(triggerKey, variable) {
  return [
    {
      type: 'basic',
      from: { key_code: triggerKey, modifiers: { optional: ['any'] } },
      to: [
        { set_variable: { name: 'DEBUG simultaneous', value: 0 } },
        { set_variable: { name: 'DEBUG trigger alone', value: 0 } },
        { set_variable: { name: 'DEBUG trigger held down', value: 0 } },
        { set_variable: { name: 'DEBUG trigger key up', value: 0 } },
        { set_variable: { name: 'DEBUG trigger delay invoked', value: 0 } },
        { set_variable: { name: 'DEBUG trigger delay canceled', value: 0 } },
        { set_variable: { name: 'DEBUG halt', value: 0 } },
      ],
      to_if_alone: [
        { set_variable: { name: 'DEBUG trigger alone', value: 1 } },
        { set_variable: { name: variable, value: 0 } },
        { set_variable: { name: 'DEBUG halt', value: 1 } },
        { key_code: triggerKey, halt: true },
      ],
      to_if_held_down: [{ set_variable: { name: 'DEBUG trigger held down', value: 1 } }, { set_variable: { name: variable, value: 1 } }],
      to_after_key_up: [{ set_variable: { name: 'DEBUG trigger key up', value: 1 } }, { set_variable: { name: variable, value: 0 } }, { key_code: 'vk_none' }],
      to_delayed_action: {
        to_if_invoked: [{ set_variable: { name: 'DEBUG trigger delay invoked', value: 1 } }],
        to_if_canceled: [
          { set_variable: { name: 'DEBUG trigger delay canceled', value: 1 } },
          { set_variable: { name: variable, value: 0 } },
          { set_variable: { name: 'DEBUG halt', value: 1 } },
          { key_code: triggerKey },
        ],
      },
      parameters: {
        'basic.to_if_alone_timeout_milliseconds': parameters.to_if_alone_timeout_milliseconds,
        'basic.to_delayed_action_delay_milliseconds': parameters.to_delayed_action_delay_milliseconds,
        'basic.to_if_held_down_threshold_milliseconds': parameters.to_if_held_down_threshold_milliseconds,
      },
    },
  ]
}

function twoPartTriggerCombo(triggerKey, variable, fromKeyCode, toKeyCode, toModifiers) {
  return [
    {
      type: 'basic',
      from: { key_code: fromKeyCode, modifiers: { optional: ['any'] } },
      to: [{ key_code: toKeyCode, modifiers: toModifiers }],
      conditions: [{ type: 'variable_if', name: variable, value: 1 }],
    },

    {
      type: 'basic',
      from: {
        simultaneous: [{ key_code: triggerKey }, { key_code: fromKeyCode }],
        simultaneous_options: {
          key_down_order: 'strict',
          key_up_order: 'strict_inverse',
          detect_key_down_uninterruptedly: true,
          to_after_key_up: [{ set_variable: { name: variable, value: 0 } }],
        },
        modifiers: { optional: ['any'] },
      },
      to: [{ set_variable: { name: variable, value: 1 } }, { set_variable: { name: 'DEBUG simultaneous', value: 1 } }, { key_code: toKeyCode, modifiers: toModifiers }],
      parameters: {
        'basic.simultaneous_threshold_milliseconds': parameters.simultaneous_threshold_milliseconds,
      },
    },
  ]
}

function fourPartTriggerCombo(triggerKey, variable, fromKeyCode, normalTo, terminalTo) {
  return [
    {
      type: 'basic',
      from: { key_code: fromKeyCode, modifiers: { optional: ['any'] } },
      to: normalTo,
      conditions: [
        {
          type: 'frontmost_application_unless',
          bundle_identifiers: karabiner.bundleIdentifiers.terminal,
        },
        { type: 'variable_if', name: variable, value: 1 },
      ],
    },
    {
      type: 'basic',
      from: {
        simultaneous: [{ key_code: triggerKey }, { key_code: fromKeyCode }],
        simultaneous_options: {
          key_down_order: 'strict',
          key_up_order: 'strict_inverse',
          detect_key_down_uninterruptedly: true,
          to_after_key_up: [{ set_variable: { name: variable, value: 0 } }],
        },
        modifiers: { optional: ['any'] },
      },
      to: [{ set_variable: { name: variable, value: 1 } }, { set_variable: { name: 'DEBUG simultaneous', value: 1 } }].concat(normalTo),
      parameters: {
        'basic.simultaneous_threshold_milliseconds': parameters.simultaneous_threshold_milliseconds,
      },
      conditions: [
        {
          type: 'frontmost_application_unless',
          bundle_identifiers: karabiner.bundleIdentifiers.terminal,
        },
      ],
    },

    {
      type: 'basic',
      from: {
        key_code: fromKeyCode,
        modifiers: { optional: ['any'] },
      },
      to: terminalTo,
      conditions: [
        {
          type: 'frontmost_application_if',
          bundle_identifiers: karabiner.bundleIdentifiers.terminal,
        },
        { type: 'variable_if', name: variable, value: 1 },
      ],
    },

    {
      type: 'basic',
      from: {
        simultaneous: [{ key_code: triggerKey }, { key_code: fromKeyCode }],
        simultaneous_options: {
          key_down_order: 'strict',
          key_up_order: 'strict_inverse',
          detect_key_down_uninterruptedly: true,
          to_after_key_up: [{ set_variable: { name: variable, value: 0 } }],
        },
        modifiers: { optional: ['any'] },
      },
      to: [{ set_variable: { name: variable, value: 1 } }].concat(terminalTo),
      parameters: {
        'basic.simultaneous_threshold_milliseconds': parameters.simultaneous_threshold_milliseconds,
      },
      conditions: [
        {
          type: 'frontmost_application_if',
          bundle_identifiers: karabiner.bundleIdentifiers.terminal,
        },
      ],
    },
  ]
}

main()
