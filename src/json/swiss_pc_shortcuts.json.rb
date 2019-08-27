#!/usr/bin/env ruby

# You can generate json by executing the following command on Terminal.
#
# $ ruby ./swiss_pc_shortcuts.json.rb
#

############################################################

require 'json'
require_relative '../lib/karabiner.rb'

def main
  puts JSON.pretty_generate(
    "title": "Swiss PC-Style Shortcuts (AltGr+' -> '´', AltGr+< -> 'backslash', AltGr+è -> '[', AltGr+¨ -> ']', AltGr+à -> '{', AltGr+$ -> '}')",
    "rules": [
      {
        "description": "AltGr+< -> 'backslash'",
        "manipulators": [
          {
            'from' => {
              'key_code' => 'grave_accent_and_tilde',
              'modifiers' => Karabiner.from_modifiers(['right_option']),
            },
            'to' => [
              {
                'key_code' => '7',
                'modifiers' => %w[option left_shift],
              },
            ],
            "type": 'basic',
            'conditions' => [
              Karabiner.frontmost_application_unless(%w[remote_desktop virtual_machine]),
            ],
          },
        ],
      },
      {
        "description": "AltGr+' -> '´'",
        "manipulators": [
          {
            'from' => {
              'key_code' => 'hyphen',
              'modifiers' => Karabiner.from_modifiers(['right_option']),
            },
            'to' => [
              {
                'key_code' => 'equal_sign',
                'modifiers' => ['option'],
              },
            ],
            "type": 'basic',
            'conditions' => [
              Karabiner.frontmost_application_unless(%w[remote_desktop virtual_machine]),
            ],
          },
        ],
      },
      {
        "description": "AltGr+è -> '['",
        "manipulators": [
          {
            'from' => {
              'key_code' => 'open_bracket',
              'modifiers' => Karabiner.from_modifiers(['right_option']),
            },
            'to' => [
              {
                'key_code' => '5',
                'modifiers' => ['option'],
              },
            ],
            "type": 'basic',
            'conditions' => [
              Karabiner.frontmost_application_unless(%w[remote_desktop virtual_machine]),
            ],
          },
        ],
      },
      {
        "description": "AltGr+¨-> ']'",
        "manipulators": [
          {
            'from' => {
              'key_code' => 'close_bracket',
              'modifiers' => Karabiner.from_modifiers(['right_option']),
            },
            'to' => [
              {
                'key_code' => '6',
                'modifiers' => ['option'],
              },
            ],
            "type": 'basic',
            'conditions' => [
              Karabiner.frontmost_application_unless(%w[remote_desktop virtual_machine]),
            ],
          },
        ],
      },
      {
        "description": "AltGr+2 -> '@'",
        "manipulators": [
          {
            'from' => {
              'key_code' => '2',
              'modifiers' => Karabiner.from_modifiers(['right_option']),
            },
            'to' => [
              {
                'key_code' => 'g',
                'modifiers' => ['option'],
              },
            ],
            "type": 'basic',
            'conditions' => [
              Karabiner.frontmost_application_unless(%w[remote_desktop virtual_machine]),
            ],
          },
        ],
      },
      {
        "description": "AltGr+à -> '{'",
        "manipulators": [
          {
            'from' => {
              'key_code' => 'quote',
              'modifiers' => Karabiner.from_modifiers(['right_option']),
            },
            'to' => [
              {
                'key_code' => '8',
                'modifiers' => ['option'],
              },
            ],
            "type": 'basic',
            'conditions' => [
              Karabiner.frontmost_application_unless(%w[remote_desktop virtual_machine]),
            ],
          },
        ],
      },
      {
        "description": "AltGr+$ -> '}'",
        "manipulators": [
          {
            'from' => {
              'key_code' => 'non_us_pound',
              'modifiers' => Karabiner.from_modifiers(['right_option']),
            },
            'to' => [
              {
                'key_code' => '9',
                'modifiers' => ['option'],
              },
            ],
            "type": 'basic',
            'conditions' => [
              Karabiner.frontmost_application_unless(%w[remote_desktop virtual_machine]),
            ],
          },
        ],
      },
      {
        "description": "AltGr+^ -> '~'",
        "manipulators": [
          {
            'from' => {
              'key_code' => 'equal_sign',
              'modifiers' => Karabiner.from_modifiers(['right_option']),
            },
            'to' => [
              {
                'key_code' => 'n',
                'modifiers' => ['option'],
              },
            ],
            "type": 'basic',
            'conditions' => [
              Karabiner.frontmost_application_unless(%w[remote_desktop virtual_machine]),
            ],
          },
        ],
      },
    ]
  )
end

main
