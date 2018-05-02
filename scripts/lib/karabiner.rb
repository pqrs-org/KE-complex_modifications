# Helper methods for generating json
module Karabiner
  BUNDLE_IDENTIFERS = {
    :activity_monitor => [
      '^com\.apple\.ActivityMonitor$',
    ],

    :adium => [
      '^com\.adiumX\.adiumX$',
    ],

    :browser => [
      '^org\.mozilla\.firefox$',
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

    :microsoft_office => [
      '^com\.microsoft\.Excel$',
      '^com\.microsoft\.Powerpoint$',
      '^com\.microsoft\.Word$',
    ],

    :remote_desktop => [
      '^com\.microsoft\.rdc$',
      '^com\.microsoft\.rdc\.mac$',
      '^com\.microsoft\.rdc\.macos$',
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
      '^com\.vmware\.proxyApp\.', # prefix
      '^com\.parallels\.winapp\.', # prefix
    ],

    :visual_studio_code => [
      '^com\.microsoft\.VSCode$',
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
end
