// JavaScript should be written in ECMAScript 5.1.

function main() {
  console.log(
    JSON.stringify(
      {
        title: 'personal @jonlev1n',
        rules: [
          {
            description: 'Change Control + i/j/k/l to Arrows',
            manipulators: [
              {
                type: 'basic',
                from: { key_code: 'j', modifiers: { mandatory: ['control'], optional: ['any'] } },
                to: [{ key_code: 'left_arrow' }],
              },
              {
                type: 'basic',
                from: { key_code: 'k', modifiers: { mandatory: ['control'], optional: ['any'] } },
                to: [{ key_code: 'down_arrow' }],
              },
              {
                type: 'basic',
                from: { key_code: 'i', modifiers: { mandatory: ['control'], optional: ['any'] } },
                to: [{ key_code: 'up_arrow' }],
              },
              {
                type: 'basic',
                from: { key_code: 'l', modifiers: { mandatory: ['control'], optional: ['any'] } },
                to: [{ key_code: 'right_arrow' }],
              },
            ],
          },
          {
            description: 'Change Option + j/l to beginning/end of word',
            manipulators: [
              {
                type: 'basic',
                from: { key_code: 'j', modifiers: { mandatory: ['option'], optional: ['any'] } },
                to: [{ key_code: 'left_arrow', modifiers: 'left_option' }],
              },
              {
                type: 'basic',
                from: { key_code: 'l', modifiers: { mandatory: ['option'], optional: ['any'] } },
                to: [{ key_code: 'right_arrow', modifiers: 'left_option' }],
              },
            ],
          },
          {
            description: 'Change CMD + j/l to command left_arrow/right_arrow',
            manipulators: [
              {
                type: 'basic',
                from: { key_code: 'j', modifiers: { mandatory: ['command'], optional: ['any'] } },
                to: [{ key_code: 'left_arrow', modifiers: 'left_command' }],
              },
              {
                type: 'basic',
                from: { key_code: 'l', modifiers: { mandatory: ['command'], optional: ['any'] } },
                to: [{ key_code: 'right_arrow', modifiers: 'left_command' }],
              },
            ],
          },
          {
            description: 'Control and -/= to display brightness',
            manipulators: [
              {
                type: 'basic',
                from: { key_code: 'hyphen', modifiers: { mandatory: ['control'] } },
                to: [{ key_code: 'display_brightness_decrement' }],
              },
              {
                type: 'basic',
                from: { key_code: 'equal_sign', modifiers: { mandatory: ['control'] } },
                to: [{ key_code: 'display_brightness_increment' }],
              },
            ],
          },
          {
            description: 'Control and 1/2/3 to rewind/play_or_pause/fastforward',
            manipulators: [
              {
                type: 'basic',
                from: { key_code: '1', modifiers: { mandatory: ['control'] } },
                to: [{ key_code: 'rewind' }],
              },
              {
                type: 'basic',
                from: { key_code: '2', modifiers: { mandatory: ['control'] } },
                to: [{ key_code: 'play_or_pause' }],
              },
              {
                type: 'basic',
                from: { key_code: '3', modifiers: { mandatory: ['control'] } },
                to: [{ key_code: 'fastforward' }],
              },
            ],
          },
        ],
      },
      null,
      '  '
    )
  )
}

main()
