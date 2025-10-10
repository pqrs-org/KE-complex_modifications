// JavaScript should be written in ECMAScript 5.1.

const karabiner = require('../lib/karabiner')

function main() {
  console.log(
    JSON.stringify(
      {
        title: 'LOFT Keyboard',
        maintainers: ['loftkeyboard'],
        rules: rules(),
      },
      null,
      '  '
    )
  );
}

function rules() {
  // Some alias helpers for Karabiner key codes for easier mapping below.
  const keyCodeAliases = {
    '`': 'grave_accent_and_tilde',
    '-': 'hyphen',
    '=': 'equal_sign',
    '[': 'open_bracket',
    ']': 'close_bracket',
    ';': 'semicolon',
    "'": 'quote',
    ',': 'comma',
    '.': 'period',
    '/': 'slash',
    '\\': 'backslash',
    'return': 'return_or_enter',
    'esc': 'escape',
    'del': 'delete_or_backspace',
  };

  // The basic key mappings, "lifting" the hands up one row.
  // Each a pair of key codes: `[from, to]`. If `to` is null, the key is disabled.
  const basicKeyMappings = [
    // Left hand col
    ['`', 'tab'],
    ['tab', 'esc'],

    // Right hand col
    ['del', 'del'],
    // backslash / quote
    ['return', 'caps_lock'],

    ['1','q'],['2','w'],['3','e'],['4','r'],['5','t'],['6',null],['7',null],['8','y'],['9','u'],['0','i'],['-','o'],['=','p'],
    ['q','a'],['w','s'],['e','d'],['r','f'],['t','g'],['y',null],['u',null],['i','h'],['o','j'],['p','k'],['[','l'],[']',';'],
    ['a','z'],['s','x'],['d','c'],['f','v'],['g','b'],['h',null],['j',null],['k','n'],['l','m'],[';',','],["'",'.'],
    ['z',null],['x','left_option'],['c','left_control'],['v','left_shift'],['b','left_command'],['n',null],['m','return'],[',','spacebar'],['.',null],['/',null],
  ].map(function (m) {
    return {
      type: 'basic',
      from: {
        key_code: keyCodeAliases[m[0]] || m[0],
        // modifiers: options.fromModifiers,
      },
      to: [
        {
          key_code: keyCodeAliases[m[1]] || m[1] || 'vk_none',
          // modifiers: options.toModifiers,
        },
      ],
    };
  });

  return [{
      description: 'LOFT Keyboard layout',
      manipulators: [].concat(basicKeyMappings),
  }];
}

main();
