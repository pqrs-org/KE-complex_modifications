// JavaScript should be written in ECMAScript 5.1.
// Docs link for from structure: https://karabiner-elements.pqrs.org/docs/json/complex-modifications-manipulator-definition/from/
//
// The macro keys (G1-G18) of the Corsair K95 report HID usages on the keyboard page (0x07) that Karabiner-Elements
// shows as `key_code: "unsupported"`. They can still be addressed with a raw number in `from.key_code`
// (here: usage 0xD0 = 208 ...). F14 and F15 are skipped on purpose: macOS treats them as brightness down/up keys.
// Only G1-G10 are mapped, the remaining macro keys (usages 0xDA-0xDF, 0xE8-0xE9) are intentionally left unmapped.

var MACRO_KEYBOARD_DEVICE = {
  is_keyboard: true,
  vendor_id: 6940,
  product_id: 6920,
}

var FIRST_MACRO_USAGE = 208 // 0xD0, G1
var TARGET_KEYS = ['f13', 'f16', 'f17', 'f18', 'f19', 'f20', 'f21', 'f22', 'f23', 'f24']

function getMacroKeyManipulator(index) {
  return {
    type: 'basic',
    conditions: [
      {
        type: 'device_if',
        identifiers: [MACRO_KEYBOARD_DEVICE],
      },
    ],
    from: {
      // Raw number, must not be quoted.
      key_code: FIRST_MACRO_USAGE + index,
    },
    to: [
      {
        key_code: TARGET_KEYS[index],
      },
    ],
  }
}

var manipulators = []
for (var i = 0; i < TARGET_KEYS.length; i++) {
  manipulators.push(getMacroKeyManipulator(i))
}

const json = {
  title: 'Corsair K95 macro keys (@mlewand)',
  maintainers: ['mlewand'],
  rules: [
    {
      description: 'Corsair K95 macro keys (G1→F13, G2→F16, G3→F17, ..., G10→F24; skips F14/F15 = brightness; G11-G18 unmapped)',
      manipulators: manipulators,
    },
  ],
}

console.log(JSON.stringify(json, null, '  '))
