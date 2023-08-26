// JavaScript should be written in ECMAScript 5.1.

const karabiner = require('../lib/karabiner')

function main() {
  console.log(
    JSON.stringify(
      {
        title: 'Vi Mode (rev 5)',
        rules: [
          {
            description: 'Vi Mode [S as Trigger Key]',
            manipulators: generateViMode('s'),
            // If you want to use other trigger keys for vi mode, just change this above line and run
            //
            // $ make
            //
            // in Terminal to generate your new JSON file at public/json/vi_mode.json.
            //
            // Copy it to ~/.config/karabiner/assets/complex_modifications then you can enable it in Karabiner-Elements.
            //
            // Modifier keys such as "command", "option" or "control" cannot be used here.
          },
          {
            description: 'Vi Mode [D as Trigger Key]',
            manipulators: generateViMode('d'),
          },
          {
            description: 'Vi Visual Mode',
            manipulators: generateViVisualMode('v'),
          },
        ],
      },
      null,
      '  '
    )
  )
}

function generateViMode(triggerKey) {
  return [].concat(
    generateViModeSingleRule('j', 'down_arrow', [], triggerKey),
    generateViModeSingleRule('k', 'up_arrow', [], triggerKey),
    generateViModeSingleRule('h', 'left_arrow', [], triggerKey),
    generateViModeSingleRule('l', 'right_arrow', [], triggerKey),
    generateViModeSingleRule('f', 'fn', [], triggerKey),
    generateViModeSingleRule('b', 'left_arrow', ['left_option'], triggerKey),
    generateViModeSingleRule('w', 'right_arrow', ['left_option'], triggerKey),
    generateViModeSingleRule('0', 'a', ['left_control'], triggerKey),
    generateViModeSingleRule('4', 'e', ['left_control'], triggerKey)
  )
}

function generateViVisualMode(triggerKey) {
  return [].concat(
    generateViVisualModeSingleRule('j', 'down_arrow', ['left_shift'], triggerKey),
    generateViVisualModeSingleRule('k', 'up_arrow', ['left_shift'], triggerKey),
    generateViVisualModeSingleRule('h', 'left_arrow', ['left_shift'], triggerKey),
    generateViVisualModeSingleRule('l', 'right_arrow', ['left_shift'], triggerKey),
    generateViVisualModeSingleRule('b', 'left_arrow', ['left_shift', 'left_option'], triggerKey),
    generateViVisualModeSingleRule('w', 'right_arrow', ['left_shift', 'left_option'], triggerKey),
    generateViVisualModeSingleRule('0', 'left_arrow', ['left_shift', 'left_command'], triggerKey),
    generateViVisualModeSingleRule('4', 'right_arrow', ['left_shift', 'left_command'], triggerKey),
    generateViVisualModeSingleRule('open_bracket', 'up_arrow', ['left_shift', 'left_option'], triggerKey),
    generateViVisualModeSingleRule('close_bracket', 'down_arrow', ['left_shift', 'left_option'], triggerKey)
  )
}

function generateViModeSingleRule(fromKeyCode, toKeyCode, toModifiers, triggerKey) {
  return [
    {
      type: 'basic',
      from: { key_code: fromKeyCode, modifiers: { optional: ['any'] } },
      to: [{ key_code: toKeyCode, modifiers: toModifiers }],
      conditions: [{ type: 'variable_if', name: 'vi_mode', value: 1 }],
    },

    {
      type: 'basic',
      from: {
        simultaneous: [{ key_code: triggerKey }, { key_code: fromKeyCode }],
        simultaneous_options: {
          key_down_order: 'strict',
          key_up_order: 'strict_inverse',
          detect_key_down_uninterruptedly: true,
          to_after_key_up: [{ set_variable: { name: 'vi_mode', value: 0 } }],
        },
        modifiers: { optional: ['any'] },
      },
      to: [
        {
          set_variable: { name: 'vi_mode', value: 1 },
        },
        {
          key_code: toKeyCode,
          modifiers: toModifiers,
        },
      ],
    },
  ]
}

function generateViVisualModeSingleRule(fromKeyCode, toKeyCode, toModifiers, triggerKey) {
  return [
    {
      type: 'basic',
      from: { key_code: fromKeyCode, modifiers: { optional: ['any'] } },
      to: [{ key_code: toKeyCode, modifiers: toModifiers }],
      conditions: [{ type: 'variable_if', name: 'vi_visual_mode', value: 1 }],
    },

    {
      type: 'basic',
      from: {
        simultaneous: [{ key_code: triggerKey }, { key_code: fromKeyCode }],
        simultaneous_options: {
          key_down_order: 'strict',
          key_up_order: 'strict_inverse',
          detect_key_down_uninterruptedly: true,
          to_after_key_up: [{ set_variable: { name: 'vi_visual_mode', value: 0 } }],
        },
        modifiers: { optional: ['any'] },
      },
      to: [
        {
          set_variable: { name: 'vi_visual_mode', value: 1 },
        },
        {
          key_code: toKeyCode,
          modifiers: toModifiers,
        },
      ],
      conditions: [
        {
          type: 'frontmost_application_unless',
          bundle_identifiers: [].concat(karabiner.bundleIdentifiers.terminal, karabiner.bundleIdentifiers.vi),
        },
      ],
    },
  ]
}

main()
