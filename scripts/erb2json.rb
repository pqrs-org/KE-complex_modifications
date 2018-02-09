#!/usr/bin/env ruby

require 'erb'
require 'json'

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
    unless e[1].nil?
      d['modifiers'] = e[1]
    end

    data << d
  end
  data
end

def to(events)
  JSON.generate(_to(events))
end


def each_key(source_keys_list: :source_keys_list, dest_keys_list: :dest_keys_list, from_mandatory_modifiers: [], from_optional_modifiers: [], to_pre_events: [], to_modifiers: [], to_post_events: [], conditions: [], as_json: false)
  data = []
  source_keys_list.each_with_index do |from_key,index|
    to_key = dest_keys_list[index]
    d = {}
    d['type'] = 'basic'
    d['from'] = _from(from_key, from_mandatory_modifiers, from_optional_modifiers)

    # Compile list of events to add to "to" section
    events = []
    to_pre_events.each do |e|
      events << e
    end
    if to_modifiers[0].nil?
      events << [to_key]
    else
      events << [to_key, to_modifiers]
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
  activity_monitor_bundle_identifiers = [
    '^com\.apple\.ActivityMonitor$',
  ]

  adium_bundle_identifiers = [
    '^com\.adiumX\.adiumX$',
  ]

  browser_bundle_identifiers = [
    '^org\.mozilla\.firefox$',
    '^com\.google\.Chrome$',
    '^com\.apple\.Safari$',
  ]

  eclipse_bundle_identifiers = [
    '^org\.eclipse\.platform\.ide$',
  ]

  emacs_bundle_identifiers = [
    '^org\.gnu\.Emacs$',
    '^org\.gnu\.AquamacsEmacs$',
    '^org\.gnu\.Aquamacs$',
    '^org\.pqrs\.unknownapp.conkeror$',
  ]

  finder_bundle_identifiers = [
    '^com\.apple\.finder$',
  ]

  microsoft_office_bundle_identifiers = [
    '^com\.microsoft\.Excel$',
    '^com\.microsoft\.Powerpoint$',
    '^com\.microsoft\.Word$',
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
    '^com\.teamviewer\.TeamViewer$',
    '^com\.vmware\.horizon$',
    '^com\.2X\.Client\.Mac$',
  ]

  terminal_bundle_identifiers = [
    '^com\.apple\.Terminal$',
    '^com\.googlecode\.iterm2$',
    '^co\.zeit\.hyperterm$',
    '^co\.zeit\.hyper$',
    '^io\.alacritty$',
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

  xcode_bundle_identifiers = [
    '^com\.apple\.dt\.Xcode$'
  ]

  # ----------------------------------------

  bundle_identifiers = []

  unless app_aliases.is_a? Enumerable
    app_aliases = [ app_aliases ]
  end

  app_aliases.each do |app_alias|
    case app_alias
    when 'activity_monitor'
      bundle_identifiers.concat(activity_monitor_bundle_identifiers)

    when 'adium'
      bundle_identifiers.concat(adium_bundle_identifiers)

    when 'browser'
      bundle_identifiers.concat(browser_bundle_identifiers)

    when 'eclipse'
      bundle_identifiers.concat(eclipse_bundle_identifiers)

    when 'emacs'
      bundle_identifiers.concat(emacs_bundle_identifiers)

    when 'emacs_key_bindings_exception'
      bundle_identifiers.concat(emacs_bundle_identifiers)
      bundle_identifiers.concat(remote_desktop_bundle_identifiers)
      bundle_identifiers.concat(terminal_bundle_identifiers)
      bundle_identifiers.concat(vi_bundle_identifiers)
      bundle_identifiers.concat(virtual_machine_bundle_identifiers)
      bundle_identifiers.concat(x11_bundle_identifiers)
      bundle_identifiers << '^com\\.microsoft\\.VSCode$'

    when 'finder'
      bundle_identifiers.concat(finder_bundle_identifiers)

    when 'microsoft_office'
      bundle_identifiers.concat(microsoft_office_bundle_identifiers)

    when 'remote_desktop'
      bundle_identifiers.concat(remote_desktop_bundle_identifiers)

    when 'terminal'
      bundle_identifiers.concat(terminal_bundle_identifiers)

    when 'vi'
      bundle_identifiers.concat(vi_bundle_identifiers)

    when 'virtual_machine'
      bundle_identifiers.concat(virtual_machine_bundle_identifiers)

    when 'xcode'
      bundle_identifiers.concat(xcode_bundle_identifiers)

    else
      $stderr << "unknown app_alias: #{app_alias}\n"
    end
  end

  unless bundle_identifiers.empty?
    JSON.generate({
                    "type" => type,
                    "bundle_identifiers" => bundle_identifiers,
                  })
  end
end

def frontmost_application_if(app_aliases)
  frontmost_application('frontmost_application_if', app_aliases)
end

def frontmost_application_unless(app_aliases)
  frontmost_application('frontmost_application_unless', app_aliases)
end

template = ERB.new $stdin.read
puts JSON.pretty_generate(JSON.parse(template.result))
