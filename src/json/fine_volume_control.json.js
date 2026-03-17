// JavaScript should be written in ECMAScript 5.1.

function main() {
  console.log(
    JSON.stringify(
      {
        title: 'Fine volume control (rev 3)',
        rules: [
          {
            description: 'Map volume controls to fine volume controls (Option + Shift + Volume)',
            available_since: '15.3.0',
            manipulators: [].concat(
              //
              // volume_decrement
              //

              makeManipulators({ key_code: 'f11' }, 'volume_decrement'),
              makeManipulators({ consumer_key_code: 'volume_decrement' }, 'volume_decrement'),

              //
              // volume_increment
              //

              makeManipulators({ key_code: 'f12' }, 'volume_increment'),
              makeManipulators({ consumer_key_code: 'volume_increment' }, 'volume_increment')
            ),
          },
        ],
      },
      null,
      '  '
    )
  )

  function makeManipulators(from, to) {
    if (from.modifiers === undefined) {
      from.modifiers = {
        mandatory: [],
        optional: [],
      }
    }

    const manipulators = []

    ;[false, true].forEach(function (fn) {
      if (from.key_code === undefined && fn) {
        return
      }

      const normalFrom = JSON.parse(JSON.stringify(from))
      if (fn) {
        normalFrom.modifiers.mandatory.push('fn')
      }
      if (normalFrom.modifiers.mandatory.length === 0) {
        delete normalFrom.modifiers.mandatory
      }
      normalFrom.modifiers.optional.push('caps_lock')

      const reverseFrom = JSON.parse(JSON.stringify(from))
      reverseFrom.modifiers.mandatory.push('option')
      reverseFrom.modifiers.mandatory.push('shift')
      if (fn) {
        reverseFrom.modifiers.mandatory.push('fn')
      }
      reverseFrom.modifiers.optional.push('caps_lock')

      //
      // conditions
      //

      var conditions = []
      if (from.key_code !== undefined) {
        if (fn) {
          conditions.push({
            type: 'variable_if',
            name: 'system.use_fkeys_as_standard_function_keys',
            value: true,
          })
        } else {
          conditions.push({
            type: 'variable_unless',
            name: 'system.use_fkeys_as_standard_function_keys',
            value: true,
          })
        }
      }
      if (conditions.length === 0) {
        conditions = undefined
      }

      manipulators.push({
        type: 'basic',
        from: normalFrom,
        to: [
          {
            consumer_key_code: to,
            modifiers: ['left_option', 'left_shift'],
          },
        ],
        conditions: conditions,
      })

      manipulators.push({
        type: 'basic',
        from: reverseFrom,
        to: [{ consumer_key_code: to }],
        conditions: conditions,
      })
    })

    return manipulators
  }
}

main()
