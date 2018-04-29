#!/usr/bin/env ruby

# You can generate json by executing the following command on Terminal.
#
# $ ruby ./mouse_keys_mode_v4.json.rb
#

# Parameters

$simultaneous_threshold_milliseconds = 500

############################################################

require 'json'

def main
  puts JSON.pretty_generate({
                              "title" => "Mouse Keys Mode v4 (rev 1)",
                              "rules" => [
                                {
                                  "description" => "Mouse Keys Mode v4 (rev 1)",
                                  "manipulators" => [

                                    # hjkl

                                    generate_mouse_keys_mode("j",
                                                             [ { "mouse_key" => { "y" => 1536, }, }, ],
                                                             [ { "mouse_key" => { "vertical_wheel" => 32, }, }, ],
                                                             nil,
                                                             $simultaneous_threshold_milliseconds),
                                    generate_mouse_keys_mode("k",
                                                             [ { "mouse_key" => { "y" => -1536, }, }, ],
                                                             [ { "mouse_key" => { "vertical_wheel" => -32, }, }, ],
                                                             nil,
                                                             $simultaneous_threshold_milliseconds),
                                    generate_mouse_keys_mode("h",
                                                             [ { "mouse_key" => { "x" => -1536, }, }, ],
                                                             [ { "mouse_key" => { "horizontal_wheel" => 32, }, }, ],
                                                             nil,
                                                             $simultaneous_threshold_milliseconds),
                                    generate_mouse_keys_mode("l",
                                                             [ { "mouse_key" => { "x" =>  1536, }, }, ],
                                                             [ { "mouse_key" => { "horizontal_wheel" => -32, }, }, ],
                                                             nil,
                                                             $simultaneous_threshold_milliseconds),

                                    # buttons

                                    generate_mouse_keys_mode("v",
                                                             [ { "pointing_button" => "button1", }, ],
                                                             nil,
                                                             nil,
                                                             $simultaneous_threshold_milliseconds),

                                    generate_mouse_keys_mode("b",
                                                             [ { "pointing_button" => "button3", }, ],
                                                             nil,
                                                             nil,
                                                             $simultaneous_threshold_milliseconds),

                                    generate_mouse_keys_mode("n",
                                                             [ { "pointing_button" => "button2", }, ],
                                                             nil,
                                                             nil,
                                                             $simultaneous_threshold_milliseconds),

                                    # others

                                    generate_mouse_keys_mode("s",
                                                             [ { "set_variable" => { "name" => "mouse_keys_mode_v4_scroll", "value" => 1, }, }, ],
                                                             nil,
                                                             [ { "set_variable" => { "name" => "mouse_keys_mode_v4_scroll", "value" => 0, }, }, ],
                                                             $simultaneous_threshold_milliseconds),
                                    generate_mouse_keys_mode("f",
                                                             [ { "mouse_key" => { "speed_multiplier" => 2.0 } }, ],
                                                             nil,
                                                             nil,
                                                             $simultaneous_threshold_milliseconds),
                                    generate_mouse_keys_mode("g",
                                                             [ { "mouse_key" => { "speed_multiplier" => 0.5 } }, ],
                                                             nil,
                                                             nil,
                                                             $simultaneous_threshold_milliseconds),
                                  ].flatten,
                                },
                              ],
                            })
end

def generate_mouse_keys_mode(from_key_code, to, scroll_to, to_after_key_up, simultaneous_threshold_milliseconds)
  data = []

  ############################################################

  unless scroll_to.nil?
    h = {
      "type" => "basic",
      "from" => {
        "key_code" => from_key_code,
        "modifiers" => {
          "optional" => [
            "any",
          ],
        },
      },
      "to" => scroll_to,
      "conditions" => [
        {
          "type" => "variable_if",
          "name" => "mouse_keys_mode_v4",
          "value" => 1,
        },
        {
          "type" => "variable_if",
          "name" => "mouse_keys_mode_v4_scroll",
          "value" => 1,
        }
      ],
    }

    unless to_after_key_up.nil?
      h["to_after_key_up"] = to_after_key_up
    end

    data << h
  end

  ############################################################

  h = {
    "type" => "basic",
    "from" => {
      "key_code" => from_key_code,
      "modifiers" => {
        "optional" => [
          "any",
        ],
      },
    },
    "to" => to,
    "conditions" => [
      {
        "type" => "variable_if",
        "name" => "mouse_keys_mode_v4",
        "value" => 1,
      }
    ],
  }

  unless to_after_key_up.nil?
    h["to_after_key_up"] = to_after_key_up
  end

  data << h

  ############################################################

  h = {
    "type" => "basic",
    "from" => {
      "simultaneous" => [
        {
          "key_code" => "d",
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
              "name" => "mouse_keys_mode_v4",
              "value" => 0,
            },
          },
          {
            "set_variable" => {
              "name" => "mouse_keys_mode_v4_scroll",
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
          "name" => "mouse_keys_mode_v4",
          "value" => 1,
        },
      },
    ].concat(to),
    "parameters" => {
      "basic.simultaneous_threshold_milliseconds" => simultaneous_threshold_milliseconds,
    },
  }

  unless to_after_key_up.nil?
    h["to_after_key_up"] = to_after_key_up
  end

  data << h

  ############################################################

  data
end

main()
