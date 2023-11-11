// JavaScript should be written in ECMAScript 5.1.

const parameters = {
  to_if_alone_timeout_milliseconds: 250,
}

function main() {
  console.log(
    JSON.stringify(
      {
        title: 'mitch 60% compatible arrows and keys',
        rules: [
          {
            description: 'mitch 60% compatible arrows and keys',
            available_since: '14.12.0',
            manipulators: [
              buildCapsBindings('i', 'up_arrow'),
              buildCapsBindings('k', 'down_arrow'),
              buildCapsBindings('j', 'left_arrow'),
              buildCapsBindings('l', 'right_arrow'),
              buildGraveToEscape(),
              buildTildeOnGraveShift(),
              // buildEscapeToGrave(),
              buildCapsLockEngage(),
              buildCapsLockVariableBlock(),
            ],
          },
          {
            description: 'media control mappings',
            manipulators: buildMediaControls(),
          },
        ],
      },
      null,
      '  '
    )
  )
}

// variable setup for caps lock key
function ifCapsLockModeOn() {
  return [
    {
      name: 'caps_lock_arrows_mode',
      type: 'variable_if',
      value: 1,
    },
  ]
}

function ifCapsLockModeOff() {
  return [
    {
      name: 'caps_lock_arrows_mode',
      type: 'variable_if',
      value: 0,
    },
  ]
}

function buildCapsBindings(fromKey, toKey) {
  // 60% keyboard arrow mappings with caps lock as layer activation (similar to QMK config)
  return {
    conditions: ifCapsLockModeOn(),
    from: {
      key_code: fromKey,
      modifiers: {
        optional: ['any'],
      },
    },
    to: [
      {
        key_code: toKey,
      },
    ],
    type: 'basic',
  }
}

function buildGraveToEscape() {
  // grave key to escape key by default
  return {
    conditions: ifCapsLockModeOff(),
    from: {
      key_code: 'grave_accent_and_tilde',
      modifiers: {
        optional: ['control', 'option'],
      },
    },
    to: [
      {
        key_code: 'escape',
      },
    ],
    type: 'basic',
  }
}

function buildTildeOnGraveShift() {
  // grave key + shift gives tilde
  return {
    conditions: ifCapsLockModeOff(),
    from: {
      key_code: 'grave_accent_and_tilde',
      modifiers: {
        mandatory: ['shift'],
      },
    },
    to: [
      {
        key_code: 'grave_accent_and_tilde',
        modifiers: ['shift'],
      },
    ],
    type: 'basic',
  }
}

function buildEscapeToGrave() {
  // escape key as another grave key (until I get tired of that)
  return {
    conditions: ifCapsLockModeOn(),
    from: {
      key_code: 'escape',
      modifiers: {
        optional: ['any'],
      },
    },
    to: [
      {
        key_code: 'grave_accent_and_tilde',
      },
    ],
    type: 'basic',
  }
}

function buildCapsLockEngage() {
  // when we actually want caps lock
  return {
    conditions: ifCapsLockModeOn(),
    from: {
      key_code: 'tab',
      modifiers: {
        optional: ['any'],
      },
    },
    to: [
      {
        key_code: 'caps_lock',
      },
    ],
    type: 'basic',
  }
}

function buildMediaControls() {
  return [
    {
      type: 'basic',
      conditions: ifCapsLockModeOn(),
      from: {
        key_code: 'z',
        modifiers: {},
      },
      to: [
        {
          key_code: 'rewind',
          modifiers: [],
        },
      ],
    },
    {
      type: 'basic',
      conditions: ifCapsLockModeOn(),
      from: {
        key_code: 'x',
        modifiers: {},
      },
      to: [
        {
          key_code: 'play_or_pause',
          modifiers: [],
        },
      ],
    },
    {
      type: 'basic',
      conditions: ifCapsLockModeOn(),
      from: {
        key_code: 'c',
        modifiers: {},
      },
      to: [
        {
          key_code: 'fastforward',
          modifiers: [],
        },
      ],
    },
  ]
}

function buildCapsLockVariableBlock() {
  // defines the variables that's set when the caps lock key is down and up
  return {
    from: {
      key_code: 'caps_lock',
      modifiers: {
        optional: ['any'],
      },
    },
    parameters: {
      // 'basic.to_if_alone_timeout_milliseconds': parameters.to_if_alone_timeout_milliseconds,
      'basic.to_if_held_down_threshold_milliseconds': 1,
    },
    to_if_held_down: [
      {
        set_variable: {
          name: 'caps_lock_arrows_mode',
          value: 1,
        },
      },
    ],
    to_after_key_up: [
      {
        set_variable: {
          name: 'caps_lock_arrows_mode',
          value: 0,
        },
      },
    ],
    // caps lock does nothing if pressed by itself (use caps+tab for that)
    // to_if_alone: [
    //   {
    //     key_code: 'caps_lock',
    //   },
    // ],
    type: 'basic',
  }
}

main()
