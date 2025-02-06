// JavaScript should be written in ECMAScript 5.1.
const title = 'Map L_SHIFT to ( (alone), L_SHIFT (chorded). Map R_SHIFT to ) (alone), R_SHIFT (chorded)';
const maintainer = 'torma';

function main() {
  console.log(
    JSON.stringify(
      {
        title,
        maintainer,
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
      description: title,
      manipulators: [
        {
          description: 'QMK LS( => L_SHIFT -> ( (alone), L_SHIFT (chorded)',
          from: {
            key_code: 'left_shift',
            modifiers: {
              mandatory: [],
              optional: ['any'],
            },
          },
          to: [{ key_code: 'left_shift', lazy: true }],
          to_if_alone: [{ key_code: '9', modifiers: 'shift' }],
          type: 'basic',
        },
        {
          description: 'QMK RS) => R_SHIFT -> ) (alone), R_SHIFT(chorded)',
          from: {
            key_code: 'right_shift',
            modifiers: {
              mandatory: [],
              optional: ['any'],
            },
          },
          to: [{ key_code: 'right_shift', lazy: true }],
          to_if_alone: [{ key_code: '0', modifiers: 'shift' }],
          type: 'basic',
        }
      ],
    },
  ]
}

if (__main.endsWith('/torma_QMK_LS(_RS).json.js')) {
  main()
} else {
  exports.rules = rules()
}
