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

const LAYER_ARROWS = 'LayerArrows';
const LAYER_SYMBOLS_LEFT = 'LayerSymbolsLeft';
const LAYER_SYMBOLS_RIGHT = 'LayerSymbolsRight';
const LAYER_NUMBERS_LEFT = 'LayerNumbersLeft';
const LAYER_NUMBERS_RIGHT = 'LayerNumbersRight';

// The simple key mappings, "lifting" the hands up one row.
// Each a pair of key codes: `[from, to]`. If `to` is null, the key is disabled.
const simpleKeyMappings = [
  // Main keyboard rows
  ['1','q'],['2','w'],['3','e'],['4','r'],['5','t'], ['6',null],['7',null], ['8','y'],['9','u'],['0','i'],['-','o'],['=','p'],
  ['q','a'],['w','s'],['e','d'],['r','f'],['t','g'], ['y',null],['u',null], ['i','h'],['o','j'],['p','k'],['[','l'],[']',';'],
  ['a','z'],['s','x'],['d','c'],['f','v'],['g','b'], ['h',null],['j',null], ['k','n'],['l','m'],[';',','],["'",'.'],

  // Thumb row
  ['z', null], ['x', 'left_option'], ['c', 'left_control'], ['v', 'left_shift'], ['b', 'left_command'],
  ['n', null], ['m', 'return'], [',', 'spacebar'], ['.', null], ['/', null],
].map(function (m) {
  return [keyCodeAlias(m[0]), keyCodeAlias(m[1])];
});

// Make helpful maps of the simple key mappings.
const simpleKeyMapFromTo = {};
const simpleKeyMapToFrom = {};
simpleKeyMappings.forEach(function (m) {
  simpleKeyMapFromTo[m[0]] = m[1];
  if (m[1] != null) {
    simpleKeyMapToFrom[m[1]] = m[0];
  }
});

function keyCodeAlias(keyCode) {
  // Some alias helpers for Karabiner key codes for easier mapping below.
  const aliases = {
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
  return aliases[keyCode] || keyCode || 'vk_none';
}

function keyCodeAliasMapped(keyCode) {
  const code = keyCodeAlias(keyCode);
  return simpleKeyMapToFrom[code] || code;
}

function flattenOneLayer(arr) {
  return arr.reduce(function(acc, val) {
    return acc.concat(val);
  }, []);
}

function rules() {
  const simpleKeyRules = simpleKeyMappings.map(function (m) {
    return {
      type: 'basic',
      from: {
        key_code: keyCodeAlias(m[0]),
        modifiers: { optional: 'any' },
      },
      to: [{ key_code: keyCodeAlias(m[1]) }],
    };
  });

  // Key mappings for shift-keys.
  const shiftKeyMappings = [
    [',', ["shift"], '1', ["shift"]],
    ['.', ["shift"], '/', ["shift"]],
  ].map(function (m) {
    return [
      keyCodeAlias(m[0]),
      m[1],
      keyCodeAlias(m[2]),
      m[3],
    ];
  });
  const shiftKeyRules = shiftKeyMappings.map(function (m) {
    return {
      type: 'basic',
      from: {
        key_code: simpleKeyMapToFrom[m[0]] || m[0],
        modifiers: { mandatory: m[1], optional: ["any"] }
      },
      to: [{ key_code: m[2], modifiers: m[3] }],
    };
  });

  const layerRules = [
    ['`', LAYER_ARROWS, 'tab'],
    ['tab', LAYER_SYMBOLS_LEFT, 'escape'],
    ['caps_lock', LAYER_NUMBERS_LEFT, null],
    ['\\', LAYER_SYMBOLS_RIGHT, "'"],
    ['return', LAYER_NUMBERS_RIGHT, null]
  ].map(function (r) {
    return {
      type: 'basic',
      from: { key_code: keyCodeAlias(r[0]), modifiers: { optional: ['any'] } },
      to: [{ set_variable: { name: r[1], value: true, key_up_value: false } }],
      to_if_alone: r[2] ? [{ key_code: keyCodeAlias(r[2]) }] : undefined,
    };
  });

  // TODO: FIgure this out!
  const symbolLayerRules = flattenOneLayer([
    [ "q", [], '`', null],
    [ "w", [], "2", ["shift"]],
    [ "e", [], "3", ["shift"]],
    [ "r", [], "4", ["shift"]],
    [ "t", [], "5", ["shift"]],
    [ "y", [], "6", ["shift"]],
    [ "u", ["shift"], "comma", ["shift"]],
    [ "u", [], "open_bracket", null],
    [ "i", ["shift"], "period", ["shift"]],
    [ "i", [], "close_bracket", null],
    [ "o", ["shift"], "hyphen", ["left_alt", "shift"]],
    [ "o", [], "grave_accent_and_tilde", ["shift"]],
    [ "p", [], "backslash", null],
    [ "a", [], "backslash", ["shift"]],
    [ "s", [], "equal_sign", null],
    [ "d", [], "7", ["shift"]],
    [ "f", [], "8", ["shift"]],
    [ "g", [], "hyphen", ["shift"]],
    [ "h", [], "equal_sign", ["shift"]],
    [ "j", ["shift"], "open_bracket", ["shift"]],
    [ "j", [], "9", ["shift"]],
    [ "k", ["shift"], "close_bracket", ["shift"]],
    [ "k", [], "0", ["shift"]],
    [ "l", ["shift"], "hyphen", ["left_alt"]],
    [ "l", [], "hyphen", null],
    [ ";", [], "slash", null],
    [ "z", [], "display_brightness_decrement", null],
    [ "x", [], "display_brightness_increment", null],
    [ "c", [], "apple_display_brightness_decrement", null],
    [ "v", [], "apple_display_brightness_increment", null],
    [ "m", [], "mute", null],
    [ ",", [], "volume_decrement", null],
    [ ".", [], "volume_increment", null],
  ].map(function (r) {
    return [{
      type: 'basic',
      from: {
        key_code: keyCodeAliasMapped(r[0]),
        modifiers: { optional: ['any'], mandatory: r[1] || undefined },
      },
      to: [{ key_code: keyCodeAlias(r[2]), modifiers: r[3] || undefined }],
      conditions: [{ type: "variable_if", name: LAYER_SYMBOLS_LEFT, value: true } ]
    }, {
      type: 'basic',
      from: {
        key_code: keyCodeAliasMapped(r[0]),
        modifiers: { optional: ['any'], mandatory: r[1] || undefined },
      },
      to: [{ key_code: keyCodeAlias(r[2]), modifiers: r[3] || undefined }],
      conditions: [{ type: "variable_if", name: LAYER_SYMBOLS_RIGHT, value: true } ]
    },
    ];
  }));

  return [{
      description: 'LOFT Keyboard layout',
      manipulators: [].concat(
        layerRules,
        symbolLayerRules,
        shiftKeyRules,
        simpleKeyRules
      ),
  }];
}

main();
