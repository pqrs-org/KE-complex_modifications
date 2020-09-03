#!/usr/bin/env ruby

PARAMETERS = {
  :to_if_alone_timeout_milliseconds => 300,
  :to_delayed_action_delay_milliseconds => 0,
  :to_if_held_down_threshold_milliseconds => 0,
  :simultaneous_threshold_milliseconds => 300,
}.freeze

require 'json'
require_relative '../lib/karabiner.rb'

def main
  puts JSON.pretty_generate(
    "title" => "Dual keys (to relieve stress from your pinkies)",
    "maintainers" => ["marlonrichert"],
    "rules" => [
      {
        "description" => "Dual keys",
        "manipulators" => [
          generate_dual_key_rule("left_command", "tab", "left_shift"),
          generate_dual_key_rule("right_command", "hyphen", "right_shift"),
          generate_dual_key_rule("left_option", "return_or_enter", "left_command"),
          generate_dual_key_rule("right_option", "equal_sign", "right_command"),
          generate_dual_key_rule("grave_accent_and_tilde", "grave_accent_and_tilde", "left_control"),
          generate_dual_key_rule("slash", "slash", "right_control"),
          generate_dual_key_rule("caps_lock", "backslash", "left_option"),
          generate_dual_key_rule("quote", "quote", "right_option"),
          generate_single_key_rule("left_control", "open_bracket"),
          generate_single_key_rule("left_arrow", "close_bracket"),
        ],
      },
    ],
  )
end

def generate_dual_key_rule(input, alone, held_down)
  {
    "type" => "basic",
    "from" => {
      "key_code" => input,
      "modifiers" => { "optional" => ["any"] },
    },
    "to_if_alone" => [
      {
        "key_code" => alone,
      },
    ],
    "to_if_held_down" => [
      {
        "key_code" => held_down,
      },
    ],
    'parameters' => {
      'basic.to_if_alone_timeout_milliseconds' => PARAMETERS[:to_if_alone_timeout_milliseconds],
      'basic.to_if_held_down_threshold_milliseconds' => PARAMETERS[:to_if_held_down_threshold_milliseconds],
    },
  }
end

def generate_single_key_rule(input, output)
  {
    "type" => "basic",
    "from" => {
      "key_code" => input,
      "modifiers" => { "optional" => ["any"] },
    },
    "to" => [
      {
        "key_code" => output,
      },
    ],
  }
end

main()
