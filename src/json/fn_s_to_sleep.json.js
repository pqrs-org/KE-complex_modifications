// JavaScript should be written in ECMAScript 5.1.

console.log(
  JSON.stringify(
    {
      title: 'Lock screen and sleep by fn+s',
      maintainers: ['tekezo'],
      rules: [
        {
          description: 'Lock screen and sleep by fn+s (rev 2)',
          manipulators: [
            {
              type: 'basic',
              from: {
                key_code: 's',
                modifiers: {
                  mandatory: ['fn'],
                },
              },
              to: [
                // Lock Screen
                { key_code: 'q', modifiers: ['left_command', 'left_control'] },

                // Sleep
                {
                  software_function: {
                    iokit_power_management_sleep_system: {
                      delay_milliseconds: 1000,
                    },
                  },
                },
              ],
            },
          ],
        },
      ],
    },
    null,
    '  '
  )
)
