// JavaScript should be written in ECMAScript 5.1.

const karabiner = require('../lib/karabiner')

function main() {
  console.log(
    JSON.stringify(
      {
        "title": "Improved PowerPoint Keyboard Shortcuts",
        "rules": [
          {
            "description": "(CTRL + e) is (⌘ + Right Arrow)",
            "manipulators": [
              {
                "type": "basic",
                "from": {
                  "key_code": "e",
                  "modifiers": {
                    "mandatory": ["control"]
                  }
                },
                "to": [
                  {
                    "key_code": "right_arrow",
                    "modifiers": ["left_command"]
                  }
                ],
                "conditions": [
                  {
                    "type": "frontmost_application_if",
                    "bundle_identifiers": karabiner.bundleIdentifiers.microsoftPowerpoint,
                  }
                ]
              }
            ]
          }
        ]
      }
    )
  )
}

main()
