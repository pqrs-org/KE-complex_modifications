// JavaScript should be written in ECMAScript 5.1.

const karabiner = require('../lib/karabiner')

function main() {
  console.log(
    JSON.stringify(
      {
        title: "Sunn Yao's Personal Configurations",
        rules: [
          {
            description: 'Change enter to control if pressed with other keys',
            manipulators: [
              {
                type: 'basic',
                from: { key_code: 'return_or_enter', modifiers: { optional: ['any'] } },
                to: [{ key_code: 'right_control' }],
                to_if_alone: [{ key_code: 'return_or_enter' }],
              },
            ],
          },
          {
            description: 'Change caps_lock to control if pressed with other keys, to escape if pressed alone.',
            manipulators: [
              {
                type: 'basic',
                from: { key_code: 'caps_lock', modifiers: { optional: ['any'] } },
                to: [{ key_code: 'left_control' }],
                to_if_alone: [{ key_code: 'escape' }],
              },
            ],
          },
          {
            description: 'Post escape if left_control is pressed alone.',
            manipulators: [
              {
                type: 'basic',
                from: { key_code: 'left_control', modifiers: { optional: ['any'] } },
                to: [{ key_code: 'left_control' }],
                to_if_alone: [{ key_code: 'escape' }],
              },
            ],
          },
          {
            description: 'Change left_shift to Ctrl-\\ if pressed alone in Emacs',
            manipulators: [
              {
                type: 'basic',
                from: { key_code: 'left_shift' },
                to: [{ key_code: 'left_shift' }],
                to_if_alone: [{ key_code: 'backslash', modifiers: ['left_control'] }],
                conditions: [{ type: 'frontmost_application_if', bundle_identifiers: karabiner.bundleIdentifiers.emacs }],
              },
            ],
          },
          {
            description: 'Change right_shift to Ctrl-\\ if pressed alone in Emacs',
            manipulators: [
              {
                type: 'basic',
                from: { key_code: 'right_shift' },
                to: [{ key_code: 'right_shift' }],
                to_if_alone: [{ key_code: 'backslash', modifiers: ['left_control'] }],
                conditions: [{ type: 'frontmost_application_if', bundle_identifiers: karabiner.bundleIdentifiers.emacs }],
              },
            ],
          },
          {
            description: 'Change right_shift to Ctrl-Alt-Shift-Command-j if pressed alone in Emacs',
            manipulators: [
              {
                type: 'basic',
                from: { key_code: 'right_shift' },
                to: [{ key_code: 'right_shift' }],
                to_if_alone: [{ key_code: 'j', modifiers: ['left_control', 'left_shift', 'left_alt', 'left_gui'] }],
                conditions: [{ type: 'frontmost_application_if', bundle_identifiers: karabiner.bundleIdentifiers.emacs }],
              },
            ],
          },
          {
            description: 'Change left_shift to Ctrl-Shift-z if pressed alone outside Emacs and VitualMachine',
            manipulators: [
              {
                type: 'basic',
                from: { key_code: 'left_shift' },
                to: [{ key_code: 'left_shift' }],
                to_if_alone: [{ key_code: 'z', modifiers: ['left_control', 'left_shift'] }],
                conditions: [{ type: 'frontmost_application_unless', bundle_identifiers: [].concat(karabiner.bundleIdentifiers.emacs, karabiner.bundleIdentifiers.virtualMachine) }],
              },
            ],
          },
          {
            description: 'Change right_shift to Ctrl-Shift-z if pressed alone outside Emacs and VitualMachine',
            manipulators: [
              {
                type: 'basic',
                from: { key_code: 'right_shift' },
                to: [{ key_code: 'right_shift' }],
                to_if_alone: [{ key_code: 'z', modifiers: ['right_control', 'right_shift'] }],
                conditions: [{ type: 'frontmost_application_unless', bundle_identifiers: [].concat(karabiner.bundleIdentifiers.emacs, karabiner.bundleIdentifiers.virtualMachine) }],
              },
            ],
          },
          {
            description: 'Change left_gui to left_alt in Emacs',
            manipulators: [
              {
                type: 'basic',
                from: { key_code: 'left_gui', modifiers: { optional: ['any'] } },
                to: [{ key_code: 'left_alt' }],
                conditions: [{ type: 'frontmost_application_if', bundle_identifiers: karabiner.bundleIdentifiers.emacs }],
              },
            ],
          },
          {
            description: 'Change left_alt to left_gui in Emacs',
            manipulators: [
              {
                type: 'basic',
                from: { key_code: 'left_alt', modifiers: { optional: ['any'] } },
                to: [{ key_code: 'left_gui' }],
                conditions: [{ type: 'frontmost_application_if', bundle_identifiers: karabiner.bundleIdentifiers.emacs }],
              },
            ],
          },
          {
            description: 'Change left_gui-spacebar to left_alt-spacebar in Emacs',
            manipulators: [
              {
                type: 'basic',
                from: { key_code: 'spacebar', modifiers: { mandatory: ['left_gui'] } },
                to: [{ key_code: 'spacebar', modifiers: ['left_alt'] }],
                conditions: [{ type: 'frontmost_application_if', bundle_identifiers: karabiner.bundleIdentifiers.emacs }],
              },
            ],
          },
          {
            description: 'Change left_gui-spacebar to left_control-\\ in Emacs',
            manipulators: [
              {
                type: 'basic',
                from: { key_code: 'spacebar', modifiers: { mandatory: ['left_gui'] } },
                to: [{ key_code: 'backslash', modifiers: ['left_control'] }],
                conditions: [{ type: 'frontmost_application_if', bundle_identifiers: karabiner.bundleIdentifiers.emacs }],
              },
            ],
          },
          {
            description: 'Change left_gui-x to left_alt-x in Emacs',
            manipulators: [
              {
                type: 'basic',
                from: { key_code: 'x', modifiers: { mandatory: ['left_gui'] } },
                to: [{ key_code: 'x', modifiers: ['left_alt'] }],
                conditions: [{ type: 'frontmost_application_if', bundle_identifiers: karabiner.bundleIdentifiers.emacs }],
              },
            ],
          },
          {
            description: 'Change right_gui to left_control-left_alt',
            manipulators: [
              {
                type: 'basic',
                from: { key_code: 'right_gui', modifiers: { optional: ['any'] } },
                to: [{ key_code: 'left_control', modifiers: ['left_alt'] }],
              },
            ],
          },
          {
            description: 'Change right_alt to left_control-left_alt+left_gui',
            manipulators: [
              {
                type: 'basic',
                from: { key_code: 'right_alt', modifiers: { optional: ['any'] } },
                to: [{ key_code: 'left_control', modifiers: ['left_alt', 'left_gui'] }],
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

main()
