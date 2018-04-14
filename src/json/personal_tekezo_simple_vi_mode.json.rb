#!/usr/bin/env ruby

# Parameters

$simultaneous_threshold_milliseconds = 500

############################################################

require 'json'

def main
  puts JSON.pretty_generate({
                              "title" => "Personal rules (@tekezo) simple_vi_mode",
                              "rules" => [
                                {
                                  "description" => "Simple Vi Mode v3 (rev 2)",
                                  "manipulators" => [
                                    generate_simple_vi_mode("j", "down_arrow",  $simultaneous_threshold_milliseconds),
                                    generate_simple_vi_mode("k", "up_arrow",    $simultaneous_threshold_milliseconds),
                                    generate_simple_vi_mode("h", "left_arrow",  $simultaneous_threshold_milliseconds),
                                    generate_simple_vi_mode("l", "right_arrow", $simultaneous_threshold_milliseconds),
                                    generate_simple_vi_mode("f", "fn",          $simultaneous_threshold_milliseconds),
                                  ].flatten,
                                },
                              ],
                            })
end

def generate_simple_vi_mode(from_key_code, to_key_code, simultaneous_threshold_milliseconds)
  [
    {
      "type" => "basic",
      "from" => {
        "key_code" => from_key_code,
        "modifiers" => {
          "optional" => [
            "any",
          ],
        },
      },
      "to" => [
        {
          "key_code" => to_key_code,
        },
      ],
      "conditions" => [
        {
          "type" => "variable_if",
          "name" => "simple_vi_mode",
          "value" => 1,
        }
      ],
    },
    {
      "type" => "basic",
      "from" => {
        "simultaneous" => [
          {
            "key_code" => "s",
          },
          {
            "key_code" => from_key_code,
          },
        ],
        "simultaneous_options" => {
          "key_down_order" => "strict",
          "key_up_order" => "strict_inverse",
          "to_after_key_up" => [
            {
              "set_variable" => {
                "name" => "simple_vi_mode",
                "value" => 0,
              },
            },
          ],
        },
        "modifiers" => {
          "optional" => [
            "any",
          ],
        },
      },
      "to" => [
        {
          "set_variable" => {
            "name" => "simple_vi_mode",
            "value" => 1,
          },
        },
        {
          "key_code" => to_key_code,
        },
      ],
      "parameters" => {
        "basic.simultaneous_threshold_milliseconds" => simultaneous_threshold_milliseconds,
      },
    }
  ]
end

main()
