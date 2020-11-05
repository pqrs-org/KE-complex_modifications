#!/usr/bin/env ruby
# frozen_string_literal: true

# You can generate json by executing the following command on Terminal.
#
# $ ruby ./personal_tekezo.json.rb
#

require 'json'
require_relative '../lib/karabiner.rb'

def main
  puts JSON.pretty_generate(
    'title' => 'Personal rules (@tekezo)',
    'maintainers' => ['tekezo'],
    'rules' => [
      {
        'description' => 'Personal rules (@tekezo) (rev 27)',
        'manipulators' =>
        core_configuration +
        mouse +
        control_1234 +
        option_hyphen +
        media_controls +
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
    # right_command
    ########################################

    #
    # virtual_machine
    #

    # left_control + right_command -> input switch
    {
      'type' => 'basic',
      'from' => {
        'key_code' => 'right_command',
        'modifiers' => Karabiner.from_modifiers(['left_control']),
      },
      'to' => [
        {
          'key_code' => 'right_control',
          'modifiers' => ['left_control'],
          'lazy' => true,
        },
      ],
      'to_if_alone' => [
        {
          'key_code' => 'grave_accent_and_tilde',
          'modifiers' => ['left_option'],
        },
      ],
      'conditions' => [
        Karabiner.frontmost_application_if(%w[remote_desktop virtual_machine]),
      ],
      'parameters' => {
        'basic.to_if_alone_timeout_milliseconds' => 250,
      },
    },

    # right_command (virtual_machine)
    {
      'type' => 'basic',
      'from' => {
        'key_code' => 'right_command',
        'modifiers' => Karabiner.from_modifiers,
      },
      'to' => [
        {
          'key_code' => 'right_control',
          'lazy' => true,
        },
      ],
      'conditions' => [
        Karabiner.frontmost_application_if(%w[remote_desktop virtual_machine]),
      ],
    },

    #
    # except virtual_machine
    #

    # left_control + right_command -> input switch
    {
      'type' => 'basic',
      'from' => {
        'key_code' => 'right_command',
        'modifiers' => Karabiner.from_modifiers(['left_control']),
      },
      'to' => [
        {
          'key_code' => 'right_command',
          'modifiers' => ['left_control'],
          'lazy' => true,
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

    # right_command (lazy)
    {
      'type' => 'basic',
      'from' => {
        'key_code' => 'right_command',
        'modifiers' => Karabiner.from_modifiers,
      },
      'to' => [
        {
          'key_code' => 'right_command',
          'lazy' => true,
        },
      ],
    },

    ########################################
    # left_command
    ########################################

    {
      'type' => 'basic',
      'from' => {
        'key_code' => 'left_command',
        'modifiers' => Karabiner.from_modifiers,
      },
      'to' => [
        {
          'key_code' => 'left_control',
          'lazy' => true,
        },
      ],
    },

    ########################################
    # right_option
    ########################################

    # virtual_machine
    {
      'type' => 'basic',
      'from' => {
        'key_code' => 'right_option',
        'modifiers' => Karabiner.from_modifiers(['left_control']),
      },
      'to' => [
        {
          'key_code' => 'right_option',
          'modifiers' => ['left_control'],
          'lazy' => true,
        },
      ],
      'to_if_alone' => [
        {
          'key_code' => 'grave_accent_and_tilde',
          'modifiers' => ['left_option'],
        },
      ],
      'conditions' => [
        Karabiner.frontmost_application_if(%w[remote_desktop virtual_machine]),
      ],
      'parameters' => {
        'basic.to_if_alone_timeout_milliseconds' => 250,
      },
    },

    # except virtual_machine
    {
      'type' => 'basic',
      'from' => {
        'key_code' => 'right_option',
        'modifiers' => Karabiner.from_modifiers(['left_control']),
      },
      'to' => [
        {
          'key_code' => 'right_option',
          'modifiers' => ['left_control'],
          'lazy' => true,
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

    ########################################
    # spacebar
    ########################################

    # right_command+spacebar
    {
      'type' => 'basic',
      'from' => {
        'key_code' => 'spacebar',
        'modifiers' => Karabiner.from_modifiers(['right_command']),
      },
      'to' => [
        {
          'key_code' => 'left_shift',
          'modifiers' => ['right_command'],
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

    # right_option+spacebar
    {
      'type' => 'basic',
      'from' => {
        'key_code' => 'spacebar',
        'modifiers' => Karabiner.from_modifiers(['right_option']),
      },
      'to' => [
        {
          'key_code' => 'left_shift',
          'modifiers' => ['right_option'],
        },
      ],
      'to_if_alone' => [
        {
          'key_code' => 'tab',
          'modifiers' => ['left_command'],
        },
        {
          'key_code' => 'vk_none',
        }
      ],
      'parameters' => {
        'basic.to_if_alone_timeout_milliseconds' => 250,
      },
    },

    # spacebar
    {
      'type' => 'basic',
      'from' => {
        'key_code' => 'spacebar',
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
    # control + command
    ########################################

    # command+control+f -> command+shift+[
    # command+control+j -> command+shift+]
    # command+control+g -> command+[
    # command+control+h -> command+]

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

def control_1234
  # control+1,2,3,4 to home,page_down,page_up,end
  [
    {
      'type' => 'basic',
      'from' => {
        'key_code' => '1',
        'modifiers' => Karabiner.from_modifiers(['left_control'], %w[caps_lock shift]),
      },
      'to' => [
        { 'key_code' => 'home' },
      ],
    },
    {
      'type' => 'basic',
      'from' => {
        'key_code' => '2',
        'modifiers' => Karabiner.from_modifiers(['left_control'], %w[caps_lock shift]),
      },
      'to' => [
        { 'key_code' => 'page_down' },
      ],
    },
    {
      'type' => 'basic',
      'from' => {
        'key_code' => '3',
        'modifiers' => Karabiner.from_modifiers(['left_control'], %w[caps_lock shift]),
      },
      'to' => [
        { 'key_code' => 'page_up' },
      ],
    },
    {
      'type' => 'basic',
      'from' => {
        'key_code' => '4',
        'modifiers' => Karabiner.from_modifiers(['left_control'], %w[caps_lock shift]),
      },
      'to' => [
        { 'key_code' => 'end' },
      ],
    },
  ]
end

def option_hyphen
  # option+-,= to ----------,==========
  [
    {
      'type' => 'basic',
      'from' => {
        'key_code' => 'hyphen',
        'modifiers' => Karabiner.from_modifiers(['option'], ['caps_lock']),
      },
      'to' => [
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
    },
    {
      'type' => 'basic',
      'from' => {
        'key_code' => 'equal_sign',
        'modifiers' => Karabiner.from_modifiers(['option'], ['caps_lock']),
      },
      'to' => [
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
    },
  ]
end

def media_controls
  # Change fn+page_up,page_down to brightness control
  # Change page_up,page_down to volume control
  [
    # fn+page_down
    {
      'type' => 'basic',
      'from' => {
        'key_code' => 'page_down',
        'modifiers' => Karabiner.from_modifiers(['fn'], ['any']),
      },
      'to' => [
        { 'consumer_key_code' => 'display_brightness_decrement' },
      ],
    },
    # fn+page_up
    {
      'type' => 'basic',
      'from' => {
        'key_code' => 'page_up',
        'modifiers' => Karabiner.from_modifiers(['fn'], ['any']),
      },
      'to' => [
        { 'consumer_key_code' => 'display_brightness_increment' },
      ],
    },
    # page_down
    {
      'type' => 'basic',
      'from' => {
        'key_code' => 'page_down',
        'modifiers' => Karabiner.from_modifiers([], ['any']),
      },
      'to' => [
        { 'consumer_key_code' => 'volume_decrement' },
      ],
    },
    # page_up
    {
      'type' => 'basic',
      'from' => {
        'key_code' => 'page_up',
        'modifiers' => Karabiner.from_modifiers([], ['any']),
      },
      'to' => [
        { 'consumer_key_code' => 'volume_increment' },
      ],
    },
  ]
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
