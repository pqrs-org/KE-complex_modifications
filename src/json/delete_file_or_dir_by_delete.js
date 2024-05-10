{
    "manipulators": [
        {
            "description": "Change delete_forward to cmd+backslash in finder",
            "from": {
                "key_code": "delete_forward",
                "modifiers": {
                    "optional": [
                        "any"
                    ]
                }
            },
            "to": [
                {
                    "key_code": "delete_backspace",
                    "modifiers": [
                        "left_command"
                    ]
                }
            ],
            "type": "basic",
            "conditions": [
                {
                    "type": "frontmost_application_if",
                    "bundle_identifiers": ["^com\\.apple\\.finder$"]
                }
            ]
        }
    ]
}