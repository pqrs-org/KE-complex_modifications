// JavaScript should be written in ECMAScript 5.1.

function main() {
  console.log(
    JSON.stringify(
      {
        title: 'device_if,device_unless example',
        rules: [
          {
            description: 'Open Karabiner-Elements by f5 in non-Apple keyboards',
            manipulators: [
              {
                conditions: [
                  {
                    type: 'device_unless',
                    identifiers: [
                      {
                        vendor_id: 1452,
                      },
                    ],
                  },
                ],
                type: 'basic',
                from: {
                  key_code: 'f5',
                  modifiers: { optional: ['any'] },
                },
                to: [{ shell_command: "open -a 'Karabiner-Elements.app'" }],
              },
            ],
          },
          {
            description: 'Open Karabiner-EventViewer by f6 in HHKB BT JP keyboards',
            manipulators: [
              {
                conditions: [
                  {
                    type: 'device_if',
                    identifiers: [
                      {
                        vendor_id: 1278,
                        product_id: 515,
                      },
                    ],
                  },
                ],
                type: 'basic',
                from: {
                  key_code: 'f6',
                  modifiers: { optional: ['any'] },
                },
                to: [{ shell_command: "open -a 'Karabiner-EventViewer.app'" }],
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
