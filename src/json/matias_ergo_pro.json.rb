#!/usr/bin/env ruby
# frozen_string_literal: true

require 'json'
require_relative '../lib/karabiner.rb'
require_relative '../lib/key_codes.rb'
require_relative '../lib/variable.rb'

def main
  puts JSON.pretty_generate(
    'title' => Device::NAME,
    'maintainers' => ['mingaldrichgan'],
    'rules' => [Rules::NavKeys, Rules::RightControl].map(&:rule)
  )
end

module Device
  NAME = 'Matias Ergo Pro Keyboard'

  CONDITION = {
    'description' => NAME,
    'type' => 'device_if',
    'identifiers' => [{ 'vendor_id' => 1452, 'product_id' => 591 }],
  }.freeze

  TOP_ROW = (KeyCodes.f(1..12) + %w[escape delete_forward]).freeze
  TYPING_KEYS = (KeyCodes::ALPHANUMERIC_ROWS + ['spacebar']).freeze
end

module Rules
  module NavKeys
    TO_KEY = 'right_option'
    VAR = Variable.new("use_nav_keys_as_#{TO_KEY}").freeze

    NAV_KEYS = %w[home end page_up page_down].freeze
    NAV_MODIFIERS = %w[right_command right_shift].freeze

    def self.rule
      {
        'description' => "#{Device::NAME}: Change navigation keys to #{TO_KEY} if pressed with another key",
        'manipulators' => VAR.remap_to_modifiers(
          NAV_KEYS,
          to_modifiers: [TO_KEY],
          modifiable: Device::TOP_ROW + Device::TYPING_KEYS + NAV_KEYS + NAV_MODIFIERS + KeyCodes::ARROWS
        ),
      }
    end
  end # module NavKeys

  module RightControl
    FROM_KEY = 'right_control'
    TO_KEY = 'b'
    VAR = Variable.new("use_#{FROM_KEY}_as_#{TO_KEY}").freeze

    TYPING_MODIFIERS = Karabiner.from_modifiers(nil, %w[caps_lock shift]).freeze

    def self.rule
      {
        'description' => "#{Device::NAME}: Change #{FROM_KEY} to #{TO_KEY} if pressed alone, or while typing",
        'manipulators' => (
          Device::TYPING_KEYS.map do |key|
            {
              'description' => "Set variable if #{key} is pressed",
              'type' => 'basic',
              'from' => { 'key_code' => key, 'modifiers' => TYPING_MODIFIERS },
              'to' => [VAR.set, { 'key_code' => key }],
              'to_delayed_action' => { 'to_if_invoked' => [VAR.unset] },
              'conditions' => [Device::CONDITION, NavKeys::VAR.unless_set],
            }
          end + [
            {
              'description' => "Change #{FROM_KEY} to #{TO_KEY} if variable is set",
              'type' => 'basic',
              'from' => { 'key_code' => FROM_KEY, 'modifiers' => Karabiner.from_modifiers },
              'to' => [VAR.set, { 'key_code' => TO_KEY }],
              'to_delayed_action' => { 'to_if_invoked' => [VAR.unset] },
              'conditions' => [Device::CONDITION, VAR.if_set],
            },
            {
              'description' => "Change #{FROM_KEY} to #{TO_KEY} if pressed alone and not held down",
              'type' => 'basic',
              'from' => { 'key_code' => FROM_KEY, 'modifiers' => Karabiner.from_modifiers },
              'to' => [{ 'key_code' => FROM_KEY, 'lazy' => true }],
              'to_if_alone' => [VAR.set, { 'key_code' => TO_KEY }],
              'to_if_held_down' => [{ 'key_code' => FROM_KEY }],
              'to_delayed_action' => { 'to_if_invoked' => [VAR.unset] },
              'conditions' => [Device::CONDITION, VAR.unless_set],
              'parameters' => {
                # Set these parameters to the same value.
                'basic.to_if_alone_timeout_milliseconds' => 500, # Default value is 1000.
                'basic.to_if_held_down_threshold_milliseconds' => 500, # Default value.
              },
            },
          ]
        ),
      }
    end
  end # module RightControl
end # module Rules

main
