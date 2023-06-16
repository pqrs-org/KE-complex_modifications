/**
 * This script generates a JSON file for Karabiner-Elements to control the
 * ncspot Spotify client for the terminal via netcat.
 *
 * Currently this needs to be enabled manually with a CLI command:
 *    '/Library/Application Support/org.pqrs/Karabiner-Elements/bin/karabiner_cli' --set-variables '{"ncspot":1}'
 *
 * Changed this by modifying the `conditons` array in the `manipulator` function.
 */

const shell_command = ( ncspot_command ) => {
  return `nc -U ~/.cache/ncspot/ncspot.sock <<< '${ncspot_command}'`;
};

const manipulator = ( consumer_key_code, ncspot_command ) => {
  return {
    type: 'basic',
    conditions: [
      {
        type: 'variable_if',
        name: 'ncspot',
        value: 1,
      },
    ],
    from: {
      consumer_key_code: consumer_key_code,
      modifiers: {
        optional: ['any'],
      }
    },
    to: [
      {
        shell_command: shell_command( ncspot_command ),
      },
    ],
  };
};

const play_pause_manipulator = manipulator( 'play_or_pause', 'playpause' );
const play_pause_bug = manipulator( 'play_pause', 'playpause' );
delete play_pause_bug['from']['consumer_key_code'];
play_pause_bug['from']['key_code'] = 'f8';
play_pause_bug['from']['modifiers']['mandatory'] = ['fn'];
const next_manipulator = manipulator( 'scan_next_track', 'next' );
const previous_manipulator = manipulator( 'scan_previous_track', 'previous' );

const rules = [
  {
    description: 'NCSPOT::All',
    manipulators: [ play_pause_manipulator, play_pause_bug, next_manipulator, previous_manipulator ],
  },
  {
    description: 'NCSPOT::Play/Pause',
    manipulators: [ play_pause_manipulator, play_pause_bug ],
  },
  {
    description: 'NCSPOT::Next',
    manipulators: [ next_manipulator ],
  },
  {
    description: 'NCSPOT::Previous',
    manipulators: [ previous_manipulator ],
  },
];

const json = {
  title: 'NCSPOT - control Spotify client for the terminal with media keys via netcat',
  maintainers: [ "n3f" ],
  rules: rules,
};

console.log(
  JSON.stringify(
    json,
    null,
    '  '
  )
)
