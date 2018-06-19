#!/usr/bin/env ruby

# You can generate json by executing the following command on Terminal.
#
# $ ruby ./example_halt.json.rb
#

require 'json'
require_relative '../lib/karabiner.rb'

def main
  puts JSON.pretty_generate(
    'title' => 'halt example',
    'rules' => [
      'description' => 'Open Mission Control by hold tab key',
      'manipulators' => [
        {
          'type' => 'basic',
          'from' => {
            'key_code' => 'tab',
          },
          'to_after_key_up' => [
            {
              'key_code' => 'tab',
            },
          ],
          'to_if_held_down' => [
            {
              'key_code' => 'mission_control',
              'halt' => true,
            },
          ],
        },
      ],
    ]
  )
end

main
