// JavaScript should be written in ECMAScript 5.1.

const karabiner = require('../lib/karabiner')

function main() {
  console.log(
    JSON.stringify(
      {
        title: 'Universal Emacs Keybindings',
        maintainers: ['justintanner'],

        rules: [
          {
            description: 'Emacs Emulation in all apps without emacs keybindings (v1)',
            manipulators: manipulators(),
          },
        ],
      },
      null,
      '  '
    )
  )
}

function manipulators() {
  const unlessEmacs = {
    type: 'frontmost_application_unless',
    bundle_identifiers: [].concat(karabiner.bundleIdentifiers.emacsKeyBindingsException, karabiner.bundleIdentifiers.jetbrainsIDE),
  }

  return [].concat(
    // --- Comment to prevent line combination by Prettier ---
    cx(unlessEmacs),
    controlKeys(unlessEmacs),
    optionKeys(unlessEmacs)
  )
}

function cx(unlessEmacs) {
  const ifBrowser = {
    type: 'frontmost_application_if',
    bundle_identifiers: karabiner.bundleIdentifiers.browser,
  }
  const unlessBrowser = {
    type: 'frontmost_application_unless',
    bundle_identifiers: karabiner.bundleIdentifiers.browser,
  }

  return [
    // Bind switch buffer to Command+B, then in browsers like chrome you can install a task switcher QuickTabs:
    // https://chrome.google.com/extensions/detail/jnjfeinjfmenlddahdjdmgpbokiacbbb
    // Then, you need to configure Command+B to activate QuickTabs in chrome://extensions/shortcuts

    {
      type: 'basic',
      from: { key_code: 'b', modifiers: { mandatory: ['control'], optional: ['caps_lock'] } },
      to: [{ key_code: 'b', modifiers: ['command'] }],
      conditions: [{ type: 'variable_if', name: 'C-x', value: 1 }],
    },
    // Launch the dev console in most browsers with C-x/C-d
    {
      type: 'basic',
      from: { key_code: 'd', modifiers: { mandatory: ['control'], optional: ['caps_lock'] } },
      to: [{ key_code: 'j', modifiers: ['command', 'option'] }],
      conditions: [{ type: 'variable_if', name: 'C-x', value: 1 }, ifBrowser],
    },
    {
      type: 'basic',
      from: { key_code: 'c', modifiers: { mandatory: ['control'], optional: ['caps_lock'] } },
      to: [{ key_code: 'q', modifiers: ['command'] }],
      conditions: [{ type: 'variable_if', name: 'C-x', value: 1 }],
    },
    // No point in opening files in browsers, better to focus the location bar.
    {
      type: 'basic',
      from: { key_code: 'f', modifiers: { mandatory: ['control'], optional: ['caps_lock'] } },
      to: [{ key_code: 'l', modifiers: ['command'] }],
      conditions: [{ type: 'variable_if', name: 'C-x', value: 1 }, ifBrowser],
    },
    {
      type: 'basic',
      from: { key_code: 'f', modifiers: { mandatory: ['control'], optional: ['caps_lock'] } },
      to: [{ key_code: 'o', modifiers: ['command'] }],
      conditions: [{ type: 'variable_if', name: 'C-x', value: 1 }, unlessBrowser],
    },
    {
      type: 'basic',
      from: { key_code: 'h', modifiers: { mandatory: ['control'], optional: ['caps_lock'] } },
      to: [{ key_code: 'a', modifiers: ['command'] }],
      conditions: [{ type: 'variable_if', name: 'C-x', value: 1 }],
    },
    {
      type: 'basic',
      from: { key_code: 'k', modifiers: { mandatory: ['control'], optional: ['caps_lock'] } },
      to: [{ key_code: 'w', modifiers: ['command'] }],
      conditions: [{ type: 'variable_if', name: 'C-x', value: 1 }],
    },
    {
      type: 'basic',
      from: { key_code: 'r', modifiers: { mandatory: ['control'], optional: ['caps_lock'] } },
      to: [{ key_code: 'r', modifiers: ['command'] }],
      conditions: [{ type: 'variable_if', name: 'C-x', value: 1 }, ifBrowser],
    },
    {
      type: 'basic',
      from: { key_code: 's', modifiers: { mandatory: ['control'], optional: ['caps_lock'] } },
      to: [{ key_code: 's', modifiers: ['command'] }],
      conditions: [{ type: 'variable_if', name: 'C-x', value: 1 }],
    },
    {
      type: 'basic',
      from: { key_code: 'u', modifiers: { mandatory: ['control'], optional: ['caps_lock'] } },
      to: [{ key_code: 'z', modifiers: ['command'] }],
      conditions: [{ type: 'variable_if', name: 'C-x', value: 1 }],
    },
    // Ignore other keys after C-x
    {
      type: 'basic',
      from: { any: 'key_code', modifiers: { optional: ['any'] } },
      conditions: [{ type: 'variable_if', name: 'C-x', value: 1 }],
    },

    // C-x
    {
      type: 'basic',
      from: { key_code: 'x', modifiers: { mandatory: ['control'], optional: ['caps_lock'] } },
      to: [{ set_variable: { name: 'C-x', value: 1 } }],
      to_delayed_action: {
        to_if_invoked: [{ set_variable: { name: 'C-x', value: 0 } }],
        to_if_canceled: [{ set_variable: { name: 'C-x', value: 0 } }],
      },
      conditions: [unlessEmacs],
    },
  ]
}

