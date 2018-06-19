#!/usr/bin/env ruby

# You can generate json by executing the following command on Terminal.
#
# $ ruby ./emacs_key_bindings.json.rb
#

require 'json'
require_relative '../lib/karabiner.rb'

def main
  control_keys_rev = 'rev 10'
  option_keys_rev = 'rev 5'
  bash_style_rev = 'rev 2'

  puts JSON.pretty_generate(
    'title' => 'Emacs key bindings (rev 12)',
    'rules' => [
      # generic
      c_x_key_strokes,
      control_keys(
        :type => :generic,
        :description => "Emacs key bindings [control+keys] (#{control_keys_rev})",
        :frontmost_application_unless => [Karabiner.frontmost_application_unless(['emacs_key_bindings_exception'])],
        :frontmost_application_if => []
      ),
      option_keys(
        :type => :generic,
        :description => "Emacs key bindings [option+keys] (#{option_keys_rev})",
        :frontmost_application_unless => [Karabiner.frontmost_application_unless(['emacs_key_bindings_exception'])],
        :frontmost_application_if => []
      ),
      bash_style(
        :type => :generic,
        :description => "Bash style Emacs key bindings (#{bash_style_rev})",
        :frontmost_application_unless => [Karabiner.frontmost_application_unless(['emacs_key_bindings_exception'])],
        :frontmost_application_if => []
      ),

      # visual_studio_code
      control_keys(
        :type => :visual_studio_code,
        :description => "For Visual Studio Code: Emacs key bindings [control+keys] (#{control_keys_rev})",
        :frontmost_application_unless => [],
        :frontmost_application_if => [Karabiner.frontmost_application_if(['visual_studio_code'])]
      ),
      option_keys(
        :type => :visual_studio_code,
        :description => "For Visual Studio Code: Emacs key bindings [option+keys] (#{option_keys_rev})",
        :frontmost_application_unless => [],
        :frontmost_application_if => [Karabiner.frontmost_application_if(['visual_studio_code'])]
      ),
      bash_style(
        :type => :visual_studio_code,
        :description => "For Visual Studio Code: Bash style Emacs key bindings (#{bash_style_rev})",
        :frontmost_application_unless => [],
        :frontmost_application_if => [Karabiner.frontmost_application_if(['visual_studio_code'])]
      ),
    ]
  )
end

def c_x_key_strokes
  {
    'description' => 'Emacs key bindings [C-x key strokes] (rev 2)',
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
        'conditions' => [Karabiner.variable_if('C-x', 1)],
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
        'conditions' => [Karabiner.variable_if('C-x', 1)],
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
        'conditions' => [Karabiner.variable_if('C-x', 1)],
      },

      # Ignore other keys after C-x
      {
        'type' => 'basic',
        'from' => {
          'any' => 'key_code',
          'modifiers' => Karabiner.from_modifiers(nil, ['any']),
        },
        'conditions' => [Karabiner.variable_if('C-x', 1)],
      },

      # C-x
      {
        'type' => 'basic',
        'from' => {
          'key_code' => 'x',
          'modifiers' => Karabiner.from_modifiers(['control'], ['caps_lock']),
        },
        'to' => [
          Karabiner.set_variable('C-x', 1),
        ],
        'to_delayed_action' => {
          'to_if_invoked' => [
            Karabiner.set_variable('C-x', 0),
          ],
          'to_if_canceled' => [
            Karabiner.set_variable('C-x', 0),
          ],
        },
        'conditions' => [Karabiner.frontmost_application_unless(['emacs_key_bindings_exception'])],
      },
    ],
  }
end

