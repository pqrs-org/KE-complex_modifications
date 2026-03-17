// JavaScript should be written in ECMAScript 5.1.
const title = 'Touchbar Fix: Right Option Volume & Brightness (Internal Keyboard Only)';
const maintainers = ['alextorma'];
const exclusions = [{
  "identifiers": [
    { "is_keyboard": true, "product_id": 0, "vendor_id": 0 }
  ], "type": "device_unless"
}];

function main() {
  console.log(
    JSON.stringify(
      {
        title,
        maintainers,
        rules: rules(),
      },
      null,
      '  '
    )
  )
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

function keys() {
  return {
    rules: [
      {
        description: title,
        manipulators: [
          {
            description: 'Right Option + 0 to Mute',
            from: {
              key_code: '0',
              modifiers: {
                mandatory: ['right_option'],
                optional: ['any'],
              },
            },
            to: [{ key_code: 'mute' }],
            type: 'basic',
          },
          {
            description: 'Right Option + - to Volume Down',
            from: {
              key_code: 'hyphen',
              modifiers: {
                mandatory: ['right_option'],
                optional: ['any'],
              },
            },
            to: [{ key_code: 'volume_down' }],
            type: 'basic',
          },
          {
            description: 'Right Option + = to Volume Up',
            from: {
              key_code: 'equal_sign',
              modifiers: {
                mandatory: ['right_option'],
                optional: ['any'],
              },
            },
            to: [{ key_code: 'volume_up' }],
            type: 'basic',
          },
          {
            description: 'Right Option + [ to Brightness Down',
            from: {
              key_code: 'open_bracket',
              modifiers: { mandatory: ['right_option'] },
            },
            to: [{ apple_vendor_top_case_key_code: 'brightness_down' }],
            type: 'basic',
          },
          {
            description: 'Right Option + ] to Brightness Up',
            from: {
              key_code: 'close_bracket',
              modifiers: { mandatory: ['right_option'] },
            },
            to: [{ apple_vendor_top_case_key_code: 'brightness_up' }],
            type: 'basic',
          },
          {
            description: 'Right Option + Right Shift + [ to Illumination Down',
            from: {
              key_code: 'open_bracket',
              modifiers: { mandatory: ['right_option', 'right_shift'] },
            },
            to: [{ apple_vendor_top_case_key_code: 'illumination_down' }],
            type: 'basic',
          },
          {
            description: 'Right Option + Right Shift + ] to Illumination Up',
            from: {
              key_code: 'close_bracket',
              modifiers: { mandatory: ['right_option', 'right_shift'] },
            },
            to: [{ apple_vendor_top_case_key_code: 'illumination_up' }],
            type: 'basic',
          },
        ],
      },
    ]
  }
}

function rules() {
  // Collect all manipulators from standard modules
  var allManipulators = [];
  var modules = [
    applyExclusions(keys(), exclusions),
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

if (__main.endsWith('/torma_Touchbar_Fix.json.js')) {
  main()
} else {
  exports.rules = rules()
}
