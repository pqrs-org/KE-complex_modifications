# frozen_string_literal: true

module KeyCodes
  NUMBERS = ('0'..'9').to_a.freeze
  LETTERS = ('a'..'z').to_a.freeze

  # Non-modifier keys on rows with alphanumeric characters on a Mac keyboard.
  # On a MacBook, this would be all except the top and bottom rows of keys.
  ALPHANUMERIC_ROWS = (NUMBERS + LETTERS + %w[
    grave_accent_and_tilde hyphen equal_sign delete_or_backspace
    tab open_bracket close_bracket backslash
    semicolon quote return_or_enter
    comma period slash
  ]).freeze

  ARROWS = %w[left right up down].map { |d| "#{d}_arrow" }.freeze

  MODIFIERS = (
    %w[caps_lock fn command control option shift] +
    %w[left_ right_].product(%w[command control option shift alt gui]).map(&:join)
  ).freeze

  # Returns an array of f-key codes (up to +f24+).
  #
  # @param range [Range<Number>] Subset of +1..24+ for which to generate f-key codes.
  # @return [<String>] Array of f-key codes.
  def self.f(range = 1..24)
    range.map { |n| "f#{n}" }
  end

  # Returns an array of +key_code+ hashes that could be used e.g. in +from > simultaneous+ or +to+.
  #
  # @param key_codes [<String>] Array of key codes.
  # @return [<{String=>String}>] Array of +key_code+ hashes.
  def self.map(*key_codes)
    key_codes.map { |key_code| { 'key_code' => key_code } }
  end
end
