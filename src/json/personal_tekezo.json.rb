#!/usr/bin/env ruby
# frozen_string_literal: true

# You can generate json by executing the following command on Terminal.
#
# $ ruby ./personal_tekezo.json.rb
#

require 'json'
require_relative '../lib/karabiner'

PARAMETERS = {
  :simultaneous_threshold_milliseconds => 500,
}.freeze

def main
  puts JSON.pretty_generate(
    'title' => 'Personal rules (@tekezo)',
    'maintainers' => ['tekezo'],
    'rules' => [
      {
        'description' => 'Personal rules (@tekezo) (rev 45)',
        'available_since' => '14.9.0',
        'manipulators' =>
        core_configuration +
        emacs +
        mouse +
        extra_cursor +
        device_specific +
        holding_hyphen +
        app_virtual_machine +
        app_finder +
        app_terminal +
        app_browser +
        app_microsoft_office +
        app_visual_studio_code,
      },
    ]
  )
end

def core_configuration
  [
    ########################################
    # fn
    ########################################

    # Copy Unix time when fn is pressed alone
    {
      'type' => 'basic',
      'from' => {
        'key_code' => 'fn',
        'modifiers' => Karabiner.from_modifiers,
      },
      'to' => [
        { 'key_code' => 'fn' },
      ],
      'to_if_alone' => [
        {
          'shell_command' => 'date "+%s" | tr -d "\n" | pbcopy',
        },
      ],
      'parameters' => {
        'basic.to_if_alone_timeout_milliseconds' => 250,
      },
    },

    ########################################
    # left_control
    ########################################

    # left_shift+left_control
    {
      'type' => 'basic',
      'from' => {
        'key_code' => 'left_control',
        'modifiers' => Karabiner.from_modifiers(['left_shift']),
      },
      'to' => [
        {
          'key_code' => 'left_control',
          'modifiers' => ['left_shift'],
          'lazy' => true,
        },
      ],
      'to_if_alone' => [
        {
          'key_code' => 'grave_accent_and_tilde',
          'modifiers' => ['left_command'],
        },
      ],
      'parameters' => {
        'basic.to_if_alone_timeout_milliseconds' => 250,
      },
    },

    # left_command+left_control
    {
      'type' => 'basic',
      'from' => {
        'key_code' => 'left_control',
        'modifiers' => Karabiner.from_modifiers(['left_command']),
      },
      'to' => [
        {
          'key_code' => 'left_control',
          'modifiers' => ['left_command'],
          'lazy' => true,
        },
      ],
      'to_if_alone' => [
        {
          'key_code' => 'grave_accent_and_tilde',
          'modifiers' => ['left_command'],
        },
      ],
      'parameters' => {
        'basic.to_if_alone_timeout_milliseconds' => 250,
      },
    },

    # left_control
    {
      'type' => 'basic',
      'from' => {
        'key_code' => 'left_control',
        'modifiers' => Karabiner.from_modifiers,
      },
      'to' => [
        {
          'key_code' => 'left_control',
          'lazy' => true,
        },
      ],
      'to_if_alone' => [
        {
          'key_code' => 'spacebar',
        },
      ],
      'parameters' => {
        'basic.to_if_alone_timeout_milliseconds' => 250,
      },
    },

    ########################################
    # left_shift
    ########################################

    # left_shift
    {
      'type' => 'basic',
      'from' => {
        'key_code' => 'left_shift',
        'modifiers' => Karabiner.from_modifiers,
      },
      'to' => [
        {
          'key_code' => 'left_shift',
        },
      ],
      'to_if_alone' => [
        {
          'key_code' => 'spacebar',
        },
      ],
      'parameters' => {
        'basic.to_if_alone_timeout_milliseconds' => 250,
      },
    },

    ########################################
    # left_command, left_option
    ########################################

    # input source switch

    {
      'type' => 'basic',
      'from' => {
        'key_code' => 'left_command',
        'modifiers' => Karabiner.from_modifiers(['left_option']),
      },
      'to' => [
        {
          'key_code' => 'left_command',
          'modifiers' => [
            'left_option',
          ],
        },
      ],
      'to_if_alone' => [
        {
          'key_code' => 'lang1',
        },
      ],
      'parameters' => {
        'basic.to_if_alone_timeout_milliseconds' => 250,
      },
    },

    {
      'type' => 'basic',
      'from' => {
        'key_code' => 'left_option',
        'modifiers' => Karabiner.from_modifiers(['left_command']),
      },
      'to' => [
        {
          'key_code' => 'left_option',
          'modifiers' => [
            'left_command',
          ],
        },
      ],
      'to_if_alone' => [
        {
          'key_code' => 'lang2',
        },
      ],
      'parameters' => {
        'basic.to_if_alone_timeout_milliseconds' => 250,
      },
    },

    ########################################
    # control + command
    ########################################

    # command+control+f -> command+shift+[
    # command+control+j -> command+shift+]
    # command+control+g -> command+[
    # command+control+h -> command+]

    #
    # command+control+f
    #

    # Excel (option+left_arrow)
    {
      'type' => 'basic',
      'from' => {
        'key_code' => 'f',
        'modifiers' => Karabiner.from_modifiers(%w[control command]),
      },
      'to' => [
        {
          'key_code' => 'left_arrow',
          'modifiers' => ['option'],
        },
      ],
      'conditions' => [
        {
          'type' => 'frontmost_application_if',
          'bundle_identifiers' => [
            '^com\.microsoft\.Excel$',
          ],
        },
      ],
    },
    # General apps (command+shift+[)
    {
      'type' => 'basic',
      'from' => {
        'key_code' => 'f',
        'modifiers' => Karabiner.from_modifiers(%w[control command]),
      },
      'to' => [
        {
          'key_code' => 'open_bracket',
          'modifiers' => %w[
            command left_shift
          ],
        },
      ],
    },

    #
    # command+control+j
    #

    # Excel (option+right_arrow)
    {
      'type' => 'basic',
      'from' => {
        'key_code' => 'j',
        'modifiers' => Karabiner.from_modifiers(%w[control command]),
      },
      'to' => [
        {
          'key_code' => 'right_arrow',
          'modifiers' => ['option'],
        },
      ],
      'conditions' => [
        {
          'type' => 'frontmost_application_if',
          'bundle_identifiers' => [
            '^com\.microsoft\.Excel$',
          ],
        },
      ],
    },
    # General apps (command+shift+])
    {
      'type' => 'basic',
      'from' => {
        'key_code' => 'j',
        'modifiers' => Karabiner.from_modifiers(%w[control command]),
      },
      'to' => [
        {
          'key_code' => 'close_bracket',
          'modifiers' => %w[
            command left_shift
          ],
        },
      ],
    },

    {
      'type' => 'basic',
      'from' => {
        'key_code' => 'g',
        'modifiers' => Karabiner.from_modifiers(%w[control command]),
      },
      'to' => [
        {
          'key_code' => 'open_bracket',
          'modifiers' => %w[
            command
          ],
        },
      ],
    },
    {
      'type' => 'basic',
      'from' => {
        'key_code' => 'h',
        'modifiers' => Karabiner.from_modifiers(%w[control command]),
      },
      'to' => [
        {
          'key_code' => 'close_bracket',
          'modifiers' => %w[
            command
          ],
        },
      ],
    },
  ]
