#!/usr/bin/ruby

require 'erb'
require 'json'

def from(key_code, mandatory_modifiers, optional_modifiers)
  data = {}
  data['key_code'] = key_code

  mandatory_modifiers.each do |m|
    data['modifiers'] = {} if data['modifiers'].nil?
    data['modifiers']['mandatory'] = [] if data['modifiers']['mandatory'].nil?
    data['modifiers']['mandatory'] << m
  end

  optional_modifiers.each do |m|
    data['modifiers'] = {} if data['modifiers'].nil?
    data['modifiers']['optional'] = [] if data['modifiers']['optional'].nil?
    data['modifiers']['optional'] << m
  end

  JSON.generate(data)
end

def to(events)
  data = []

  events.each do |e|
    d = {}
    d['key_code'] = e[0]
    unless e[1].nil?
      d['modifiers'] = e[1]
    end

    data << d
  end

  JSON.generate(data)
end

def frontmost_application(type, app_alias)
  case app_alias
  when 'terminal'
    data = {
      'type' => type,
      'bundle_identifiers' => [
        '^com\.apple\.Terminal$',
        '^com\.googlecode\.iterm2$',
        '^co\.zeit\.hyperterm$',
        '^co\.zeit\.hyper$',
      ],
    }
    JSON.generate(data)
  when 'emacs'
    data = {
      'type' => type,
      'bundle_identifiers' => [
        '^org\.gnu\.Emacs$',
        '^org\.gnu\.AquamacsEmacs$',
        '^org\.gnu\.Aquamacs$',
        '^org\.pqrs\.unknownapp.conkeror$',
      ],
    }
  else
    ''
  end
end

def frontmost_application_if(app_alias)
  frontmost_application('frontmost_application_if', app_alias)
end

def frontmost_application_unless(app_alias)
  frontmost_application('frontmost_application_unless', app_alias)
end

template = ERB.new $stdin.read
puts JSON.pretty_generate(JSON.parse(template.result))
