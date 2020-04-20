#!/usr/bin/env ruby

# You can generate json by executing the following command on Terminal.
#
# $ ruby ./personal_tekezo_launcher_mode_v4.json.rb
#

# Parameters

PARAMETERS = {
  :simultaneous_threshold_milliseconds => 500,
  :trigger_key => 'o',
}.freeze

############################################################

require 'json'
require_relative '../lib/karabiner.rb'

def main
  data = {
    'title' => 'Personal rules (@tekezo) Launcher Mode v4',
    'maintainers' => ['tekezo'],
    'rules' => [
      {
        'description' => 'Launcher Mode v4 (rev 12)',
        'manipulators' => [
          generate_launcher_mode('1', [], [{ 'shell_command' => "open -a 'Xcode.app'" }]),
          generate_launcher_mode('3', [], [{ 'shell_command' => "open -a 'Firefox.app'" }]),
          generate_launcher_mode('4', [], [{ 'shell_command' => "open -a 'Safari.app'" }]),
          generate_launcher_mode('5', [], [{ 'shell_command' => "open -a 'Microsoft Word.app'" }]),
          generate_launcher_mode('6', [], [{ 'shell_command' => "open -a 'Microsoft Excel.app'" }]),
          generate_launcher_mode('a', [], [{ 'shell_command' => "open -a 'Activity Monitor.app'" }]),
          generate_launcher_mode('c', [], [{ 'shell_command' => "open -a 'Google Chrome.app'" }]),
          generate_launcher_mode('e', [], [{ 'shell_command' => "open -a 'Visual Studio Code.app'" }]),
          generate_launcher_mode('f', [], [{ 'shell_command' => "open -a 'Finder.app'" }]),
          generate_launcher_mode('i', [], [{ 'shell_command' => "open -a 'The Lounge.app'" }]),
          generate_launcher_mode('m', [], [{ 'shell_command' => "open -a 'Thunderbird.app'" }]),
          generate_launcher_mode('q', [], [{ 'shell_command' => "open -a 'Dictionary.app'" }]),
          generate_launcher_mode('t', [], [{ 'shell_command' => "open -a 'iTerm.app'" }]),
          generate_launcher_mode('v', [], [{ 'shell_command' => "open -a 'Slack.app'" }]),

          generate_launcher_mode('tab', [], [{ 'key_code' => 'mission_control' }]),
          generate_launcher_mode('spacebar', [], [{ 'shell_command' => "open -a 'Alfred 4.app'" }]),
        ].flatten,
      },
    ],
  }

  puts JSON.pretty_generate(data)
end

def generate_launcher_mode(from_key_code, mandatory_modifiers, to)
  data = []

  ############################################################

  h = {
    'type' => 'basic',
    'from' => {
      'key_code' => from_key_code,
      'modifiers' => Karabiner.from_modifiers(mandatory_modifiers),
    },
    'to' => to,
    'conditions' => [Karabiner.variable_if('launcher_mode_v4', 1)],
  }

  data << h

  ############################################################

  h = {
    'type' => 'basic',
    'from' => {
      'simultaneous' => [
        { 'key_code' => PARAMETERS[:trigger_key] },
        { 'key_code' => from_key_code },
      ],
      'simultaneous_options' => {
        'key_down_order' => 'strict',
        'key_up_order' => 'strict_inverse',
        'to_after_key_up' => [
          Karabiner.set_variable('launcher_mode_v4', 0),
        ],
      },
      'modifiers' => Karabiner.from_modifiers(mandatory_modifiers),
    },
    'to' => [
      Karabiner.set_variable('launcher_mode_v4', 1),
    ].concat(to),
    'parameters' => {
      'basic.simultaneous_threshold_milliseconds' => PARAMETERS[:simultaneous_threshold_milliseconds],
    },
  }

  data << h

  ############################################################

  data
end

main