end

def emacs
  [
    {
      'type' => 'basic',
      'from' => {
        'key_code' => 'i',
        'modifiers' => Karabiner.from_modifiers(['control'], %w[caps_lock shift]),
      },
      'to' => [{ 'key_code' => 'tab' }],
    },
    {
      'type' => 'basic',
      'from' => {
        'key_code' => 'h',
        'modifiers' => Karabiner.from_modifiers(['control'], %w[caps_lock shift]),
      },
      'to' => [{ 'key_code' => 'delete_or_backspace' }],
    },
  ]
end

def mouse
  [
    # mouse_motion_to_scroll (button5)
    {
      'type' => 'basic',
      'from' => {
        'pointing_button' => 'button5',
        'modifiers' => {
          'optional' => [
            'any',
          ],
        },
      },
      'to' => [
        Karabiner.set_variable('personal_tekezo_enable_mouse_motion_to_scroll', 1),
      ],
      'to_after_key_up' => [
        Karabiner.set_variable('personal_tekezo_enable_mouse_motion_to_scroll', 0),
      ],
      'to_if_alone' => [
        {
          'pointing_button' => 'button1',
          'modifiers' => ['left_command'],
        },
      ],
      'parameters' => {
        'basic.to_if_alone_timeout_milliseconds' => 250,
      },
    },
    {
      'type' => 'mouse_motion_to_scroll',
      'from' => {
        'modifiers' => {
          'optional' => [
            'any',
          ],
        },
      },
      'conditions' => [
        Karabiner.variable_if('personal_tekezo_enable_mouse_motion_to_scroll', 1),
      ],
    },
    # button6 -> command + click
    {
      'type' => 'basic',
      'from' => {
        'pointing_button' => 'button6',
      },
      'to' => [
        {
          'pointing_button' => 'button1',
          'modifiers' => ['left_command'],
        },
      ],
    },
  ]
