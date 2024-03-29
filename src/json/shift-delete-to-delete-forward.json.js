// JavaScript should be written in ECMAScript 5.1.

function main() {
  console.log(
    JSON.stringify(
      {
        title: 'Shift-Delete to Delete-Forward (+Option = delete word, +Command = delete line)',
        rules: [
          {
            description: 'Shift-Delete to Delete-Forward (deletes next character, use both shift keys to bypass)',
            manipulators: [
              {
                type: 'basic',
                from: { modifiers: { mandatory: ['left_shift', 'right_shift'], optional: ['any'] }, key_code: 'delete_or_backspace' },
                to: [{ repeat: true, key_code: 'delete_or_backspace', modifiers: ['left_shift'] }],
              },
              {
                type: 'basic',
                from: { modifiers: { mandatory: ['shift'] }, key_code: 'delete_or_backspace' },
                to: [{ repeat: true, key_code: 'delete_forward' }],
              },
            ],
          },
          {
            description: 'Option-Shift-Delete to Option-Delete-Forward (deletes next word, use both shift keys to bypass)',
            manipulators: [
              {
                type: 'basic',
                from: { modifiers: { mandatory: ['left_shift', 'right_shift'], optional: ['any'] }, key_code: 'delete_or_backspace' },
                to: [{ repeat: true, key_code: 'delete_or_backspace', modifiers: ['left_shift'] }],
              },
              {
                type: 'basic',
                from: { modifiers: { mandatory: ['shift', 'option'] }, key_code: 'delete_or_backspace' },
                to: [{ repeat: true, key_code: 'delete_forward', modifiers: ['left_option'] }],
              },
            ],
          },
          {
            description: 'Command-Shift-Delete to Ctrl-K (deletes rest of line, use both shift keys to bypass)',
            manipulators: [
              {
                type: 'basic',
                from: { modifiers: { mandatory: ['left_shift', 'right_shift'], optional: ['any'] }, key_code: 'delete_or_backspace' },
                to: [{ repeat: true, key_code: 'delete_or_backspace', modifiers: ['left_shift'] }],
              },
              {
                type: 'basic',
                from: { modifiers: { mandatory: ['shift', 'command'] }, key_code: 'delete_or_backspace' },
                to: [{ repeat: true, key_code: 'k', modifiers: ['left_control'] }],
              },
            ],
          },
          {
            description: 'Command-Delete-Forward to Ctrl-K (deletes rest of line, use both command keys to bypass)',
            manipulators: [
              {
                type: 'basic',
                from: { modifiers: { mandatory: ['left_command', 'right_command'] }, key_code: 'delete_forward' },
                to: [{ repeat: true, key_code: 'delete_forward', modifiers: ['left_command'] }],
              },
              {
                type: 'basic',
                from: { modifiers: { mandatory: ['command'] }, key_code: 'delete_forward' },
                to: [{ repeat: true, key_code: 'k', modifiers: ['left_control'] }],
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
