#!/usr/bin/env ruby

# Parameters

PARAMETERS = {
  :to_if_alone_timeout_milliseconds => 250
}.freeze

############################################################

require 'json'
require_relative '../lib/karabiner'

def main
  puts JSON.pretty_generate(
    'title' => 'mitch 60% compatible arrows and keys',
    'rules' => [
      {
        'description' => 'mitch 60% compatible arrows and keys',
        "available_since": '14.12.0',
        'manipulators' => [
          build_caps_bindings("i", "up_arrow"),
          build_caps_bindings("k", "down_arrow"),
          build_caps_bindings("j", "left_arrow"),
          build_caps_bindings("l", "right_arrow"),
          build_grave_to_escape,
          build_tilde_on_grave_shift,
          # build_escape_to_grave,
          build_caps_lock_engage,
          build_caps_lock_variable_block
        ]
      },
      {
        description: "media control mappings",
        manipulators: build_media_controls
      }
    ]
  )
end

# variable setup for caps lock key
def if_caps_lock_mode_on
  [
    {
      "name": "caps_lock_arrows_mode",
      "type": "variable_if",
      "value": 1
    }
  ]
end

def if_caps_lock_mode_off
  [
    {
      "name": "caps_lock_arrows_mode",
      "type": "variable_if",
      "value": 0
    }
  ]
end

def build_caps_bindings(from_key, to_key)
  # 60% keyboard arrow mappings with caps lock as layer activation (similar to QMK config)
  {
    "conditions": if_caps_lock_mode_on,
    "from": {
      "key_code": from_key,
      "modifiers": {
        "optional": ["any"]
      }
    },
    "to": [
      {
        "key_code": to_key
      }
    ],
    "type": "basic"
  }
end

def build_grave_to_escape
  # grave key to escape key by default
  {
    "conditions": if_caps_lock_mode_off,
    "from": {
      "key_code": "grave_accent_and_tilde",
      "modifiers": {
        "optional": ["control", "option"]
      }
    },
    "to": [
      {
        "key_code": "escape"
      }
    ],
    "type": "basic"
  }
end

def build_tilde_on_grave_shift
  # grave key + shift gives tilde
  {
    "conditions": if_caps_lock_mode_off,
    "from": {
      "key_code": "grave_accent_and_tilde",
      "modifiers": {
        mandatory: ["shift"]
      }
    },
    "to": [
      {
        "key_code": "grave_accent_and_tilde",
        modifiers: ["shift"]
      }
    ],
    "type": "basic"
  }
end

def build_escape_to_grave
  # escape key as another grave key (until I get tired of that)
  {
    "conditions": if_caps_lock_mode_on,
    "from": {
      "key_code": "escape",
      "modifiers": {
        "optional": ["any"]
      }
    },
    "to": [
      {
        "key_code": "grave_accent_and_tilde"
      }
    ],
    "type": "basic"
  }
end

def build_caps_lock_engage
  # when we actually want caps lock
  {
    "conditions": if_caps_lock_mode_on,
    "from": {
      "key_code": "tab",
      "modifiers": {
        "optional": ["any"]
      }
    },
    "to": [
      {
        "key_code": "caps_lock"
      }
    ],
    "type": "basic"
  }
end

def build_media_controls
  [
    {
      type: 'basic',
      "conditions": if_caps_lock_mode_on,
      from: {
        key_code: "z",
        modifiers: {},
      },
      to: [
        {
          key_code: 'rewind',
          modifiers: [],
        },
      ],
    },
    {
      type: 'basic',
      "conditions": if_caps_lock_mode_on,
      from: {
        key_code: "x",
        modifiers: {},
      },
      to: [
        {
          key_code: 'play_or_pause',
          modifiers: [],
        },
      ],
    },
    {
      type: 'basic',
      "conditions": if_caps_lock_mode_on,
      from: {
        key_code: "c",
        modifiers: {},
      },
      to: [
        {
          key_code: 'fastforward',
          modifiers: [],
        },
      ],
    },
  ]
end

def build_caps_lock_variable_block
  # defines the variables that's set when the caps lock key is down and up
  {
    "from": {
      "key_code": "caps_lock",
      "modifiers": {
        "optional": ["any"]
      }
    },
    "parameters": {
      # "basic.to_if_alone_timeout_milliseconds": PARAMETERS[:to_if_alone_timeout_milliseconds],
      "basic.to_if_held_down_threshold_milliseconds": 1
    },
    "to_if_held_down": [
      {
        "set_variable": {
          "name": "caps_lock_arrows_mode",
          "value": 1
        }
      }
    ],
    "to_after_key_up": [
      {
        "set_variable": {
          "name": "caps_lock_arrows_mode",
          "value": 0
        }
      }
    ],
    # caps lock does nothing if pressed by itself (use caps+tab for that)
    # "to_if_alone": [
    #   {
    #     "key_code": "caps_lock"
    #   }
    # ],
    "type": "basic"
  }
end

main