def control_keys(options)
  data = {
    'description' => options[:description],
    'manipulators' => [
      {
        'type' => 'basic',
        'from' => {
          'key_code' => 'd',
          'modifiers' => Karabiner.from_modifiers(['control'], %w[caps_lock option]),
        },
        'to' => [{ 'key_code' => 'delete_forward' }],
        'conditions' => options[:frontmost_application_unless] + options[:frontmost_application_if],
      },
      {
        'type' => 'basic',
        'from' => {
          'key_code' => 'h',
          'modifiers' => Karabiner.from_modifiers(['control'], %w[caps_lock option]),
        },
        'to' => [{ 'key_code' => 'delete_or_backspace' }],
        'conditions' => options[:frontmost_application_unless] + options[:frontmost_application_if],
      },
      {
        'type' => 'basic',
        'from' => {
          'key_code' => 'i',
          'modifiers' => Karabiner.from_modifiers(['control'], %w[caps_lock shift]),
        },
        'to' => [{ 'key_code' => 'tab' }],
        'conditions' => options[:frontmost_application_unless] + options[:frontmost_application_if],
      },
      {
        'type' => 'basic',
        'from' => {
          'key_code' => 'open_bracket',
          'modifiers' => Karabiner.from_modifiers(['control'], ['caps_lock']),
        },
        'to' => [{ 'key_code' => 'escape' }],
        # Skip :frontmost_application_unless in order to enable escape key anywhere.
        'conditions' => [Karabiner.keyboard_type_if(%w[ansi iso])] + options[:frontmost_application_if],
      },
      {
        'type' => 'basic',
        'from' => {
          'key_code' => 'close_bracket',
          'modifiers' => Karabiner.from_modifiers(['control'], ['caps_lock']),
        },
        'to' => [{ 'key_code' => 'escape' }],
        # Skip :frontmost_application_unless in order to enable escape key anywhere.
        'conditions' => [Karabiner.keyboard_type_if(['jis'])] + options[:frontmost_application_if],
      },
      {
        'type' => 'basic',
        'from' => {
          'key_code' => 'm',
          'modifiers' => Karabiner.from_modifiers(['control'], %w[caps_lock shift option]),
        },
        'to' => [{ 'key_code' => 'return_or_enter' }],
        # Skip :frontmost_application_unless in order to enable return_or_enter key anywhere.
        'conditions' => options[:frontmost_application_if],
      },
      {
        'type' => 'basic',
        'from' => {
          'key_code' => 'b',
          'modifiers' => Karabiner.from_modifiers(['control'], %w[caps_lock shift option]),
        },
        'to' => [{ 'key_code' => 'left_arrow' }],
        'conditions' => options[:frontmost_application_unless] + options[:frontmost_application_if],
      },
      {
        'type' => 'basic',
        'from' => {
          'key_code' => 'f',
          'modifiers' => Karabiner.from_modifiers(['control'], %w[caps_lock shift option]),
        },
        'to' => [{ 'key_code' => 'right_arrow' }],
        'conditions' => options[:frontmost_application_unless] + options[:frontmost_application_if],
      },
      {
        'type' => 'basic',
        'from' => {
          'key_code' => 'n',
          'modifiers' => Karabiner.from_modifiers(['control'], %w[caps_lock shift option]),
        },
        'to' => [{ 'key_code' => 'down_arrow' }],
        'conditions' => options[:frontmost_application_unless] + options[:frontmost_application_if],
      },
      {
        'type' => 'basic',
        'from' => {
          'key_code' => 'p',
          'modifiers' => Karabiner.from_modifiers(['control'], %w[caps_lock shift option]),
        },
        'to' => [{ 'key_code' => 'up_arrow' }],
        'conditions' => options[:frontmost_application_unless] + options[:frontmost_application_if],
      },
      {
        'type' => 'basic',
        'from' => {
          'key_code' => 'v',
          'modifiers' => Karabiner.from_modifiers(['control'], %w[caps_lock shift]),
        },
        'to' => [{ 'key_code' => 'page_down' }],
        'conditions' => options[:frontmost_application_unless] + options[:frontmost_application_if],
      },
      {
        'type' => 'basic',
        'from' => {
          'key_code' => 'a',
          'modifiers' => Karabiner.from_modifiers(['control'], %w[caps_lock shift]),
        },
        'to' => [{ 'key_code' => 'home' }],
        'conditions' => [Karabiner.frontmost_application_if(['microsoft_office'])] + options[:frontmost_application_if],
      },
      {
        'type' => 'basic',
        'from' => {
          'key_code' => 'e',
          'modifiers' => Karabiner.from_modifiers(['control'], %w[caps_lock shift]),
        },
        'to' => [{ 'key_code' => 'end' }],
        'conditions' => [Karabiner.frontmost_application_if(['microsoft_office'])] + options[:frontmost_application_if],
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
        'conditions' => [Karabiner.frontmost_application_if(['eclipse'])] + options[:frontmost_application_if],
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
        'conditions' => [Karabiner.frontmost_application_if(['eclipse'])] + options[:frontmost_application_if],
      },
    ],
  }

  if options[:type] == :visual_studio_code
    data['manipulators'] += [
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
        'conditions' => [Karabiner.frontmost_application_if(['visual_studio_code'])],
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
        'conditions' => [Karabiner.frontmost_application_if(['visual_studio_code'])],
      },
    ]
  end

  remove_empty_conditions(data)
