// JavaScript should be written in ECMAScript 5.1.

function main() {
  console.log(
    JSON.stringify(
      {
        title: 'CTRL/CMD Key Swap',
        rules: [
          {
            description: 'swap left control/command keys for vncviewer',
            manipulators: [
              {
                type: 'basic',
                from: { key_code: 'left_control' },
                to: { key_code: 'left_command' },
                conditions: [
                  {
                    type: 'frontmost_application_if',
                    bundle_identifiers: ['^com\\.realvnc\\.vncviewer', '^com\\.realvnc\\.VNCViewer'],
                  },
                ],
              },
              {
                type: 'basic',
                from: { key_code: 'left_command' },
                to: { key_code: 'left_control' },
                conditions: [
                  {
                    type: 'frontmost_application_if',
                    bundle_identifiers: ['^com\\.realvnc\\.vncviewer', '^com\\.realvnc\\.VNCViewer'],
                  },
                ],
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
