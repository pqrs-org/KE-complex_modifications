#!/usr/bin/env ruby

require 'json'

file_names = [
  "control_backspace_to_function_backspace",
  "map_left_option_plus_spacebar_to_enter",
  "map_left_option_with_j_k_l_semicolon_to_arrows",
  "map_shift_plus_left_option_with_j_k_l_semicolon_to_page_arrows",
  "bepo-cmdqwerty-toggle"
]

path = Dir.pwd + "/src/json/"
rules = file_names.flat_map do |file_name|
  file = File.new("#{path}#{file_name}.json.erb")
  JSON.load(File.new(file).read)["rules"]
end

puts JSON.pretty_generate({
  "title": "Personal Thooams Remapping",
  "rules": rules
})
