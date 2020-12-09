#!/usr/bin/env ruby
# frozen_string_literal: true

# You can generate json by executing the following command on Terminal.
#
# $ ruby ./control-to-command-in-office.json.rb
#

require 'json'
require_relative '../lib/karabiner'

def main
  puts JSON.pretty_generate(
    'title' => 'Use left control key as command key in Microsoft Office',
    'rules' => [
      {
        'description' => 'Use left control key as command key in Microsoft Office (rev 1)',
        'manipulators' => [
          {
            'type' => 'basic',
            'from' => {
              'key_code' => 'left_control',
            },
            'to' => [
              {
                'key_code' => 'left_command',
              },
            ],
            'conditions' => [Karabiner.frontmost_application_if(['microsoft_office'])],
          },
        ],
      },
      {
        'description' => 'Use right control key as command key in Microsoft Office (rev 1)',
        'manipulators' => [
          {
            'type' => 'basic',
            'from' => {
              'key_code' => 'right_control',
            },
            'to' => [
              {
                'key_code' => 'right_command',
              },
            ],
            'conditions' => [Karabiner.frontmost_application_if(['microsoft_office'])],
          },
        ],
      },
    ]
  )
end

main
