#!/usr/bin/env ruby
# frozen_string_literal: true

Encoding.default_external = Encoding::UTF_8
Encoding.default_internal = Encoding::UTF_8

require 'json'
require 'cgi'

json = JSON.parse(open('groups.json').read)

json.each do |_type, groups|
  groups.each do |group|
    group['files'].each do |file|
      #
      # Strip manipulators
      #

      unless file['path'].nil?
        file['json'] = JSON.parse(File.open(file['path']).read)
        file['json']['rules'].each do |r|
          r.delete('manipulators')
        end
      end

      #
      # Set extra_description_text
      #

      extra_description_text = ''
      unless file['extra_description_path'].nil?
        extra_description_text = File.open(file['extra_description_path']).read
        # Remove <style>
        extra_description_text.gsub!(%r{<style.*</style>}m, '')
        # Strip tags
        extra_description_text.gsub!(%r{</?[^>]*>}m, '')
        # Unescape entities
        extra_description_text = CGI.unescapeHTML(extra_description_text)
        # Collapse spaces
        extra_description_text.gsub!(/\s+/, ' ')
        # Strip
        extra_description_text.strip!
      end
      file['extra_description_text'] = extra_description_text
    end
  end
end

puts JSON.pretty_generate(json)
