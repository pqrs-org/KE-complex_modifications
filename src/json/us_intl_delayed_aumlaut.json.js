// JavaScript should be written in ECMAScript 5.1.

function main() {
  console.log(
    JSON.stringify(
      {
        title: 'Press and hold \'a\' or \'A\' for 500ms to type a German \'ä\'',
        rules: [
          {
              description: '\'ä\' on holding down \'a\' for 500ms',
              manipulators: [
                  {
                      from: {
                          key_code: 'a'
                      },
                      parameters: {
                          'basic.to_if_held_down_threshold_milliseconds': 500
                      },
                      to_if_alone: [
                          {
                              key_code: 'a'
                          }
                      ],
                      to_if_held_down: [
                          {
                              key_code: 'u',
                              modifiers: [
                                  'left_command'
                              ]
                          },
                          {
                              key_code: 'a'
                          }
                      ],
                      type: 'basic'
                  }
              ]
          },
          {
              description: '\'Ä\' on holding down \'shift + a\' for 500ms',
              manipulators: [
                  {
                      from: {
                          key_code: 'a',
                          modifiers: {
                              mandatory: [
                                  "shift"
                              ]
                          }
                      },
                      parameters: {
                          'basic.to_if_held_down_threshold_milliseconds': 500
                      },
                      to_if_alone: [
                          {
                              key_code: 'a',
                              modifiers: [
                                  'shift'
                              ]
                          }
                      ],
                      'to_if_held_down': [
                          {
                              key_code: 'u',
                              modifiers: [
                                  'left_command'
                              ]
                          },
                          {
                              key_code: 'a',
                              modifiers: [
                                  'shift'
                              ]
                          }
                      ],
                      type: 'basic'
                  }
              ]
          }
        ],
      },
      null,
      '  '
    )
  )
}

main()
