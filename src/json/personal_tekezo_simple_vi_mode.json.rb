#!/usr/bin/env ruby

# Parameters

PARAMETERS = {
  :simultaneous_threshold_milliseconds => 500,
}.freeze

############################################################

require 'json'
require_relative '../lib/karabiner.rb'

def main
  puts JSON.pretty_generate(
    'title' => 'Personal rules (@tekezo) simple_vi_mode',
    'rules' => [
      {
        'description' => 'Simple Vi Mode v3 (rev 2)',
        'manipulators' => [
          generate_simple_vi_mode('j', 'down_arrow'),
          generate_simple_vi_mode('k', 'up_arrow'),
          generate_simple_vi_mode('h', 'left_arrow'),
          generate_simple_vi_mode('l', 'right_arrow'),
          generate_simple_vi_mode('f', 'fn'),
        ].flatten,
      },
    ]
  )
end

def generate_simple_vi_mode(from_key_code, to_key_code)
  [
    {
      'type' => 'basic',
      'from' => {
        'key_code' => from_key_code,
        'modifiers' => Karabiner.from_modifiers(nil, ['any']),
      },
      'to' => [
        {
          'key_code' => to_key_code,
        },
      ],
      'conditions' => [
        {
          'type' => 'variable_if',
          'name' => 'simple_vi_mode',
          'value' => 1,
        },
      ],
    },
    {
      'type' => 'basic',
      'from' => {
        'simultaneous' => [
          { 'key_code' => 's' },
          { 'key_code' => from_key_code },
        ],
        'simultaneous_options' => {
          'key_down_order' => 'strict',
          'key_up_order' => 'strict_inverse',
          'to_after_key_up' => [
            Karabiner.set_variable('simple_vi_mode', 0),
          ],
        },
        'modifiers' => Karabiner.from_modifiers(nil, ['any']),
      },
      'to' => [
        Karabiner.set_variable('simple_vi_mode', 1),
        {
          'key_code' => to_key_code,
        },
      ],
      'parameters' => {
        'basic.simultaneous_threshold_milliseconds' => PARAMETERS[:simultaneous_threshold_milliseconds],
      },
    },
  ]
end

main
