// JavaScript should be written in ECMAScript 5.1.

function main() {
  console.log(
    JSON.stringify(
      {
        title: 'Map ctrl+up to down',
        rules: [
          {
            description: 'control_L + up to down',
            manipulators: [
              {
                type: 'basic',
                from: {
                  key_code: 'up_arrow',
                  modifiers: {
                    mandatory: ['left_control'],
                    optional: ['any'],
                  },
                },
                to: [{ key_code: 'down_arrow' }],
              },
            ],
          },
          {
            description: 'control_R + up to down',
            manipulators: [
              {
                type: 'basic',
                from: {
                  key_code: 'up_arrow',
                  modifiers: {
                    mandatory: ['right_control'],
                    optional: ['any'],
                  },
                },
                to: [{ key_code: 'down_arrow' }],
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
