// JavaScript should be written in ECMAScript 5.1.

function main() {

    const rules = [
        {
            description: "Launch a new Terminal window with F4 (replace macOS default Spotlight)",
            manipulators: [
                {
                    from: {
                        key_code: "f4",
                        modifiers: {
                            optional: [
                                "caps_lock"
                            ]
                        }
                    },
                    to: [
                        {
                            "shell_command": "open -a Terminal ~"
                        }
                    ],
                    type: "basic"
                }
            ]
        }
    ]

    const json = {
        title: 'Launch a new Terminal window with F4 (replace MacOS default Spotlight)',
        maintainers: ["jinyoungch0i"],
        rules: rules.map(function (rule) {
            return {
                description: rule.description,
                manipulators: rule.manipulators || []
            }
        })
    }

  console.log(
    JSON.stringify(
      json,
      null,
      '  '
    )
  )
}

main()
