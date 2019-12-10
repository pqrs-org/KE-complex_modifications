#!/usr/bin/env ruby
# frozen_string_literal: true

# You can generate json by executing the following command on Terminal.
#
# $ ruby ./control_comma_dot.json.rb
#

require 'json'
require_relative '../lib/karabiner.rb'

def main
  puts JSON.pretty_generate(
    'title' => 'Change control+comma & control+period',
    'rules' => [
      {
        'description' => 'Change control+comma to comma, control+period to period',
        'manipulators' => [
          {
            'type' => 'basic',
            'from' => {
              'key_code' => 'comma',
              'modifiers' => Karabiner.from_modifiers(['control'], %w[caps_lock shift]),
            },
            'to' => [
              {
                'key_code' => 'comma',
              },
            ],
          },
          {
            'type' => 'basic',
            'from' => {
              'key_code' => 'period',
              'modifiers' => Karabiner.from_modifiers(['control'], %w[caps_lock shift]),
            },
            'to' => [
              {
                'key_code' => 'period',
              },
            ],
          },
        ],
      },
    ]
  )
end

main
