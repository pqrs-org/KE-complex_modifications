// JavaScript should be written in ECMAScript 5.1.

function main() {
  return {
    description: 'Lock screen and sleep by fn+s (rev 2)',
    description_notes: ['- Available since Karabiner-Elements 16.0.0.'],
    maintainers: ['tekezo'],
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
  }
}

main()
