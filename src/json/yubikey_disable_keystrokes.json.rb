#!/usr/bin/env ruby
# Author: @jonatasrenan
# You can generate json by executing the following command on Terminal.
#
# $ ruby ./yubikey_disable_keystrokes.json.rb
#

require 'json'
require_relative '../lib/karabiner.rb'

def disable_key(key)
  {
    'type'=> 'basic',
    'from'=> {'key_code'=> key},
    'to'=> [{'key_code'=> 'vk_none'}],
    'conditions'=> [
      {
        'type'=> 'device_if',
        'identifiers'=> [
          {
            'product_id'=> 1031,
            'vendor_id'=> 4176
          }
        ]
      }
    ]
  }
end

def main
  keys = "abcdefghijklmnopqrstuvxz".chars + ["return_or_enter"]
  puts JSON.pretty_generate(
    'title' => 'Disable YubiKey 5C Nano Keystrokes @jonatasrenan',
    'rules' => [
      'description' => 'Disable YubiKey 5C Nano Keystrokes @jonatasrenan',
      'manipulators' => keys.map{ |key| disable_key(key) }
    ]
  )
end

main
