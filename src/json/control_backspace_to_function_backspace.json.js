// JavaScript should be written in ECMAScript 5.1.

function main() {
  console.log(
    JSON.stringify(
      {
        title: 'Map Ctrl+Backspace-Delete to Fn+Backward-Delete (suppr current character)',
        rules: rules(),
      },
      null,
      '  '
    )
  )
}

function rules() {
  return [
    {
      description: 'Map Ctrl+Backspace-Delete to Fn+Backward-Delete (suppr current character)',
      manipulators: [
        {
          from: {
            key_code: 'delete_or_backspace',
            modifiers: {
              mandatory: ['control'],
              optional: ['any'],
            },
          },
          to: [
            {
              key_code: 'delete_or_backspace',
              modifiers: ['fn'],
            },
          ],
          type: 'basic',
        },
      ],
    },
  ]
}

// This file is required from personal_thooams.json.js
if (__main.endsWith('/control_backspace_to_function_backspace.json.js')) {
  main()
} else {
  exports.rules = rules()
}
