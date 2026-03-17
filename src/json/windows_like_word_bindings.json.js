// @ts-check
// JavaScript should be written in ECMAScript 5.1.

function main() {
  console.log(
    JSON.stringify(
      {
        title: '[macOS] Windows-like word movement/selection/deletion',
        maintainers: ['tyru'],
        rules: [ctrlArrowMovements(), ctrlArrowSelections(), ctrlArrowDeletions()],
      },
      null,
      '  '
    )
  )
}

function ctrlArrowMovements() {
  return {
    description: 'Ctrl + Arrow Keys to Option + Arrow Keys',
    manipulators: [
      {
        from: { key_code: 'up_arrow', modifiers: { mandatory: ['control'] } },
        to: [{ key_code: 'up_arrow', modifiers: ['option'] }],
        type: 'basic',
      },
      {
        from: { key_code: 'down_arrow', modifiers: { mandatory: ['control'] } },
        to: [{ key_code: 'down_arrow', modifiers: ['option'] }],
        type: 'basic',
      },
      {
        from: { key_code: 'left_arrow', modifiers: { mandatory: ['control'] } },
        to: [{ key_code: 'left_arrow', modifiers: ['option'] }],
        type: 'basic',
      },
      {
        from: { key_code: 'right_arrow', modifiers: { mandatory: ['control'] } },
        to: [{ key_code: 'right_arrow', modifiers: ['option'] }],
        type: 'basic',
      },
    ],
  }
}

function ctrlArrowSelections() {
  return {
    description: 'Ctrl + Shift + Arrow Keys to Option + Shift + Arrow Keys',
    manipulators: [
      {
        from: { key_code: 'up_arrow', modifiers: { mandatory: ['control', 'shift'] } },
        to: [{ key_code: 'up_arrow', modifiers: ['option', 'shift'] }],
        type: 'basic',
      },
      {
        from: { key_code: 'down_arrow', modifiers: { mandatory: ['control', 'shift'] } },
        to: [{ key_code: 'down_arrow', modifiers: ['option', 'shift'] }],
        type: 'basic',
      },
      {
        from: { key_code: 'left_arrow', modifiers: { mandatory: ['control', 'shift'] } },
        to: [{ key_code: 'left_arrow', modifiers: ['option', 'shift'] }],
        type: 'basic',
      },
      {
        from: { key_code: 'right_arrow', modifiers: { mandatory: ['control', 'shift'] } },
        to: [{ key_code: 'right_arrow', modifiers: ['option', 'shift'] }],
        type: 'basic',
      },
    ],
  }
}

function ctrlArrowDeletions() {
  return {
    description: 'Ctrl + BS/Del Keys to Option + BS/Del Keys',
    manipulators: [
      {
        from: { key_code: 'delete_or_backspace', modifiers: { mandatory: ['control'] } },
        to: [{ key_code: 'delete_or_backspace', modifiers: ['option'] }],
        type: 'basic',
      },
      {
        from: { key_code: 'delete_forward', modifiers: { mandatory: ['control'] } },
        to: [{ key_code: 'delete_forward', modifiers: ['option'] }],
        type: 'basic',
      },
    ],
  }
}

main()
