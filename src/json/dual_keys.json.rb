#!/usr/bin/env ruby

PARAMETERS = {
  :to_if_alone_timeout_milliseconds => 1000,
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
        "description" => "Left ⌘ to Enter if pressed alone",
        "manipulators" => generate_dual_key_rule("left_gui", "return_or_enter"),
      },
      {
        "description" => "Right ⌘ to - if pressed alone",
        "manipulators" => generate_dual_key_rule("right_gui", "hyphen"),
      },
      {
        "description" => "Left ⌥ to Escape if pressed alone",
        "manipulators" => generate_dual_key_rule("left_alt", "escape"),
      },
      {
        "description" => "Right ⌥ to = if pressed alone",
        "manipulators" => generate_dual_key_rule("right_alt", "equal_sign"),
      },
      {
        "description" => "Left ⇧ to ` if pressed alone",
        "manipulators" => generate_dual_key_rule("left_shift", "grave_accent_and_tilde"),
      },
      {
        "description" => "Right ⇧ to ' if pressed alone",
        "manipulators" => generate_dual_key_rule("right_shift", "quote"),
      },
      {
        "description" => "Left ⌃ to [ if pressed alone",
        "manipulators" => generate_dual_key_rule("left_control", "open_bracket"),
      },
      {
        "description" => "Right ⌃ to ] if pressed alone",
        "manipulators" => generate_dual_key_rule("right_control", "close_bracket"),
      },
    ],
  )
end

def generate_dual_key_rule(original_key, alternate_key)
  [
    {
      "type" => "basic",
      "from" => {
        "key_code" => original_key,
        "modifiers" => { "optional" => ["any"] },
      },
      "to_if_alone" => [
        {
          "key_code" => alternate_key,
        },
      ],
      "to_if_held_down" => [
        {
          "key_code" => original_key,
        },
      ],
      'parameters' => {
        'basic.to_if_alone_timeout_milliseconds' => PARAMETERS[:to_if_alone_timeout_milliseconds],
        'basic.to_if_held_down_threshold_milliseconds' => PARAMETERS[:to_if_held_down_threshold_milliseconds],
      },
    },
  ]
end

main()
