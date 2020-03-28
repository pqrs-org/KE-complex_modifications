# frozen_string_literal: true

require_relative 'karabiner.rb'
require_relative 'key_codes.rb'

class Variable
  NAMESPACE = File.basename($PROGRAM_NAME, '.json.rb').freeze

  attr_reader :unset

  def initialize(name, unset_value: 0)
    @qualified_name = "#{NAMESPACE}.#{name}"
    @unset = set(unset_value)
  end

  def set(value = 1)
    Karabiner.set_variable(@qualified_name, value)
  end

  def if_set(value = 1)
    Karabiner.variable_if(@qualified_name, value)
  end

  def unless_set(value = 1)
    Karabiner.variable_unless(@qualified_name, value)
  end

  # Remaps one or more keys to one or more modifiers when pressed simultaneously with specified keys.
  # A variable is used as a {virtual modifier}[https://karabiner-elements.pqrs.org/docs/json/extra/virtual-modifier/],
  # allowing non-modifier keys to act like modifiers and remain active as long as they are held down.
  #
  # @param from_key_codes [<String>] key code(s) that should act like +to_modifiers+
  #        when pressed simultaneously with +modifiable+ keys. If more than one,
  #        any combination of these keys pressed simultaneously also triggers the remapping.
  # @param to_modifiers [<String>] modifier(s) to which +from_key_codes+ are remapped.
  # @param modifiable [<String>] key codes that, when pressed simultaneously with
  #        +from_key_codes+, should act like they are modified by +to_modifiers+ instead.
  # @param conditions array of {condition definitions}[https://karabiner-elements.pqrs.org/docs/json/complex-modifications-manipulator-definition/conditions/].
  # @return array of {manipulator definitions}[https://karabiner-elements.pqrs.org/docs/json/complex-modifications-manipulator-definition/].
  def remap_to_modifiers(from_key_codes,
                         from_modifiers: Karabiner.from_modifiers,
                         to_modifiers: [],
                         modifiable: [],
                         conditions: [])
    [
      from_key_codes.combination(2).map do |keys|
        {
          'description' => "Set variable if #{keys.join(' + ')} are pressed simultaneously",
          'type' => 'basic',
          'from' => {
            'modifiers' => from_modifiers,
            'simultaneous' => KeyCodes.map(*keys),
            'simultaneous_options' => { 'to_after_key_up' => [unset] },
          },
          'to' => [set],
          'conditions' => conditions + [unless_set],
        }
      end,
      from_key_codes.product(modifiable - from_key_codes).map do |from_key, other_key|
        {
          'description' => "Change #{from_key} to #{to_modifiers.join(' + ')} if pressed with #{other_key}",
          'type' => 'basic',
          'from' => {
            'modifiers' => from_modifiers,
            'simultaneous' => KeyCodes.map(from_key, other_key),
            'simultaneous_options' => { 'to_after_key_up' => [unset] },
          },
          'to' => [set, { 'key_code' => other_key, 'modifiers' => to_modifiers }],
          'conditions' => conditions + [unless_set],
        }
      end,
      (modifiable - KeyCodes::MODIFIERS).map do |key|
        {
          'description' => "Modify #{key} with #{to_modifiers.join(' + ')} if variable is set",
          'type' => 'basic',
          'from' => { 'key_code' => key, 'modifiers' => from_modifiers },
          'to' => [{ 'key_code' => key, 'modifiers' => to_modifiers }],
          'conditions' => conditions + [if_set],
        }
      end,
    ].flatten
  end
end