end

def extra_cursor
  [
    # option+a,e to home,end
    {
      'type' => 'basic',
      'from' => {
        'key_code' => 'a',
        'modifiers' => Karabiner.from_modifiers(['left_option'], %w[caps_lock shift]),
      },
      'to' => [
        { 'key_code' => 'home' },
      ],
    },
    {
      'type' => 'basic',
      'from' => {
        'key_code' => 'e',
        'modifiers' => Karabiner.from_modifiers(['left_option'], %w[caps_lock shift]),
      },
      'to' => [
        { 'key_code' => 'end' },
      ],
    },
  ]
end

def holding_hyphen
  # long press -,= to --------------------,====================
  [
    {
      'type' => 'basic',
      'from' => {
        'key_code' => 'hyphen',
      },
      'to_if_alone' => [
        { 'key_code' => 'hyphen' },
      ],
      'to_if_held_down' => [
        { 'key_code' => 'hyphen' }, { 'key_code' => 'hyphen' },
        { 'key_code' => 'hyphen' }, { 'key_code' => 'hyphen' },
        { 'key_code' => 'hyphen' }, { 'key_code' => 'hyphen' },
        { 'key_code' => 'hyphen' }, { 'key_code' => 'hyphen' },
        { 'key_code' => 'hyphen' }, { 'key_code' => 'hyphen' },

        { 'key_code' => 'hyphen' }, { 'key_code' => 'hyphen' },
        { 'key_code' => 'hyphen' }, { 'key_code' => 'hyphen' },
        { 'key_code' => 'hyphen' }, { 'key_code' => 'hyphen' },
        { 'key_code' => 'hyphen' }, { 'key_code' => 'hyphen' },
        { 'key_code' => 'hyphen' },
        {
          'key_code' => 'hyphen',
          'repeat' => false,
        },
      ],
      'parameters' => {
        'basic.to_if_alone_timeout_milliseconds' => 250,
        'basic.to_if_held_down_threshold_milliseconds' => 250,
      },
    },
    {
      'type' => 'basic',
      'from' => {
        'key_code' => 'equal_sign',
      },
      'to_if_alone' => [
        { 'key_code' => 'equal_sign' },
      ],
      'to_if_held_down' => [
        { 'key_code' => 'equal_sign' }, { 'key_code' => 'equal_sign' },
        { 'key_code' => 'equal_sign' }, { 'key_code' => 'equal_sign' },
        { 'key_code' => 'equal_sign' }, { 'key_code' => 'equal_sign' },
        { 'key_code' => 'equal_sign' }, { 'key_code' => 'equal_sign' },
        { 'key_code' => 'equal_sign' }, { 'key_code' => 'equal_sign' },

        { 'key_code' => 'equal_sign' }, { 'key_code' => 'equal_sign' },
        { 'key_code' => 'equal_sign' }, { 'key_code' => 'equal_sign' },
        { 'key_code' => 'equal_sign' }, { 'key_code' => 'equal_sign' },
        { 'key_code' => 'equal_sign' }, { 'key_code' => 'equal_sign' },
        { 'key_code' => 'equal_sign' },
        {
          'key_code' => 'equal_sign',
          'repeat' => false,
        },
      ],
      'parameters' => {
        'basic.to_if_alone_timeout_milliseconds' => 250,
        'basic.to_if_held_down_threshold_milliseconds' => 250,
      },
    },
  ]
