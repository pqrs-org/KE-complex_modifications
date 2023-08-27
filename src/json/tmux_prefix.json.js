// JavaScript should be written in ECMAScript 5.1.

const karabiner = require('../lib/karabiner')

function main() {
  console.log(
    JSON.stringify(
      {
        title: 'Tmux Prefix (rev 3)',
        rules: rules(),
      },
      null,
      '  '
    )
  )
}

function rules() {
  const defaultTmuxKeys = [].concat(
    ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
    ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
    ['comma', 'slash', 'period', 'semicolon', 'quote', 'open_bracket', 'close_bracket']
  )

  return [
    {
      description: 'Tmux Prefix Mode [Tab as trigger key]',
      manipulators: [
        {
          type: 'basic',
          from: { key_code: 'tab', modifiers: { optional: ['caps_lock', 'shift'] } },
          to: [{ set_variable: { name: 'tmux_prefix_mode', value: 1 } }],
          to_if_alone: [{ key_code: 'tab' }],
          to_after_key_up: [{ set_variable: { name: 'tmux_prefix_mode', value: 0 } }],
          conditions: [{ type: 'frontmost_application_if', bundle_identifiers: karabiner.bundleIdentifiers.terminal }],
        },
      ],
    },
    {
      description: 'Tmux Prefix Mode [Fn as trigger key]',
      manipulators: [
        {
          type: 'basic',
          from: { key_code: 'fn', modifiers: { optional: ['caps_lock', 'shift'] } },
          to: [{ set_variable: { name: 'tmux_prefix_mode', value: 1 } }],
          to_if_alone: [{ key_code: 'fn' }],
          to_after_key_up: [{ set_variable: { name: 'tmux_prefix_mode', value: 0 } }],
          conditions: [{ type: 'frontmost_application_if', bundle_identifiers: karabiner.bundleIdentifiers.terminal }],
        },
      ],
    },
    {
      description: 'Tmux Prefix Mode [caps_lock as trigger key] (rev 2)',
      manipulators: [
        {
          type: 'basic',
          from: { key_code: 'caps_lock', modifiers: { optional: ['shift'] } },
          to: [{ set_variable: { name: 'tmux_prefix_mode', value: 1 } }],
          to_if_alone: [{ key_code: 'caps_lock', hold_down_milliseconds: 500 }],
          to_after_key_up: [{ set_variable: { name: 'tmux_prefix_mode', value: 0 } }],
          conditions: [{ type: 'frontmost_application_if', bundle_identifiers: karabiner.bundleIdentifiers.terminal }],
        },
      ],
    },
    {
      description: 'Tmux Prefix Mode [escape as trigger key]',
      manipulators: [
        {
          type: 'basic',
          from: { key_code: 'escape', modifiers: { optional: ['caps_lock', 'shift'] } },
          to: [{ set_variable: { name: 'tmux_prefix_mode', value: 1 } }],
          to_if_alone: [{ key_code: 'escape' }],
          to_after_key_up: [{ set_variable: { name: 'tmux_prefix_mode', value: 0 } }],
          conditions: [{ type: 'frontmost_application_if', bundle_identifiers: karabiner.bundleIdentifiers.terminal }],
        },
      ],
    },
    {
      description: 'Tmux Prefix Mode [ ctrl+B as prefix ]',
      manipulators: eachKey({
        fromKeys: defaultTmuxKeys,
        fromModifiers: { optional: ['caps_lock', 'shift'] },
        toPreKeys: [{ key_code: 'b', modifiers: ['left_control'] }],
        toKeys: defaultTmuxKeys,
        conditions: [{ type: 'variable_if', name: 'tmux_prefix_mode', value: 1 }],
      }),
    },
    {
      description: 'Tmux Prefix Mode [ ctrl+A as prefix ]',
      manipulators: eachKey({
        fromKeys: defaultTmuxKeys,
        fromModifiers: { optional: ['caps_lock', 'shift'] },
        toPreKeys: [{ key_code: 'a', modifiers: ['left_control'] }],
        toKeys: defaultTmuxKeys,
        conditions: [{ type: 'variable_if', name: 'tmux_prefix_mode', value: 1 }],
      }),
    },
    {
      description: 'Tmux Prefix Mode [ ctrl+Space as prefix ]',
      manipulators: eachKey({
        fromKeys: defaultTmuxKeys,
        fromModifiers: { optional: ['caps_lock', 'shift'] },
        toPreKeys: [{ key_code: 'spacebar', modifiers: ['left_control'] }],
        toKeys: defaultTmuxKeys,
        conditions: [{ type: 'variable_if', name: 'tmux_prefix_mode', value: 1 }],
      }),
    },
  ]
}

function eachKey(options) {
  const result = []

  for (var i in options.fromKeys) {
    const fromKey = options.fromKeys[i]
    const toKey = options.toKeys[i]

    result.push({
      type: 'basic',
      from: {
        key_code: fromKey,
        modifiers: options.fromModifiers,
      },
      to: options.toPreKeys.concat([
        {
          key_code: toKey,
          modifiers: options.toModifiers,
        },
      ]),
      conditions: options.conditions,
    })
  }

  return result
}

main()