end

def option_keys(options)
  data = {
    'description' => options[:description],
    'manipulators' => [
      {
        'type' => 'basic',
        'from' => {
          'key_code' => 'v',
          'modifiers' => Karabiner.from_modifiers(['option'], %w[caps_lock shift]),
        },
        'to' => [{ 'key_code' => 'page_up' }],
        'conditions' => options[:frontmost_application_unless] + options[:frontmost_application_if],
      },
      {
        'type' => 'basic',
        'from' => {
          'key_code' => 'b',
          'modifiers' => Karabiner.from_modifiers(['option'], %w[caps_lock shift]),
        },
        'to' => [{ 'key_code' => 'left_arrow', 'modifiers' => ['left_option'] }],
        'conditions' => options[:frontmost_application_unless] + options[:frontmost_application_if],
      },
      {
        'type' => 'basic',
        'from' => {
          'key_code' => 'f',
          'modifiers' => Karabiner.from_modifiers(['option'], %w[caps_lock shift]),
        },
        'to' => [{ 'key_code' => 'right_arrow', 'modifiers' => ['left_option'] }],
        'conditions' => options[:frontmost_application_unless] + options[:frontmost_application_if],
      },
      {
        'type' => 'basic',
        'from' => {
          'key_code' => 'd',
          'modifiers' => Karabiner.from_modifiers(['option'], ['caps_lock']),
        },
        'to' => [{ 'key_code' => 'delete_forward', 'modifiers' => ['left_option'] }],
        'conditions' => options[:frontmost_application_unless] + options[:frontmost_application_if],
      },
    ],
  }

  remove_empty_conditions(data)
end

def bash_style(options)
  data = {
    'description' => options[:description],
    'manipulators' => [
      {
        'type' => 'basic',
        'from' => {
          'key_code' => 'w',
          'modifiers' => Karabiner.from_modifiers(['control'], ['caps_lock']),
        },
        'to' => [{ 'key_code' => 'delete_or_backspace', 'modifiers' => ['left_option'] }],
        'conditions' => options[:frontmost_application_unless] + options[:frontmost_application_if],
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
            'modifiers' => %w[left_command left_shift],
          },
          {
            'key_code' => 'delete_or_backspace',
            'repeat' => false,
          },
        ],
        'conditions' => options[:frontmost_application_unless] + options[:frontmost_application_if],
      },
    ],
  }

  remove_empty_conditions(data)
end

def remove_empty_conditions(data)
  data['manipulators'].each do |m|
    next if m['conditions'].nil?
    m.delete('conditions') if m['conditions'].empty?
  end
  data
end

main
