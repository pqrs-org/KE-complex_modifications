// JavaScript should be written in ECMAScript 5.1.

const rawBundleIdentifers = {
  alfred: ['^com\\.runningwithcrayons\\.Alfred$'],

  activityMonitor: ['^com\\.apple\\.ActivityMonitor$'],

  adium: ['^com\\.adiumX\\.adiumX$'],

  browser: [
    '^org\\.mozilla\\.firefox$',
    '^org\\.mozilla\\.firefoxdeveloperedition$',
    '^org\\.mozilla\\.nightly$',
    '^com\\.microsoft\\.Edge', // prefix
    '^com\\.microsoft\\.edgemac', // prefix
    '^com\\.google\\.Chrome$',
    '^com\\.brave\\.Browser$',
    '^com\\.apple\\.Safari$',
  ],

  eclipse: ['^org\\.eclipse\\.platform\\.ide$'],

  emacs: [
    '^org\\.gnu\\.Emacs$',
    '^org\\.gnu\\.AquamacsEmacs$',
    '^org\\.gnu\\.Aquamacs$',
    '^org\\.pqrs\\.unknownapp\\.conkeror$',
  ],

  finder: ['^com\\.apple\\.finder$'],

  gitGUI: ['^cz\\.or\\.repo\\.git-gui$'],

  jetbrainsIDE: [
    '^com\\.jetbrains\\.', // prefix
  ],

  loginwindow: ['^com\\.apple\\.loginwindow$'],

  microsoftOffice: [
    '^com\\.microsoft\\.Excel$',
    '^com\\.microsoft\\.Powerpoint$',
    '^com\\.microsoft\\.Word$',
  ],

  remoteDesktop: [
    // com.microsoft.rdc
    // com.microsoft.rdc.mac
    // com.microsoft.rdc.macos
    // com.microsoft.rdc.osx.beta
    '^com\\.microsoft\\.rdc$',
    '^com\\.microsoft\\.rdc\\.',

    '^net\\.sf\\.cord$',
    '^com\\.thinomenon\\.RemoteDesktopConnection$',
    '^com\\.itap-mobile\\.qmote$',
    '^com\\.nulana\\.remotixmac$',

    // com.p5sys.jump.mac.viewer
    // com.p5sys.jump.mac.viewer.web
    '^com\\.p5sys\\.jump\\.mac\\.viewer$',
    '^com\\.p5sys\\.jump\\.mac\\.viewer\\.',

    '^com\\.teamviewer\\.TeamViewer$',
    '^com\\.vmware\\.horizon$',
    '^com\\.2X\\.Client\\.Mac$',

    '^com\\.OpenText\\.Exceed-TurboX-Client$',
    '^com\\.realvnc\\.vncviewer$',

    '^com\\.citrix\\.receiver\\.icaviewer',
  ],

  terminal: [
    '^com\\.apple\\.Terminal$',
    '^com\\.googlecode\\.iterm2$',
    '^co\\.zeit\\.hyperterm$',
    '^co\\.zeit\\.hyper$',
    '^io\\.alacritty$',
    '^org\\.alacritty$',
    '^net\\.kovidgoyal\\.kitty$',
  ],

  vi: [
    '^org\\.vim\\.', // prefix
    '^com\\.qvacua\\.VimR$',
  ],

  virtualMachine: [
    '^com\\.vmware\\.fusion$',
    '^com\\.vmware\\.horizon$',
    '^com\\.vmware\\.view$',
    '^com\\.parallels\\.desktop$',
    '^com\\.parallels\\.vm$',
    '^com\\.parallels\\.desktop\\.console$',
    '^org\\.virtualbox\\.app\\.VirtualBoxVM$',
    '^com\\.citrix\\.XenAppViewer$',
    '^com\\.vmware\\.proxyApp\\.', // prefix
    '^com\\.parallels\\.winapp\\.', // prefix
    '^com\\.utmapp\\.UTM$',
  ],

  sublimeText: [
    '^com\\.sublimetext\\.', // prefix
  ],

  visualStudioCode: ['^com\\.microsoft\\.VSCode$'],

  vnc: [
    '^com\\.geekspiff\\.chickenofthevnc$',
    '^net\\.sourceforge\\.chicken$',
    '^de\\.jinx\\.JollysFastVNC\\.', // prefix
    '^com\\.realvnc\\.vncviewer\\.', // prefix
  ],

  x11: [
    '^org\\.x\\.X11$',
    '^com\\.apple\\.x11$',
    '^org\\.macosforge\\.xquartz\\.X11$',
    '^org\\.macports\\.X11$',
  ],

  xcode: ['^com\\.apple\\.dt\\.Xcode$'],
}

exports.bundleIdentifiers = {
  alfred: rawBundleIdentifers.alfred,
  activityMonitor: rawBundleIdentifers.activityMonitor,
  adium: rawBundleIdentifers.adium,
  browser: rawBundleIdentifers.browser,
  eclipse: rawBundleIdentifers.eclipse,
  emacs: rawBundleIdentifers.emacs,
  emacsKeyBindingsException: [].concat(
    rawBundleIdentifers.emacs,
    rawBundleIdentifers.remoteDesktop,
    rawBundleIdentifers.terminal,
    rawBundleIdentifers.vi,
    rawBundleIdentifers.virtualMachine,
    rawBundleIdentifers.x11,
    rawBundleIdentifers.sublimeText,
    rawBundleIdentifers.visualStudioCode
  ),
  finder: rawBundleIdentifers.finder,
  gitGUI: rawBundleIdentifers.gitGUI,
  jetbrainsIDE: rawBundleIdentifers.jetbrainsIDE,
  loginwindow: rawBundleIdentifers.loginwindow,
  microsoftOffice: rawBundleIdentifers.microsoftOffice,
  remoteDesktop: rawBundleIdentifers.remoteDesktop,
  terminal: rawBundleIdentifers.terminal,
  vi: rawBundleIdentifers.vi,
  virtualMachine: rawBundleIdentifers.virtualMachine,
  visualStudioCode: rawBundleIdentifers.visualStudioCode,
  vnc: rawBundleIdentifers.vnc,
  xcode: rawBundleIdentifers.xcode,
}
