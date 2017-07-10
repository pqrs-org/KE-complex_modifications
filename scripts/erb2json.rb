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
  emacs_bundle_identifiers = [
    '^org\.gnu\.Emacs$',
    '^org\.gnu\.AquamacsEmacs$',
    '^org\.gnu\.Aquamacs$',
    '^org\.pqrs\.unknownapp.conkeror$',
  ]

  remote_desktop_bundle_identifiers = [
    '^com\.microsoft\.rdc$',
    '^com\.microsoft\.rdc\.mac$',
    '^com\.microsoft\.rdc\.osx\.beta$',
    '^net\.sf\.cord$',
    '^com\.thinomenon\.RemoteDesktopConnection$',
    '^com\.itap-mobile\.qmote$',
    '^com\.nulana\.remotixmac$',
    '^com\.p5sys\.jump\.mac\.viewer$',
    '^com\.p5sys\.jump\.mac\.viewer\.web$',
    '^com\.vmware\.horizon$',
    '^com\.2X\.Client\.Mac$',
  ]

  terminal_bundle_identifiers = [
    '^com\.apple\.Terminal$',
    '^com\.googlecode\.iterm2$',
    '^co\.zeit\.hyperterm$',
    '^co\.zeit\.hyper$',
  ]

  vi_bundle_identifiers = [
    '^org\.vim\.', # prefix
  ]

  virtual_machine_bundle_identifiers = [
    '^com\.vmware\.fusion$',
    '^com\.vmware\.horizon$',
    '^com\.vmware\.view$',
    '^com\.parallels\.desktop$',
    '^com\.parallels\.vm$',
    '^com\.parallels\.desktop\.console$',
    '^org\.virtualbox\.app\.VirtualBoxVM$',
    '^com\.vmware\.proxyApp\.', # prefix
    '^com\.parallels\.winapp\.', # prefix
  ]

  x11_bundle_identifiers = [
    '^org\.x\.X11$',
    '^com\.apple\.x11$',
    '^org\.macosforge\.xquartz\.X11$',
    '^org\.macports\.X11$',
  ]

  case app_alias
  when 'terminal'
    data = {
      'type' => type,
      'bundle_identifiers' => terminal_bundle_identifiers,
    }
    JSON.generate(data)
  when 'emacs'
    data = {
      'type' => type,
      'bundle_identifiers' => emacs_bundle_identifiers,
    }
    JSON.generate(data)
  when 'emacs_key_bindings_exception'
    data = {
      'type' => type,
      'bundle_identifiers' => emacs_bundle_identifiers +
                              remote_desktop_bundle_identifiers +
                              terminal_bundle_identifiers +
                              vi_bundle_identifiers +
                              virtual_machine_bundle_identifiers +
                              x11_bundle_identifiers,
    }
    JSON.generate(data)
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
