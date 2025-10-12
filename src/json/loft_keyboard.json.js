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

// Layer Variable Names.
// These will be toggled true/false when one of the "layer keys" is pressed/released.
const LAYER_ARROWS = 'LayerArrows';
const LAYER_SYMBOLS_LEFT = 'LayerSymbolsLeft';
const LAYER_SYMBOLS_RIGHT = 'LayerSymbolsRight';
const LAYER_NUMBERS_LEFT = 'LayerNumbersLeft';
const LAYER_NUMBERS_RIGHT = 'LayerNumbersRight';

// Key code alias helpers for easier mapping in this file.
function keyCodeAlias(keyCode) {
  return {
    ' ': 'spacebar',
    'return': 'return_or_enter',
    'esc': 'escape',
    'del': 'delete_or_backspace',
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
  }[keyCode] || keyCode || 'vk_none';
}

// The simple key mappings, "lifting" the hands up one row.
// Each a pair of key codes: `[from, to]`. If `to` is null, the key is disabled.
//
// Context and rational for this:
//    These are handled specially to emulate typical Karabiner "simple mappings," which aren't
//    available here; this file can only generate "complex modifiers." The difference is that if "a"
//    is mapped to "z" with a simple mapping, then complex modifiers for "z" would apply to the
//    physical "a" key, as you'd expect. But mapping these via complex modifiers means, complex
//    modifiers for "z" will apply to the physical "z" switch, so we need to remap the complex
//    modifiers manually to match these.
const simpleKeyMappings = [
  // Main keyboard rows
  ['1','q'],['2','w'],['3','e'],['4','r'],['5','t'], ['6',null],['7',null], ['8','y'],['9','u'],['0','i'],['-','o'],['=','p'],
  ['q','a'],['w','s'],['e','d'],['r','f'],['t','g'], ['y',null],['u',null], ['i','h'],['o','j'],['p','k'],['[','l'],[']',';'],
  ['a','z'],['s','x'],['d','c'],['f','v'],['g','b'], ['h',null],['j',null], ['k','n'],['l','m'],[';',','],["'",'.'],

  // Thumb row
  ['z', null], ['x', 'left_option'], ['c', 'left_control'], ['v', 'left_shift'], ['b', 'left_command'],
  ['n', null], ['m', 'return'], [',', ' '], ['.', null], ['/', null],
].map(function (m) {
  return [keyCodeAlias(m[0]), keyCodeAlias(m[1])];
});

// Helpful maps of the simple key mappings.
const simpleKeyMapFromToTo = {};
const simpleKeyMapToToFrom = {};
simpleKeyMappings.forEach(function (m) {
  simpleKeyMapFromToTo[m[0]] = m[1];
  if (m[1] != null) {
    simpleKeyMapToToFrom[m[1]] = m[0];
  }
});

// Given the intended key, maps it to the original key code before the "simple mapping" was applied.
function keyCodeAliasMapped(keyCode) {
  const code = keyCodeAlias(keyCode);
  return simpleKeyMapToToFrom[code] || code;
}

// Flattens one layer of nested arrays. Turning [1, [2, 3], 4, [5]] into [1, 2, 3, 4, 5].
function flattenOneLayer(arr) {
  return arr.reduce(function(acc, val) {
    return acc.concat(val);
  }, []);
}

// Generate the complex modifier rules for the layout.
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
        key_code: simpleKeyMapToToFrom[m[0]] || m[0],
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

  const numberLayerRules = flattenOneLayer([
    [ " ", [], '0', null],
    [ "m", [], "1", null],
    [ ",", [], "2", null],
    [ ".", [], "3", null],
    [ "j", [], "4", null],
    [ "k", [], "5", null],
    [ "l", [], "6", null],
    [ "u", [], "7", null],
    [ "i", [], "8", null],
    [ "o", [], "9", null],
  ].map(function (r) {
    return [{
      type: 'basic',
      from: {
        key_code: keyCodeAliasMapped(r[0]),
        modifiers: { optional: ['any'], mandatory: r[1] || undefined },
      },
      to: [{ key_code: keyCodeAlias(r[2]), modifiers: r[3] || undefined }],
      conditions: [{ type: "variable_if", name: LAYER_NUMBERS_LEFT, value: true } ]
    }, {
      type: 'basic',
      from: {
        key_code: keyCodeAliasMapped(r[0]),
        modifiers: { optional: ['any'], mandatory: r[1] || undefined },
      },
      to: [{ key_code: keyCodeAlias(r[2]), modifiers: r[3] || undefined }],
      conditions: [{ type: "variable_if", name: LAYER_NUMBERS_RIGHT, value: true } ]
    },
    ];
  }));

  const arrowLayerRules = flattenOneLayer([
    [ "h", [], 'left_arrow', null],
    [ "j", [], "down_arrow", null],
    [ "k", [], "up_arrow", null],
    [ "l", [], "right_arrow", null],
    [ "y", [], "home", null],
    [ "u", [], "page_down", null],
    [ "i", [], "page_up", null],
    [ "o", [], "end", null],
    [ "delete_or_backspace", [], "delete_forward", null],
    [ "m", [], "play_or_pause", null],
    [ ",", [], "rewind", null],
    [ ".", [], "fastforward", null],
  ].map(function (r) {
    return [{
      type: 'basic',
      from: {
        key_code: keyCodeAliasMapped(r[0]),
        modifiers: { optional: ['any'], mandatory: r[1] || undefined },
      },
      to: [{ key_code: keyCodeAlias(r[2]), modifiers: r[3] || undefined }],
      conditions: [{ type: "variable_if", name: LAYER_ARROWS, value: true } ]
    },
    ];
  }));

  // Karabiner applies the first found matching rule, ignoring anything after. Thus, we need to
  // specify the most "specific" rules first.
  // E.g. "map r to f" needs to come after "map symbol layer + r to *".
  return [{
      description: 'LOFT Keyboard layout',
      manipulators: [].concat(
        layerRules,
        arrowLayerRules,
        numberLayerRules,
        symbolLayerRules,
        shiftKeyRules,
        simpleKeyRules
      ),
  }];
}

main();
