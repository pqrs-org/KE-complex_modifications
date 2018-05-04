#!/usr/bin/env ruby

# You can generate json by executing the following command on Terminal.
#
# $ ruby ./mouse_keys_mode_v4.json.rb
#

# Parameters

PARAMETERS = {
  :simultaneous_threshold_milliseconds => 500,
}.freeze

############################################################

require 'json'
require_relative '../lib/karabiner.rb'

def main
  puts JSON.pretty_generate(
    'title' => 'Mouse Keys Mode v4 (rev 1)',
    'rules' => [
      {
        'description' => 'Mouse Keys Mode v4 (rev 1)',
        'manipulators' => [

          # hjkl

          generate_mouse_keys_mode('j',
                                   [{ 'mouse_key' => { 'y' => 1536 } }],
                                   [{ 'mouse_key' => { 'vertical_wheel' => 32 } }],
                                   nil),
          generate_mouse_keys_mode('k',
                                   [{ 'mouse_key' => { 'y' => -1536 } }],
                                   [{ 'mouse_key' => { 'vertical_wheel' => -32 } }],
                                   nil),
          generate_mouse_keys_mode('h',
                                   [{ 'mouse_key' => { 'x' => -1536 } }],
                                   [{ 'mouse_key' => { 'horizontal_wheel' => 32 } }],
                                   nil),
          generate_mouse_keys_mode('l',
                                   [{ 'mouse_key' => { 'x' => 1536 } }],
                                   [{ 'mouse_key' => { 'horizontal_wheel' => -32 } }],
                                   nil),

          # buttons

          generate_mouse_keys_mode('v',
                                   [{ 'pointing_button' => 'button1' }],
                                   nil,
                                   nil),

          generate_mouse_keys_mode('b',
                                   [{ 'pointing_button' => 'button3' }],
                                   nil,
                                   nil),

          generate_mouse_keys_mode('n',
                                   [{ 'pointing_button' => 'button2' }],
                                   nil,
                                   nil),

          # others

          generate_mouse_keys_mode('s',
                                   [Karabiner.set_variable('mouse_keys_mode_v4_scroll', 1)],
                                   nil,
                                   [Karabiner.set_variable('mouse_keys_mode_v4_scroll', 0)]),
          generate_mouse_keys_mode('f',
                                   [{ 'mouse_key' => { 'speed_multiplier' => 2.0 } }],
                                   nil,
                                   nil),
          generate_mouse_keys_mode('g',
                                   [{ 'mouse_key' => { 'speed_multiplier' => 0.5 } }],
                                   nil,
                                   nil),
        ].flatten,
      },
    ]
  )
end

def generate_mouse_keys_mode(from_key_code, to, scroll_to, to_after_key_up)
  data = []

  ############################################################

  unless scroll_to.nil?
    h = {
      'type' => 'basic',
      'from' => {
        'key_code' => from_key_code,
        'modifiers' => Karabiner.from_modifiers(nil, ['any']),
      },
      'to' => scroll_to,
      'conditions' => [
        Karabiner.variable_if('mouse_keys_mode_v4', 1),
        Karabiner.variable_if('mouse_keys_mode_v4_scroll', 1),
      ],
    }

    h['to_after_key_up'] = to_after_key_up unless to_after_key_up.nil?

    data << h
  end

  ############################################################

  h = {
    'type' => 'basic',
    'from' => {
      'key_code' => from_key_code,
      'modifiers' => Karabiner.from_modifiers(nil, ['any']),
    },
    'to' => to,
    'conditions' => [Karabiner.variable_if('mouse_keys_mode_v4', 1)],
  }

  h['to_after_key_up'] = to_after_key_up unless to_after_key_up.nil?

  data << h

  ############################################################

  h = {
    'type' => 'basic',
    'from' => {
      'simultaneous' => [
        {
          'key_code' => 'd',
        },
        {
          'key_code' => from_key_code,
        },
      ],
      'simultaneous_options' => {
        'key_down_order' => 'strict',
        'key_up_order' => 'strict_inverse',
        'to_after_key_up' => [
          Karabiner.set_variable('mouse_keys_mode_v4', 0),
          Karabiner.set_variable('mouse_keys_mode_v4_scroll', 0),
        ],
      },
      'modifiers' => Karabiner.from_modifiers(nil, ['any']),
    },
    'to' => [
      Karabiner.set_variable('mouse_keys_mode_v4', 1),
    ].concat(to),
    'parameters' => {
      'basic.simultaneous_threshold_milliseconds' => PARAMETERS[:simultaneous_threshold_milliseconds],
    },
  }

  h['to_after_key_up'] = to_after_key_up unless to_after_key_up.nil?

  data << h

  ############################################################

  data
end

main
