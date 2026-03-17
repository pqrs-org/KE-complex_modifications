// JavaScript should be written in ECMAScript 5.1.

const parameters = {
  to_if_alone_timeout_milliseconds: 300,
  to_delayed_action_delay_milliseconds: 0,
  to_if_held_down_threshold_milliseconds: 0,
  simultaneous_threshold_milliseconds: 300,
}

function main() {
  console.log(
    JSON.stringify(
      {
        title: 'Minimal dual keys',
        maintainers: ['yeonsh'],
        rules: [
          {
            description: 'Minimal dual keys',
            manipulators: [
              generateDualKeyRule('left_command', 'delete_or_backspace', 'left_command'),
              generateDualKeyRule('right_command', 'return_or_enter', 'right_command'),
              generateDualKeyRule('left_shift', 'return_or_enter', 'left_shift'),
            ],
          },
        ],
      },
      null,
      '  '
    )
  )
}

function generateDualKeyRule(input, alone, heldDown) {
  return {
    type: 'basic',
    from: {
      key_code: input,
      modifiers: { optional: ['any'] },
    },
    to_if_alone: [
      {
        key_code: alone,
      },
    ],
    to_if_held_down: [
      {
        key_code: heldDown,
      },
    ],
    parameters: {
      'basic.to_if_alone_timeout_milliseconds': parameters.to_if_alone_timeout_milliseconds,
      'basic.to_if_held_down_threshold_milliseconds': parameters.to_if_held_down_threshold_milliseconds,
    },
  }
}

main()
