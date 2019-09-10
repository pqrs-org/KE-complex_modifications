#!/usr/bin/env ruby

# You can generate json by executing the following command on Terminal.
#
# $ ruby ./multitouch_mouse_buttons.json.rb
#

require 'json'
require_relative '../lib/karabiner.rb'

def main
  #
  # conditions
  #

  condition = Karabiner.variable_unless('multitouch_extension_finger_count_total', 0)

  #
  # manipulators
  #

  manipulators = []

  (1..9).each do |i|
    manipulators << {
      'type' => 'basic',
      'from' => {
        'key_code' => i.to_s,
        'modifiers' => Karabiner.from_modifiers,
      },
      'to' => [
        {
          'pointing_button' => 'button' + i.to_s,
        },
      ],
      'conditions' => [condition],
    }
  end

  puts JSON.pretty_generate(
    'title' => 'Multitouch Mouse Buttons (rev 2)',
    'maintainers' => ['tekezo'],
    'rules' => [
      'description' => 'Multitouch Mouse Buttons (rev 2)',
      'available_since' => '12.6.9',
      'manipulators' => manipulators,
    ]
  )
end

main
