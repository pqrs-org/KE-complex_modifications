#!/usr/bin/env ruby

# You can generate json by executing the following command on Terminal.
#
# $ ruby ./emacs_key_bindings.json.rb
#

require 'json'
require_relative '../lib/karabiner.rb'

def main
  unless_emacs = Karabiner.frontmost_application_unless(["emacs_key_bindings_exception", "jetbrains_ide"])
  
  puts JSON.pretty_generate(
    "title" => "Universal Emacs Keybindings",
    "maintainers" => ["justintanner"],

    "rules" => [
      "description" => "Emacs Emulation in all apps without emacs keybindings (v1)",
      "manipulators" => c_x(unless_emacs) + control_keys(unless_emacs) + option_keys(unless_emacs)
    ]
  )
end

def c_x(unless_emacs)
  if_browser = Karabiner.frontmost_application_if(["browser"])
  unless_browser = Karabiner.frontmost_application_unless(["browser"])
  
  [
    # Bind switch buffer to Command+B, then in browsers like chrome you can install a task switcher QuickTabs:
    # https://chrome.google.com/extensions/detail/jnjfeinjfmenlddahdjdmgpbokiacbbb
    # Then, you need to configure Command+B to activate QuickTabs in chrome://extensions/shortcuts
    {
      "type" => "basic",
      "from" => {
        "key_code" => "b",
        "modifiers" => Karabiner.from_modifiers(["control"], ["caps_lock"]),
      },
      "to" => [
        {
          "key_code" => "b",
          "modifiers" => ["command"],
        },
      ],
      "conditions" => [Karabiner.variable_if("C-x", 1)],
    },
    # Launch the dev console in most browsers with C-x/C-d
    {
      "type" => "basic",
      "from" => {
        "key_code" => "d",
        "modifiers" => Karabiner.from_modifiers(["control"], ["caps_lock"]),
      },
      "to" => [
        {
          "key_code" => "j",
          "modifiers" => ["command", "option"],
        },
      ],
      "conditions" => [Karabiner.variable_if("C-x", 1)] + [if_browser],
    },
    {
      "type" => "basic",
      "from" => {
        "key_code" => "c",
        "modifiers" => Karabiner.from_modifiers(["control"], ["caps_lock"]),
      },
      "to" => [
        {
          "key_code" => "q",
          "modifiers" => ["command"],
        },
      ],
      "conditions" => [Karabiner.variable_if("C-x", 1)],
    },
    # No point in opening files in browsers, better to focus the location bar.
    {
      "type" => "basic",
      "from" => {
        "key_code" => "f",
        "modifiers" => Karabiner.from_modifiers(["control"], ["caps_lock"]),
      },
      "to" => [
        {
          "key_code" => "l",
          "modifiers" => ["command"],
        },
      ],
      "conditions" => [Karabiner.variable_if("C-x", 1)] + [if_browser],
    },
    {
      "type" => "basic",
      "from" => {
        "key_code" => "f",
        "modifiers" => Karabiner.from_modifiers(["control"], ["caps_lock"]),
      },
      "to" => [
        {
          "key_code" => "o",
          "modifiers" => ["command"],
        },
      ],
      "conditions" => [Karabiner.variable_if("C-x", 1)] + [unless_browser],
    },
    {
      "type" => "basic",
      "from" => {
        "key_code" => "h",
        "modifiers" => Karabiner.from_modifiers(["control"], ["caps_lock"]),
      },
      "to" => [
        {
          "key_code" => "a",
          "modifiers" => ["command"],
        },
      ],
      "conditions" => [Karabiner.variable_if("C-x", 1)],
    },
    {
      "type" => "basic",
      "from" => {
        "key_code" => "k",
        "modifiers" => Karabiner.from_modifiers(["control"], ["caps_lock"]),
      },
      "to" => [
        {
          "key_code" => "w",
          "modifiers" => ["command"],
        },
      ],
      "conditions" => [Karabiner.variable_if("C-x", 1)],
    },
    {
      "type" => "basic",
      "from" => {
        "key_code" => "r",
        "modifiers" => Karabiner.from_modifiers(["control"], ["caps_lock"]),
      },
      "to" => [
        {
          "key_code" => "r",
          "modifiers" => ["command"],
        },
      ],
      "conditions" => [Karabiner.variable_if("C-x", 1)] + [if_browser],
    },
    {
      "type" => "basic",
      "from" => {
        "key_code" => "s",
        "modifiers" => Karabiner.from_modifiers(["control"], ["caps_lock"]),
      },
      "to" => [
        {
          "key_code" => "s",
          "modifiers" => ["command"],
        },
      ],
      "conditions" => [Karabiner.variable_if("C-x", 1)],
    },
    {
      "type" => "basic",
      "from" => {
        "key_code" => "u",
        "modifiers" => Karabiner.from_modifiers(["control"], ["caps_lock"]),
      },
      "to" => [
        {
          "key_code" => "z",
          "modifiers" => ["command"],
        },
      ],
      "conditions" => [Karabiner.variable_if("C-x", 1)],
    },
    # Ignore other keys after C-x
    {
      "type" => "basic",
      "from" => {
        "any" => "key_code",
        "modifiers" => Karabiner.from_modifiers,
      },
      "conditions" => [Karabiner.variable_if("C-x", 1)],
    },

    # C-x
    {
      "type" => "basic",
      "from" => {
        "key_code" => "x",
        "modifiers" => Karabiner.from_modifiers(["control"], ["caps_lock"]),
      },
      "to" => [
        Karabiner.set_variable("C-x", 1),
      ],
      "to_delayed_action" => {
        "to_if_invoked" => [
          Karabiner.set_variable('C-x', 0),
        ],
        'to_if_canceled' => [
          Karabiner.set_variable('C-x', 0),
        ],
      },
      "conditions" => [unless_emacs],
    },
  ]
