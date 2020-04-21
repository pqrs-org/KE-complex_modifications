require 'json'
require_relative '../lib/karabiner.rb'

TENKEY_MAPPING = {
  'm'=> '1',
  'comma'=> '2',
  'period'=> '3',
  'j'=> '4',
  'k'=> '5',
  'l'=> '6',
  'u'=> '7',
  'i'=> '8',
  'o'=> '9',
  'spacebar'=> '0'
}

ARITHMETIC_SYMBOLS_MAPPING = {
  'semicolon' => 'keypad_plus',
  'p' => 'keypad_hyphen',
  'slash'=> 'keypad_equal_sign',
  '9' => 'keypad_slash',
  '0' => 'keypad_asterisk'
}

def main
  puts JSON.pretty_generate(
    title: 'CAPS 4 Tenkey',
    maintainers: %w[IvanShamatov],
    rules: [
      tenkey_toggle,
      tenkey_mapping,
      arithmetic_symbols_mapping,
    ]
  )
end

def tenkey_toggle
  {
    description: 'CAPS Tenkey: TenkeyMode on/off toggle',
    manipulators: [
      # Turning on Tenkey mode
      {
        from: _from('caps_lock', [], ['any']),
        type: 'basic',
        to: _set_variable('tenkey_mode', 1),
        conditions: tenkey_mode_off
      },
      # Turning off Tenkey mode
      {
        from: _from('caps_lock', [], ['any']),
        type: 'basic',
        to: _set_variable('tenkey_mode', 0),
        conditions: tenkey_mode_on
      }
    ]
  }
end

def tenkey_mapping
  {
    description: 'CAPS Tenkey: if TenkeyMode ON m,.jkluio' ' maps to 1234567890',
    manipulators: map_keys(TENKEY_MAPPING, conditions: tenkey_mode_on)
  }
end

def arithmetic_symbols_mapping
  {
    description: 'CAPS Tenkey: if TenkeyMode ON 90p;/ maps to /*-+=',
    manipulators: map_keys(ARITHMETIC_SYMBOLS_MAPPING, conditions: tenkey_mode_on)
  }
end


def _from(key_code, mandatory = [], optional = [])
  {
    key_code: key_code,
    modifiers: {
      mandatory: mandatory,
      optional: optional
    }
  }
end

def map_keys(mapping, conditions: [])
  mapping.map do |from_key, to_key|
    {
      type: 'basic',
      from: _from(from_key),
      to: { key_code: to_key },
      conditions: conditions
    }
  end
end

def _set_variable(name, value)
  { set_variable: { name: name, value: value } }
end

def tenkey_mode_on
  [{ type: 'variable_if', name: 'tenkey_mode', value: 1 }]
end

def tenkey_mode_off
  [{ type: 'variable_if', name: 'tenkey_mode', value: 0 }]
end

main
