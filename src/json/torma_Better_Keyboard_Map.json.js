// JavaScript should be written in ECMAScript 5.1.
const title = 'Better Keyboard Map: Shift + Esc -> Caps; Caps -> Esc (alone), L_CTRL (chorded); CTRL + i/j/k/l for arrows';
const maintainer = 'torma';
const mapLShiftEscapToCapsLock = require('torma_L_Shift_Escape_to_Caps_Lock.json');
const mapCapsLocktoEscapeOrLCtrlChorded = require('torma_Caps_Lock_to_Escape_or_L_Ctrl_when_Chorded.json');
const mapCtrlIJKLtoArrowKeys = require('torma_CTRL_I_J_K_L_to_Arrows.json');
const excludeDropShift = [{ "identifiers": [{ "product_id": 61029, "vendor_id": 1240 }], "type": "device_unless" }];

function main() {
  console.log(JSON.stringify({
    title,
    maintainer,
    rules: rules()
  }, null, '  '));
}

function rules() {
  // Collect all manipulators from standard modules
  var allManipulators = [];
  var modules = [
    mapLShiftEscapToCapsLock,
    {  // Modified caps lock rules with exclusions
      rules: mapCapsLocktoEscapeOrLCtrlChorded.rules.map(function (rule) {
        return {
          manipulators: rule.manipulators.map(function (manipulator) {
            var newManip = {};
            // Copy all properties
            for (var key in manipulator) {
              if (manipulator.hasOwnProperty(key)) {
                newManip[key] = manipulator[key];
              }
            }
            // Add conditions
            newManip.conditions = (newManip.conditions || []).concat(excludeDropShift);
            return newManip;
          })
        };
      })
    },
    mapCtrlIJKLtoArrowKeys
  ];

  modules.forEach(function (module) {
    module.rules.forEach(function (rule) {
      rule.manipulators.forEach(function (manipulator) {
        allManipulators.push(manipulator);
      });
    });
  });

  return [{
    description: title,
    manipulators: allManipulators
  }];
}

if (__main.endsWith('/torma_Better_Keyboard_Map.json.js')) {
  main()
} else {
  exports.rules = rules()
}
