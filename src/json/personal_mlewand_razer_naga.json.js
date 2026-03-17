// JavaScript should be written in ECMAScript 5.1.
// Handful link for key codes: https://github.com/JoshuaManuel/Karabiner-Elements-Key-List
// Docs link for from structure: https://karabiner-elements.pqrs.org/docs/json/complex-modifications-manipulator-definition/from/

function getBasicCapsManipulator(info) {
  return {
    type: info.type || 'basic',
    conditions: info.conditions || [ {
      // 'name': 'origin device is razer naga (epic) mouse',
      'type': 'device_if',
      'identifiers': [
        {
          'vendor_id': 5426,
          'product_id': 31
        }
    ]
    } ],
    from: typeof info.from == 'string' ? {
      key_code: info.from,
      modifiers: {
        optional: ['any'],
      },
    } : info.from,
    to: getToKeys()
  };

  function getToKeys() {
    const configKey = info.to
    if (typeof configKey == 'string') {
      return [
        {
          key_code: configKey,
        },
      ]
    } else if (typeof configKey == 'object' && configKey.key) {
      return [
        {
          key_code: configKey.key,
          modifiers: configKey.modifiers || [],
        },
      ]
    } else {
      throw 'To key should be a string or a specific interfaced object, ' + JSON.stringify(info.to) + ' given instead.'
    }
  }
}

const sections = [
  {
    name: 'Typing extras (7→move to left screen, 8→move to right screen, 10→maximize, 11→shrink)',
    manipulators: [
      // Move to left
      getBasicCapsManipulator({ from: { key_code: '7' }, to: { key: 'j', modifiers: [ 'left_shift', 'left_command' ] } }),
      // Move to right
      getBasicCapsManipulator({ from: { key_code: '8' }, to: { key: 'l', modifiers: [ 'left_shift', 'left_command' ] } }),
      // Maximize
      getBasicCapsManipulator({ from: { key_code: '0' }, to: { key: 'i', modifiers: [ 'left_shift', 'left_command' ] } }),
      // Shrink
      getBasicCapsManipulator({ from: { key_code: 'hyphen' }, to: { key: 'k', modifiers: [ 'left_shift', 'left_command' ] } }),
    ],
  }
]

const json = {
  title: 'Mappings for (fairly old) Razer Naga Epic mouse (@mlewand)',
  maintainers: ['mlewand'],
  rules: sections.map(function (sectionItem) {
    return {
      description: sectionItem.name,
      manipulators: sectionItem.manipulators || [],
    }
  }),
}

console.log(JSON.stringify(json, null, '  '))