end

def device_specific
  result = []

  {
    '0' => 'keypad_0',
    '1' => 'keypad_1',
    '2' => 'keypad_2',
    '3' => 'keypad_3',
    '4' => 'keypad_4',
    '5' => 'keypad_5',
    '6' => 'keypad_6',
    '7' => 'keypad_7',
    '8' => 'keypad_8',
    '9' => 'keypad_9',
    'hyphen' => 'keypad_hyphen',
    'equal_sign' => 'keypad_equal_sign',
    'f1' => 'f1',
    'f2' => 'f2',
    'f3' => 'f3',
    'f4' => 'f4',
    'f5' => 'f5',
    'f6' => 'f6',
    'f7' => 'f7',
    'f8' => 'f8',
    'f9' => 'f9',
    'f10' => 'f10',
    'f11' => 'f11',
    'f12' => 'f12',
  }.each do |from, to|
    result.push({
                  'type' => 'basic',
                  'from' => {
                    'key_code' => from,
                  },
                  'to' => [
                    { 'key_code' => to },
                  ],
                  'conditions' => [
                    {
                      # The sub keyboard
                      "type": 'device_if',
                      "identifiers": [
                        {
                          'vendor_id' => 3141,
                          'product_id' => 29_699,
                        },
                      ],
                    },
                    {
                      # The main keyboard
                      "type": 'device_exists_if',
                      "identifiers": [
                        {
                          # X-Bows Optical Switches
                          'vendor_id' => 7847,
                          'product_id' => 2311,
                        },
                        {
                          # X-Bows QMK/VIA
                          'vendor_id' => 22_594,
                          'product_id' => 20_065,
                        },
                      ],
                    },
                  ],
                })
  end

  result
end

