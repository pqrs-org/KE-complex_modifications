#!/usr/bin/env ruby

require 'json'
require_relative '../lib/karabiner.rb'

def main
  puts JSON.pretty_generate(
    title: 'Personal rules (@itmammoth)',
    rules: [
      {
        description: 'Vi binding [Q + hjkl]',
        manipulators: generate_vi_binding_rules('q'),
      },
      {
        description: "Emacs binding [' + aedhk]",
        manipulators: generate_emacs_binding_ruls('quote'),
      },
      {
        description: 'Media control [Fn + iop] (for HHKB)',
        manipulators: generate_media_control_rules('print_screen', 'scroll_lock', 'pause'),
      },
      {
        description: 'Mission control [Shift(R) *twice*]',
        manipulators: generate_mission_control_rules('right_shift'),
      },
      {
        description: 'Quit application [Cmd + Q *twice*]',
        manipulators: generate_quit_application_rules('q', ['command']),
      },
    ],
  )
end

def generate_vi_binding_rules(trigger_key)
  mode = 'vi_mode'

  return [
    generate_simultaneous_binding_rule(trigger_key, 'h', mode, [['left_arrow', []]]),
    generate_simultaneous_binding_rule(trigger_key, 'j', mode, [['down_arrow', []]]),
    generate_simultaneous_binding_rule(trigger_key, 'k', mode, [['up_arrow', []]]),
    generate_simultaneous_binding_rule(trigger_key, 'l', mode, [['right_arrow', []]]),
  ].flatten
end

def generate_emacs_binding_ruls(trigger_key)
  mode = 'emacs_mode'

  return [
    generate_simultaneous_binding_rule(trigger_key, 'a', mode, [['left_arrow', ['command']]]),
    generate_simultaneous_binding_rule(trigger_key, 'e', mode, [['right_arrow', ['command']]]),
    generate_simultaneous_binding_rule(trigger_key, 'd', mode, [['delete_forward', []]]),
    generate_simultaneous_binding_rule(trigger_key, 'h', mode, [['delete_or_backspace', []]]),
    generate_simultaneous_binding_rule(trigger_key, 'k', mode, [
      ['right_arrow', ['command', 'shift']],
      ['delete_forward', []],
    ]),
  ].flatten
end

def generate_simultaneous_binding_rule(trigger_key, from_key_code, mode, to_keys_and_modifiers)
  to_keys = to_keys_and_modifiers.map {|key, mods| { key_code: key, modifiers: mods } }

  return [
    {
      type: 'basic',
      from: {
        key_code: from_key_code,
        modifiers: { optional: ['any'] },
      },
      to: to_keys,
      conditions: [
        Karabiner.variable_if(mode, 1),
      ]
    },
    simultaneous_key_binding(trigger_key, from_key_code, mode, to_keys)
  ]
end

def generate_media_control_rules(rewind_key_code, play_or_pause_key_code, fastforward_key_code)
  return [
    {
      type: 'basic',
      from: {
        key_code: rewind_key_code,
        modifiers: { optional: ['any'] },
      },
      to: [
        {
          key_code: 'rewind',
          modifiers: [],
        },
      ],
    },
    {
      type: 'basic',
      from: {
        key_code: play_or_pause_key_code,
        modifiers: { optional: ['any'] },
      },
      to: [
        {
          key_code: 'play_or_pause',
          modifiers: [],
        },
      ],
    },
    {
      type: 'basic',
      from: {
        key_code: fastforward_key_code,
        modifiers: { optional: ['any'] },
      },
      to: [
        {
          key_code: 'fastforward',
          modifiers: [],
        },
      ],
    },
  ].flatten
end

def generate_quit_application_rules(key_code, modifiers)
  mode = 'quit_application_mode'
  from = {
    key_code: key_code,
    modifiers: {
      mandatory: modifiers,
      optional: ['caps_lock'],
    },
  }

  return [
    {
      type: 'basic',
      from: from,
      to: {
        key_code: key_code,
        modifiers: modifiers,
      },
      conditions: [Karabiner.variable_if(mode, 1)]
    },
    {
      type: 'basic',
      from: from,
      to: [
        Karabiner.set_variable(mode, 1),
      ],
      to_delayed_action: {
        to_if_invoked: [Karabiner.set_variable(mode, 0)],
        to_if_canceled: [Karabiner.set_variable(mode, 0)],
      },
    }
  ].flatten
end

def generate_mission_control_rules(key_code)
  mode = 'mission_control_mode'
  from = {
    key_code: key_code,
    modifiers: { optional: ['any'] },
  }

  return [
    {
      type: 'basic',
      from: from,
      to: [
        {
          key_code: 'mission_control',
        }
      ],
      conditions: [Karabiner.variable_if(mode, 1)],
    },
    {
      type: 'basic',
      from: from,
      to: [
        Karabiner.set_variable(mode, 1),
        {
          key_code: key_code,
        },
      ],
      to_delayed_action: {
        to_if_invoked: [Karabiner.set_variable(mode, 0)],
        to_if_canceled: [Karabiner.set_variable(mode, 0)],
      },
    },
  ].flatten
end

def simultaneous_key_binding(trigger_key, from_key_code, mode, to_keys)
  return {
    type: 'basic',
    from: {
      simultaneous: [
        { key_code: trigger_key },
        { key_code: from_key_code },
      ],
      simultaneous_options: {
        key_down_order: 'strict',
        key_up_order: 'strict_inverse',
        detect_key_down_uninterruptedly: true,
        to_after_key_up: [
          Karabiner.set_variable(mode, 0),
        ],
      },
      modifiers: { optional: ['any'] },
    },
    to: [
      Karabiner.set_variable(mode, 1),
      *to_keys,
    ]
  }
end

main()