function controlKeys(unlessEmacs) {
  const ifTerminal = {
    type: 'frontmost_application_if',
    bundle_identifiers: karabiner.bundleIdentifiers.terminal,
  }

  return [
    {
      type: 'basic',
      from: { key_code: 'a', modifiers: { mandatory: ['control'], optional: ['caps_lock', 'shift'] } },
      to: [
        {
          key_code: 'a',
          modifiers: ['control'],
        },
        {
          set_variable: { name: 'C-spacebar', value: 0 },
        },
      ],
      conditions: [{ type: 'variable_unless', name: 'C-spacebar', value: 1 }, unlessEmacs],
    },
    {
      type: 'basic',
      from: { key_code: 'a', modifiers: { mandatory: ['control'], optional: ['caps_lock', 'shift'] } },
      to: [{ key_code: 'a', modifiers: ['shift', 'control'] }],
      conditions: [{ type: 'variable_if', name: 'C-spacebar', value: 1 }, unlessEmacs],
    },
    {
      type: 'basic',
      from: { key_code: 'b', modifiers: { mandatory: ['control'], optional: ['caps_lock', 'shift'] } },
      to: [{ key_code: 'b', modifiers: ['control'] }],
      conditions: [{ type: 'variable_unless', name: 'C-spacebar', value: 1 }, unlessEmacs],
    },
    {
      type: 'basic',
      from: { key_code: 'b', modifiers: { mandatory: ['control'], optional: ['caps_lock', 'shift'] } },
      to: [{ key_code: 'b', modifiers: ['shift', 'control'] }],
      conditions: [{ type: 'variable_if', name: 'C-spacebar', value: 1 }, unlessEmacs],
    },
    {
      type: 'basic',
      from: { key_code: 'd', modifiers: { mandatory: ['control'], optional: ['caps_lock'] } },
      to: [{ key_code: 'delete_forward' }],
      conditions: [unlessEmacs],
    },
    {
      type: 'basic',
      from: { key_code: 'e', modifiers: { mandatory: ['control'], optional: ['caps_lock', 'shift'] } },
      to: [
        {
          key_code: 'e',
          modifiers: ['control'],
        },
        {
          set_variable: { name: 'C-spacebar', value: 0 },
        },
      ],
      conditions: [{ type: 'variable_unless', name: 'C-spacebar', value: 1 }, unlessEmacs],
    },
    {
      type: 'basic',
      from: { key_code: 'e', modifiers: { mandatory: ['control'], optional: ['caps_lock', 'shift'] } },
      to: [{ key_code: 'e', modifiers: ['shift', 'control'] }],
      conditions: [{ type: 'variable_if', name: 'C-spacebar', value: 1 }, unlessEmacs],
    },
    {
      type: 'basic',
      from: { key_code: 'f', modifiers: { mandatory: ['control'], optional: ['caps_lock', 'shift'] } },

      to: [{ key_code: 'f', modifiers: ['control'] }],
      conditions: [{ type: 'variable_unless', name: 'C-spacebar', value: 1 }, unlessEmacs],
    },
    {
      type: 'basic',
      from: { key_code: 'f', modifiers: { mandatory: ['control'], optional: ['caps_lock', 'shift'] } },
      to: [{ key_code: 'f', modifiers: ['shift', 'control'] }],
      conditions: [{ type: 'variable_if', name: 'C-spacebar', value: 1 }, unlessEmacs],
    },
    {
      type: 'basic',
      from: { key_code: 'g', modifiers: { mandatory: ['control'], optional: ['caps_lock', 'shift'] } },
      to: [
        {
          set_variable: { name: 'C-spacebar', value: 0 },
        },
        {
          key_code: 'escape',
        },
      ],
      conditions: [unlessEmacs],
    },
    {
      type: 'basic',
      from: { key_code: 'h', modifiers: { mandatory: ['control'], optional: ['caps_lock'] } },
      to: [{ key_code: 'delete_or_backspace' }],
      conditions: [unlessEmacs],
    },
    {
      type: 'basic',
      from: { key_code: 'n', modifiers: { mandatory: ['control'], optional: ['caps_lock', 'shift'] } },
      to: [{ key_code: 'n', modifiers: ['control'] }],
      conditions: [{ type: 'variable_unless', name: 'C-spacebar', value: 1 }, unlessEmacs],
    },
    {
      type: 'basic',
      from: { key_code: 'n', modifiers: { mandatory: ['control'], optional: ['caps_lock', 'shift'] } },
      to: [{ key_code: 'n', modifiers: ['shift', 'control'] }],
      conditions: [{ type: 'variable_if', name: 'C-spacebar', value: 1 }, unlessEmacs],
    },
    {
      type: 'basic',
      from: { key_code: 'p', modifiers: { mandatory: ['control'], optional: ['caps_lock', 'shift'] } },
      to: [{ key_code: 'p', modifiers: ['control'] }],
      conditions: [{ type: 'variable_unless', name: 'C-spacebar', value: 1 }, unlessEmacs],
    },
    {
      type: 'basic',
      from: { key_code: 'p', modifiers: { mandatory: ['control'], optional: ['caps_lock', 'shift'] } },
      to: [{ key_code: 'p', modifiers: ['shift', 'control'] }],
      conditions: [{ type: 'variable_if', name: 'C-spacebar', value: 1 }, unlessEmacs],
    },
    {
      type: 'basic',
      from: { key_code: 'r', modifiers: { mandatory: ['control'], optional: ['caps_lock'] } },
      to: [{ key_code: 'f', modifiers: 'command' }],
      conditions: [unlessEmacs],
    },
    {
      type: 'basic',
      from: { key_code: 's', modifiers: { mandatory: ['control'], optional: ['caps_lock'] } },
      to: [{ key_code: 'f', modifiers: 'command' }],
      conditions: [unlessEmacs],
    },
    {
      type: 'basic',
      from: { key_code: 'v', modifiers: { mandatory: ['control'], optional: ['caps_lock', 'shift'] } },
      to: [
        {
          key_code: 'page_down',
        },
        {
          set_variable: { name: 'C-spacebar', value: 0 },
        },
      ],
      conditions: [{ type: 'variable_unless', name: 'C-spacebar', value: 1 }, unlessEmacs],
    },
    {
      type: 'basic',
      from: { key_code: 'v', modifiers: { mandatory: ['control'], optional: ['caps_lock', 'shift'] } },
      to: [{ key_code: 'page_down', modifiers: 'shift' }],
      conditions: [{ type: 'variable_if', name: 'C-spacebar', value: 1 }, unlessEmacs],
    },
    {
      type: 'basic',
      from: { key_code: 'w', modifiers: { mandatory: ['control'], optional: ['caps_lock', 'shift'] } },
      to: [
        {
          key_code: 'x',
          modifiers: ['command'],
        },
        {
          set_variable: { name: 'C-spacebar', value: 0 },
        },
      ],
      conditions: [{ type: 'variable_if', name: 'C-spacebar', value: 1 }, unlessEmacs],
    },
    {
      type: 'basic',
      from: {
        key_code: 'y',
        modifiers: { mandatory: ['control'], optional: ['caps_lock'] },
      },
      to: [{ key_code: 'v', modifiers: 'command' }],
      conditions: [unlessEmacs],
    },
    {
      type: 'basic',
      from: {
        key_code: 'y',
        modifiers: { mandatory: ['control'], optional: ['caps_lock'] },
      },
      to: [
        { key_code: 'v', modifiers: 'command' },
        { key_code: 'y', modifiers: 'command' }, // Terminal pass-through
      ],
      conditions: [ifTerminal],
    },
    {
      type: 'basic',
      from: {
        key_code: 'slash',
        modifiers: { mandatory: ['control'], optional: ['caps_lock'] },
      },
      to: [{ key_code: 'z', modifiers: 'command' }],
      conditions: [unlessEmacs],
    },
    {
      type: 'basic',
      from: {
        key_code: 'spacebar',
        modifiers: { mandatory: ['control'], optional: ['caps_lock', 'shift'] },
      },
      to: [{ set_variable: { name: 'C-spacebar', value: 1 } }],
      conditions: [{ type: 'variable_unless', name: 'C-spacebar', value: 1 }, unlessEmacs],
    },
    {
      type: 'basic',
      from: {
        key_code: 'spacebar',
        modifiers: { mandatory: ['control'], optional: ['caps_lock', 'shift'] },
      },
      to: [{ set_variable: { name: 'C-spacebar', value: 0 } }],
      conditions: [{ type: 'variable_if', name: 'C-spacebar', value: 1 }, unlessEmacs],
    },
  ]
}

