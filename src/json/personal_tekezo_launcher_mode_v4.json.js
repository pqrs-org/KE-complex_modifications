// JavaScript should be written in ECMAScript 5.1.

const parameters = {
  simultaneous_threshold_milliseconds: 500,
  trigger_key: 'o',
}

function main() {
  console.log(
    JSON.stringify(
      {
        title: 'Personal rules (@tekezo) Launcher Mode v4',
        maintainers: ['tekezo'],
        rules: [
          {
            description: 'Launcher Mode v4 (rev 20)',
            available_since: '13.1.4',
            manipulators: [].concat(
              generateLauncherMode('1', { bundleIdentifier: 'com.apple.dt.Xcode' }),
              generateLauncherMode('3', { bundleIdentifier: 'org.mozilla.firefox' }),
              generateLauncherMode('a', { bundleIdentifier: 'com.apple.ActivityMonitor' }),
              generateLauncherMode('c', { bundleIdentifier: 'com.google.Chrome' }),
              generateLauncherMode('e', { bundleIdentifier: 'com.microsoft.VSCode' }),
              generateLauncherMode('f', { bundleIdentifier: 'com.apple.finder' }),
              generateLauncherMode('m', { bundleIdentifier: 'org.mozilla.thunderbird' }),
              generateLauncherMode('q', { bundleIdentifier: 'com.apple.Dictionary' }),
              generateLauncherMode('s', { bundleIdentifier: 'com.apple.Safari' }),
              generateLauncherMode('t', { bundleIdentifier: 'com.apple.Terminal' }),
              generateLauncherMode('v', { bundleIdentifier: 'com.tinyspeck.slackmacgap' }),

              generateLauncherMode('left_control', { to: [{ key_code: 'mission_control' }] }),
              generateLauncherMode('left_shift', { to: [{ apple_vendor_keyboard_key_code: 'launchpad' }] })
            ),
          },
        ],
      },
      null,
      '  '
    )
  )
}

function generateLauncherMode(
  from_key_code,
  /**
   * @type {{
   *   bundleIdentifier?: string,
   *   to: any[],
   * }} */
  definition
) {
  var to = []
  if (definition.bundleIdentifier !== undefined) {
    to.push({
      shell_command: "open -b '" + definition.bundleIdentifier + "'",
    })
  }
  if (definition.to !== undefined) {
    to = to.concat(definition.to)
  }

  return [
    {
      type: 'basic',
      from: {
        key_code: from_key_code,
        modifiers: { optional: ['any'] },
      },
      to: to,
      conditions: [
        {
          type: 'variable_if',
          name: 'launcher_mode_v4',
          value: 1,
        },
      ],
    },
    {
      type: 'basic',
      from: {
        simultaneous: [{ key_code: parameters.trigger_key }, { key_code: from_key_code }],
        simultaneous_options: {
          key_down_order: 'strict',
          key_up_order: 'strict_inverse',
          to_after_key_up: [
            {
              set_variable: {
                name: 'launcher_mode_v4',
                value: 0,
              },
            },
          ],
        },
        modifiers: { optional: ['any'] },
      },
      to: [
        {
          set_variable: {
            name: 'launcher_mode_v4',
            value: 1,
          },
        },
      ].concat(to),
      parameters: {
        'basic.simultaneous_threshold_milliseconds': parameters.simultaneous_threshold_milliseconds,
      },
    },
  ]
}

main()
