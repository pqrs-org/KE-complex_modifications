#!/usr/bin/env ruby

# You can generate json by executing the following command on Terminal.
#
# $ ruby ./RCmdToLCMD+Option.json.rb
#

require 'json'
require_relative '../lib/karabiner.rb'

def main
  puts JSON.pretty_generate(
    'title' => 'Right Cmd to Left Cmd + Left Option ',
    'rules' => [
      {
        'description' => 'Change Right CMD to Left CMD + Left Option, util for tab navigation with modification WASD or HJKL',
        'manipulators' => [
          {
            'type' => 'basic',
            'from' => {
              'key_code' => 'right_command',
              'modifiers' => Karabiner.from_modifiers,
            },
            'to' => [
              {
                'key_code' => 'left_command',
                'modifiers' => %w[
                    left_option
                ],
              },
            ],
            },
        ],
      },
          ]
  )
end

main
