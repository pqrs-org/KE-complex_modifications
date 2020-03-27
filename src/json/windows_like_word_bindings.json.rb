#!/usr/bin/env ruby

# You can generate json by executing the following command on Terminal.
#
# $ ruby ./emacs_key_bindings.json.rb
#

require 'json'
require_relative '../lib/karabiner.rb'

def main
  puts JSON.pretty_generate(
    'title' => '[macOS] Windows-like word movement/selection/deletion',
    'maintainers' => ['tyru'],
    'rules' => [
      ctrl_arrow_movements,
      ctrl_arrow_selections,
      ctrl_arrow_deletions,
    ]
  )
end

def ctrl_arrow_movements
  {
    'description' => 'Ctrl + Arrow Keys to Option + Arrow Keys',
    'manipulators' => [
      {
        'from' => {
          'key_code' => 'up_arrow',
          'modifiers' => {
            'mandatory' => ['control'],
          },
        },
        'to' => [
          {
            'key_code' => 'up_arrow',
            'modifiers' => ['option'],
          },
        ],
        'type' => 'basic',
      },
      {
        'from' => {
          'key_code' => 'down_arrow',
          'modifiers' => {
            'mandatory' => ['control'],
          },
        },
        'to' => [
          {
            'key_code' => 'down_arrow',
            'modifiers' => ['option'],
          },
        ],
        'type' => 'basic',
      },
      {
        'from' => {
          'key_code' => 'left_arrow',
          'modifiers' => {
            'mandatory' => ['control'],
          },
        },
        'to' => [
          {
            'key_code' => 'left_arrow',
            'modifiers' => ['option'],
          },
        ],
        'type' => 'basic',
      },
      {
        'from' => {
          'key_code' => 'right_arrow',
          'modifiers' => {
            'mandatory' => ['control'],
          },
        },
        'to' => [
          {
            'key_code' => 'right_arrow',
            'modifiers' => ['option'],
          },
        ],
        'type' => 'basic',
      },
    ],
  }
end

def ctrl_arrow_selections
  {
    'description' => 'Ctrl + Shift + Arrow Keys to Option + Shift + Arrow Keys',
    'manipulators' => [
      {
        'from' => {
          'key_code' => 'up_arrow',
          'modifiers' => {
            'mandatory' => ['control', 'shift'],
          },
        },
        'to' => [
          {
            'key_code' => 'up_arrow',
            'modifiers' => ['option', 'shift'],
          },
        ],
        'type' => 'basic',
      },
      {
        'from' => {
          'key_code' => 'down_arrow',
          'modifiers' => {
            'mandatory' => ['control', 'shift'],
          },
        },
        'to' => [
          {
            'key_code' => 'down_arrow',
            'modifiers' => ['option', 'shift'],
          },
        ],
        'type' => 'basic',
      },
      {
        'from' => {
          'key_code' => 'left_arrow',
          'modifiers' => {
            'mandatory' => ['control', 'shift'],
          },
        },
        'to' => [
          {
            'key_code' => 'left_arrow',
            'modifiers' => ['option', 'shift'],
          },
        ],
        'type' => 'basic',
      },
      {
        'from' => {
          'key_code' => 'right_arrow',
          'modifiers' => {
            'mandatory' => ['control', 'shift'],
          },
        },
        'to' => [
          {
            'key_code' => 'right_arrow',
            'modifiers' => ['option', 'shift'],
          },
        ],
        'type' => 'basic',
      },
    ],
  }
end

def ctrl_arrow_deletions
  {
    'description' => 'Ctrl + BS/Del Keys to Option + BS/Del Keys',
    'manipulators' => [
      {
        'from' => {
          'key_code' => 'delete_or_backspace',
          'modifiers' => {
            'mandatory' => ['control'],
          },
        },
        'to' => [
          {
            'key_code' => 'delete_or_backspace',
            'modifiers' => ['option'],
          },
        ],
        'type' => 'basic',
      },
      {
        'from' => {
          'key_code' => 'delete_forward',
          'modifiers' => {
            'mandatory' => ['control'],
          },
        },
        'to' => [
          {
            'key_code' => 'delete_forward',
            'modifiers' => ['option'],
          },
        ],
        'type' => 'basic',
      },
    ],
  }
end

main