def app_virtual_machine
  [
    {
      'type' => 'basic',
      'from' => {
        'key_code' => 'h',
        'modifiers' => Karabiner.from_modifiers(['left_control'], %w[caps_lock option]),
      },
      'to' => [
        { 'key_code' => 'delete_or_backspace' },
      ],
      'conditions' => [
        Karabiner.frontmost_application_if(%w[remote_desktop virtual_machine]),
      ],
    },
    {
      'type' => 'basic',
      'from' => {
        'key_code' => 'd',
        'modifiers' => Karabiner.from_modifiers(['left_control'], %w[caps_lock option]),
      },
      'to' => [
        { 'key_code' => 'delete_forward' },
      ],
      'conditions' => [
        Karabiner.frontmost_application_if(%w[remote_desktop virtual_machine]),
      ],
    },
    {
      'type' => 'basic',
      'from' => {
        'key_code' => 'i',
        'modifiers' => Karabiner.from_modifiers(['left_control'], ['caps_lock']),
      },
      'to' => [
        { 'key_code' => 'tab' },
      ],
      'conditions' => [
        Karabiner.frontmost_application_if(%w[remote_desktop virtual_machine]),
      ],
    },
    {
      'type' => 'basic',
      'from' => {
        'key_code' => 'b',
        'modifiers' => Karabiner.from_modifiers(['left_control'], %w[caps_lock shift option]),
      },
      'to' => [
        { 'key_code' => 'left_arrow' },
      ],
      'conditions' => [
        Karabiner.frontmost_application_if(%w[remote_desktop virtual_machine]),
      ],
    },
    {
      'type' => 'basic',
      'from' => {
        'key_code' => 'f',
        'modifiers' => Karabiner.from_modifiers(['left_control'], %w[caps_lock shift option]),
      },
      'to' => [
        { 'key_code' => 'right_arrow' },
      ],
      'conditions' => [
        Karabiner.frontmost_application_if(%w[remote_desktop virtual_machine]),
      ],
    },
    {
      'type' => 'basic',
      'from' => {
        'key_code' => 'n',
        'modifiers' => Karabiner.from_modifiers(['left_control'], %w[caps_lock shift option]),
      },
      'to' => [
        { 'key_code' => 'down_arrow' },
      ],
      'conditions' => [
        Karabiner.frontmost_application_if(%w[remote_desktop virtual_machine]),
      ],
    },
    {
      'type' => 'basic',
      'from' => {
        'key_code' => 'p',
        'modifiers' => Karabiner.from_modifiers(['left_control'], %w[caps_lock shift option]),
      },
      'to' => [
        { 'key_code' => 'up_arrow' },
      ],
      'conditions' => [
        Karabiner.frontmost_application_if(%w[remote_desktop virtual_machine]),
      ],
    },
    {
      'type' => 'basic',
      'from' => {
        'key_code' => 'a',
        'modifiers' => Karabiner.from_modifiers(['left_control'], %w[caps_lock shift]),
      },
      'to' => [
        { 'key_code' => 'home' },
      ],
      'conditions' => [
        Karabiner.frontmost_application_if(%w[remote_desktop virtual_machine]),
      ],
    },
    {
      'type' => 'basic',
      'from' => {
        'key_code' => 'e',
        'modifiers' => Karabiner.from_modifiers(['left_control'], %w[caps_lock shift]),
      },
      'to' => [
        { 'key_code' => 'end' },
      ],
      'conditions' => [
        Karabiner.frontmost_application_if(%w[remote_desktop virtual_machine]),
      ],
    },
  ]
end

def app_finder
  [
    {
      'type' => 'basic',
      'from' => {
        'key_code' => 'l',
        'modifiers' => Karabiner.from_modifiers(['command'], ['caps_lock']),
      },
      'conditions' => [
        Karabiner.frontmost_application_if(['finder']),
      ],
    },
    {
      'type' => 'basic',
      'from' => {
        'key_code' => 'q',
        'modifiers' => Karabiner.from_modifiers(['control'], ['caps_lock']),
      },
      'to' => [
        {
          'key_code' => 'up_arrow',
          'modifiers' => ['left_command'],
        },
      ],
      'conditions' => [
        Karabiner.frontmost_application_if(['finder']),
      ],
    },
  ]
end

def app_terminal
  [
    # Disable command+d
    {
      'type' => 'basic',
      'from' => {
        'key_code' => 'd',
        'modifiers' => Karabiner.from_modifiers(['command']),
      },
      'conditions' => [
        Karabiner.frontmost_application_if(['terminal']),
      ],
    },
    # Disable command+f
    {
      'type' => 'basic',
      'from' => {
        'key_code' => 'f',
        'modifiers' => Karabiner.from_modifiers(['command']),
      },
      'conditions' => [
        Karabiner.frontmost_application_if(['terminal']),
      ],
    },
    # Disable command+o
    {
      'type' => 'basic',
      'from' => {
        'key_code' => 'o',
        'modifiers' => Karabiner.from_modifiers(['command']),
      },
      'conditions' => [
        Karabiner.frontmost_application_if(['terminal']),
      ],
    },
    # Disable command+w
    {
      'type' => 'basic',
      'from' => {
        'key_code' => 'w',
        'modifiers' => Karabiner.from_modifiers(['command']),
      },
      'conditions' => [
        Karabiner.frontmost_application_if(['terminal']),
      ],
    },
    # Change command+t to option+t
    {
      'type' => 'basic',
      'from' => {
        'key_code' => 't',
        'modifiers' => Karabiner.from_modifiers(['command']),
      },
      'to' => {
        'key_code' => 't',
        'modifiers' => [
          'left_option',
        ],
      },
      'conditions' => [
        Karabiner.frontmost_application_if(['terminal']),
      ],
    },
  ]
