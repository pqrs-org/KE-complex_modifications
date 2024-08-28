// JavaScript should be written in ECMAScript 5.1.

function main() {
  console.log(
    JSON.stringify({
        "title": "German Umlaut",
        "rules": [{
          "description": "Change option + a/o/u to ä/ö/ü",
          "manipulators": [{
              "from": {
                "key_code": "a",
                "modifiers": {
                  "mandatory": ["option"],
                  "optional": ["caps_lock"]
                }
              },
              "to": [{
                  "key_code": "u",
                  "modifiers": ["left_option"]
                },
                {
                  "key_code": "a"
                },
                {
                  "key_code": "vk_none"
                }
              ],
              "type": "basic",
              "conditions": [{
                "input_sources": [{
                  "language": "en"
                }],
                "type": "input_source_if"
              }]
            },
            {
              "from": {
                "key_code": "a",
                "modifiers": {
                  "mandatory": ["option", "shift"]
                }
              },
              "to": [{
                  "key_code": "u",
                  "modifiers": ["left_option"]
                },
                {
                  "key_code": "a",
                  "modifiers": ["left_shift"]
                },
                {
                  "key_code": "vk_none"
                }
              ],
              "type": "basic",
              "conditions": [{
                "input_sources": [{
                  "language": "en"
                }],
                "type": "input_source_if"
              }]
            },
            {
              "from": {
                "key_code": "o",
                "modifiers": {
                  "mandatory": ["option"],
                  "optional": ["caps_lock"]
                }
              },
              "to": [{
                  "key_code": "u",
                  "modifiers": ["left_option"]
                },
                {
                  "key_code": "o"
                },
                {
                  "key_code": "vk_none"
                }
              ],
              "type": "basic",
              "conditions": [{
                "input_sources": [{
                  "language": "^en$"
                }],
                "type": "input_source_if"
              }]
            },
            {
              "from": {
                "key_code": "o",
                "modifiers": {
                  "mandatory": ["option", "shift"]
                }
              },
              "to": [{
                  "key_code": "u",
                  "modifiers": ["left_option"]
                },
                {
                  "key_code": "o",
                  "modifiers": ["left_shift"]
                },
                {
                  "key_code": "vk_none"
                }
              ],
              "type": "basic",
              "conditions": [{
                "input_sources": [{
                  "language": "en"
                }],
                "type": "input_source_if"
              }]
            },
            {
              "from": {
                "key_code": "u",
                "modifiers": {
                  "mandatory": ["option"],
                  "optional": ["caps_lock"]
                }
              },
              "to": [{
                  "key_code": "u",
                  "modifiers": ["left_option"]
                },
                {
                  "key_code": "u"
                },
                {
                  "key_code": "vk_none"
                }
              ],
              "type": "basic",
              "conditions": [{
                "input_sources": [{
                  "language": "en"
                }],
                "type": "input_source_if"
              }]
            },
            {
              "from": {
                "key_code": "u",
                "modifiers": {
                  "mandatory": ["option", "shift"]
                }
              },
              "to": [{
                  "key_code": "u",
                  "modifiers": ["left_option"]
                },
                {
                  "key_code": "u",
                  "modifiers": ["left_shift"]
                },
                {
                  "key_code": "vk_none"
                }
              ],
              "type": "basic",
              "conditions": [{
                "input_sources": [{
                  "language": "en"
                }],
                "type": "input_source_if"
              }]
            },

            {
              "from": {
                "key_code": "a",
                "modifiers": {
                  "mandatory": ["option"],
                  "optional": ["caps_lock"]
                }
              },
              "to": [{
                "key_code": "close_bracket"
              }, {
                "key_code": "a"
              }],
              "type": "basic",
              "conditions": [{
                "input_sources": [{
                  "language": "de"
                }],
                "type": "input_source_if"
              }]
            },
            {
              "from": {
                "key_code": "a",
                "modifiers": {
                  "mandatory": ["option", "shift"]
                }
              },
              "to": [{
                  "key_code": "close_bracket"
                },
                {
                  "key_code": "a",
                  "modifiers": ["left_shift"]
                }
              ],
              "type": "basic",
              "conditions": [{
                "input_sources": [{
                  "language": "de"
                }],
                "type": "input_source_if"
              }]
            },
            {
              "from": {
                "key_code": "o",
                "modifiers": {
                  "mandatory": ["option"],
                  "optional": ["caps_lock"]
                }
              },
              "to": [{
                "key_code": "close_bracket"
              }, {
                "key_code": "o"
              }],
              "type": "basic",
              "conditions": [{
                "input_sources": [{
                  "language": "de"
                }],
                "type": "input_source_if"
              }]
            },
            {
              "from": {
                "key_code": "o",
                "modifiers": {
                  "mandatory": ["option", "shift"]
                }
              },
              "to": [{
                  "key_code": "close_bracket"
                },
                {
                  "key_code": "o",
                  "modifiers": ["left_shift"]
                }
              ],
              "type": "basic",
              "conditions": [{
                "input_sources": [{
                  "language": "de"
                }],
                "type": "input_source_if"
              }]
            },
            {
              "from": {
                "key_code": "u",
                "modifiers": {
                  "mandatory": ["option"],
                  "optional": ["caps_lock"]
                }
              },
              "to": [{
                "key_code": "close_bracket"
              }, {
                "key_code": "u"
              }],
              "type": "basic",
              "conditions": [{
                "input_sources": [{
                  "language": "de"
                }],
                "type": "input_source_if"
              }]
            },
            {
              "from": {
                "key_code": "u",
                "modifiers": {
                  "mandatory": ["option", "shift"]
                }
              },
              "to": [{
                  "key_code": "close_bracket"
                },
                {
                  "key_code": "u",
                  "modifiers": ["left_shift"]
                }
              ],
              "type": "basic",
              "conditions": [{
                "input_sources": [{
                  "language": "de"
                }],
                "type": "input_source_if"
              }]
            }
          ]
        }]
      },
      null,
      '  '
    )
  )
}

main()