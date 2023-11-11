// JavaScript should be written in ECMAScript 5.1.

const controlBackspaceToFunctionBackspace = require('control_backspace_to_function_backspace.json')
const mapLeftOptionPlusSpacebarToEnter = require('map_left_option_plus_spacebar_to_enter.json')
const mapLeftOptionWithJKLSemicolonToArrows = require('map_left_option_with_j_k_l_semicolon_to_arrows.json')
const mapShiftPlusLeftOptionWithJKLSemicolonToPageArrows = require('map_shift_plus_left_option_with_j_k_l_semicolon_to_page_arrows.json')
const bepoCmdqwertyToggle = require('bepo-cmdqwerty-toggle.json')

function main() {
  console.log(
    JSON.stringify(
      {
        title: 'Personal Thooams Remapping',
        rules: [].concat(
          controlBackspaceToFunctionBackspace.rules,
          mapLeftOptionPlusSpacebarToEnter.rules,
          mapLeftOptionWithJKLSemicolonToArrows.rules,
          mapShiftPlusLeftOptionWithJKLSemicolonToPageArrows.rules,
          bepoCmdqwertyToggle.rules
        ),
      },
      null,
      '  '
    )
  )
}

main()
