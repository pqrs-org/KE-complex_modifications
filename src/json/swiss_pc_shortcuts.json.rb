#!/usr/bin/env ruby

# You can generate json by executing the following command on Terminal.
#
# $ ruby ./swiss_pc_shortcuts.json.rb
#

############################################################

require 'json'
require_relative '../lib/karabiner.rb'

def from_key_with_option(key_code)
  {
    'key_code' => key_code,
    'modifiers' => Karabiner.from_modifiers(['right_option'], ['left_option']),
  }
end

def to_key_with_option(key_code, mod)
  {
    'key_code' => key_code,
    'modifiers' => mod,
  }
end

def swap_opt_shortcut_keys(from, to, mod)
  {
    'type' => 'basic',
    'from' => from_key_with_option(from),
    'to' => to_key_with_option(to, mod),
    'conditions' => [Karabiner.frontmost_application_unless(%w[remote_desktop virtual_machine])],
  }
end

def rules(description, from, to, mod=['option'])
  {
    'description' => description,
    'manipulators' => [swap_opt_shortcut_keys(from, to, mod)]
  }
end

def main

  puts JSON.pretty_generate(
    'title' => 'Swiss PC-Style Shortcuts',
    'maintainers' => ['Birate'],
    'rules' => [
      rules('Option+[è/ü] -> [', 'open_bracket', '5'),
      rules('Option+[¨] -> ]', 'close_bracket', '6'),
      rules('Option+[2] -> @ ', '2', 'g'),
      rules('Option+[à/ä] -> { ', 'quote', '8'),
      rules('Option+[$] -> }', 'backslash', '9'),
      rules('Option+[<] -> \  ', 'grave_accent_and_tilde', '7', ['option', 'shift']),
      rules('Option+[''] -> ´', 'hyphen', 'equal_sign'),
      rules('Option+[^] -> ~', 'equal_sign', 'n'),
    ]
  )
end

main
