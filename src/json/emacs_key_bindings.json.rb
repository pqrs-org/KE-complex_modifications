#!/usr/bin/env ruby

# You can generate json by executing the following command on Terminal.
#
# $ ruby ./emacs_key_bindings.json.rb
#

require 'json'
require_relative '../lib/karabiner.rb'

CONDITIONS = {
  :c_x => {
    'type' => 'variable_if',
    'name' => 'C-x',
    'value' => 1,
  },
}.freeze

def main
  puts JSON.pretty_generate(
    'title' => 'Emacs key bindings (rev 10)',
    'rules' => [
      {
        'description' => 'Emacs key bindings [C-x key strokes] (rev 1)',
        'manipulators' => [
          # C-x C-c (quit)
          {
            'type' => 'basic',
            'from' => {
              'key_code' => 'c',
              'modifiers' => Karabiner.from_modifiers(['control'], ['caps_lock']),
            },
            'to' => [
              {
                'key_code' => 'q',
                'modifiers' => ['left_command'],
              },
            ],
            'conditions' => [CONDITIONS[:c_x]],
          },

          # C-x C-f (open file)
          {
            'type' => 'basic',
            'from' => {
              'key_code' => 'f',
              'modifiers' => Karabiner.from_modifiers(['control'], ['caps_lock']),
            },
            'to' => [
              {
                'key_code' => 'o',
                'modifiers' => ['left_command'],
              },
            ],
            'conditions' => [CONDITIONS[:c_x]],
          },

          # C-x C-s (save file)
          {
            'type' => 'basic',
            'from' => {
              'key_code' => 's',
              'modifiers' => Karabiner.from_modifiers(['control'], ['caps_lock']),
            },
            'to' => [
              {
                'key_code' => 's',
                'modifiers' => ['left_command'],
              },
            ],
            'conditions' => [CONDITIONS[:c_x]],
          },

          # Ignore other keys after C-x
          {
            'type' => 'basic',
            'from' => {
              'any' => 'key_code',
              'modifiers' => Karabiner.from_modifiers(nil, ['any']),
            },
            'conditions' => [CONDITIONS[:c_x]],
          },

          # C-x
          {
            'type' => 'basic',
            'from' => {
              'key_code' => 'x',
              'modifiers' => Karabiner.from_modifiers(['control'], ['caps_lock']),
            },
            'to' => [
              {
                'set_variable' => {
                  'name' => 'C-x',
                  'value' => 1,
                },
              },
            ],
            'to_delayed_action' => {
              'to_if_invoked' => [
                {
                  'set_variable' => {
                    'name' => 'C-x',
                    'value' => 0,
                  },
                },
              ],
              'to_if_canceled' => [
                {
                  'set_variable' => {
                    'name' => 'C-x',
                    'value' => 0,
                  },
                },
              ],
            },
            'conditions' => [Karabiner.frontmost_application_unless(['emacs_key_bindings_exception'])],
          },
        ],
      },
      {
        'description' => 'Emacs key bindings [control+keys] (rev 9)',
        'manipulators' => [
          {
            'type' => 'basic',
            'from' => {
              'key_code' => 'd',
              'modifiers' => Karabiner.from_modifiers(['control'], %w[caps_lock option]),
            },
            'to' => [{ 'key_code' => 'delete_forward' }],
            'conditions' => [Karabiner.frontmost_application_unless(['emacs_key_bindings_exception'])],
          },
          {
            'type' => 'basic',
            'from' => {
              'key_code' => 'h',
              'modifiers' => Karabiner.from_modifiers(['control'], %w[caps_lock option]),
            },
            'to' => [{ 'key_code' => 'delete_or_backspace' }],
            'conditions' => [Karabiner.frontmost_application_unless(['emacs_key_bindings_exception'])],
          },
          {
            'type' => 'basic',
            'from' => {
              'key_code' => 'i',
              'modifiers' => Karabiner.from_modifiers(['control'], %w[caps_lock shift]),
            },
            'to' => [{ 'key_code' => 'tab' }],
            'conditions' => [Karabiner.frontmost_application_unless(['emacs_key_bindings_exception'])],
          },
          {
            'type' => 'basic',
            'from' => {
              'key_code' => 'open_bracket',
              'modifiers' => Karabiner.from_modifiers(['control'], ['caps_lock']),
            },
            'to' => [{ 'key_code' => 'escape' }],
            'conditions' => [Karabiner.keyboard_type_if(%w[ansi iso])],
          },
          {
            'type' => 'basic',
            'from' => {
              'key_code' => 'close_bracket',
              'modifiers' => Karabiner.from_modifiers(['control'], ['caps_lock']),
            },
            'to' => [{ 'key_code' => 'escape' }],
            'conditions' => [Karabiner.keyboard_type_if(['jis'])],
          },
          {
            'type' => 'basic',
            'from' => {
              'key_code' => 'm',
              'modifiers' => Karabiner.from_modifiers(['control'], %w[caps_lock shift option]),
            },
            'to' => [{ 'key_code' => 'return_or_enter' }],
          },
          {
            'type' => 'basic',
            'from' => {
              'key_code' => 'b',
              'modifiers' => Karabiner.from_modifiers(['control'], %w[caps_lock shift option]),
            },
            'to' => [{ 'key_code' => 'left_arrow' }],
            'conditions' => [Karabiner.frontmost_application_unless(['emacs_key_bindings_exception'])],
          },
          {
            'type' => 'basic',
            'from' => {
              'key_code' => 'f',
              'modifiers' => Karabiner.from_modifiers(['control'], %w[caps_lock shift option]),
            },
            'to' => [{ 'key_code' => 'right_arrow' }],
            'conditions' => [Karabiner.frontmost_application_unless(['emacs_key_bindings_exception'])],
          },
          {
            'type' => 'basic',
            'from' => {
              'key_code' => 'n',
              'modifiers' => Karabiner.from_modifiers(['control'], %w[caps_lock shift option]),
            },
            'to' => [{ 'key_code' => 'down_arrow' }],
            'conditions' => [Karabiner.frontmost_application_unless(['emacs_key_bindings_exception'])],
          },
          {
            'type' => 'basic',
            'from' => {
              'key_code' => 'p',
              'modifiers' => Karabiner.from_modifiers(['control'], %w[caps_lock shift option]),
            },
            'to' => [{ 'key_code' => 'up_arrow' }],
            'conditions' => [Karabiner.frontmost_application_unless(['emacs_key_bindings_exception'])],
          },
          {
            'type' => 'basic',
            'from' => {
              'key_code' => 'v',
              'modifiers' => Karabiner.from_modifiers(['control'], %w[caps_lock shift]),
            },
            'to' => [{ 'key_code' => 'page_down' }],
            'conditions' => [Karabiner.frontmost_application_unless(['emacs_key_bindings_exception'])],
          },
          {
            'type' => 'basic',
            'from' => {
              'key_code' => 'a',
              'modifiers' => Karabiner.from_modifiers(['control'], %w[caps_lock shift]),
            },
            'to' => [{ 'key_code' => 'home' }],
            'conditions' => [Karabiner.frontmost_application_if(['microsoft_office'])],
          },
          {
            'type' => 'basic',
            'from' => {
              'key_code' => 'e',
              'modifiers' => Karabiner.from_modifiers(['control'], %w[caps_lock shift]),
            },
            'to' => [{ 'key_code' => 'end' }],
            'conditions' => [Karabiner.frontmost_application_if(['microsoft_office'])],
          },
          {
            'type' => 'basic',
            'from' => {
              'key_code' => 'a',
              'modifiers' => Karabiner.from_modifiers(['control'], %w[caps_lock shift]),
            },
            'to' => [{
              'key_code' => 'left_arrow',
              'modifiers' => ['left_command'],
            },],
            'conditions' => [Karabiner.frontmost_application_if(['eclipse'])],
          },
          {
            'type' => 'basic',
            'from' => {
              'key_code' => 'e',
              'modifiers' => Karabiner.from_modifiers(['control'], %w[caps_lock shift]),
            },
            'to' => [{
              'key_code' => 'right_arrow',
              'modifiers' => ['left_command'],
            },],
            'conditions' => [Karabiner.frontmost_application_if(['eclipse'])],
          },
        ],
      },
      {
        'description' => 'Emacs key bindings [option+keys] (rev 4)',
        'manipulators' => [
          {
            'type' => 'basic',
            'from' => {
              'key_code' => 'v',
              'modifiers' => Karabiner.from_modifiers(['option'], %w[caps_lock shift]),
            },
            'to' => [{ 'key_code' => 'page_up' }],
            'conditions' => [Karabiner.frontmost_application_unless(['emacs_key_bindings_exception'])],
          },
          {
            'type' => 'basic',
            'from' => {
              'key_code' => 'b',
              'modifiers' => Karabiner.from_modifiers(['option'], %w[caps_lock shift]),
            },
            'to' => [{ 'key_code' => 'left_arrow', 'modifiers' => ['left_option'] }],
            'conditions' => [Karabiner.frontmost_application_unless(['emacs_key_bindings_exception'])],
          },
          {
            'type' => 'basic',
            'from' => {
              'key_code' => 'f',
              'modifiers' => Karabiner.from_modifiers(['option'], %w[caps_lock shift]),
            },
            'to' => [{ 'key_code' => 'right_arrow', 'modifiers' => ['left_option'] }],
            'conditions' => [Karabiner.frontmost_application_unless(['emacs_key_bindings_exception'])],
          },
          {
            'type' => 'basic',
            'from' => {
              'key_code' => 'd',
              'modifiers' => Karabiner.from_modifiers(['option'], ['caps_lock']),
            },
            'to' => [{ 'key_code' => 'delete_forward', 'modifiers' => ['left_option'] }],
            'conditions' => [Karabiner.frontmost_application_unless(['emacs_key_bindings_exception'])],
          },
        ],
      },
      {
        'description' => 'Bash style Emacs key bindings (rev 1)',
        'manipulators' => [
          {
            'type' => 'basic',
            'from' => {
              'key_code' => 'w',
              'modifiers' => Karabiner.from_modifiers(['control'], ['caps_lock']),
            },
            'to' => [{ 'key_code' => 'delete_or_backspace', 'modifiers' => ['left_option'] }],
            'conditions' => [Karabiner.frontmost_application_unless(['emacs_key_bindings_exception'])],
          },
          {
            'type' => 'basic',
            'from' => {
              'key_code' => 'u',
              'modifiers' => Karabiner.from_modifiers(['control'], ['caps_lock']),
            },
            'to' => [
              {
                'key_code' => 'left_arrow',
                'modifiers' => %w[
                  left_command
                  left_shift
                ],
              },
              {
                'key_code' => 'delete_or_backspace',
                'repeat' => false,
              },
            ],
            'conditions' => [Karabiner.frontmost_application_unless(['emacs_key_bindings_exception'])],
          },
        ],
      },
    ]
  )
end

main
