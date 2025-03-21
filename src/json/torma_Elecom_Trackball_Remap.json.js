// JavaScript should be written in ECMAScript 5.1.
const title = 'Better Trackball Map: Button 6 -> Show Desktop (F18), Button7 -> Double Click =  Launchpad, Click & Hold + Move Cursor = Scroll, Button 8 -> Mission Control';
const maintainer = 'torma';
const elecomTrackball = { identifiers: [{ product_id: 306, vendor_id: 1390 }, { product_id: 307, vendor_id: 1390 }], type: "device_if" };
const button7Pressed = { name: 'button7_pressed', type: 'variable_if', value: 1 };
const mouseMotionToScroll = { name: 'enable_mouse_motion_to_scroll', type: 'variable_if', value: 1 };

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
          description: 'CTRL + Back to move left a space',
          conditions: [elecomTrackball],
          from: {
            pointing_button: 'button4',
            modifiers: { mandatory: ['control'] },
          },
          to: [{ key_code: 'left_arrow', modifiers: ['control'] }],
          type: 'basic',
        },
        {
          description: 'CTRL + Forward to move right a space',
          conditions: [elecomTrackball],
          from: {
            pointing_button: 'button5',
            modifiers: { mandatory: ['control'] },
          },
          to: [{ key_code: 'right_arrow', modifiers: ['control'] }],
          type: 'basic',
        },
        {
          description: 'Button 6 -> f18 (Show Desktop, on my system)',
          conditions: [elecomTrackball],
          from: {
            pointing_button: 'button6',
            modifiers: { optional: ['any'] },
          },
          to: [{ key_code: 'f18' }],
          type: 'basic',
        },
        {
          description: 'Button 7 -> Double Click = Launchpad',
          conditions: [elecomTrackball, button7Pressed],
          from: {
            pointing_button: 'button7',
            modifiers: { optional: ['any'] },
          },
          to: [{ key_code: 'launchpad' }],
          to_after_key_up: [{ set_variable: { name: 'button7_pressed', value: 0 } }],
          type: 'basic',
        },
        {
          description: 'Button 7 -> Hold + Move Cursor = Scroll (1/2)',
          conditions: [elecomTrackball, mouseMotionToScroll],
          from: { modifiers: { optional: ['any'] } },
          type: 'mouse_motion_to_scroll',
        },
        {
          description: 'Button 7 -> Hold + Move Cursor = Scroll (2/2)',
          conditions: [elecomTrackball],
          from: {
            pointing_button: 'button7',
            modifiers: { optional: ['any'] },
          },
          to: [
            { set_variable: { name: 'enable_mouse_motion_to_scroll', value: 1 } },
            { set_variable: { name: 'button7_pressed', value: 1 } }
          ],
          to_after_key_up: [{ set_variable: { name: 'enable_mouse_motion_to_scroll', value: 0 } }],
          to_delayed_action: { to_if_invoked: [{ set_variable: { name: 'button7_pressed', value: 0 } }] },
          type: 'basic',
        },
        {
          description: 'Button 8 -> Mission Control',
          conditions: [elecomTrackball],
          from: {
            pointing_button: 'button8',
            modifiers: { optional: ['any'] },
          },
          to: [{ key_code: 'mission_control' }],
          type: 'basic',
        },
      ],
    },
  ]
}

if (__main.endsWith('/torma_Elecom_Trackball_Remap.json.js')) {
  main()
} else {
  exports.rules = rules()
}
