// JavaScript should be written in ECMAScript 5.1.

function main() {
  console.log(
    JSON.stringify(
      {
        title: 'Razer Tartarus v2',
        maintainers: ['rbradcurtis'],
        rules: [
          {
            description: 'Razer 01 to Left_Shift-Left_Option-a',
            manipulators: [
              {
                conditions: [
                  {
                    type: 'device_if',
                    identifiers: [
                      {
                        product_id: 580,
                        vendor_id: 5426,
                      },
                      {
                        product_id: 555,
                        vendor_id: 5426,
                      },
                    ],
                  },
                ],
                type: 'basic',
                from: { key_code: '1' },
                to: [
                  {
                    key_code: 'a',
                    modifiers: ['left_shift', 'left_option'],
                  },
                ],
              },
            ],
          },
          {
            description: 'Razer 02 to Left_Shift-Left_Option-b',
            manipulators: [
              {
                conditions: [
                  {
                    type: 'device_if',
                    identifiers: [
                      {
                        product_id: 580,
                        vendor_id: 5426,
                      },
                      {
                        product_id: 555,
                        vendor_id: 5426,
                      },
                    ],
                  },
                ],
                type: 'basic',
                from: { key_code: '2' },
                to: [
                  {
                    key_code: 'b',
                    modifiers: ['left_shift', 'left_option'],
                  },
                ],
              },
            ],
          },
          {
            description: 'Razer 03 to Left_Shift-Left_Option-c',
            manipulators: [
              {
                conditions: [
                  {
                    type: 'device_if',
                    identifiers: [
                      {
                        product_id: 580,
                        vendor_id: 5426,
                      },
                      {
                        product_id: 555,
                        vendor_id: 5426,
                      },
                    ],
                  },
                ],
                type: 'basic',
                from: { key_code: '3' },
                to: [
                  {
                    key_code: 'c',
                    modifiers: ['left_shift', 'left_option'],
                  },
                ],
              },
            ],
          },
          {
            description: 'Razer 04 to Left_Shift-Left_Option-d',
            manipulators: [
              {
                conditions: [
                  {
                    type: 'device_if',
                    identifiers: [
                      {
                        product_id: 580,
                        vendor_id: 5426,
                      },
                      {
                        product_id: 555,
                        vendor_id: 5426,
                      },
                    ],
                  },
                ],
                type: 'basic',
                from: { key_code: '4' },
                to: [
                  {
                    key_code: 'd',
                    modifiers: ['left_shift', 'left_option'],
                  },
                ],
              },
            ],
          },
          {
            description: 'Razer 05 to Left_Shift-Left_Option-e',
            manipulators: [
              {
                conditions: [
                  {
                    type: 'device_if',
                    identifiers: [
                      {
                        product_id: 580,
                        vendor_id: 5426,
                      },
                      {
                        product_id: 555,
                        vendor_id: 5426,
                      },
                    ],
                  },
                ],
                type: 'basic',
                from: { key_code: '5' },
                to: [
                  {
                    key_code: 'e',
                    modifiers: ['left_shift', 'left_option'],
                  },
                ],
              },
            ],
          },
          {
            description: 'Razer 06 to Left_Shift-Left_Option-f',
            manipulators: [
              {
                conditions: [
                  {
                    type: 'device_if',
                    identifiers: [
                      {
                        product_id: 580,
                        vendor_id: 5426,
                      },
                      {
                        product_id: 555,
                        vendor_id: 5426,
                      },
                    ],
                  },
                ],
                type: 'basic',
                from: { key_code: 'tab' },
                to: [
                  {
                    key_code: 'f',
                    modifiers: ['left_shift', 'left_option'],
                  },
                ],
              },
            ],
          },
          {
            description: 'Razer 07 to Left_Shift-Left_Option-g',
            manipulators: [
              {
                conditions: [
                  {
                    type: 'device_if',
                    identifiers: [
                      {
                        product_id: 580,
                        vendor_id: 5426,
                      },
                      {
                        product_id: 555,
                        vendor_id: 5426,
                      },
                    ],
                  },
                ],
                type: 'basic',
                from: { key_code: 'q' },
                to: [
                  {
                    key_code: 'g',
                    modifiers: ['left_shift', 'left_option'],
                  },
                ],
              },
            ],
          },
          {
            description: 'Razer 08 to Left_Shift-Left_Option-h',
            manipulators: [
              {
                conditions: [
                  {
                    type: 'device_if',
                    identifiers: [
                      {
                        product_id: 580,
                        vendor_id: 5426,
                      },
                      {
                        product_id: 555,
                        vendor_id: 5426,
                      },
                    ],
                  },
                ],
                type: 'basic',
                from: { key_code: 'w' },
                to: [
                  {
                    key_code: 'h',
                    modifiers: ['left_shift', 'left_option'],
                  },
                ],
              },
            ],
          },
          {
            description: 'Razer 09 to Left_Shift-Left_Option-i',
            manipulators: [
              {
                conditions: [
                  {
                    type: 'device_if',
                    identifiers: [
                      {
                        product_id: 580,
                        vendor_id: 5426,
                      },
                      {
                        product_id: 555,
                        vendor_id: 5426,
                      },
                    ],
                  },
                ],
                type: 'basic',
                from: { key_code: 'e' },
                to: [
                  {
                    key_code: 'i',
                    modifiers: ['left_shift', 'left_option'],
                  },
                ],
              },
            ],
          },
          {
            description: 'Razer 10 to Left_Shift-Left_Option-j',
            manipulators: [
              {
                conditions: [
                  {
                    type: 'device_if',
                    identifiers: [
                      {
                        product_id: 580,
                        vendor_id: 5426,
                      },
                      {
                        product_id: 555,
                        vendor_id: 5426,
                      },
                    ],
                  },
                ],
                type: 'basic',
                from: { key_code: 'r' },
                to: [
                  {
                    key_code: 'j',
                    modifiers: ['left_shift', 'left_option'],
                  },
                ],
              },
            ],
          },
          {
            description: 'Razer 11 to Left_Shift-Left_Option-k',
            manipulators: [
              {
                conditions: [
                  {
                    type: 'device_if',
                    identifiers: [
                      {
                        product_id: 580,
                        vendor_id: 5426,
                      },
                      {
                        product_id: 555,
                        vendor_id: 5426,
                      },
                    ],
                  },
                ],
                type: 'basic',
                from: { key_code: 'caps_lock' },
                to: [
                  {
                    key_code: 'k',
                    modifiers: ['left_shift', 'left_option'],
                  },
                ],
              },
            ],
          },
          {
            description: 'Razer 12 to Left_Shift-Left_Option-l',
            manipulators: [
              {
                conditions: [
                  {
                    type: 'device_if',
                    identifiers: [
                      {
                        product_id: 580,
                        vendor_id: 5426,
                      },
                      {
                        product_id: 555,
                        vendor_id: 5426,
                      },
                    ],
                  },
                ],
                type: 'basic',
                from: { key_code: 'a' },
                to: [
                  {
                    key_code: 'l',
                    modifiers: ['left_shift', 'left_option'],
                  },
                ],
              },
            ],
          },
          {
            description: 'Razer 13 to Left_Shift-Left_Option-m',
            manipulators: [
              {
                conditions: [
                  {
                    type: 'device_if',
                    identifiers: [
                      {
                        product_id: 580,
                        vendor_id: 5426,
                      },
                      {
                        product_id: 555,
                        vendor_id: 5426,
                      },
                    ],
                  },
                ],
                type: 'basic',
                from: { key_code: 's' },
                to: [
                  {
                    key_code: 'm',
                    modifiers: ['left_shift', 'left_option'],
                  },
                ],
              },
            ],
          },
          {
            description: 'Razer 14 to Left_Shift-Left_Option-n',
            manipulators: [
              {
                conditions: [
                  {
                    type: 'device_if',
                    identifiers: [
                      {
                        product_id: 580,
                        vendor_id: 5426,
                      },
                      {
                        product_id: 555,
                        vendor_id: 5426,
                      },
                    ],
                  },
                ],
                type: 'basic',
                from: { key_code: 'd' },
                to: [
                  {
                    key_code: 'n',
                    modifiers: ['left_shift', 'left_option'],
                  },
                ],
              },
            ],
          },
          {
            description: 'Razer 15 to Left_Shift-Left_Option-o',
            manipulators: [
              {
                conditions: [
                  {
                    type: 'device_if',
                    identifiers: [
                      {
                        product_id: 580,
                        vendor_id: 5426,
                      },
                      {
                        product_id: 555,
                        vendor_id: 5426,
                      },
                    ],
                  },
                ],
                type: 'basic',
                from: { key_code: 'f' },
                to: [
                  {
                    key_code: 'o',
                    modifiers: ['left_shift', 'left_option'],
                  },
                ],
              },
            ],
          },
          {
            description: 'Razer 16 to Left_Shift-Left_Option-p',
            manipulators: [
              {
                conditions: [
                  {
                    type: 'device_if',
                    identifiers: [
                      {
                        product_id: 580,
                        vendor_id: 5426,
                      },
                      {
                        product_id: 555,
                        vendor_id: 5426,
                      },
                    ],
                  },
                ],
                type: 'basic',
                from: { key_code: 'left_shift' },
                to: [
                  {
                    key_code: 'p',
                    modifiers: ['left_shift', 'left_option'],
                  },
                ],
              },
            ],
          },
          {
            description: 'Razer 17 to Left_Shift-Left_Option-q',
            manipulators: [
              {
                conditions: [
                  {
                    type: 'device_if',
                    identifiers: [
                      {
                        product_id: 580,
                        vendor_id: 5426,
                      },
                      {
                        product_id: 555,
                        vendor_id: 5426,
                      },
                    ],
                  },
                ],
                type: 'basic',
                from: { key_code: 'z' },
                to: [
                  {
                    key_code: 'q',
                    modifiers: ['left_shift', 'left_option'],
                  },
                ],
              },
            ],
          },
          {
            description: 'Razer 18 to Left_Shift-Left_Option-r',
            manipulators: [
              {
                conditions: [
                  {
                    type: 'device_if',
                    identifiers: [
                      {
                        product_id: 580,
                        vendor_id: 5426,
                      },
                      {
                        product_id: 555,
                        vendor_id: 5426,
                      },
                    ],
                  },
                ],
                type: 'basic',
                from: { key_code: 'x' },
                to: [
                  {
                    key_code: 'r',
                    modifiers: ['left_shift', 'left_option'],
                  },
                ],
              },
            ],
          },
          {
            description: 'Razer 19 to Left_Shift-Left_Option-s',
            manipulators: [
              {
                conditions: [
                  {
                    type: 'device_if',
                    identifiers: [
                      {
                        product_id: 580,
                        vendor_id: 5426,
                      },
                      {
                        product_id: 555,
                        vendor_id: 5426,
                      },
                    ],
                  },
                ],
                type: 'basic',
                from: { key_code: 'c' },
                to: [
                  {
                    key_code: 's',
                    modifiers: ['left_shift', 'left_option'],
                  },
                ],
              },
            ],
          },
          {
            description: 'Razer Trigger to tab',
            manipulators: [
              {
                conditions: [
                  {
                    type: 'device_if',
                    identifiers: [
                      {
                        product_id: 580,
                        vendor_id: 5426,
                      },
                      {
                        product_id: 555,
                        vendor_id: 5426,
                      },
                    ],
                  },
                ],
                type: 'basic',
                from: { key_code: 'left_option' },
                to: [
                  {
                    key_code: 'tab',
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
