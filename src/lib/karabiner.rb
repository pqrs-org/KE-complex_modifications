# frozen_string_literal: true

# Helper methods for generating json
module Karabiner
  BUNDLE_IDENTIFERS = {
    :alfred => [
      '^com\\.runningwithcrayons\\.Alfred$',
    ],

    :activity_monitor => [
      '^com\.apple\.ActivityMonitor$',
    ],

    :adium => [
      '^com\.adiumX\.adiumX$',
    ],

    :browser => [
      '^org\.mozilla\.firefox$',
      '^org\.mozilla\.nightly$',
      '^com\.microsoft\.Edge', # prefix
      '^com\.google\.Chrome$',
      '^com\.apple\.Safari$',
    ],

    :eclipse => [
      '^org\.eclipse\.platform\.ide$',
    ],

    :emacs => [
      '^org\.gnu\.Emacs$',
      '^org\.gnu\.AquamacsEmacs$',
      '^org\.gnu\.Aquamacs$',
      '^org\.pqrs\.unknownapp.conkeror$',
    ],

    :finder => [
      '^com\.apple\.finder$',
    ],

    :git_gui => [
      '^cz\.or\.repo\.git-gui$',
    ],

    :jetbrains_ide => [
      '^com\.jetbrains\.', # prefix
    ],

    :loginwindow => [
      '^com\.apple\.loginwindow$',
    ],

    :microsoft_office => [
      '^com\.microsoft\.Excel$',
      '^com\.microsoft\.Powerpoint$',
      '^com\.microsoft\.Word$',
    ],

    :remote_desktop => [
      # com.microsoft.rdc
      # com.microsoft.rdc.mac
      # com.microsoft.rdc.macos
      # com.microsoft.rdc.osx.beta
      '^com\.microsoft\.rdc$',
      '^com\.microsoft\.rdc\.',

      '^net\.sf\.cord$',
      '^com\.thinomenon\.RemoteDesktopConnection$',
      '^com\.itap-mobile\.qmote$',
      '^com\.nulana\.remotixmac$',

      # com.p5sys.jump.mac.viewer
      # com.p5sys.jump.mac.viewer.web
      '^com\.p5sys\.jump\.mac\.viewer$',
      '^com\.p5sys\.jump\.mac\.viewer\.',

      '^com\.teamviewer\.TeamViewer$',
      '^com\.vmware\.horizon$',
      '^com\.2X\.Client\.Mac$',
    ],

    :terminal => [
      '^com\.apple\.Terminal$',
      '^com\.googlecode\.iterm2$',
      '^co\.zeit\.hyperterm$',
      '^co\.zeit\.hyper$',
      '^io\.alacritty$',
      '^net\.kovidgoyal\.kitty$',
    ],

    :vi => [
      '^org\.vim\.', # prefix
      '^com\.qvacua\.VimR$',
    ],

    :virtual_machine => [
      '^com\.vmware\.fusion$',
      '^com\.vmware\.horizon$',
      '^com\.vmware\.view$',
      '^com\.parallels\.desktop$',
      '^com\.parallels\.vm$',
      '^com\.parallels\.desktop\.console$',
      '^org\.virtualbox\.app\.VirtualBoxVM$',
      '^com\.citrix\.XenAppViewer$',
      '^com\.vmware\.proxyApp\.', # prefix
      '^com\.parallels\.winapp\.', # prefix
    ],

    :sublime_text => [
      '^com\.sublimetext\.', # prefix
    ],

    :visual_studio_code => [
      '^com\.microsoft\.VSCode$',
    ],

    :vnc => [
      '^com\.geekspiff\.chickenofthevnc$',
      '^net\.sourceforge\.chicken$',
      '^de\.jinx\.JollysFastVNC\.', # prefix
      '^com\.realvnc\.vncviewer\.', # prefix
    ],

    :x11 => [
      '^org\.x\.X11$',
      '^com\.apple\.x11$',
      '^org\.macosforge\.xquartz\.X11$',
      '^org\.macports\.X11$',
    ],

    :xcode => [
      '^com\.apple\.dt\.Xcode$',
    ],
  }.freeze

  APP_ALIASES = {
    'alfred' => BUNDLE_IDENTIFERS[:alfred],
    'activity_monitor' => BUNDLE_IDENTIFERS[:activity_monitor],
    'adium' => BUNDLE_IDENTIFERS[:adium],
    'browser' => BUNDLE_IDENTIFERS[:browser],
    'eclipse' => BUNDLE_IDENTIFERS[:eclipse],
    'emacs' => BUNDLE_IDENTIFERS[:emacs],
    'emacs_key_bindings_exception' => BUNDLE_IDENTIFERS[:emacs] +
                                      BUNDLE_IDENTIFERS[:remote_desktop] +
                                      BUNDLE_IDENTIFERS[:terminal] +
                                      BUNDLE_IDENTIFERS[:vi] +
                                      BUNDLE_IDENTIFERS[:virtual_machine] +
                                      BUNDLE_IDENTIFERS[:x11] +
                                      BUNDLE_IDENTIFERS[:sublime_text] +
                                      BUNDLE_IDENTIFERS[:visual_studio_code],
    'finder' => BUNDLE_IDENTIFERS[:finder],
    'git_gui' => BUNDLE_IDENTIFERS[:git_gui],
    'jetbrains_ide' => BUNDLE_IDENTIFERS[:jetbrains_ide],
    'loginwindow' => BUNDLE_IDENTIFERS[:loginwindow],
    'microsoft_office' => BUNDLE_IDENTIFERS[:microsoft_office],
    'remote_desktop' => BUNDLE_IDENTIFERS[:remote_desktop],
    'terminal' => BUNDLE_IDENTIFERS[:terminal],
    'vi' => BUNDLE_IDENTIFERS[:vi],
    'virtual_machine' => BUNDLE_IDENTIFERS[:virtual_machine],
    'visual_studio_code' => BUNDLE_IDENTIFERS[:visual_studio_code],
    'vnc' => BUNDLE_IDENTIFERS[:vnc],
    'xcode' => BUNDLE_IDENTIFERS[:xcode],
  }.freeze

  def self.from_modifiers(mandatory_modifiers = nil, optional_modifiers = ['any'])
    modifiers = {}
    modifiers['mandatory'] = mandatory_modifiers unless mandatory_modifiers.nil?
    modifiers['optional'] = optional_modifiers unless optional_modifiers.nil?
    modifiers
  end

  def self.set_variable(name, value)
    {
      'set_variable' => {
        'name' => name,
        'value' => value,
      },
    }
  end

  def self.frontmost_application(type, app_aliases = [], bundle_identifiers: [])
    app_aliases.each do |app_alias|
      if Karabiner::APP_ALIASES[app_alias].nil?
        $stderr << "unknown app_alias: #{app_alias}\n"
      else
        bundle_identifiers += Karabiner::APP_ALIASES[app_alias]
      end
    end

    {
      'type' => type,
      'bundle_identifiers' => bundle_identifiers,
    }
  end

  def self.frontmost_application_if(app_aliases = [], bundle_identifiers: [])
    frontmost_application('frontmost_application_if', app_aliases, bundle_identifiers: bundle_identifiers)
  end

  def self.frontmost_application_unless(app_aliases = [], bundle_identifiers: [])
    frontmost_application('frontmost_application_unless', app_aliases, bundle_identifiers: bundle_identifiers)
  end

  def self.keyboard_type_if(keyboard_types)
    {
      'type' => 'keyboard_type_if',
      'keyboard_types' => keyboard_types,
    }
  end

  def self.keyboard_type_unless(keyboard_types)
    {
      'type' => 'keyboard_type_unless',
      'keyboard_types' => keyboard_types,
    }
  end

  def self.input_source_if(input_sources)
    {
      'type' => 'input_source_if',
      'input_sources' => input_sources,
    }
  end

  def self.input_source_unless(input_sources)
    {
      'type' => 'input_source_unless',
      'input_sources' => input_sources,
    }
  end

  def self.variable_if(name, value)
    {
      'type' => 'variable_if',
      'name' => name,
      'value' => value,
    }
  end

  def self.variable_unless(name, value)
    {
      'type' => 'variable_unless',
      'name' => name,
      'value' => value,
    }
  end
end
