#!/usr/bin/env ruby

# You can generate json by executing the following command on Terminal.
#
# $ ruby ./personal_tekezo.json.rb
#

require 'json'
require_relative '../lib/karabiner.rb'

def main
  puts JSON.pretty_generate(
    'title' => 'Personal rules (@tekezo)',
    'rules' => [
      {
        'description' => 'Change left_control+1/2 to home/end (rev 3)',
        'manipulators' => [
          {
            'type' => 'basic',
            'from' => {
              'key_code' => '1',
              'modifiers' => Karabiner.from_modifiers(['left_control'], ['any']),
            },
            'to' => [
              { 'key_code' => 'home' },
            ],
          },
          {
            'type' => 'basic',
            'from' => {
              'key_code' => '2',
              'modifiers' => Karabiner.from_modifiers(['left_control'], ['any']),
            },
            'to' => [
              { 'key_code' => 'end' },
            ],
          },
        ],
      },

      {
        'description' => 'Change option+hyphen, option+equal to ----------,========== (rev 2)',
        'manipulators' => [
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
        ],
      },

      {
        'description' => 'Configurations for apps (rev 8)',
        'manipulators' => [
          # remote_desktop, virtual_machine
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

          # finder
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

          # terminal
          {
            'type' => 'basic',
            'from' => {
              'key_code' => 'o',
              'modifiers' => Karabiner.from_modifiers(['command'], ['any']),
            },
            'conditions' => [
              Karabiner.frontmost_application_if(['terminal']),
            ],
          },
          {
            'type' => 'basic',
            'from' => {
              'key_code' => 'f',
              'modifiers' => Karabiner.from_modifiers(['command'], ['any']),
            },
            'conditions' => [
              Karabiner.frontmost_application_if(['terminal']),
            ],
          },
          {
            'type' => 'basic',
            'from' => {
              'key_code' => 'f19',
              'modifiers' => Karabiner.from_modifiers(nil, ['caps_lock']),
            },
            'to' => [
              {
                'key_code' => 'u',
                'modifiers' => ['left_control'],
              },
              { 'key_code' => 'e' },
              { 'key_code' => 'x' },
              { 'key_code' => 'i' },
              { 'key_code' => 't' },
              { 'key_code' => 'return_or_enter' },
            ],
            'conditions' => [
              Karabiner.frontmost_application_if(['terminal']),
            ],
          },

          # browser
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

          # others
          {
            'type' => 'basic',
            'from' => {
              'key_code' => 'q',
              'modifiers' => Karabiner.from_modifiers(['command'], ['caps_lock']),
            },
            'conditions' => [
              Karabiner.frontmost_application_if(['activity_monitor']),
            ],
          },
          {
            'type' => 'basic',
            'from' => {
              'key_code' => 'w',
              'modifiers' => Karabiner.from_modifiers(['command'], ['caps_lock']),
            },
            'conditions' => [
              Karabiner.frontmost_application_if(['adium']),
            ],
          },
        ],
      },

      {
        'description' => 'Extra emacs key bindings (rev 6)',
        'manipulators' => [
          # in Visual Studio Code

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
        ],
      },
      {
        'description' => 'Miscellaneous configuration @tekezo (rev 3)',
        'manipulators' => [
          {
            'type' => 'basic',
            'from' => {
              'key_code' => 'tab',
              'modifiers' => Karabiner.from_modifiers(nil, ['any']),
            },
            'to' => [
              {
                'key_code' => 'left_command',
              },
            ],
            'to_if_alone' => [
              {
                'key_code' => 'grave_accent_and_tilde',
                'modifiers' => ['left_command'],
              },
            ],
          },
          {
            'type' => 'basic',
            'from' => {
              'key_code' => 'f18',
              'modifiers' => Karabiner.from_modifiers(['control'], ['caps_lock']),
            },
            'to' => [
              { 'key_code' => 'lang2' },
            ],
          },
          {
            'type' => 'basic',
            'from' => {
              'key_code' => 'f18',
              'modifiers' => Karabiner.from_modifiers(['command'], ['caps_lock']),
            },
            'to' => [
              { 'key_code' => 'lang1' },
            ],
          },
          {
            'type' => 'basic',
            'from' => {
              'key_code' => 'f18',
              'modifiers' => Karabiner.from_modifiers(nil, ['any']),
            },
            'to' => [
              { 'key_code' => 'spacebar' },
            ],
          },
          {
            'type' => 'basic',
            'from' => {
              'simultaneous' => [
                {
                  'key_code' => 'escape',
                },
                {
                  'key_code' => '1',
                },
              ],
            },
            'to' => [
              {
                'consumer_key_code' => 'display_brightness_decrement',
              },
            ],
          },
          {
            'type' => 'basic',
            'from' => {
              'simultaneous' => [
                {
                  'key_code' => 'escape',
                },
                {
                  'key_code' => '2',
                },
              ],
            },
            'to' => [
              {
                'consumer_key_code' => 'display_brightness_increment',
              },
            ],
          },

          # right_command (virtual_machine)
          {
            'type' => 'basic',
            'from' => {
              'key_code' => 'right_command',
              'modifiers' => Karabiner.from_modifiers(nil, ['any']),
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

          # right_command
          {
            'type' => 'basic',
            'from' => {
              'key_code' => 'right_command',
              'modifiers' => Karabiner.from_modifiers(nil, ['any']),
            },
            'to' => [
              {
                'key_code' => 'right_command',
                'lazy' => true,
              },
            ],
          },

        ],
      },
    ]
  )
end

main
