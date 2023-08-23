// JavaScript should be written in ECMAScript 5.1.

const karabiner = require('../lib/karabiner')

function main() {
  console.log(
    JSON.stringify(
      {
        title: 'Disable YubiKey 5C Nano Keystrokes @jonatasrenan',
        maintainers: ['jonatasrenan'],
        rules: [
          {
            description: 'Disable YubiKey 5C Nano Keystrokes @jonatasrenan',
            manipulators: manipulators(),
          },
        ],
      },
      null,
      '  '
    )
  )
}

function manipulators() {
  const result = []

  karabiner.letters.concat(['return_or_enter']).forEach(function (key) {
    result.push({
      type: 'basic',
      from: { key_code: key },
      to: [{ key_code: 'vk_none' }],
      conditions: [
        {
          type: 'device_if',
          identifiers: [
            {
              product_id: 1031,
              vendor_id: 4176,
            },
          ],
        },
      ],
    })
  })

  return result
}

main()
