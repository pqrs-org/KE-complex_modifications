#!/usr/bin/env ruby
# frozen_string_literal: true

Encoding.default_external = Encoding::UTF_8
Encoding.default_internal = Encoding::UTF_8

#
# Check filename
#

Dir.glob("#{__dir__}/../public/json/*").sort.each do |file_path|
  next if /\.json$/ =~ file_path

  basename = File.basename(file_path)

  puts ''
  puts '----------------------------------------'
  puts 'ERROR:'
  puts "Please rename public/json/#{basename} to public/json/#{basename}.json"
  puts '----------------------------------------'
  puts ''

  exit 1
end

#
# Apply lint
#

result = system("#{__dir__}/apply-lint.sh #{__dir__}/../public/json/*.json")
exit 1 unless result

exit 0
