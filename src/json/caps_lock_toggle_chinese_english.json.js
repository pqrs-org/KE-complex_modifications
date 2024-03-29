// JavaScript should be written in ECMAScript 5.1.

function main() {
  console.log(
    JSON.stringify(
      {
        title: 'Toggle Chinese English With caps_lock',
        rules: [
          {
            description: 'caps_lock 切换中英文，长按锁定大写，短按恢复小写',
            manipulators: [
              {
                type: 'basic',
                from: {
                  key_code: 'caps_lock',
                  modifiers: {
                    optional: ['left_control'],
                  },
                },
                to_if_alone: [
                  {
                    key_code: 'spacebar',
                    modifiers: ['left_control'],
                  },
                ],
                to_if_held_down: [
                  {
                    key_code: 'caps_lock',
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
