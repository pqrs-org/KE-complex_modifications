// JavaScript should be written in ECMAScript 5.1.

const karabiner = require('../lib/karabiner')

function main() {
  console.log(
    JSON.stringify(
      {
        title: 'Swiss PC-Style Shortcuts',
        maintainers: ['Birate'],
        rules: [
          rule('Option+[è/ü] -> [', 'open_bracket', '5'),
          rule('Option+[¨] -> ]', 'close_bracket', '6'),
          rule('Option+[2] -> @ ', '2', 'g'),
          rule('Option+[à/ä] -> { ', 'quote', '8'),
          rule('Option+[$] -> }', 'backslash', '9'),
          rule('Option+[<] -> \\  ', 'grave_accent_and_tilde', '7', ['option', 'shift']),
          rule('Option+[] -> ´', 'hyphen', 'equal_sign'),
          rule('Option+[^] -> ~', 'equal_sign', 'n'),
        ],
      },
      null,
      '  '
    )
  )
}

function rule(description, from, to, mod) {
  return {
    description: description,
    manipulators: [swapOptShortcutKeys(from, to, mod !== undefined ? mod : ['option'])],
  }
}

function swapOptShortcutKeys(from, to, mod) {
  return {
    type: 'basic',
    from: fromKeyWithOption(from),
    to: toKeyWithOption(to, mod),
    conditions: [
      {
        type: 'frontmost_application_unless',
        bundle_identifiers: [].concat(
          // --- Comment to prevent line combination by Prettier ---
          karabiner.bundleIdentifiers.remoteDesktop,
          karabiner.bundleIdentifiers.virtualMachine
        ),
      },
    ],
  }
}

function fromKeyWithOption(key) {
  return {
    key_code: key,
    modifiers: { mandatory: ['right_option'], optional: ['left_option'] },
  }
}

function toKeyWithOption(key, mod) {
  return {
    key_code: key,
    modifiers: mod,
  }
}

main()
