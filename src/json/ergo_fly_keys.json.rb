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
    "title" => "Ergo Fly Keys",
    "maintainers" => ["marlonrichert"],
    "rules" => [
      {
        "description" => "Ergo Fly Keys",
        "manipulators" => rules("spacebar"),
      },
    ],
  )
end

def rules(trigger_key)
  variable = "ergo_fly_keys_#{trigger_key}"
  [
    dual_key("right_command", "hyphen",     "right_shift"),
    dual_key("right_option",  "equal_sign", "right_command"),

    dual_key("left_option",   "open_bracket",   "left_command"),
    dual_key("left_command",  "close_bracket",  "left_shift"),

    dual_key("caps_lock", "grave_accent_and_tilde", "left_option"),
    dual_key("quote",     "quote",                  "right_option"),

    dual_key("slash",                   "slash",     "right_control"),
    dual_key("grave_accent_and_tilde",  "backslash", "left_control"),
    dual_key("left_shift",              "backslash", "left_control"),

    two_part_trigger_combo(trigger_key, variable, "b", "tab", []),

    two_part_trigger_combo(trigger_key, variable, "v", "home", []),
    two_part_trigger_combo(trigger_key, variable, "n", "end", []),

    two_part_trigger_combo(trigger_key, variable, "c", "escape", []),
    two_part_trigger_combo(trigger_key, variable, "m", "return_or_enter", []),

    two_part_trigger_combo(trigger_key, variable, "i", "up_arrow", []),
    two_part_trigger_combo(trigger_key, variable, "j", "left_arrow", []),
    two_part_trigger_combo(trigger_key, variable, "k", "down_arrow", []),
    two_part_trigger_combo(trigger_key, variable, "l", "right_arrow", []),

    two_part_trigger_combo(trigger_key, variable, "e", "page_up", []),
    two_part_trigger_combo(trigger_key, variable, "d", "page_down", []),
    two_part_trigger_combo(trigger_key, variable, "s", "delete_or_backspace", []),
    two_part_trigger_combo(trigger_key, variable, "f", "delete_forward", []),

    four_part_trigger_combo(
        trigger_key, variable, "u", "left_arrow", ["left_option"],
        [ { "key_code": "escape" }, { "key_code": "b" }, ]
    ),
    four_part_trigger_combo(
        trigger_key, variable, "o", "right_arrow", ["left_option"],
        [{ "key_code": "escape" }, { "key_code": "f"}, ]
    ),
    four_part_trigger_combo(
        trigger_key, variable, "h", "left_arrow", ["left_command"],
        [ { "key_code": "a", "modifiers": [ "right_control" ] }, ]
    ),
    four_part_trigger_combo(
        trigger_key, variable, "semicolon", "right_arrow", ["left_command"],
        [ { "key_code": "e", "modifiers": [ "right_control" ] }, ]
    ),

    four_part_trigger_combo(
        trigger_key, variable, "w", "delete_or_backspace", ["left_option"],
        [ { "key_code": "w", "modifiers": [ "right_control" ] }, ]
    ),
    four_part_trigger_combo(
        trigger_key, variable, "r", "delete_forward", ["left_option"],
        [ { "key_code": "d", "modifiers": [ "right_option" ] }, ]
    ),
    four_part_trigger_combo(
        trigger_key, variable, "a", "delete_or_backspace", ["left_command"],
        [ { "key_code" => "u", "modifiers" => ["left_control"], } ]
    ),
    two_part_trigger_combo(
        trigger_key, variable, "g", "k", ["left_control"]
    ),

    trigger_key(trigger_key, variable),
  ].flatten
end

def single_key(input, output)
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

def dual_key(input, alone, held_down)
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

