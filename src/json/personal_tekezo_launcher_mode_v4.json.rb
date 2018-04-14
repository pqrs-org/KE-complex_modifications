#!/usr/bin/env ruby

# You can generate json by executing the following command on Terminal.
#
# $ ruby ./personal_tekezo_launcher_mode_v4.json.rb
#

# Parameters

$simultaneous_threshold_milliseconds = 500
$trigger_key = 'o'

############################################################

require 'json'

def main
  puts JSON.pretty_generate({
                              "title" => "Personal rules (@tekezo) Launcher Mode v4",
                              "rules" => [
                                {
                                  "description" => "Launcher Mode v4 (rev 2)",
                                  "manipulators" => [
                                    generate_launcher_mode("1", [], [ { "shell_command" => "open -a 'Xcode.app'" } ]),
                                    generate_launcher_mode("a", [], [ { "shell_command" => "open -a 'Activity Monitor.app'" } ]),
                                    generate_launcher_mode("c", [], [ { "shell_command" => "open -a 'Google Chrome.app'" } ]),
                                    generate_launcher_mode("e", [], [ { "shell_command" => "open -a 'Emacs.app'" } ]),
                                    generate_launcher_mode("f", [], [ { "shell_command" => "open -a 'Finder.app'" } ]),
                                    generate_launcher_mode("i", [], [ { "shell_command" => "open -a 'Adium.app'" } ]),
                                    generate_launcher_mode("m", [], [ { "shell_command" => "open -a 'Thunderbird.app'" } ]),
                                    generate_launcher_mode("p", [], [ { "shell_command" => "open -a 'Microsoft PowerPoint.app'" } ]),
                                    generate_launcher_mode("q", [], [ { "shell_command" => "open -a 'Dictionary.app'" } ]),
                                    generate_launcher_mode("r", [], [ { "shell_command" => "open -a 'Microsoft Remote Desktop.app'" } ]),
                                    generate_launcher_mode("t", [], [ { "shell_command" => "open -a 'iTerm.app'" } ]),
                                    generate_launcher_mode("u", [], [ { "shell_command" => "open -a 'Skype.app'" } ]),
                                    generate_launcher_mode("w", [], [ { "shell_command" => "open -a 'Microsoft Word.app'" } ]),
                                    generate_launcher_mode("x", [], [ { "shell_command" => "open -a 'Microsoft Excel.app'" } ]),

                                    generate_launcher_mode("tab", [], [ { "key_code" => "mission_control" } ]),
                                    generate_launcher_mode("spacebar", [], [ { "shell_command" => "open -a 'Alfred 3.app'" } ]),
                                  ].flatten,
                                },
                              ],
                            })
end

def generate_launcher_mode(from_key_code, mandatory_modifiers, to)
  data = []

  ############################################################

  h = {
    "type" => "basic",
    "from" => {
      "key_code" => from_key_code,
      "modifiers" => {
        "mandatory" => mandatory_modifiers,
        "optional" => [
          "any",
        ],
      },
    },
    "to" => to,
    "conditions" => [
      {
        "type" => "variable_if",
        "name" => "launcher_mode_v4",
        "value" => 1,
      },
    ],
  }

  data << h

  ############################################################

  h = {
    "type" => "basic",
    "from" => {
      "simultaneous" => [
        {
          "key_code" => $trigger_key,
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
              "name" => "launcher_mode_v4",
              "value" => 0,
            },
          },
        ],
      },
      "modifiers" => {
        "mandatory" => mandatory_modifiers,
        "optional" => [
          "any",
        ],
      },
    },
    "to" => [
      {
        "set_variable" => {
          "name" => "launcher_mode_v4",
          "value" => 1,
        },
      },
    ].concat(to),
    "parameters" => {
      "basic.simultaneous_threshold_milliseconds" => $simultaneous_threshold_milliseconds,
    },
  }

  data << h

  ############################################################

  data
end

main()
