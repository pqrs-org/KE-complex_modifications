// JavaScript should be written in ECMAScript 5.1.
const title = 'Better Keyboard Map: Shift+Esc -> Caps; Caps -> Esc (alone),L_CTRL (chorded); CTRL+i/j/k/l -> arrows; L_SHIFT -> ( (alone),L_SHIFT (chorded) & R_SHIFT -> ) (alone), R_SHIFT (chorded)';
const maintainer = 'torma';
const mapLShiftEscapToCapsLock = require('torma_L_Shift_Escape_to_Caps_Lock.json');
const mapCapsLocktoEscapeOrLCtrlChorded = require('torma_Caps_Lock_to_Escape_or_L_Ctrl_when_Chorded.json');
const mapShiftsToParensOrShifts = require('torma_QMK_LS(_RS).json');
const mapCtrlIJKLtoArrowKeys = require('torma_CTRL_I_J_K_L_to_Arrows.json');
const excludeDropShift = [{ "identifiers": [{ "product_id": 61029, "vendor_id": 1240 }], "type": "device_unless" }];

function main() {
  console.log(JSON.stringify({
    title,
    maintainer,
    rules: rules()
  }, null, '  '));
}

function applyExclusions(json, exclusions) {
  var modifiedJson = JSON.parse(JSON.stringify(json)); // Deep copy to avoid mutation

  for (var i = 0; i < modifiedJson.rules.length; i++) {
    var rule = modifiedJson.rules[i];

    for (var j = 0; j < rule.manipulators.length; j++) {
      var manipulator = rule.manipulators[j];

      if (!manipulator.conditions) {
        manipulator.conditions = [];
      }

      manipulator.conditions = manipulator.conditions.concat(exclusions);
    }
  }

  return modifiedJson;
}

function rules() {
  // Collect all manipulators from standard modules
  var allManipulators = [];
  var modules = [
    mapLShiftEscapToCapsLock,
    applyExclusions(mapCapsLocktoEscapeOrLCtrlChorded, excludeDropShift),
    applyExclusions(mapShiftsToParensOrShifts, excludeDropShift),
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
