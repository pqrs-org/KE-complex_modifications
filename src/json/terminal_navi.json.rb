#!/usr/bin/env ruby

require 'json'
require_relative '../lib/karabiner.rb'

def rules()
  [
    map(
      { "key_code" => "z", "modifiers" => { "mandatory" => [ "command" ] } },
      [
        { "key_code" => "hyphen", "modifiers" => [ "left_control" ] }
      ]
    ),
    map(
      { "key_code" => "z", "modifiers" => { "mandatory" => [ "command", "shift" ] } },
      [
        { "key_code" => "escape" }, { "key_code" => "e" }
      ]
    ),

    map(
      { "key_code" => "d", "modifiers" => { "mandatory" => [ "command" ] } },
      [
        { "key_code" => "escape" },
        { "key_code" => "hyphen", "modifiers" => [ "left_control" ] }
      ]
    ),
    map(
      { "key_code" => "d", "modifiers" => { "mandatory" => [ "command", "shift" ] } },
      [
        { "key_code" => "escape" },
        { "key_code" => "period" }
      ]
    ),

    map(
      { "key_code" => "delete_forward" },
      [
        { "key_code" => "d", "modifiers" => [ "right_control" ] }
      ]
    ),
    map(
      { "key_code" => "delete_or_backspace", "modifiers" => { "mandatory" => [ "fn" ] } },
      [
        { "key_code" => "d", "modifiers" => [ "right_control" ] }
      ]
    ),

    map(
      { "key_code" => "left_arrow", "modifiers" => { "mandatory" => [ "option" ] } },
      [
        { "key_code" => "escape" },
        { "key_code" => "b" }
      ]
    ),
    map(
      { "key_code" => "right_arrow", "modifiers" => { "mandatory" => [ "option" ] } },
      [
        { "key_code" => "escape" },
        { "key_code" => "f" }
      ]
    ),

    map(
      { "key_code" => "delete_or_backspace", "modifiers" => { "mandatory" => [ "option" ] } },
      [
        { "key_code" => "escape" },
        { "key_code" => "d", "modifiers" => [ "right_control" ] }
      ]
    ),
    map(
      { "key_code" => "delete_forward", "modifiers" => { "mandatory" => [ "option" ] } },
      [
        { "key_code" => "escape" }, { "key_code" => "d" }
      ]
    ),
    map(
      { "key_code" => "delete_or_backspace", "modifiers" => { "mandatory" => [ "fn", "option" ] } },
      [
        { "key_code" => "escape" },
        { "key_code" => "d" }
      ]
    ),

    map(
      { "key_code" => "left_arrow", "modifiers" => { "mandatory" => [ "command" ] } },
      [
        { "key_code" => "escape" },
        { "key_code" => "b", "modifiers" => [ "right_control" ] }
      ]
    ),
    map(
      { "key_code" => "right_arrow", "modifiers" => { "mandatory" => [ "command" ] } },
      [
        { "key_code" => "escape" },
        { "key_code" => "f", "modifiers" => [ "right_control" ] }
      ]
    ),

    map(
      { "key_code" => "delete_or_backspace", "modifiers" => { "mandatory" => [ "command" ] } },
      [
        { "key_code" => "w", "modifiers" => [ "right_control" ] }
      ]
    ),
    map(
      { "key_code" => "delete_forward", "modifiers" => { "mandatory" => [ "command" ] } },
      [
        { "key_code" => "escape" },
        { "key_code" => "d", "modifiers" => [ "right_control" ] }
      ]
    ),
    map(
      { "key_code" => "delete_or_backspace", "modifiers" => { "mandatory" => [ "fn", "command" ] } },
      [
        { "key_code" => "escape" },
        { "key_code" => "d", "modifiers" => [ "right_control" ] }
      ]
    ),

    {
      "type" => "basic",
      "from" => { "key_code" => "u", "modifiers" => { "mandatory" => [ "control" ] } },
      "to" => [
        { "key_code" => "a", "modifiers" => [ "right_control", "right_shift" ] },
        { "key_code" => "k", "modifiers" => [ "left_control" ] },
      ],
      "conditions" => [
        Karabiner.frontmost_application_unless([ "terminal" ])
      ]
    },

    map(
      { "key_code" => "up_arrow", "modifiers" => { "mandatory" => [ "option" ] } },
      [
        { "key_code" => "escape" },
        { "key_code" => "comma", "modifiers" => [ "left_shift" ] },
      ]
    ),
    map(
      { "key_code" => "down_arrow", "modifiers" => { "mandatory" => [ "option" ] } },
      [
        { "key_code" => "escape" },
        { "key_code" => "period", "modifiers" => [ "left_shift" ] },
      ]
    ),

  ].flatten
end

def map(from, to)
  {
    "type" => "basic",
    "from" => from,
    "to" => to,
    "conditions" => [
      Karabiner.frontmost_application_if([ "terminal" ])
    ]
  }
end

def main
  puts JSON.pretty_generate(
    "title" => "Keyboard shortcuts for Terminal apps",
    "maintainers" => [ "marlonrichert" ],
    "rules" => [
      {
        "description" => "Keyboard shortcuts for Terminal apps",
        "manipulators" => rules(),
      },
    ],
  )
end

main()
