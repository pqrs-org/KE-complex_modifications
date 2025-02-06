// JavaScript should be written in ECMAScript 5.1.
const maintainer = 'torma';
const betterKeyboardMap = require('torma_Better_Keyboard_Map.json')
const mapLShiftEscapToCapsLock = require('torma_L_Shift_Escape_to_Caps_Lock.json')
const mapCapsLocktoEscapeOrLCtrlChorded = require('torma_Caps_Lock_to_Escape_or_L_Ctrl_when_Chorded.json')
const mapCtrlIJKLtoArrowKeys = require('torma_CTRL_I_J_K_L_to_Arrows.json')
const elecomTrackballRemap = require('torma_Elecom_Trackball_Remap.json')
const mapShiftsToParensOrShifts = require('torma_QMK_LS(_RS).json');
const toggleMenubar = require('torma_Toggle_Menubar.json')

function main() {
  console.log(
    JSON.stringify(
      {
        title: 'Maps by Torma',
        maintainer,
        rules: [].concat(
          betterKeyboardMap.rules,
          elecomTrackballRemap.rules,
          toggleMenubar.rules,
          mapLShiftEscapToCapsLock.rules,
          mapCapsLocktoEscapeOrLCtrlChorded.rules,
          mapCtrlIJKLtoArrowKeys.rules,
          mapShiftsToParensOrShifts.rules
        ),
      },
      null,
      '  '
    )
  )
}

main()
