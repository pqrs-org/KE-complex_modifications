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
        basename = File.basename(file['path'])
        if files_in_groups.include?(basename)
          puts ''
          puts '----------------------------------------'
          puts 'ERROR:'
          puts 'There are some duplicated entries in public/groups.json.'
          puts 'Please remove them from public/groups.json.'
          puts '----------------------------------------'
          puts ''
          puts "- #{basename}"
          puts ''

          exit 1
        end

        files_in_groups << basename
      end
    end
  end
end
files_in_groups.sort!

json_files = []
Dir.glob("#{__dir__}/../public/json/*.json").sort.each do |file_path|
  json_files << File.basename(file_path)
end

orphan_files = files_in_groups - json_files
unless orphan_files.empty?
  puts ''
  puts '----------------------------------------'
  puts 'ERROR:'
  puts 'There are some files in public/groups.json are not found.'
  puts 'Please add them into public/json.'
  puts '----------------------------------------'
  puts ''

  orphan_files.each do |e|
    puts "- #{e}"
  end

  puts ''

  exit 1
end

exit 0
