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
    unless e[1].nil? then
      d['modifiers'] = e[1]
    end

    data << d
  end

  JSON.generate(data)
end

template = ERB.new $stdin.read
puts JSON.pretty_generate(JSON.parse(template.result))
