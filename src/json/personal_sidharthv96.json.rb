#!/usr/bin/env ruby

require 'json'
require_relative '../lib/karabiner.rb'

def main
  puts JSON.pretty_generate(
    "title" => "Personal rules (@sidharthv96)",
    "rules" => [
      {
        "description" => "Diamond Nav Mode [; as Trigger Key]",
        "manipulators" => generate_diamond_mode("semicolon"),
      },
      {
        "description" => "Diamond Nav Mode [E as Trigger Key]",
        "manipulators" => generate_diamond_mode("e"),
      },
      {
      "description" => "Change delete_or_backspace key to hyper and caps_lock to delete_or_backspace.",
      "manipulators" => [
        {
          "type" => "basic",
          "from" => _from("delete_or_backspace", [], ['any']),
          "to" => _to([["left_shift", [
            "left_command",
            "left_control",
            "left_option"
          ]]]),
        },
        {
          "type" => "basic",
          "from" => _from("caps_lock", [], ['any']),
          "to" => _to([["delete_or_backspace", []]]),
        },
      ]
    }
    ],
  )
end


def _from(key_code, mandatory_modifiers, optional_modifiers)
  data = {}
  data['key_code'] = key_code

  mandatory_modifiers.each do |m|
    data['modifiers'] = {} if data['modifiers'].nil?
    data['modifiers']['mandatory'] = [] if data['modifiers']['mandatory'].nil?
    data['modifiers']['mandatory'] << m
  end

  optional_modifiers.each do |m|
    data['modifiers'] = {} if data['modifiers'].nil?
    data['modifiers']['optional'] = [] if data['modifiers']['optional'].nil?
    data['modifiers']['optional'] << m
  end
  data
end


def _to(events)
  data = []

  events.each do |e|
    d = {}
    d['key_code'] = e[0]
    e[1].nil? || d['modifiers'] = e[1]

    data << d
  end
  data
end


def generate_diamond_mode(trigger_key)
  [
    generate_diamond_mode_single_rule("i", "up_arrow", [], trigger_key),
    generate_diamond_mode_single_rule("k", "down_arrow", [], trigger_key),
    generate_diamond_mode_single_rule("j", "left_arrow", [], trigger_key),
    generate_diamond_mode_single_rule("l", "right_arrow", [], trigger_key),
  ].flatten
end


def generate_diamond_mode_single_rule(from_key_code, to_key_code, to_modifier_key_code_array, trigger_key)
  [
    {
      "type" => "basic",
      "from" => {
        "key_code" => from_key_code,
        "modifiers" => { "optional" => ["any"] },
      },
      "to" => [
        {
          "key_code" => to_key_code,
          "modifiers" => to_modifier_key_code_array
        },
      ],
      "conditions" => [
        Karabiner.variable_if('sidv_diamond_mode', 1),
      ]
    },

    {
      "type" => "basic",
      "from" => {
        "simultaneous" => [
          { "key_code" => trigger_key },
          { "key_code" => from_key_code },
        ],
        "simultaneous_options" => {
          "key_down_order" => "strict",
          "key_up_order" => "strict_inverse",
          "detect_key_down_uninterruptedly" => true,
          "to_after_key_up" => [
            Karabiner.set_variable("sidv_diamond_mode", 0),
          ],
        },
        "modifiers" => { "optional" => ["any"] },
      },
      "to" => [
        Karabiner.set_variable("sidv_diamond_mode", 1),
        {
          "key_code" => to_key_code,
          "modifiers" => to_modifier_key_code_array
        }
      ]
    }
  ]
end

main()
