#!/usr/bin/env ruby
# frozen_string_literal: true

Encoding.default_external = Encoding::UTF_8
Encoding.default_internal = Encoding::UTF_8

require 'json'

files_in_groups = []
open(File.join(__dir__, '..', 'public', 'groups.json')) do |f|
  data = JSON.parse(f.read)
  data.each_value do |group|
    group.each do |category|
      category['files'].each do |file|
        files_in_groups << File.basename(file['path'])
      end
    end
  end
end
files_in_groups.sort!

json_files = []
# Exclude git ignored files
`git ls-files #{__dir__}/../public/json`.split(/\n/).each do |file_path|
  json_files << File.basename(file_path)
end
json_files.sort!

missing_entries = json_files - files_in_groups
unless missing_entries.empty?
  puts ''
  puts '----------------------------------------'
  puts 'ERROR:'
  puts 'There are some files are not included in public/groups.json.'
  puts 'Please add them into public/groups.json.'
  puts '----------------------------------------'
  puts ''

  missing_entries.each do |e|
    puts "- #{e}"
  end

  puts ''

  exit 1
end

exit 0
