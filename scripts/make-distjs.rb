#!/usr/bin/env ruby

require 'json'

json = JSON.parse(open('groups.json').read)

json.each do |_type, groups|
  groups.each do |group|
    group['files'].each do |file|
      unless file['path'].nil?
        file['json'] = JSON.parse(File.open(file['path']).read)
        file['json']['rules'].each do |r|
          r.delete('manipulators')
        end
      end

      unless file['extra_description_path'].nil?
        file['extra_description'] = File.open(file['extra_description_path']).read
      end
    end
  end
end

puts JSON.pretty_generate(json)