end

def app_browser
  [
    # Disable command+d (bookmark this tab @ Google Chrome)
    {
      'type' => 'basic',
      'from' => {
        'key_code' => 'd',
        'modifiers' => Karabiner.from_modifiers(['command'], ['caps_lock']),
      },
      'conditions' => [
        Karabiner.frontmost_application_if(['browser']),
      ],
    },
    # Disable command+shift+d (bookmark all tabs @ Google Chrome)
    {
      'type' => 'basic',
      'from' => {
        'key_code' => 'd',
        'modifiers' => Karabiner.from_modifiers(%w[command shift], ['caps_lock']),
      },
      'conditions' => [
        Karabiner.frontmost_application_if(['browser']),
      ],
    },
    # Disable command+shift+i (share email link @ Google Chrome)
    {
      'type' => 'basic',
      'from' => {
        'key_code' => 'i',
        'modifiers' => Karabiner.from_modifiers(%w[command shift], ['caps_lock']),
      },
      'conditions' => [
        Karabiner.frontmost_application_if(['browser']),
      ],
    },
    # Change control+a,e to command+arrow keys
    {
      'type' => 'basic',
      'from' => {
        'key_code' => 'a',
        'modifiers' => Karabiner.from_modifiers(['control'], %w[caps_lock shift]),
      },
      'to' => [
        {
          'key_code' => 'left_arrow',
          'modifiers' => ['left_command'],
        },
      ],
      'conditions' => [
        Karabiner.frontmost_application_if(['browser']),
      ],
    },
    {
      'type' => 'basic',
      'from' => {
        'key_code' => 'e',
        'modifiers' => Karabiner.from_modifiers(['control'], %w[caps_lock shift]),
      },
      'to' => [
        {
          'key_code' => 'right_arrow',
          'modifiers' => ['left_command'],
        },
      ],
      'conditions' => [
        Karabiner.frontmost_application_if(['browser']),
      ],
    },
  ]
end

def app_microsoft_office
  [
    {
      'type' => 'basic',
      'from' => {
        'key_code' => 'e',
        'modifiers' => Karabiner.from_modifiers(['command'], ['caps_lock']),
      },
      'to' => {
        'key_code' => 'f2',
      },
      'conditions' => [
        {
          'type' => 'frontmost_application_if',
          'bundle_identifiers' => [
            '^com\.microsoft\.Excel$',
          ],
        },
      ],
    },
  ]
end

def app_visual_studio_code
  [
    # option+n -> control+page_down
    {
      'type' => 'basic',
      'from' => {
        'key_code' => 'n',
        'modifiers' => Karabiner.from_modifiers(['option'], ['caps_lock']),
      },
      'to' => [
        {
          'key_code' => 'page_down',
          'modifiers' => ['left_control'],
        },
      ],
      'conditions' => [
        Karabiner.frontmost_application_if(['visual_studio_code']),
      ],
    },
    # option+p -> control+page_up
    {
      'type' => 'basic',
      'from' => {
        'key_code' => 'p',
        'modifiers' => Karabiner.from_modifiers(['option'], ['caps_lock']),
      },
      'to' => [
        {
          'key_code' => 'page_up',
          'modifiers' => ['left_control'],
        },
      ],
      'conditions' => [
        Karabiner.frontmost_application_if(['visual_studio_code']),
      ],
    },
    # disable control+t
    {
      'type' => 'basic',
      'from' => {
        'key_code' => 't',
        'modifiers' => Karabiner.from_modifiers(['control'], ['caps_lock']),
      },
      'conditions' => [
        Karabiner.frontmost_application_if(['visual_studio_code']),
      ],
    },
  ]
end

main
