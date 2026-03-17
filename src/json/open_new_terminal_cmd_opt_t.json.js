// JavaScript should be written in ECMAScript 5.1.

function main() {

    const rules = [
        {
            description: "⌘ + ⌥ + T opens a new Terminal window",
            manipulators: [
                {
                    type: "basic",
                    from: {
                        key_code: "t",
                        modifiers: {
                            mandatory: [
                                "left_command",
                                "left_option"
                            ]
                        }
                    },
                    to: [
                        {
                            shell_command: "osascript -e 'tell application \"Terminal\" to do script \"\"'"
                        }
                    ]
                }
            ]
        }
    ]

    const json = {
        title: "Open a new Terminal window with ⌘ + ⌥ + T",
        maintainers: ["SHi-ON"],
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
