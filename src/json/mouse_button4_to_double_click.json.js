// JavaScript should be written in ECMAScript 5.1.

function main() {
  console.log(
    JSON.stringify(
      {
        title: 'MouseButton4 to DoubleClick (don’t forget to enable your mouse under Devices)',
        rules: [
          {
            description: 'MouseButton4 to DoubleClick',
            manipulators: [
              {
                type: 'basic',
                from: { pointing_button: 'button4' },
                to: [{ pointing_button: 'button1' }, { pointing_button: 'button1' }],
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
