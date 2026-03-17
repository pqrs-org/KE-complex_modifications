// JavaScript should be written in ECMAScript 5.1.

const karabiner = require('../lib/karabiner')

function main() {
  console.log(
    JSON.stringify(
      {
        title: 'Personal rules (@yqrashawn)',
        rules: [
          {
            description: 'Alfred Mode',
            manipulators: [
              //
              // z as Alfred Mode trigger
              //

              {
                type: 'basic',
                from: { key_code: 'z', modifiers: { optional: ['caps_lock'] } },
                to: [{ set_variable: { name: 'alf_mode', value: 1 } }],
                to_after_key_up: [{ set_variable: { name: 'alf_mode', value: 0 } }],
                to_if_alone: [{ key_code: 'z' }],
              },

              // z+y to hyper+equal_sign for youdao

              {
                type: 'basic',
                from: { key_code: 'y', modifiers: { optional: ['caps_lock'] } },
                to: [{ key_code: 'equal_sign', modifiers: ['left_command', 'left_control', 'left_option', 'left_shift'] }],
                conditions: [{ type: 'variable_if', name: 'alf_mode', value: 1 }],
              },

              // z+j to search github

              {
                type: 'basic',
                from: { key_code: 'j', modifiers: { optional: ['caps_lock'] } },
                to: [{ shell_command: 'osascript -e \'tell application "Alfred 3" to run trigger "searchGithub" in workflow "nikivi.search-the-web" with argument ""\'' }],
                conditions: [{ type: 'variable_if', name: 'alf_mode', value: 1 }],
              },

              // z+tab to switch iTerm session

              {
                type: 'basic',
                from: { key_code: 'tab', modifiers: { optional: ['caps_lock'] } },
                to: [{ shell_command: 'osascript -e \'tell application "Alfred 3" to run trigger "iTermtty" in workflow "net.isometry.alfred.tty" with argument ""\'' }],
                conditions: [{ type: 'variable_if', name: 'alf_mode', value: 1 }],
              },

              // z+x to kill process

              {
                type: 'basic',
                from: { key_code: 'x', modifiers: { optional: ['caps_lock'] } },
                to: [{ shell_command: 'osascript -e \'tell application "Alfred 3" to run trigger "killProcess" in workflow "com.ngreenstein.alfred-process-killer" with argument ""\'' }],
                conditions: [{ type: 'variable_if', name: 'alf_mode', value: 1 }],
              },

              // z+t to open any repo in select application

              {
                type: 'basic',
                from: { key_code: 't', modifiers: { optional: ['caps_lock'] } },
                to: [{ shell_command: 'osascript -e \'tell application "Alfred 3" to run trigger "repos" in workflow "net.deanishe.alfred-git-repos" with argument ""\'' }],
                conditions: [{ type: 'variable_if', name: 'alf_mode', value: 1 }],
              },

              // z+k to search browser history

              {
                type: 'basic',
                from: { key_code: 'k', modifiers: { optional: ['caps_lock'] } },
                to: [{ shell_command: 'osascript -e \'tell application "Alfred 3" to run trigger "chromeHistory" in workflow "thomasupton.chrome-history" with argument ""\'' }],
                conditions: [{ type: 'variable_if', name: 'alf_mode', value: 1 }],
              },

              // z+b to switch brower tab

              {
                type: 'basic',
                from: { key_code: 'b', modifiers: { optional: ['caps_lock'] } },
                to: [{ shell_command: 'osascript -e \'tell application "Alfred 3" to run trigger "browserTabs" in workflow "com.clintonstrong.SearchTabs" with argument "" \'' }],
                conditions: [{ type: 'variable_if', name: 'alf_mode', value: 1 }],
              },

              // z+r to open recent download files

              {
                type: 'basic',
                from: { key_code: 'r', modifiers: { optional: ['caps_lock'] } },
                to: [{ shell_command: 'osascript -e \'tell application "Alfred 3" to run trigger "recentDownloads" in workflow "com.vitorgalvao.alfred.recentdownloads" with argument ""\'' }],
                conditions: [{ type: 'variable_if', name: 'alf_mode', value: 1 }],
              },

              // z+l only in finder to triger Alfred file action: left_command+left_control+slash

              {
                type: 'basic',
                from: { key_code: 'l', modifiers: { optional: ['caps_lock'] } },
                to: [{ key_code: 'slash', modifiers: ['left_command', 'left_control'] }],
                conditions: [
                  { type: 'variable_if', name: 'alf_mode', value: 1 },
                  { type: 'frontmost_application_if', bundle_identifiers: karabiner.bundleIdentifiers.finder },
                ],
              },

              // z+l only in browers open devtool: command+option+i

              {
                type: 'basic',
                from: { key_code: 'l', modifiers: { optional: ['caps_lock'] } },
                to: [{ key_code: 'i', modifiers: ['left_command', 'left_option'] }],
                conditions: [
                  { type: 'variable_if', name: 'alf_mode', value: 1 },
                  { type: 'frontmost_application_if', bundle_identifiers: karabiner.bundleIdentifiers.browser },
                ],
              },

              // z+o to copy selection into emacs: hyper+0

              {
                type: 'basic',
                from: { key_code: 'o', modifiers: { optional: ['caps_lock'] } },
                to: [{ key_code: '0', modifiers: ['left_command', 'left_control', 'left_option', 'left_shift'] }],
                conditions: [{ type: 'variable_if', name: 'alf_mode', value: 1 }],
              },

              // z+p to pase saved emacs buffer back to front most app

              {
                type: 'basic',
                from: { key_code: 'p', modifiers: { optional: ['caps_lock'] } },
                to: [{ shell_command: 'osascript -e \'tell application "Alfred 3" to run trigger "pasteBack" in workflow "yqrashawn.com.ewe" with argument ""\'' }],
                conditions: [{ type: 'variable_if', name: 'alf_mode', value: 1 }],
              },

              // z+; to open localhost page in browser

              {
                type: 'basic',
                from: { key_code: 'semicolon', modifiers: { optional: ['caps_lock'] } },
                to: [{ shell_command: 'osascript -e \'tell application "Alfred 3" to run trigger "localport" in workflow "in.fech.localport" with argument "" \'' }],
                conditions: [{ type: 'variable_if', name: 'alf_mode', value: 1 }],
              },
              // z+q to start recording macro in Keyboard Maestro

              {
                type: 'basic',
                from: { key_code: 'q', modifiers: { optional: ['caps_lock'] } },
                to: [{ shell_command: 'osascript -e \'tell application "Keyboard Maestro Engine" to do script "Quick Macro 1"\'' }],
                conditions: [{ type: 'variable_if', name: 'alf_mode', value: 1 }],
              },

              // z+close_bracket to execute latest macro in Keyboard Maestro

              {
                type: 'basic',
                from: { key_code: 'close_bracket' },
                to: [{ key_code: 'close_bracket', modifiers: ['left_command', 'left_control', 'left_option', 'left_shift'] }],
                conditions: [{ type: 'variable_if', name: 'alf_mode', value: 1 }],
              },

              // some high frequency keychords need fix

              {
                type: 'basic',
                from: { key_code: 'a' },
                to: [{ key_code: 'z' }, { key_code: 'a' }],
                conditions: [{ type: 'variable_if', name: 'alf_mode', value: 1 }],
              },
              {
                type: 'basic',
                from: { key_code: 'h' },
                to: [{ key_code: 'z' }, { key_code: 'h' }],
                conditions: [{ type: 'variable_if', name: 'alf_mode', value: 1 }],
              },
              {
                type: 'basic',
                from: { key_code: 'i' },
                to: [{ key_code: 'z' }, { key_code: 'i' }],
                conditions: [{ type: 'variable_if', name: 'alf_mode', value: 1 }],
              },
              {
                type: 'basic',
                from: { key_code: 'l' },
                to: [{ key_code: 'z' }, { key_code: 'l' }],
                conditions: [{ type: 'variable_if', name: 'alf_mode', value: 1 }],
              },
              {
                type: 'basic',
                from: { key_code: 'u' },
                to: [{ key_code: 'z' }, { key_code: 'u' }],
                conditions: [{ type: 'variable_if', name: 'alf_mode', value: 1 }],
              },
            ],
          },
          {
            description: 'yq Launch Mode',
            manipulators: [
              //
              // w as yq Launch Mode trigger
              //

              {
                type: 'basic',
                from: { key_code: 'w', modifiers: { optional: ['caps_lock'] } },
                to: [{ set_variable: { name: 'launch_mode', value: 1 } }],
                to_after_key_up: [{ set_variable: { name: 'launch_mode', value: 0 } }],
                to_if_alone: [{ key_code: 'w' }],
              },

              //
              // close_bracket as yq Launch Mode Second Level trigger
              //

              {
                type: 'basic',
                from: { key_code: 'open_bracket', modifiers: { optional: ['caps_lock'] } },
                conditions: [{ type: 'variable_if', name: 'launch_mode', value: 1 }],
                to: [{ set_variable: { name: 'launch_mode_second_level', value: 1 } }],
                to_after_key_up: [{ set_variable: { name: 'launch_mode_second_level', value: 0 } }],
                to_if_alone: [{ key_code: 'vk_none' }],
              },

              // w+j bring iTerm

              {
                type: 'basic',
                from: { key_code: 'j', modifiers: { optional: ['caps_lock'] } },
                to: [{ shell_command: 'osascript -e \' tell application "Alfred 3" to run trigger "launchiTerm" in workflow "yqrashawn.workflow.launcher" with argument ""\'' }],
                conditions: [
                  { type: 'variable_if', name: 'launch_mode', value: 1 },
                  { type: 'variable_if', name: 'launch_mode_second_level', value: 0 },
                ],
              },

              // w+v bring WeChat

              {
                type: 'basic',
                from: { key_code: 'v', modifiers: { optional: ['caps_lock'] } },
                to: [{ shell_command: 'osascript -e \' tell application "Alfred 3" to run trigger "launchWeChat" in workflow "yqrashawn.workflow.launcher" with argument ""\'' }],
                conditions: [
                  { type: 'variable_if', name: 'launch_mode', value: 1 },
                  { type: 'variable_if', name: 'launch_mode_second_level', value: 0 },
                ],
              },

              // w+l bring Google Chrome

              {
                type: 'basic',
                from: { key_code: 'l', modifiers: { optional: ['caps_lock'] } },
                to: [{ shell_command: 'osascript -e \' tell application "Alfred 3" to run trigger "launchChrome" in workflow "yqrashawn.workflow.launcher" with argument ""\'' }],
                conditions: [
                  { type: 'variable_if', name: 'launch_mode', value: 1 },
                  { type: 'variable_if', name: 'launch_mode_second_level', value: 0 },
                ],
              },

              // w+c bring Safari

              {
                type: 'basic',
                from: { key_code: 'c', modifiers: { optional: ['caps_lock'] } },
                to: [{ shell_command: 'osascript -e \' tell application "Alfred 3" to run trigger "launchSafari" in workflow "yqrashawn.workflow.launcher" with argument ""\'' }],
                conditions: [
                  { type: 'variable_if', name: 'launch_mode', value: 1 },
                  { type: 'variable_if', name: 'launch_mode_second_level', value: 0 },
                ],
              },

              // w+t bring Tower

              {
                type: 'basic',
                from: { key_code: 't', modifiers: { optional: ['caps_lock'] } },
                to: [{ shell_command: 'osascript -e \' tell application "Alfred 3" to run trigger "launchTower" in workflow "yqrashawn.workflow.launcher" with argument ""\'' }],
                conditions: [
                  { type: 'variable_if', name: 'launch_mode', value: 1 },
                  { type: 'variable_if', name: 'launch_mode_second_level', value: 0 },
                ],
              },

              // w+m bring Mail

              {
                type: 'basic',
                from: { key_code: 'm', modifiers: { optional: ['caps_lock'] } },
                to: [{ shell_command: 'osascript -e \' tell application "Alfred 3" to run trigger "launchMail" in workflow "yqrashawn.workflow.launcher" with argument ""\'' }],
                conditions: [
                  { type: 'variable_if', name: 'launch_mode', value: 1 },
                  { type: 'variable_if', name: 'launch_mode_second_level', value: 0 },
                ],
              },

              // w+b bring bearychat

              {
                type: 'basic',
                from: { key_code: 'b', modifiers: { optional: ['caps_lock'] } },
                to: [{ shell_command: 'osascript -e \' tell application "Alfred 3" to run trigger "launchBearyChat" in workflow "yqrashawn.workflow.launcher" with argument ""\'' }],
                conditions: [
                  { type: 'variable_if', name: 'launch_mode', value: 1 },
                  { type: 'variable_if', name: 'launch_mode_second_level', value: 0 },
                ],
              },

              // w+k bring Emacs

              {
                type: 'basic',
                from: { key_code: 'k', modifiers: { optional: ['caps_lock'] } },
                to: [{ shell_command: 'osascript -e \' tell application "Alfred 3" to run trigger "launchEmacs" in workflow "yqrashawn.workflow.launcher" with argument ""\'' }],
                conditions: [
                  { type: 'variable_if', name: 'launch_mode', value: 1 },
                  { type: 'variable_if', name: 'launch_mode_second_level', value: 0 },
                ],
              },

              // w+f bring Finder

              {
                type: 'basic',
                from: { key_code: 'f', modifiers: { optional: ['caps_lock'] } },
                to: [{ shell_command: 'osascript -e \' tell application "Alfred 3" to run trigger "launchFinder" in workflow "yqrashawn.workflow.launcher" with argument ""\'' }],
                conditions: [
                  { type: 'variable_if', name: 'launch_mode', value: 1 },
                  { type: 'variable_if', name: 'launch_mode_second_level', value: 0 },
                ],
              },

              // w+q bring KE

              {
                type: 'basic',
                from: { key_code: 'q', modifiers: { optional: ['caps_lock'] } },
                to: [{ shell_command: 'osascript -e \' tell application "Alfred 3" to run trigger "launchKE" in workflow "yqrashawn.workflow.launcher" with argument ""\'' }],
                conditions: [
                  { type: 'variable_if', name: 'launch_mode', value: 1 },
                  { type: 'variable_if', name: 'launch_mode_second_level', value: 0 },
                ],
              },

              // w+close_barcket+q bring KE Events

              {
                type: 'basic',
                from: { key_code: 'q', modifiers: { optional: ['caps_lock'] } },
                to: [{ shell_command: 'osascript -e \' tell application "Alfred 3" to run trigger "launchKEEvents" in workflow "yqrashawn.workflow.launcher" with argument ""\'' }],
                conditions: [
                  { type: 'variable_if', name: 'launch_mode', value: 1 },
                  { type: 'variable_if', name: 'launch_mode_second_level', value: 1 },
                ],
              },

              // w+close_bracket+r bring Reeder

              {
                type: 'basic',
                from: { key_code: 'r', modifiers: { optional: ['caps_lock'] } },
                to: [{ shell_command: 'osascript -e \'tell application "Alfred 3" to run trigger "launchReeder" in workflow "yqrashawn.workflow.launcher" with argument ""\'' }],
                conditions: [
                  { type: 'variable_if', name: 'launch_mode', value: 1 },
                  { type: 'variable_if', name: 'launch_mode_second_level', value: 1 },
                ],
              },

              // some high frequency keychords need fix

              {
                type: 'basic',
                from: { key_code: 'a' },
                to: [{ key_code: 'w' }, { key_code: 'a' }],
                conditions: [{ type: 'variable_if', name: 'launch_mode', value: 1 }],
              },
              {
                type: 'basic',
                from: { key_code: 'e' },
                to: [{ key_code: 'w' }, { key_code: 'e' }],
                conditions: [{ type: 'variable_if', name: 'launch_mode', value: 1 }],
              },
              {
                type: 'basic',
                from: { key_code: 'h' },
                to: [{ key_code: 'w' }, { key_code: 'h' }],
                conditions: [{ type: 'variable_if', name: 'launch_mode', value: 1 }],
              },
              {
                type: 'basic',
                from: { key_code: 'i' },
                to: [{ key_code: 'w' }, { key_code: 'i' }],
                conditions: [{ type: 'variable_if', name: 'launch_mode', value: 1 }],
              },
              {
                type: 'basic',
                from: { key_code: 'o' },
                to: [{ key_code: 'w' }, { key_code: 'o' }],
                conditions: [{ type: 'variable_if', name: 'launch_mode', value: 1 }],
              },

              //
              // drop other keys in lanuch mode second level
              //
              {
                description: 'drop other keys',
                type: 'basic',
                from: { any: 'key_code', modifiers: { optional: ['any'] } },
                to: [{ key_code: 'vk_none' }],
                conditions: [{ type: 'variable_if', name: 'launch_mode_second_level', value: 1 }],
              },
            ],
          },
          {
            description: 'Quick Insert Mode',
            manipulators: [
              //
              // period as Quick Insert Mode trigger
              //

              {
                type: 'basic',
                from: { key_code: 'period', modifiers: { optional: ['caps_lock'] } },
                to: [{ set_variable: { name: 'qi_mode', value: 1 } }],
                to_after_key_up: [{ set_variable: { name: 'qi_mode', value: 0 } }],
                to_if_alone: [{ key_code: 'period' }],
              },

              //
              // comma as Quick Insert Mode Second Level trigger
              //

              {
                type: 'basic',
                from: { key_code: 'comma', modifiers: { optional: ['caps_lock'] } },
                conditions: [{ type: 'variable_if', name: 'qi_mode', value: 1 }],
                to: [{ set_variable: { name: 'qi_mode_second_level', value: 1 } }],
                to_after_key_up: [{ set_variable: { name: 'qi_mode_second_level', value: 0 } }],
                to_if_alone: [{ key_code: 'comma' }],
              },

              // period+tab switch to second previouse visited buffer in emacs

              {
                type: 'basic',
                from: { key_code: 'tab', modifiers: { optional: ['caps_lock'] } },
                to: [{ key_code: 'tab', modifiers: ['left_control'] }],
                conditions: [
                  { type: 'variable_if', name: 'qi_mode', value: 1 },
                  { type: 'variable_if', name: 'qi_mode_second_level', value: 0 },
                  { type: 'frontmost_application_if', bundle_identifiers: karabiner.bundleIdentifiers.emacs },
                ],
              },

              // period+comma+tab back switch to second previouse visited buffer in emacs

              {
                type: 'basic',
                from: { key_code: 'tab', modifiers: { optional: ['caps_lock'] } },
                to: [{ key_code: 'tab', modifiers: ['left_control', 'left_shift'] }],
                conditions: [
                  { type: 'variable_if', name: 'qi_mode', value: 1 },
                  { type: 'variable_if', name: 'qi_mode_second_level', value: 1 },
                  { type: 'frontmost_application_if', bundle_identifiers: karabiner.bundleIdentifiers.emacs },
                ],
              },

              // period+a insert ~/

              {
                type: 'basic',
                from: { key_code: 'a', modifiers: { optional: ['caps_lock'] } },
                to: [{ key_code: 'grave_accent_and_tilde', modifiers: ['left_shift'] }, { key_code: 'slash' }],
                conditions: [
                  { type: 'variable_if', name: 'qi_mode', value: 1 },
                  { type: 'variable_if', name: 'qi_mode_second_level', value: 0 },
                ],
              },

              // period+s insert .*

              {
                type: 'basic',
                from: { key_code: 's', modifiers: { optional: ['caps_lock'] } },
                to: [{ key_code: 'period' }, { key_code: '8', modifiers: ['left_shift'] }],
                conditions: [
                  { type: 'variable_if', name: 'qi_mode', value: 1 },
                  { type: 'variable_if', name: 'qi_mode_second_level', value: 0 },
                ],
              },

              // period+e insert left parentheses

              {
                type: 'basic',
                from: { key_code: 'e', modifiers: { optional: ['caps_lock'] } },
                to: [{ key_code: '9', modifiers: ['left_shift'] }],
                conditions: [
                  { type: 'variable_if', name: 'qi_mode', value: 1 },
                  { type: 'variable_if', name: 'qi_mode_second_level', value: 0 },
                ],
              },

              // period+r insert right parentheses

              {
                type: 'basic',
                from: { key_code: 'r', modifiers: { optional: ['caps_lock'] } },
                to: [{ key_code: '0', modifiers: ['left_shift'] }],
                conditions: [
                  { type: 'variable_if', name: 'qi_mode', value: 1 },
                  { type: 'variable_if', name: 'qi_mode_second_level', value: 0 },
                ],
              },

              // period+q insert open curly braces

              {
                type: 'basic',
                from: { key_code: 'q', modifiers: { optional: ['caps_lock'] } },
                to: [{ key_code: 'open_bracket', modifiers: ['left_shift'] }],
                conditions: [
                  { type: 'variable_if', name: 'qi_mode', value: 1 },
                  { type: 'variable_if', name: 'qi_mode_second_level', value: 0 },
                ],
              },

              // period+comma+q insert close curly braces

              {
                type: 'basic',
                from: { key_code: 'q', modifiers: { optional: ['caps_lock'] } },
                to: [{ key_code: 'close_bracket', modifiers: ['left_shift'] }],
                conditions: [
                  { type: 'variable_if', name: 'qi_mode', value: 1 },
                  { type: 'variable_if', name: 'qi_mode_second_level', value: 1 },
                ],
              },

              // period+slash insert ./

              {
                type: 'basic',
                from: { key_code: 'slash', modifiers: { optional: ['caps_lock'] } },
                to: [{ key_code: 'period' }, { key_code: 'slash' }],
                conditions: [
                  { type: 'variable_if', name: 'qi_mode', value: 1 },
                  { type: 'variable_if', name: 'qi_mode_second_level', value: 0 },
                ],
              },

              // period+g to Alfred Clipboard: left_command+left_control+k

              {
                type: 'basic',
                from: { key_code: 'g', modifiers: { optional: ['caps_lock'] } },
                to: [{ key_code: 'k', modifiers: ['left_command', 'left_control'] }],
                conditions: [
                  { type: 'variable_if', name: 'qi_mode', value: 1 },
                  { type: 'variable_if', name: 'qi_mode_second_level', value: 0 },
                ],
              },

              // period+d macOS define: left_command+left_control+d

              {
                type: 'basic',
                from: { key_code: 'd', modifiers: { optional: ['caps_lock'] } },
                to: [{ key_code: 'd', modifiers: ['left_command', 'left_control'] }],
                conditions: [
                  { type: 'variable_if', name: 'qi_mode', value: 1 },
                  { type: 'variable_if', name: 'qi_mode_second_level', value: 0 },
                ],
              },

              //
              // drop other keys in qi_mode_second_level mode
              //
              {
                description: 'drop other keys',
                type: 'basic',
                from: { any: 'key_code', modifiers: { optional: ['any'] } },
                to: [{ key_code: 'vk_none' }],
                conditions: [{ type: 'variable_if', name: 'qi_mode_second_level', value: 1 }],
              },
            ],
          },
          {
            description: 'Slash Mode',
            manipulators: [
              //
              // slash as Slash Mode trigger
              //

              {
                type: 'basic',
                from: { key_code: 'slash', modifiers: { optional: ['caps_lock'] } },
                to: [{ set_variable: { name: 'slash_mode', value: 1 } }],
                to_after_key_up: [{ set_variable: { name: 'slash_mode', value: 0 } }],
                to_if_alone: [{ key_code: 'slash' }],
              },

              // slash+tab switch to previouse application

              {
                type: 'basic',
                from: { key_code: 'tab', modifiers: { optional: ['caps_lock'] } },
                to: [{ key_code: 'tab', modifiers: ['left_command'] }, { key_code: 'left_command' }],
                conditions: [{ type: 'variable_if', name: 'slash_mode', value: 1 }],
              },
            ],
          },
          {
            description: 'FILCO MINILA Swap grave_accent_and_tilde and backslash',
            manipulators: [
              // backslash swap with grave_accent_and_tilde

              {
                type: 'basic',
                from: { key_code: 'backslash', modifiers: { optional: ['any'] } },
                conditions: [{ type: 'device_if', identifiers: [{ product_id: 34050, vendor_id: 2652 }] }],
                to: [{ key_code: 'grave_accent_and_tilde' }],
              },
              {
                type: 'basic',
                from: { key_code: 'grave_accent_and_tilde', modifiers: { optional: ['any'] } },
                conditions: [{ type: 'device_if', identifiers: [{ product_id: 34050, vendor_id: 2652 }] }],
                to: [{ key_code: 'backslash' }],
              },
            ],
          },
          {
            description: 'FILCO MINILA Change left command to left option, and f18 if alone',
            manipulators: [
              // FILCO MINILA Change left command to left option, and f18 if alone

              {
                type: 'basic',
                from: { key_code: 'left_command', modifiers: { optional: ['any'] } },
                conditions: [{ type: 'device_if', identifiers: [{ product_id: 34050, vendor_id: 2652 }] }],
                to: [{ key_code: 'left_option' }],
                to_if_alone: [{ key_code: 'f18' }],
              },
            ],
          },
          {
            description: 'FILCO MINILA Change left_option to f19 to left command, and 19 if alone',
            manipulators: [
              // FILCO MINILA Change left_option to f19 to left command, and 19 if alone

              {
                type: 'basic',
                from: { key_code: 'left_option', modifiers: { optional: ['any'] } },
                conditions: [{ type: 'device_if', identifiers: [{ product_id: 34050, vendor_id: 2652 }] }],
                to: [{ key_code: 'left_command' }],
                to_if_alone: [{ key_code: 'f19' }],
              },
            ],
          },
          {
            description: 'FILCO MINILA Change application to right option, and f17 when used alone',
            manipulators: [
              // FILCO MINILA Change application to f17 when used alone

              {
                type: 'basic',
                from: { key_code: 'application', modifiers: { optional: ['any'] } },
                conditions: [{ type: 'device_if', identifiers: [{ product_id: 34050, vendor_id: 2652 }] }],
                to: [{ key_code: 'right_option' }],
                to_if_alone: [{ key_code: 'f17' }],
              },
            ],
          },
          {
            description: 'FILCO MINILA Change right option to right command, and f16 when used alone',
            manipulators: [
              // FILCO MINILA Change application to f17 when used alone

              {
                type: 'basic',
                from: { key_code: 'right_option', modifiers: { optional: ['any'] } },
                conditions: [{ type: 'device_if', identifiers: [{ product_id: 34050, vendor_id: 2652 }] }],
                to: [{ key_code: 'right_command' }],
                to_if_alone: [{ key_code: 'f16' }],
              },
            ],
          },
          {
            description: 'HHKB, FILCO MINILA Change left control to esc if alone',
            manipulators: [
              // HHKB, FILCO MINILA Change left control to esc if alone

              {
                type: 'basic',
                from: { key_code: 'left_control', modifiers: { optional: ['any'] } },
                conditions: [
                  {
                    type: 'device_if',
                    identifiers: [
                      { product_id: 256, vendor_id: 2131 },
                      { product_id: 514, vendor_id: 1278 },
                      { product_id: 34050, vendor_id: 2652 },
                    ],
                  },
                ],
                to: [{ key_code: 'left_control' }],
                to_if_alone: [{ key_code: 'escape' }],
              },
            ],
          },
          {
            description: 'Change caps_lock to control when used as modifier, escape when used alone',
            manipulators: [
              // Change caps_lock to control when used as modifier, escape when used alone

              {
                type: 'basic',
                from: { key_code: 'caps_lock', modifiers: { optional: ['any'] } },
                to: [{ key_code: 'left_control' }],
                to_if_alone: [{ key_code: 'escape' }],
              },
            ],
          },
          {
            description: 'Change right_command to command-tab when used alone',
            manipulators: [
              // Change right_command to command-tab when used alone

              {
                type: 'basic',
                from: { key_code: 'right_command', modifiers: { optional: ['any'] } },
                to: [{ key_code: 'right_command' }],
                to_if_alone: [{ key_code: 'tab', modifiers: ['left_command'] }],
              },
            ],
          },
          {
            description: 'Change left_command to f19 if alone',
            manipulators: [
              // Change right_command to command-tab when used alone

              {
                type: 'basic',
                from: { key_code: 'left_command', modifiers: { optional: ['any'] } },
                to: [{ key_code: 'left_command' }],
                to_if_alone: [{ key_code: 'f19' }],
              },
            ],
          },
          {
            description: 'Change left_option to f18 if alone',
            manipulators: [
              // Change right_command to command-tab when used alone

              {
                type: 'basic',
                from: { key_code: 'left_option', modifiers: { optional: ['any'] } },
                to: [{ key_code: 'left_option' }],
                to_if_alone: [{ key_code: 'f18' }],
              },
            ],
          },
          {
            description: 'Change right_option to f17 if alone',
            manipulators: [
              // Change right_command to command-tab when used alone

              {
                type: 'basic',
                from: { key_code: 'right_option', modifiers: { optional: ['any'] } },
                to: [{ key_code: 'right_option' }],
                to_if_alone: [{ key_code: 'f17' }],
              },
            ],
          },
          {
            description: 'Change right_command to f16 if alone',
            manipulators: [
              // Change right_command to command-tab when used alone

              {
                type: 'basic',
                from: { key_code: 'right_command', modifiers: { optional: ['any'] } },
                to: [{ key_code: 'right_command' }],
                to_if_alone: [{ key_code: 'f16' }],
              },
            ],
          },
        ],
      },
      null,
      '  '
    )
  )
}

main()