end

def control_keys(unless_emacs)
  if_terminal = Karabiner.frontmost_application_if(["terminal"])
  unless_terminal = Karabiner.frontmost_application_unless(["terminal"])
    
  [
    {
      "type" => "basic",
      "from" => {
        "key_code" => "a",
        "modifiers" => Karabiner.from_modifiers(["control"], %w[caps_lock shift]),
      },
      "to" => [
        { "key_code" => "a", "modifiers": ["control"] },
        Karabiner.set_variable("C-spacebar", 0)
      ],
      "conditions" => [Karabiner.variable_unless("C-spacebar", 1)] + [unless_emacs],
    },
    {
      "type" => "basic",
      "from" => {
        "key_code" => "a",
        "modifiers" => Karabiner.from_modifiers(["control"], %w[caps_lock shift]),
      },
      "to" => [{ "key_code" => "a", "modifiers": ["shift", "control"] }],
      "conditions" => [Karabiner.variable_if("C-spacebar", 1)] + [unless_emacs],
    },
    {
      "type" => "basic",
      "from" => {
        "key_code" => "b",
        "modifiers" => Karabiner.from_modifiers(["control"], %w[caps_lock shift]),
      },
      "to" => [
        { "key_code" => "b", "modifiers" => ["control"] },
      ],
      "conditions" => [Karabiner.variable_unless("C-spacebar", 1)] + [unless_emacs],
    },
    {
      "type" => "basic",
      "from" => {
        "key_code" => "b",
        "modifiers" => Karabiner.from_modifiers(["control"], %w[caps_lock shift]),
      },
      "to" => [
        { "key_code" => "b", "modifiers" => ["shift", "control"] }                
      ],
      "conditions" => [Karabiner.variable_if("C-spacebar", 1)] + [unless_emacs],
    },
    {
      "type" => "basic",
      "from" => {
        "key_code" => "d",
        "modifiers" => Karabiner.from_modifiers(["control"], %w[caps_lock]),
      },
      "to" => [{ "key_code" => "delete_forward" }],
      "conditions" => [unless_emacs],
    },
    {
      "type" => "basic",
      "from" => {
        "key_code" => "e",
        "modifiers" => Karabiner.from_modifiers(["control"], %w[caps_lock shift]),
      },
      "to" => [
        { "key_code" => "e", "modifiers" => ["control"] },
        Karabiner.set_variable("C-spacebar", 0)
      ],
      "conditions" => [Karabiner.variable_unless("C-spacebar", 1)] + [unless_emacs],
    },
    {
      "type" => "basic",
      "from" => {
        "key_code" => "e",
        "modifiers" => Karabiner.from_modifiers(["control"], %w[caps_lock shift]),
      },
      "to" => [{ "key_code" => "e", "modifiers" => ["shift", "control"] }],
      "conditions" => [Karabiner.variable_if("C-spacebar", 1)] + [unless_emacs],
    },
    {
      "type" => "basic",
      "from" => {
        "key_code" => "f",
        "modifiers" => Karabiner.from_modifiers(["control"], %w[caps_lock shift]),
      },
      
      "to" => [
        { "key_code" => "f", "modifiers" => ["control"] }
      ],
      "conditions" => [Karabiner.variable_unless("C-spacebar", 1)] + [unless_emacs],
    },
    {
      "type" => "basic",
      "from" => {
        "key_code" => "f",
        "modifiers" => Karabiner.from_modifiers(["control"], %w[caps_lock shift]),
      },
      "to" => [
        { "key_code" => "f", "modifiers" => ["shift", "control"] }        
      ],
      "conditions" => [Karabiner.variable_if("C-spacebar", 1)] + [unless_emacs],
    },
    {
      "type" => "basic",
      "from" => {
        "key_code" => "g",
        "modifiers" => Karabiner.from_modifiers(["control"], %w[caps_lock shift]),
      },
      "to" => [
        Karabiner.set_variable("C-spacebar", 0),
        { "key_code" => "escape" }
      ],
      "conditions" => [unless_emacs],
    },      
    {
      "type" => "basic",
      "from" => {
        "key_code" => "h",
        "modifiers" => Karabiner.from_modifiers(["control"], %w[caps_lock]),
      },
      "to" => [{ "key_code" => "delete_or_backspace" }],
      "conditions" => [unless_emacs],
    },
    {
      "type" => "basic",
      "from" => {
        "key_code" => "n",
        "modifiers" => Karabiner.from_modifiers(["control"], %w[caps_lock shift]),
      },
      "to" => [
        { "key_code" => "n", "modifiers" => ["control"] },
      ],
      "conditions" => [Karabiner.variable_unless("C-spacebar", 1)] + [unless_emacs],
    },
    {
      "type" => "basic",
      "from" => {
        "key_code" => "n",
        "modifiers" => Karabiner.from_modifiers(["control"], %w[caps_lock shift]),
      },
      "to" => [
        { "key_code" => "n", "modifiers" => ["shift", "control"] },
      ],
      "conditions" => [Karabiner.variable_if("C-spacebar", 1)] + [unless_emacs],
    },      
    {
      "type" => "basic",
      "from" => {
        "key_code" => "p",
        "modifiers" => Karabiner.from_modifiers(["control"], %w[caps_lock shift]),
      },
      "to" => [
        { "key_code" => "p", "modifiers" => ["control"] },
      ],
      "conditions" => [Karabiner.variable_unless("C-spacebar", 1)] + [unless_emacs],
    },
    {
      "type" => "basic",
      "from" => {
        "key_code" => "p",
        "modifiers" => Karabiner.from_modifiers(["control"], %w[caps_lock shift]),
      },
      "to" => [
        { "key_code" => "p", "modifiers" => ["shift", "control"] },
      ],
      "conditions" => [Karabiner.variable_if("C-spacebar", 1)] + [unless_emacs],
    },
    {
      "type" => "basic",
      "from" => {
        "key_code" => "r",
        "modifiers" => Karabiner.from_modifiers(["control"], %w[caps_lock]),
      },
      "to" => [{ "key_code" => "f", "modifiers" => "command" }],
      "conditions" => [unless_emacs],
    },
    {
      "type" => "basic",
      "from" => {
        "key_code" => "s",
        "modifiers" => Karabiner.from_modifiers(["control"], %w[caps_lock]),
      },
      "to" => [
        { "key_code" => "f", "modifiers" => "command" }
      ],
      "conditions" => [unless_emacs],
    },      
    {
      "type" => "basic",
      "from" => {
        "key_code" => "v",
        "modifiers" => Karabiner.from_modifiers(["control"], %w[caps_lock shift]),
      },
      "to" => [
        { "key_code" => "page_down" },
        Karabiner.set_variable("C-spacebar", 0)
      ],
      "conditions" => [Karabiner.variable_unless("C-spacebar", 1)] + [unless_emacs],
    },
    {
      "type" => "basic",
      "from" => {
        "key_code" => "v",
        "modifiers" => Karabiner.from_modifiers(["control"], %w[caps_lock shift]),
      },
      "to" => [{ "key_code" => "page_down", "modifiers" => "shift" }],
      "conditions" => [Karabiner.variable_if("C-spacebar", 1)] + [unless_emacs],
    },
    {
      "type" => "basic",
      "from" => {
        "key_code" => "w",
        "modifiers" => Karabiner.from_modifiers(["control"], %w[caps_lock shift]),
      },
      "to" => [
        { "key_code" => "x", "modifiers" => ["command"] },
        Karabiner.set_variable("C-spacebar", 0)
      ],
      "conditions" => [Karabiner.variable_if("C-spacebar", 1)] + [unless_emacs],
    },
    {
      "type" => "basic",
      "from" => {
        "key_code" => "y",
        "modifiers" => Karabiner.from_modifiers(["control"], %w[caps_lock]),
      },
      "to" => [{ "key_code" => "v", "modifiers" => "command" }],
      "conditions" => [unless_emacs],
    },
    {
      "type" => "basic",
      "from" => {
        "key_code" => "y",
        "modifiers" => Karabiner.from_modifiers(["control"], %w[caps_lock]),
      },
      "to" => [
        { "key_code" => "v", "modifiers" => "command" },
        { "key_code" => "y", "modifiers" => "command" } # Terminal pass-through
      ],
      "conditions" => [if_terminal],
    },    
    {
      "type" => "basic",
      "from" => {
        "key_code" => "slash",
        "modifiers" => Karabiner.from_modifiers(["control"], %w[caps_lock]),
      },
      "to" => [{ "key_code" => "z", "modifiers" => "command" }],
      "conditions" => [unless_emacs],
    },                  
    {
      "type" => "basic",
      "from" => {
        "key_code" => "spacebar",
        "modifiers" => Karabiner.from_modifiers(["control"], %w[caps_lock shift]),
      },
      "to" => [
        Karabiner.set_variable("C-spacebar", 1)
      ],
      "conditions" =>  [Karabiner.variable_unless("C-spacebar", 1)] + [unless_emacs],
    },
    {
      "type" => "basic",
      "from" => {
        "key_code" => "spacebar",
        "modifiers" => Karabiner.from_modifiers(["control"], %w[caps_lock shift]),
      },
      "to" => [
        Karabiner.set_variable("C-spacebar", 0)
      ],
      "conditions" => [Karabiner.variable_if("C-spacebar", 1)] + [unless_emacs],
    }
  ]
