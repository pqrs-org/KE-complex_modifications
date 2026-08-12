// JavaScript should be written in ECMAScript 5.1.

/**
 * Readline-like keybindings for TIC-80
 *
 * Karabiner-Elements rule generator that uses Vim-style key notation,
 * such as C-a, M-b, <C-d>, and C-M-h, to define shortcuts.
 *
 * The generated rules add Readline-like editing and navigation
 * shortcuts to the TIC-80 console and editor.
 *
 * Version: 0.1.0
 * Author: Gustavo Mejía (https://github.com/athesto)
 * Issues: https://github.com/Athesto/KE-complex_modifications/issues
 * Created: 2026
 * License: Unlicense (https://unlicense.org/)
 */

//------------------------------------------------------------------------------
//  CONFIGURATION
//------------------------------------------------------------------------------

const bindings = [
  { from: '<C-j>', to: 'return_or_enter' },
  { from: 'C-M-b', to: 'O-S-left_arrow' },
  { from: 'C-M-f', to: 'O-S-right_arrow' },
  { from: 'C-M-h', to: 'M-delete_or_backspace' },
  { from: 'C-h', to: 'delete_or_backspace' },
  { from: 'C-m', to: 'return_or_enter' },
  { from: 'C-n', to: 'down_arrow' },
  { from: 'C-open_bracket', to: 'escape' },
  { from: 'C-p', to: 'up_arrow' },
  { from: 'C-u', to: 'C-k' },
  { from: 'C-w', to: 'M-delete_or_backspace' },
  { from: 'M-b', to: 'M-left_arrow' },
  { from: 'M-d', to: 'M-delete_forward' },
  { from: 'M-f', to: 'M-right_arrow' },

  // the following keybindings override existing standard editor shortcuts
  // if you use vim or emacs keybindings, you may want to comment them out
  // { from: 'C-a', to: 'home' }, // conflicts with select all
  // { from: 'C-b', to: 'left_arrow' }, // conflicts with bookmarks
  // { from: 'C-d', to: 'delete_forward' }, // conflicts with duplicate line
  // { from: 'C-e', to: 'end' }, // already implemented
  // { from: 'C-f', to: 'right_arrow' }, // conflicts with find
  // { from: 'C-l', to: 'C-k' }, // conflicts with cursor centering
]

const appConditions = [
  {
    type: 'frontmost_application_if',

    bundle_identifiers: ['^com\\.nesbox\\.tic$'],

    file_paths: ['^/Applications/tic80\\.app/Contents/MacOS/tic80$'],
  },
]

const metadata = {
  title: 'TIC-80 Readline-like keybindings',

  maintainers: ['Athesto'],

  description: 'Readline-like keybindings for the TIC-80 console and editor',
}

//------------------------------------------------------------------------------
//  FUNCTIONS
//------------------------------------------------------------------------------

function generateKarabinerBindings(bindings, conditions, metadata) {
  const modifierBySymbol = {
    C: 'control',
    M: 'option',
    O: 'option',
    S: 'shift',
    D: 'command',
  }

  function parseShortcut(shortcut) {
    const normalizedShortcut = shortcut.replace(/^</, '').replace(/>$/, '')

    const shortcutTokens = normalizedShortcut.split('-')
    const key = shortcutTokens.pop()

    const modifiers = shortcutTokens.map(function (modifierSymbol) {
      const modifier = modifierBySymbol[modifierSymbol]

      if (!modifier) {
        const errorMessage = 'Unknown modifier "{symbol}" in shortcut "{shortcut}"'
        throw new Error(errorMessage.replace('{symbol}', modifierSymbol).replace('{shortcut}', shortcut))
      }

      return modifier
    })

    return {
      key: key,
      modifiers: modifiers,
    }
  }

  function createManipulator(binding) {
    // Build from event
    const fromShortcut = parseShortcut(binding.from)
    const fromShortcutEvent = {
      key_code: fromShortcut.key,
    }
    if (fromShortcut.modifiers.length > 0) {
      fromShortcutEvent.modifiers = {
        mandatory: fromShortcut.modifiers,
      }
    }

    // Build to event
    const toShortcut = parseShortcut(binding.to)
    const toShortcutEvent = {
      key_code: toShortcut.key,
    }
    if (toShortcut.modifiers.length > 0) {
      toShortcutEvent.modifiers = toShortcut.modifiers
    }

    return {
      type: 'basic',
      from: fromShortcutEvent,
      to: [toShortcutEvent],
      conditions,
    }
  }

  return {
    title: metadata.title,
    maintainers: metadata.maintainers,
    rules: [
      {
        description: metadata.description,
        manipulators: bindings.map(createManipulator),
      },
    ],
  }
}

//------------------------------------------------------------------------------
//  MAIN / ENTRY POINT
//------------------------------------------------------------------------------

function main() {
  const tic80Bindings = generateKarabinerBindings(bindings, appConditions, metadata)

  console.log(JSON.stringify(tic80Bindings, null, 2))
}

main()
