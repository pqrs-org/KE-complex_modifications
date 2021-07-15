#!/usr/bin/env ruby
# frozen_string_literal: true

require 'json'

Mapping = Struct.new(:description, :from_key, :is_from_shift, :to_key, :is_to_shift, :is_to_option) do
  def initialize(*)
    super
    self.is_to_option ||= false
  end
end

def create_rule(mapping)
  from = {
    'key_code': mapping.from_key,
    'modifiers': {
      'optional': ['control', 'option', 'command']
    }
  }
  if mapping.is_from_shift
    from[:modifiers][:mandatory] = ['shift']
  end

  to = { 'key_code': mapping.to_key }
  if mapping.is_to_shift
    to[:modifiers] = ['left_shift']
  elsif mapping.is_to_option
    to[:modifiers] = ['left_option']
  end

  condition = {
    'type': 'keyboard_type_if',
    'keyboard_types': ['jis']
  }

  {
    'description': mapping.description,
    'manipulators': [
      {
        'type': 'basic',
        'from': from,
        'to': [to],
        'conditions': [condition]
      }
    ]
  }
end

def main
  mappings = [
    # Number mappings
    Mapping.new('Change shift + 2 from " to @', '2', true, 'open_bracket', false),
    Mapping.new('Change shift + 6 from & to ^', '6', true, 'equal_sign', false),
    Mapping.new('Change shift + 7 from \' to &', '7', true, '6', true),
    Mapping.new('Change shift + 8 from ( to *', '8', true, 'quote', true),
    Mapping.new('Change shift + 9 from ) to (', '9', true, '8', true),
    Mapping.new('Change shift + 0 from 0 to )', '0', true, '9', true),
    # Other symbol mappings
    Mapping.new('Change shift + - from = to _', 'hyphen', true, 'international1', false),
    Mapping.new('Change ^ to =', 'equal_sign', false, 'hyphen', true),
    Mapping.new('Change shift + ^ from ~ to +', 'equal_sign', true, 'semicolon', true),
    Mapping.new('Change ¥ to `', 'international3', false, 'open_bracket', true),
    Mapping.new('Change shift + ¥ from | to ~', 'international3', true, 'equal_sign', true),
    Mapping.new('Change @ to [', 'open_bracket', false, 'close_bracket', false),
    Mapping.new('Change shift + @ from ` to {', 'open_bracket', true, 'close_bracket', true),
    Mapping.new('Change [ to ]', 'close_bracket', false, 'backslash', false),
    Mapping.new('Change shift + [ from { to }', 'close_bracket', true, 'backslash', true),
    Mapping.new('Change shift + ; from + to :', 'semicolon', true, 'quote', false),
    Mapping.new('Change : to \'', 'quote', false, '7', true),
    Mapping.new('Change shift + : from * to "', 'quote', true, '2', true),
    Mapping.new('Change ] to \\', 'backslash', false, 'international3', false, true),  # \ is option + ¥
    Mapping.new('Change shift + ] from } to |', 'backslash', true, 'international3', true)
  ]
  result = {
    'title': 'Japanese JIS to US Keyboard: Remap Symbol Keys',
    'maintainers': ['halfwhole'],
    'rules': mappings.map { |mapping| create_rule(mapping) }
  }
  puts JSON.pretty_generate(result)
end

main