function optionKeys(unlessEmacs) {
  const ifJetbrains = {
    type: 'frontmost_application_if',
    bundle_identifiers: karabiner.bundleIdentifiers.jetbrainsIDE,
  }
  const unlessJetbrains = {
    type: 'frontmost_application_unless',
    bundle_identifiers: karabiner.bundleIdentifiers.jetbrainsIDE,
  }
  const ifBrowser = {
    type: 'frontmost_application_if',
    bundle_identifiers: karabiner.bundleIdentifiers.browser,
  }
  const unlessBrowser = {
    type: 'frontmost_application_unless',
    bundle_identifiers: karabiner.bundleIdentifiers.browser,
  }

  return [
    {
      type: 'basic',
      from: { key_code: 'f', modifiers: { mandatory: ['option'], optional: ['shift'] } },
      to: [{ key_code: 'right_arrow', modifiers: ['option'] }],
      conditions: [unlessEmacs],
    },
    {
      type: 'basic',
      from: { key_code: 'n', modifiers: { mandatory: ['option'], optional: ['any'] } },
      to: [{ key_code: 'n', modifiers: ['command'] }],
      conditions: [unlessEmacs, unlessJetbrains, unlessBrowser],
    },
    {
      type: 'basic',
      from: { key_code: 'n', modifiers: { mandatory: ['option'], optional: ['any'] } },
      to: [{ key_code: 'n', modifiers: ['command'] }],
      conditions: [ifJetbrains],
    },
    {
      type: 'basic',
      from: { key_code: 'n', modifiers: { mandatory: ['option'], optional: ['any'] } },
      to: [{ key_code: 't', modifiers: ['command'] }],
      conditions: [ifBrowser],
    },
    {
      type: 'basic',
      from: { key_code: 't', modifiers: { mandatory: ['option'], optional: ['any'] } },
      to: [{ key_code: 't', modifiers: ['command'] }],
      conditions: [ifBrowser],
    },
    {
      type: 'basic',
      from: { key_code: 'v', modifiers: { mandatory: ['option'], optional: ['shift'] } },
      to: [{ key_code: 'page_up' }],
      conditions: [unlessEmacs],
    },
    {
      type: 'basic',
      from: { key_code: 'w', modifiers: { mandatory: ['option'], optional: ['any'] } },
      to: [
        {
          key_code: 'c',
          modifiers: ['command'],
        },
        {
          set_variable: { name: 'C-spacebar', value: 0 },
        },
      ],
      conditions: [unlessEmacs],
    },
    {
      type: 'basic',
      from: { key_code: 'y', modifiers: { mandatory: ['option'], optional: ['any'] } },
      to: [{ key_code: 'v', modifiers: ['command'] }],
      conditions: [unlessEmacs],
    },
    {
      type: 'basic',
      from: { key_code: 'delete_or_backspace', modifiers: { mandatory: ['option'], optional: ['any'] } },
      to: [{ key_code: 'z', modifiers: ['command'] }],
      conditions: [unlessEmacs],
    },
  ]
}

main()