def trigger_key(trigger_key, variable)
  [
    {
      "type" => "basic",
      "from" => {
        "key_code" => trigger_key,
        "modifiers" => { "optional" => ["any"] },
      },
      "to" => [
        Karabiner.set_variable("DEBUG simultaneous", 0),
        Karabiner.set_variable("DEBUG trigger alone", 0),
        Karabiner.set_variable("DEBUG trigger held down", 0),
        Karabiner.set_variable("DEBUG trigger key up", 0),
        Karabiner.set_variable("DEBUG trigger delay invoked", 0),
        Karabiner.set_variable("DEBUG trigger delay canceled", 0),
        Karabiner.set_variable("DEBUG halt", 0),
      ],
      "to_if_alone" => [
        Karabiner.set_variable("DEBUG trigger alone", 1),
        Karabiner.set_variable(variable, 0),
        Karabiner.set_variable("DEBUG halt", 1),
        {
          "key_code" => trigger_key,
          "halt" => true,
        },
      ],
      "to_if_held_down" => [
          Karabiner.set_variable("DEBUG trigger held down", 1),
          Karabiner.set_variable(variable, 1),
      ],
      "to_after_key_up" => [
        Karabiner.set_variable("DEBUG trigger key up", 1),
        Karabiner.set_variable(variable, 0),
        {
          "key_code" => "vk_none",
        },
      ],
      "to_delayed_action" => {
          "to_if_invoked" => [
            Karabiner.set_variable("DEBUG trigger delay invoked", 1),
          ],
          "to_if_canceled" => [
            Karabiner.set_variable("DEBUG trigger delay canceled", 1),
            Karabiner.set_variable(variable, 0),
            Karabiner.set_variable("DEBUG halt", 1),
            {
              "key_code" => trigger_key,
            },
          ]
      },
      'parameters' => {
        'basic.to_if_alone_timeout_milliseconds' =>
          PARAMETERS[:to_if_alone_timeout_milliseconds],
        'basic.to_delayed_action_delay_milliseconds' =>
          PARAMETERS[:to_delayed_action_delay_milliseconds],
        'basic.to_if_held_down_threshold_milliseconds' =>
          PARAMETERS[:to_if_held_down_threshold_milliseconds],
      },
    },
  ]
end

def two_part_trigger_combo(trigger_key, variable, from_key_code, to_key_code, to_modifiers)
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
          "modifiers" => to_modifiers
        },
      ],
      "conditions" => [
        Karabiner.variable_if(variable, 1),
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
            Karabiner.set_variable(variable, 0),
          ],
        },
        "modifiers" => { "optional" => ["any"] },
      },
      "to" => [
        Karabiner.set_variable(variable, 1),
        Karabiner.set_variable("DEBUG simultaneous", 1),
        {
          "key_code" => to_key_code,
          "modifiers" => to_modifiers
        }
      ],
      'parameters' => {
        'basic.simultaneous_threshold_milliseconds' => PARAMETERS[:simultaneous_threshold_milliseconds],
      },
    },
  ]
end

def four_part_trigger_combo(trigger_key, variable, from_key_code, normal_to_key_code,
                            normal_to_modifiers, terminal_to)
  [
    {
      "type" => "basic",
      "from" => {
        "key_code" => from_key_code,
        "modifiers" => { "optional" => ["any"] },
      },
      "to" => [
        {
          "key_code" => normal_to_key_code,
          "modifiers" => normal_to_modifiers,
        },
      ],
      "conditions" => [
        Karabiner.frontmost_application_unless(["terminal"]),
        Karabiner.variable_if(variable, 1),
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
            Karabiner.set_variable(variable, 0),
          ],
        },
        "modifiers" => { "optional" => ["any"] },
      },
      "to" => [
        Karabiner.set_variable(variable, 1),
        Karabiner.set_variable("DEBUG simultaneous", 1),
        {
          "key_code" => normal_to_key_code,
          "modifiers" => normal_to_modifiers,
        },
      ],
      'parameters' => {
        'basic.simultaneous_threshold_milliseconds' => PARAMETERS[:simultaneous_threshold_milliseconds],
      },
      "conditions" => [
        Karabiner.frontmost_application_unless(["terminal"]),
      ],
    },

    {
      "type" => "basic",
      "from" => {
        "key_code" => from_key_code,
        "modifiers" => { "optional" => ["any"] },
      },
      "to" => terminal_to,
      "conditions" => [
        Karabiner.frontmost_application_if(["terminal"]),
        Karabiner.variable_if(variable, 1),
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
            Karabiner.set_variable(variable, 0),
          ],
        },
        "modifiers" => { "optional" => ["any"] },
      },
      "to" => [
        Karabiner.set_variable(variable, 1),
      ] + terminal_to,
      'parameters' => {
        'basic.simultaneous_threshold_milliseconds' => PARAMETERS[:simultaneous_threshold_milliseconds],
      },
      "conditions" => [
        Karabiner.frontmost_application_if(["terminal"]),
      ],
    },
  ]
end

main()
