// JavaScript should be written in ECMAScript 5.1.

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
              generateSimpleVIMode('j', 'down_arrow'),
              generateSimpleVIMode('k', 'up_arrow'),
              generateSimpleVIMode('h', 'left_arrow'),
              generateSimpleVIMode('l', 'right_arrow'),
              generateSimpleVIMode('f', 'fn'),
              generateSimpleVIMode('c', 'left_control'),
              generateSimpleVIMode('v', 'left_option'),
              generateSimpleVIMode('b', 'left_command')
            ),
          },
        ],
      },
      null,
      '  '
    )
  )
}

function generateSimpleVIMode(from_key_code, to_key_code) {
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
        'basic.simultaneous_threshold_milliseconds': parameters.simultaneous_threshold_milliseconds,
      },
    },
  ]
}

main()
