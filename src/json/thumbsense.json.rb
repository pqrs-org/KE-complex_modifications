#!/usr/bin/env ruby

# You can generate json by executing the following command on Terminal.
#
# $ ruby ./thumbsense.json.rb
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

  [
    #
    # Mouse left button (F, J, SPACE)
    #

    {
      :from => { 'key_code' => 'f', 'modifiers' => Karabiner.from_modifiers },
      :to => { 'pointing_button' => 'button1' },
    },
    {
      :from => { 'key_code' => 'j', 'modifiers' => Karabiner.from_modifiers },
      :to => { 'pointing_button' => 'button1' },
    },
    {
      :from => { 'key_code' => 'spacebar', 'modifiers' => Karabiner.from_modifiers },
      :to => { 'pointing_button' => 'button1' },
    },

    #
    # Mouse right button (D, K)
    #

    {
      :from => { 'key_code' => 'd', 'modifiers' => Karabiner.from_modifiers },
      :to => { 'pointing_button' => 'button2' },
    },
    {
      :from => { 'key_code' => 'k', 'modifiers' => Karabiner.from_modifiers },
      :to => { 'pointing_button' => 'button2' },
    },

    # Scroll (S, L) is not supported.
    # Window Maximize (R) is not supported.
    # Change Window Order (E) is not supported.
    # Task switch (T) is not supported.

    #
    # Next (G)
    #

    {
      :from => { 'key_code' => 'g' },
      :to => {
        'key_code' => 'close_bracket',
        'modifiers' => ['left_command'],
      },
      :conditions => [condition, Karabiner.keyboard_type_if(%w[ansi iso])],
    },
    {
      :from => { 'key_code' => 'g' },
      :to => {
        'key_code' => 'backslash',
        'modifiers' => ['left_command'],
      },
      :conditions => [condition, Karabiner.keyboard_type_if(%w[jis])],
    },

    #
    # Previous (H)
    #

    {
      :from => { 'key_code' => 'h' },
      :to => {
        'key_code' => 'open_bracket',
        'modifiers' => ['left_command'],
      },
      :conditions => [condition, Karabiner.keyboard_type_if(%w[ansi iso])],
    },
    {
      :from => { 'key_code' => 'h' },
      :to => {
        'key_code' => 'close_bracket',
        'modifiers' => ['left_command'],
      },
      :conditions => [condition, Karabiner.keyboard_type_if(%w[jis])],
    },

    #
    # Window close (W)
    #

    {
      :from => { 'key_code' => 'w' },
      :to => {
        'key_code' => 'w',
        'modifiers' => ['left_command'],
      },
    },

    # start IE (I) is not supported.
    # start OutlookExpress (O) is not supported.
    # open the My Document folder (M) is not supported.
  ].each do |d|
    conditions = d[:conditions].nil? ? [condition] : d[:conditions]

    manipulators << {
      'type' => 'basic',
      'from' => d[:from],
      'to' => [
        d[:to],
      ],
      'conditions' => conditions,
    }
  end

  puts JSON.pretty_generate(
    'title' => 'ThumbSense (rev 3)',
    'maintainers' => ['tekezo'],
    'rules' => [
      'description' => 'ThumbSense (rev 3)',
      'available_since' => '12.6.9',
      'manipulators' => manipulators,
    ]
  )
end

main
