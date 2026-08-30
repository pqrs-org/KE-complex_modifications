// JavaScript should be written in ECMAScript 5.1.

const parameters = {
  simultaneous_threshold_milliseconds: 500,
  trigger_key: 'o',
}

function main() {
  return {
    description: 'Personal rules (@tekezo) Launcher Mode v4 (rev 34)',
    description_notes: [
      '- Available since Karabiner-Elements 16.0.0.',
      // Usage
      '- Hold o and press another key to open or switch applications.',
    ],
    maintainers: ['tekezo'],
    manipulators: [].concat(
      generateLauncherMode('a', {
        bundleIdentifier: 'com.apple.ActivityMonitor',
      }),
      generateLauncherMode('b', {
        bundleIdentifier: 'com.microsoft.teams2',
      }),
      generateLauncherMode('c', {
        bundleIdentifier: 'com.google.Chrome',
      }),
      generateLauncherMode('d', {
        // bundleIdentifier: 'com.figma.Desktop',
        // bundleIdentifier: 'org.mozilla.firefox',
      }),
      generateLauncherMode('e', {
        bundleIdentifier: 'com.microsoft.VSCode',
      }),
      generateLauncherMode('f', {
        bundleIdentifier: 'com.apple.finder',
      }),
      generateLauncherMode('g', {
        // bundleIdentifier: 'com.openai.codex',
      }),
      generateLauncherMode('m', {
        bundleIdentifier: 'org.mozilla.thunderbird',
      }),
      generateLauncherMode('q', {
        bundleIdentifier: 'com.apple.Dictionary',
      }),
      generateLauncherMode('r', {
        frontmostApplicationHistoryIndex: 1,
        frontmostApplicationHistoryExclusionBundleIdentifiers: [
          '^com\\.1password\\.1password$',
          '^com\\.apple\\.ActivityMonitor$',
          '^com\\.apple\\.Dictionary$',
          '^com\\.apple\\.dock$',
          '^com\\.apple\\.finder$',
          '^com\\.apple\\.loginwindow$',
          // '^com\\.apple\\.Safari$',
          '^com\\.apple\\.Terminal$',
          '^com\\.figma\\.Desktop',
          '^com\\.google\\.Chrome$',
          '^com\\.microsoft\\.teams2$',
          '^com\\.microsoft\\.VSCode$',
          '^com\\.openai\\.chat$',
          '^com\\.tinyspeck\\.slackmacgap$',
          // '^org\\.mozilla\\.firefox$',
          '^org\\.mozilla\\.thunderbird$',
        ],
      }),
      generateLauncherMode('s', {
        //   bundleIdentifier: 'com.apple.Safari',
      }),
      generateLauncherMode('t', {
        bundleIdentifier: 'com.apple.Terminal',
      }),
      generateLauncherMode('v', {
        bundleIdentifier: 'com.tinyspeck.slackmacgap',
      }),
      generateLauncherMode('left_control', {
        to: [{ key_code: 'mission_control' }],
      }),
      // Show Apps shortcut
      generateLauncherMode('left_shift', {
        to: [{ key_code: 'spacebar', modifiers: ['left_command'] }],
      }),
      generateLauncherMode('x', {}),
      generateLauncherMode('z', {})
    ),
  }
}

function generateLauncherMode(
  from_key_code,
  /**
   * @type {{
   *   bundleIdentifier?: string,
   *   frontmostApplicationHistoryIndex?: number,
   *   frontmostApplicationHistoryExclusionBundleIdentifiers?: string[],
   *   to?: any[],
   * }} */
  options
) {
  var to = []
  if (options.bundleIdentifier !== undefined) {
    to.push({
      software_function: {
        open_application: {
          bundle_identifier: options.bundleIdentifier,
        },
      },
    })
  }
  if (options.frontmostApplicationHistoryIndex !== undefined) {
    to.push({
      software_function: {
        open_application: {
          frontmost_application_history_index: options.frontmostApplicationHistoryIndex,
          frontmost_application_history_exclusion_bundle_identifiers:
            options.frontmostApplicationHistoryExclusionBundleIdentifiers,
        },
      },
    })
  }
  if (options.to !== undefined) {
    to = to.concat(options.to)
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
      conditions: [],
      parameters: {
        'basic.simultaneous_threshold_milliseconds': parameters.simultaneous_threshold_milliseconds,
      },
    },
  ]
}

main()
