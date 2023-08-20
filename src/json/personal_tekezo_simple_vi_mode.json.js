// Javascript should be written in ECMAScript 5.1.

const parameters = {
  simultaneous_threshold_milliseconds: 500,
}

function main() {
  console.log(
    JSON.stringify(
      {
        title: 'Personal rules (@tekezo) simple_vi_mode (rev 4)',
        maintainers: ['tekezo'],
        rules: [
          {
            description: 'Simple Vi Mode v3 (rev 4)',
            available_since: '13.6.0',
            manipulators: [].concat(
              generate_simple_vi_mode('j', 'down_arrow'),
              generate_simple_vi_mode('k', 'up_arrow'),
              generate_simple_vi_mode('h', 'left_arrow'),
              generate_simple_vi_mode('l', 'right_arrow'),
              generate_simple_vi_mode('f', 'fn'),
              generate_simple_vi_mode('c', 'left_control'),
              generate_simple_vi_mode('v', 'left_option'),
              generate_simple_vi_mode('b', 'left_command')
            ),
          },
        ],
      },
      null,
      '  '
    )
  )
}

function generate_simple_vi_mode(from_key_code, to_key_code) {
  return [
    {
      type: 'basic',
      from: {
        key_code: from_key_code,
        modifiers: { optional: ['any'] },
      },
      to: [
        {
          key_code: to_key_code,
        },
      ],
      conditions: [
        {
          type: 'variable_if',
          name: 'simple_vi_mode',
          value: 1,
        },
      ],
    },
    {
      type: 'basic',
      from: {
        simultaneous: [{ key_code: 's' }, { key_code: from_key_code }],
        simultaneous_options: {
          key_down_order: 'strict',
          key_up_order: 'strict_inverse',
          to_after_key_up: [
            {
              set_variable: {
                name: 'simple_vi_mode',
                value: 0,
              },
            },
            {
              set_notification_message: {
                id: 'simple_vi_mode',
                text: '',
              },
            },
          ],
        },
        modifiers: { optional: ['any'] },
      },
      to: [
        {
          set_variable: {
            name: 'simple_vi_mode',
            value: 1,
          },
        },
        {
          set_notification_message: {
            id: 'simple_vi_mode',
            text: 'Simple Vi Mode v3',
          },
        },
        {
          key_code: to_key_code,
        },
      ],
      parameters: {
        'basic.simultaneous_threshold_milliseconds':
          parameters.simultaneous_threshold_milliseconds,
      },
    },
  ]
}

main()