end

def option_keys(unless_emacs)
  if_jetbrains = Karabiner.frontmost_application_if(["jetbrains_ide"])
  unless_jetbrains = Karabiner.frontmost_application_unless(["jetbrains_ide"])
  if_browser = Karabiner.frontmost_application_if(["browser"])
  unless_browser = Karabiner.frontmost_application_unless(["browser"])
  
  [
    {
      "type" => "basic",
      "from" => {
        "key_code" => "f",
        "modifiers" => Karabiner.from_modifiers(["option"], ["shift"]),
      },
      "to" => [{ "key_code" => "right_arrow", "modifiers" => ["option"] }],
      "conditions" => [unless_emacs],
    },
    {
      "type" => "basic",
      "from" => {
        "key_code" => "n",
        "modifiers" => Karabiner.from_modifiers(["option"]),
      },
      "to" => [{ "key_code" => "n", "modifiers" => ["command"] }],
      "conditions" => [unless_emacs] + [unless_jetbrains] + [unless_browser],
    },
    {
      "type" => "basic",
      "from" => {
        "key_code" => "n",
        "modifiers" => Karabiner.from_modifiers(["option"]),
      },
      "to" => [{ "key_code" => "n", "modifiers" => ["command"] }],
      "conditions" => [if_jetbrains],
    },
    {
      "type" => "basic",
      "from" => {
        "key_code" => "n",
        "modifiers" => Karabiner.from_modifiers(["option"]),
      },
      "to" => [{ "key_code" => "t", "modifiers" => ["command"] }],
      "conditions" => [if_browser],
    },
    {
      "type" => "basic",
      "from" => {
        "key_code" => "t",
        "modifiers" => Karabiner.from_modifiers(["option"]),
      },
      "to" => [{ "key_code" => "t", "modifiers" => ["command"] }],
      "conditions" => [if_browser],
    },        
    {
      "type" => "basic",
      "from" => {
        "key_code" => "v",
        "modifiers" => Karabiner.from_modifiers(["option"], ["shift"]),
      },
      "to" => [{ "key_code" => "page_up" }],
      "conditions" => [unless_emacs],
    },
    {
      "type" => "basic",
      "from" => {
        "key_code" => "w",
        "modifiers" => Karabiner.from_modifiers(["option"]),
      },
      "to" => [
        { "key_code" => "c", "modifiers" => ["command"] },
        Karabiner.set_variable("C-spacebar", 0)
      ],
      "conditions" => [unless_emacs],
    },
    {
      "type" => "basic",
      "from" => {
        "key_code" => "y",
        "modifiers" => Karabiner.from_modifiers(["option"]),
      },
      "to" => [{ "key_code" => "v", "modifiers" => ["command"] }],
      "conditions" => [unless_emacs],
    },
    {
      "type" => "basic",
      "from" => {
        "key_code" => "delete_or_backspace",
        "modifiers" => Karabiner.from_modifiers(["option"]),
      },
      "to" => [{ "key_code" => "z", "modifiers" => ["command"] }],
      "conditions" => [unless_emacs],
    }
  ]
end

main
