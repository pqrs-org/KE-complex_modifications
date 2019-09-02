#!/usr/bin/env ruby
# frozen_string_literal: true

require 'json'
require_relative '../lib/karabiner.rb'
require_relative '../lib/key_codes.rb'
require_relative '../lib/variable.rb'

def main
  puts JSON.pretty_generate(
    'title' => 'Personal rules (@mingaldrichgan)',
    'maintainers' => ['mingaldrichgan'],
    'rules' => [Rules::SymbolicFn, Rules::Sibelius].map(&:rule)
  )
end

module Rules
  module SymbolicFn
    FROM_KEYS = %w[escape grave_accent_and_tilde hyphen equal_sign].freeze
    TO_KEY = 'fn'

    def self.rule
      {
        'description' => "Change #{FROM_KEYS.join('/')} to #{TO_KEY} if pressed with f-keys or delete",
        'manipulators' => Variable.new("use_symbols_as_#{TO_KEY}").remap_to_modifiers(
          FROM_KEYS,
          to_modifiers: [TO_KEY],
          modifiable: KeyCodes.f(1..12) + ['delete_or_backspace']
        ),
      }
    end
  end # module SymbolicFn

  module Sibelius
    APP_NAME = 'Sibelius'
    APP_CONDITION = Karabiner.frontmost_application_if(bundle_identifiers: ['^com\.avid\.sibelius$']).freeze

    def self.rule
      {
        'description' => "#{APP_NAME}: Nums keypad workarounds",
        'manipulators' => [
          {
            'description' => 'Change 5 to f5 if modified by shift',
            'type' => 'basic',
            'from' => { 'key_code' => '5', 'modifiers' => Karabiner.from_modifiers(['shift']) },
            'to' => [{ 'key_code' => 'f5', 'modifiers' => ['left_shift'] }],
            'conditions' => [APP_CONDITION],
          },
          {
            'description' => 'Change return_or_enter to keypad_enter',
            'type' => 'basic',
            'from' => { 'key_code' => 'return_or_enter' },
            'to' => [{ 'key_code' => 'keypad_enter' }],
            'conditions' => [APP_CONDITION],
          },
        ],
      }
    end
  end # module Sibelius
end # module Rules

main
