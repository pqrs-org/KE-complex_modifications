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
    "title" => "Minimal dual keys",
    "maintainers" => ["yeonsh"],
    "rules" => [
      {
        "description" => "Minimal dual keys",
        "manipulators" => [
          generate_dual_key_rule("left_command", "delete_or_backspace", "left_command"),
          generate_dual_key_rule("right_command", "return_or_enter", "right_command"),
          generate_dual_key_rule("left_shift", "return_or_enter", "left_shift"),
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
