#!/usr/bin/env ruby

require 'erb'
require 'json'
require_relative '../src/lib/karabiner.rb'

def _from(key_code, mandatory_modifiers, optional_modifiers)
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
  data
end

def from(key_code, mandatory_modifiers, optional_modifiers)
  JSON.generate(_from(key_code, mandatory_modifiers, optional_modifiers))
end

def _to(events)
  data = []

  events.each do |e|
    d = {}
    d['key_code'] = e[0]
    e[1].nil? || d['modifiers'] = e[1]

    data << d
  end
  data
end

def to(events)
  JSON.generate(_to(events))
end

def each_key(source_keys_list: :source_keys_list, dest_keys_list: :dest_keys_list, from_mandatory_modifiers: [], from_optional_modifiers: [], to_pre_events: [], to_modifiers: [], to_post_events: [], conditions: [], as_json: false)
  data = []
  source_keys_list.each_with_index do |from_key, index|
    to_key = dest_keys_list[index]
    d = {}
    d['type'] = 'basic'
    d['from'] = _from(from_key, from_mandatory_modifiers, from_optional_modifiers)

    # Compile list of events to add to "to" section
    events = []

    to_pre_events.each do |e|
      events << e
    end

    events << if to_modifiers[0].nil?
                [to_key]
              else
                [to_key, to_modifiers]
              end

    to_post_events.each do |e|
      events << e
    end

    d['to'] = JSON.parse(to(events))

    if conditions.any?
      d['conditions'] = []
      conditions.each do |c|
        d['conditions'] << c
      end
    end
    data << d
  end

  if as_json
    JSON.generate(data)
  else
    data
  end
end

def frontmost_application(type, app_aliases)
  bundle_identifiers = []

  app_aliases.is_a?(Enumerable) || app_aliases = [app_aliases]

  app_aliases.each do |app_alias|
    if Karabiner::APP_ALIASES[app_alias].nil?
      $stderr << "unknown app_alias: #{app_alias}\n"
    else
      bundle_identifiers += Karabiner::APP_ALIASES[app_alias]
    end
  end

  return if bundle_identifiers.empty?

  data = {
    'type' => type,
    'bundle_identifiers' => bundle_identifiers,
  }
  JSON.generate(data)
end

def frontmost_application_if(app_aliases)
  frontmost_application('frontmost_application_if', app_aliases)
end

def frontmost_application_unless(app_aliases)
  frontmost_application('frontmost_application_unless', app_aliases)
end

template = ERB.new $stdin.read
puts JSON.pretty_generate(JSON.parse(template.result))
