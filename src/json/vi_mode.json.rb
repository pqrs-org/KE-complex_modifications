#!/usr/bin/env ruby

require 'json'
require_relative '../lib/karabiner.rb'

def main
  puts JSON.pretty_generate(
    "title" => "Vi Mode (rev 5)",
    "rules" => [
      {
        "description" => "Vi Mode [S as Trigger Key]",
        "manipulators" => generate_vi_mode("s"),
        # If you want to use other trigger keys for vi mode, just change this above line and run
        #
        # $ make
        #
        # in Terminal to generate your new JSON file at public/json/vi_mode.json.
        #
        # Copy it to ~/.config/karabiner/assets/complex_modifications then you can enable it in Karabiner-Elements.
        #
        # Modifier keys such as "command", "option" or "control" cannot be used here.
      },
      {
        "description" => "Vi Mode [D as Trigger Key]",
        "manipulators" => generate_vi_mode("d"),
      },
      {
        "description" => "Vi Visual Mode",
        "manipulators" => generate_vi_visual_mode("v"),
      },
    ],
  )
end

def generate_vi_mode(trigger_key)
  [
    generate_vi_mode_single_rule("j", "down_arrow", [], trigger_key),
    generate_vi_mode_single_rule("k", "up_arrow", [], trigger_key),
    generate_vi_mode_single_rule("h", "left_arrow", [], trigger_key),
    generate_vi_mode_single_rule("l", "right_arrow", [], trigger_key),
    generate_vi_mode_single_rule("f", "fn", [], trigger_key),
    generate_vi_mode_single_rule("b", "left_arrow", ["left_option"], trigger_key),
    generate_vi_mode_single_rule("w", "right_arrow", ["left_option"], trigger_key),
    generate_vi_mode_single_rule("0", "a", ["left_control"], trigger_key),
    generate_vi_mode_single_rule("4", "e", ["left_control"], trigger_key),
  ].flatten
end

def generate_vi_visual_mode(trigger_key)
  [
    generate_vi_visual_mode_single_rule("j", "down_arrow", ["left_shift"], trigger_key),
    generate_vi_visual_mode_single_rule("k", "up_arrow", ["left_shift"], trigger_key),
    generate_vi_visual_mode_single_rule("h", "left_arrow", ["left_shift"], trigger_key),
    generate_vi_visual_mode_single_rule("l", "right_arrow", ["left_shift"], trigger_key),
    generate_vi_visual_mode_single_rule("b", "left_arrow", ["left_shift", "left_option"], trigger_key),
    generate_vi_visual_mode_single_rule("w", "right_arrow", ["left_shift", "left_option"], trigger_key),
    generate_vi_visual_mode_single_rule("0", "left_arrow", ["left_shift", "left_command"], trigger_key),
    generate_vi_visual_mode_single_rule("4", "right_arrow", ["left_shift", "left_command"], trigger_key),
    generate_vi_visual_mode_single_rule("open_bracket", "up_arrow", ["left_shift", "left_option"], trigger_key),
    generate_vi_visual_mode_single_rule("close_bracket", "down_arrow", ["left_shift", "left_option"], trigger_key),
  ].flatten
end

def generate_vi_mode_single_rule(from_key_code, to_key_code, to_modifier_key_code_array, trigger_key)
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
        Karabiner.variable_if('vi_mode', 1),
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
            Karabiner.set_variable("vi_mode", 0),
          ],
        },
        "modifiers" => { "optional" => ["any"] },
      },
      "to" => [
        Karabiner.set_variable("vi_mode", 1),
        {
          "key_code" => to_key_code,
          "modifiers" => to_modifier_key_code_array
        }
      ]
    }
  ]
end

def generate_vi_visual_mode_single_rule(from_key_code, to_key_code, to_modifier_key_code_array, trigger_key)
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
        Karabiner.variable_if("vi_visual_mode", 1),
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
            Karabiner.set_variable("vi_visual_mode", 0),
          ],
        },
        "modifiers" => { "optional" => ["any"] },
      },
      "to" => [
        Karabiner.set_variable("vi_visual_mode", 1),
        {
          "key_code" => to_key_code,
          "modifiers" => to_modifier_key_code_array,
        },
      ],
      "conditions" => [
        Karabiner.frontmost_application_unless(["terminal", "vi"]),
      ]
    }
  ]
end

main()
