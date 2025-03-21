// JavaScript should be written in ECMAScript 5.1.

function main() {
  console.log(
    JSON.stringify(
      {
        title: 'Neo layouts based on ABC - Extended layout',
        rules: [
          neo2(), neoQwertz(), bone(), mine(), noted(), adnw(), koy(), vou()
        ]
      },
      null,
      '  '
    )
  )
}

const ifMod3On = { type: 'variable_unless', name: 'neo2_mod_3', value: 0 }
const ifMod4On = { type: 'variable_unless', name: 'neo2_mod_4', value: 0 }
const ifMod4Locked = { type: 'variable_if', name: 'neo2_mod_4', value: 2 }
const ifMod4NotLocked = { type: 'variable_unless', name: 'neo2_mod_4', value: 2 }
const isLayoutActive = {
  type: 'input_source_if',
  input_sources: [
    { input_source_id: '^com\\.apple\\.keylayout\\.USExtended$' }
  ]
}
const setMod4 = function(value, halt) {
  return { set_variable: { name: 'neo2_mod_4', value: value }, halt: halt === true ? true : undefined }
}

const remapFromKeys = [].concat(
  ['non_us_backslash', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'hyphen', 'equal_sign'],
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'open_bracket', 'close_bracket'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'semicolon', 'quote', 'backslash'],
  ['z', 'x', 'c', 'v', 'b', 'n', 'm', 'comma', 'period', 'slash']
)

const remapToLayer3Keys = [].concat(
  ['vk_none', 'vk_none', 'vk_none', 'vk_none', '›', '‹', '¢', '¥', '‚', '‘', '’', 'vk_none', '˚'],
  ['…', '_', '[', ']', '^', '!', '<', '>', '=', '&', 'vk_none', 'vk_none'],
  ['\\', '/', '{', '}', '*', '?', '(', ')', '-', ':', '@', ''],
  ['#', '$', '|', '~', '`', '+', '%', '"', '\'', ';']
)

const remapToLayer4Keys = [].concat(
  ['˙', 'ª', 'º', '№', 'vk_none', '·', '£', 'vk_none', 'tab', 'keypad_slash', 'keypad_asterisk', 'keypad_hyphen', '¨'],
  ['page_up', 'delete_or_backspace', 'up_arrow', 'delete_forward', 'page_down', '¡', 'keypad_7', 'keypad_8', 'keypad_9', 'keypad_plus', 'vk_none', '˝'],
  ['home', 'left_arrow', 'down_arrow', 'right_arrow', 'end', '¿', 'keypad_4', 'keypad_5', 'keypad_6', 'comma', 'period', ''],
  ['escape', 'tab', '', 'return_or_enter', '', ':', 'keypad_1', 'keypad_2', 'keypad_3', 'semicolon']
)

function neo2() {
  const remapToLayer1Keys = [].concat(
    ['ˆ', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'hyphen', '◌̀'],
    ['x', 'v', 'l', 'c', 'w', 'k', 'h', 'g', 'f', 'q', 'ß', '´'],
    ['u', 'i', 'a', 'e', 'o', 's', 'n', 'r', 't', 'd', 'y', ''],
    ['ü', 'ö', 'ä', 'p', 'z', 'b', 'm', 'comma', 'period', 'j']
  )

  const remapToLayer2Keys = [].concat(
    ['ˇ', '°', '§', 'vk_none', '»', '«', '$', '€', '„', '“', '”', '—', '¸'],
    ['', '', '', '', '', '', '', '', '', '', 'vk_none', '˜'],
    ['', '', '', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '–', '•', '']
  )

  return {
    description: 'Neo2',
    manipulators: [].concat(
      modifiers('backslash'),
      eachKey({
          fromKeys: ['c', 'b'],
          toKeys: ['v', 'z'],
          toModifiers: ['left_command'],
          conditions: [ifMod4On, isLayoutActive]
        }
      ),
      eachKey({
          fromKeys: remapFromKeys.concat(['spacebar']),
          toKeys: remapToLayer4Keys.concat(['keypad_0']),
          fromModifiers: {
            optional: ['control', 'option', 'command']
          },
          conditions: [ifMod4On, isLayoutActive]
        }
      ),
      eachKey({
          fromKeys: remapFromKeys,
          toKeys: remapToLayer3Keys,
          fromModifiers: {
            optional: ['control', 'option', 'command']
          },
          conditions: [ifMod3On, isLayoutActive]
        }
      ),
      eachKey({
          fromKeys: remapFromKeys,
          toKeys: remapToLayer2Keys,
          conditions: [isLayoutActive],
          fromModifiers: {
            mandatory: 'shift'
          }
        }
      ),
      eachKey({
          fromKeys: remapFromKeys,
          toKeys: remapToLayer1Keys,
          fromModifiers: {
            optional: 'any'
          },
          conditions: [isLayoutActive]
        }
      )
    )
  }
}

function neoQwertz() {
  const remapToLayer1Keys = [].concat(
    ['ˆ', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'ß', '◌̀'],
    ['q', 'w', 'e', 'r', 't', 'z', 'u', 'i', 'o', 'p', 'ü', '´'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'ö', 'ä', ''],
    ['y', 'x', 'c', 'v', 'b', 'n', 'm', 'comma', 'period', 'hyphen']
  )

  const remapToLayer2Keys = [].concat(
    ['ˇ', '°', '§', 'vk_none', '»', '«', '$', '€', '„', '“', '”', 'vk_none', '¸'],
    ['', '', '', '', '', '', '', '', '', '', '', '˜'],
    ['', '', '', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '–', '•', '—']
  )

  return {
    description: 'NeoQwertz',
    manipulators: [].concat(
      modifiers('backslash'),
      eachKey({
          fromKeys: ['c', 'b'],
          toKeys: ['v', 'z'],
          toModifiers: ['left_command'],
          conditions: [ifMod4On, isLayoutActive]
        }
      ),
      eachKey({
          fromKeys: remapFromKeys.concat(['spacebar']),
          toKeys: remapToLayer4Keys.concat(['keypad_0']),
          fromModifiers: {
            optional: ['control', 'option', 'command']
          },
          conditions: [ifMod4On, isLayoutActive]
        }
      ),
      eachKey({
          fromKeys: remapFromKeys,
          toKeys: remapToLayer3Keys,
          fromModifiers: {
            optional: ['control', 'option', 'command']
          },
          conditions: [ifMod3On, isLayoutActive]
        }
      ),
      eachKey({
          fromKeys: remapFromKeys,
          toKeys: remapToLayer2Keys,
          conditions: [isLayoutActive],
          fromModifiers: {
            mandatory: 'shift'
          }
        }
      ),
      eachKey({
          fromKeys: remapFromKeys,
          toKeys: remapToLayer1Keys,
          fromModifiers: {
            optional: 'any'
          },
          conditions: [isLayoutActive]
        }
      )
    )
  }
}

function bone() {
  const remapToLayer1Keys = [].concat(
    ['ˆ', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'hyphen', '◌̀'],
    ['j', 'd', 'u', 'a', 'x', 'p', 'h', 'l', 'm', 'w', 'ß', '´'],
    ['c', 't', 'i', 'e', 'o', 'b', 'n', 'r', 's', 'g', 'q', ''],
    ['f', 'v', 'ü', 'ä', 'ö', 'y', 'z', 'comma', 'period', 'k']
  )

  const remapToLayer2Keys = [].concat(
    ['ˇ', '°', '§', 'vk_none', '»', '«', '$', '€', '„', '“', '”', '—', '¸'],
    ['', '', '', '', '', '', '', '', '', '', 'vk_none', '˜'],
    ['', '', '', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '–', '•', '']
  )

  return {
    description: 'Bone',
    manipulators: [].concat(
      modifiers('backslash'),
      eachKey({
          fromKeys: ['c', 'b'],
          toKeys: ['v', 'z'],
          toModifiers: ['left_command'],
          conditions: [ifMod4On, isLayoutActive]
        }
      ),
      eachKey({
          fromKeys: remapFromKeys.concat(['spacebar']),
          toKeys: remapToLayer4Keys.concat(['keypad_0']),
          fromModifiers: {
            optional: ['control', 'option', 'command']
          },
          conditions: [ifMod4On, isLayoutActive]
        }
      ),
      eachKey({
          fromKeys: remapFromKeys,
          toKeys: remapToLayer3Keys,
          fromModifiers: {
            optional: ['control', 'option', 'command']
          },
          conditions: [ifMod3On, isLayoutActive]
        }
      ),
      eachKey({
          fromKeys: remapFromKeys,
          toKeys: remapToLayer2Keys,
          conditions: [isLayoutActive],
          fromModifiers: {
            mandatory: 'shift'
          }
        }
      ),
      eachKey({
          fromKeys: remapFromKeys,
          toKeys: remapToLayer1Keys,
          fromModifiers: {
            optional: 'any'
          },
          conditions: [isLayoutActive]
        }
      )
    )
  }
}

function mine() {
  const remapToLayer1Keys = [].concat(
    ['ˆ', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'hyphen', '◌̀'],
    ['j', 'l', 'u', 'a', 'q', 'w', 'b', 'd', 'g', 'y', 'z', 'ß'],
    ['c', 'r', 'i', 'e', 'o', 'm', 'n', 't', 's', 'h', '', '´'],
    ['v', 'x', 'ü', 'ä', 'ö', 'p', 'f', 'comma', 'period', 'k']
  )

  const remapToLayer2Keys = [].concat(
    ['ˇ', '°', '§', 'vk_none', '»', '«', '$', '€', '„', '“', '”', '—', '¸'],
    ['', '', '', '', '', '', '', '', '', '', '', 'vk_none'],
    ['', '', '', '', '', '', '', '', '', '', '', '˜'],
    ['', '', '', '', '', '', '', '–', '•', '']
  )

  const remapToLayer3KeysForMine = [].concat(
    ['vk_none', 'vk_none', 'vk_none', 'vk_none', '›', '‹', '¢', '¥', '‚', '‘', '’', 'vk_none', '˚'],
    ['…', '_', '[', ']', '^', '!', '<', '>', '=', '&', '@', 'vk_none'],
    ['\\', '/', '{', '}', '*', '?', '(', ')', '-', ':', '', 'vk_none'],
    ['#', '$', '|', '~', '`', '+', '%', '"', '\'', ';']
  )

  const remapToLayer4KeysForMine = [].concat(
    ['˙', 'ª', 'º', '№', 'vk_none', '·', '£', 'vk_none', 'tab', 'keypad_slash', 'keypad_asterisk', 'keypad_hyphen', '¨'],
    ['page_up', 'delete_or_backspace', 'up_arrow', 'delete_forward', 'page_down', '¡', 'keypad_7', 'keypad_8', 'keypad_9', 'keypad_plus', 'vk_none', 'semicolon'],
    ['home', 'left_arrow', 'down_arrow', 'right_arrow', 'end', '¿', 'keypad_4', 'keypad_5', 'keypad_6', 'comma', '', '˝'],
    ['escape', 'tab', '', 'return_or_enter', '', ':', 'keypad_1', 'keypad_2', 'keypad_3', 'period']
  )

  return {
    description: 'Mine',
    manipulators: [].concat(
      modifiers('quote'),
      eachKey({
          fromKeys: ['c', 'b'],
          toKeys: ['v', 'z'],
          toModifiers: ['left_command'],
          conditions: [ifMod4On, isLayoutActive]
        }
      ),
      eachKey({
          fromKeys: remapFromKeys.concat(['spacebar']),
          toKeys: remapToLayer4KeysForMine.concat(['keypad_0']),
          fromModifiers: {
            optional: ['control', 'option', 'command']
          },
          conditions: [ifMod4On, isLayoutActive]
        }
      ),
      eachKey({
          fromKeys: remapFromKeys,
          toKeys: remapToLayer3KeysForMine,
          fromModifiers: {
            optional: ['control', 'option', 'command']
          },
          conditions: [ifMod3On, isLayoutActive]
        }
      ),
      eachKey({
          fromKeys: remapFromKeys,
          toKeys: remapToLayer2Keys,
          conditions: [isLayoutActive],
          fromModifiers: {
            mandatory: 'shift'
          }
        }
      ),
      eachKey({
          fromKeys: remapFromKeys,
          toKeys: remapToLayer1Keys,
          fromModifiers: {
            optional: 'any'
          },
          conditions: [isLayoutActive]
        }
      )
    )
  }
}

function noted() {
  const remapToLayer1Keys = [].concat(
    ['ˆ', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'hyphen', '◌̀'],
    ['z', 'y', 'u', 'a', 'q', 'p', 'b', 'm', 'l', 'f', 'j', 'ß'],
    ['c', 's', 'i', 'e', 'o', 'd', 't', 'n', 'r', 'h', '', '´'],
    ['v', 'x', 'ü', 'ä', 'ö', 'w', 'g', 'comma', 'period', 'k']
  )

  const remapToLayer2Keys = [].concat(
    ['ˇ', '°', '§', 'vk_none', '»', '«', '$', '€', '„', '“', '”', '—', '¸'],
    ['', '', '', '', '', '', '', '', '', '', '', 'vk_none'],
    ['', '', '', '', '', '', '', '', '', '', '', '˜'],
    ['', '', '', '', '', '', '', '–', '•', '']
  )

  const remapToLayer3KeysForNoted = [].concat(
    ['vk_none', 'vk_none', 'vk_none', 'vk_none', '›', '‹', '¢', '¥', '‚', '‘', '’', 'vk_none', '˚'],
    ['…', '_', '[', ']', '^', '!', '<', '>', '=', '&', '@', 'vk_none'],
    ['\\', '/', '{', '}', '*', '?', '(', ')', '-', ':', '', 'vk_none'],
    ['#', '$', '|', '~', '`', '+', '%', '"', '\'', ';']
  )

  const remapToLayer4KeysForNoted = [].concat(
    ['˙', 'ª', 'º', '№', 'vk_none', '·', '£', 'vk_none', 'tab', 'keypad_slash', 'keypad_asterisk', 'keypad_hyphen', '¨'],
    ['page_up', 'delete_or_backspace', 'up_arrow', 'delete_forward', 'page_down', '¡', 'keypad_7', 'keypad_8', 'keypad_9', 'keypad_plus', 'vk_none', 'semicolon'],
    ['home', 'left_arrow', 'down_arrow', 'right_arrow', 'end', '¿', 'keypad_4', 'keypad_5', 'keypad_6', 'comma', '', '˝'],
    ['escape', 'tab', '', 'return_or_enter', '', ':', 'keypad_1', 'keypad_2', 'keypad_3', 'period']
  )

  return {
    description: 'Noted',
    manipulators: [].concat(
      modifiers('quote'),
      eachKey({
          fromKeys: ['c', 'b'],
          toKeys: ['v', 'z'],
          toModifiers: ['left_command'],
          conditions: [ifMod4On, isLayoutActive]
        }
      ),
      eachKey({
          fromKeys: remapFromKeys.concat(['spacebar']),
          toKeys: remapToLayer4KeysForNoted.concat(['keypad_0']),
          fromModifiers: {
            optional: ['control', 'option', 'command']
          },
          conditions: [ifMod4On, isLayoutActive]
        }
      ),
      eachKey({
          fromKeys: remapFromKeys,
          toKeys: remapToLayer3KeysForNoted,
          fromModifiers: {
            optional: ['control', 'option', 'command']
          },
          conditions: [ifMod3On, isLayoutActive]
        }
      ),
      eachKey({
          fromKeys: remapFromKeys,
          toKeys: remapToLayer2Keys,
          conditions: [isLayoutActive],
          fromModifiers: {
            mandatory: 'shift'
          }
        }
      ),
      eachKey({
          fromKeys: remapFromKeys,
          toKeys: remapToLayer1Keys,
          fromModifiers: {
            optional: 'any'
          },
          conditions: [isLayoutActive]
        }
      )
    )
  }
}

function adnw() {
  const remapToLayer1Keys = [].concat(
    ['ˆ', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'hyphen', '◌̀'],
    ['k', 'u', 'ü', 'period', 'ä', 'v', 'g', 'c', 'l', 'j', 'f', '´'],
    ['h', 'i', 'e', 'a', 'o', 'd', 't', 'r', 'n', 's', 'ß', ''],
    ['x', 'y', 'ö', 'comma', 'q', 'b', 'p', 'w', 'm', 'z']
  )

  const remapToLayer2Keys = [].concat(
    ['ˇ', '°', '§', 'vk_none', '»', '«', '$', '€', '„', '“', '”', '—', '¸'],
    ['', '', '', '•', '', '', '', '', '', '', '', '˜'],
    ['', '', '', '', '', '', '', '', '', '', 'vk_none', ''],
    ['', '', '', '–', '', '', '', '', '', '']
  )

  return {
    description: 'AdNW',
    manipulators: [].concat(
      modifiers('backslash'),
      eachKey({
          fromKeys: ['c', 'b'],
          toKeys: ['v', 'z'],
          toModifiers: ['left_command'],
          conditions: [ifMod4On, isLayoutActive]
        }
      ),
      eachKey({
          fromKeys: remapFromKeys.concat(['spacebar']),
          toKeys: remapToLayer4Keys.concat(['keypad_0']),
          fromModifiers: {
            optional: ['control', 'option', 'command']
          },
          conditions: [ifMod4On, isLayoutActive]
        }
      ),
      eachKey({
          fromKeys: remapFromKeys,
          toKeys: remapToLayer3Keys,
          fromModifiers: {
            optional: ['control', 'option', 'command']
          },
          conditions: [ifMod3On, isLayoutActive]
        }
      ),
      eachKey({
          fromKeys: remapFromKeys,
          toKeys: remapToLayer2Keys,
          conditions: [isLayoutActive],
          fromModifiers: {
            mandatory: 'shift'
          }
        }
      ),
      eachKey({
          fromKeys: remapFromKeys,
          toKeys: remapToLayer1Keys,
          fromModifiers: {
            optional: 'any'
          },
          conditions: [isLayoutActive]
        }
      )
    )
  }
}

function koy() {
  const remapToLayer1Keys = [].concat(
    ['ˆ', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'hyphen', '◌̀'],
    ['k', 'period', 'o', 'comma', 'y', 'v', 'g', 'c', 'l', 'ß', 'z', '´'],
    ['h', 'a', 'e', 'i', 'u', 'd', 't', 'r', 'n', 's', 'f', ''],
    ['x', 'q', 'ä', 'ü', 'ö', 'b', 'p', 'w', 'm', 'j']
  )

  const remapToLayer2Keys = [].concat(
    ['ˇ', '°', '§', 'vk_none', '»', '«', '$', '€', '„', '“', '”', '—', '¸'],
    ['', '•', '', '–', '', '', '', '', '', 'vk_none', '', '˜'],
    ['', '', '', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', '']
  )

  return {
    description: 'KOY',
    manipulators: [].concat(
      modifiers('backslash'),
      eachKey({
          fromKeys: ['c', 'b'],
          toKeys: ['v', 'z'],
          toModifiers: ['left_command'],
          conditions: [ifMod4On, isLayoutActive]
        }
      ),
      eachKey({
          fromKeys: remapFromKeys.concat(['spacebar']),
          toKeys: remapToLayer4Keys.concat(['keypad_0']),
          fromModifiers: {
            optional: ['control', 'option', 'command']
          },
          conditions: [ifMod4On, isLayoutActive]
        }
      ),
      eachKey({
          fromKeys: remapFromKeys,
          toKeys: remapToLayer3Keys,
          fromModifiers: {
            optional: ['control', 'option', 'command']
          },
          conditions: [ifMod3On, isLayoutActive]
        }
      ),
      eachKey({
          fromKeys: remapFromKeys,
          toKeys: remapToLayer2Keys,
          conditions: [isLayoutActive],
          fromModifiers: {
            mandatory: 'shift'
          }
        }
      ),
      eachKey({
          fromKeys: remapFromKeys,
          toKeys: remapToLayer1Keys,
          fromModifiers: {
            optional: 'any'
          },
          conditions: [isLayoutActive]
        }
      )
    )
  }
}

function vou() {
  const remapToLayer1Keys = [].concat(
    ['ˆ', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'hyphen', '◌̀'],
    ['v', 'period', 'o', 'u', 'ä', 'q', 'g', 'l', 'h', 'f', 'j', '´'],
    ['c', 'a', 'e', 'i', 'y', 'b', 't', 'r', 'n', 's', '', 'ß'],
    ['z', 'x', 'comma', 'ü', 'ö', 'p', 'd', 'w', 'm', 'k']
  )

  const remapToLayer2Keys = [].concat(
    ['ˇ', '°', '§', 'vk_none', '»', '«', '$', '€', '„', '“', '”', '—', '¸'],
    ['', '•', '', '', '', '', '', '', '', '', '', '˜'],
    ['', '', '', '', '', '', '', '', '', '', '', 'vk_none'],
    ['', '', '–', '', '', '', '', '', '', '']
  )

  const remapToLayer3KeysForVou = [].concat(
    ['vk_none', 'vk_none', 'vk_none', 'vk_none', '›', '‹', '¢', '¥', '‚', '‘', '’', 'vk_none', '˚'],
    ['…', '_', '[', ']', '^', '!', '<', '>', '=', '&', '@', 'vk_none'],
    ['\\', '/', '{', '}', '*', '?', '(', ')', '-', ':', '', 'vk_none'],
    ['#', '$', '|', '~', '`', '+', '%', '"', '\'', ';']
  )

  const remapToLayer4KeysForVou = [].concat(
    ['˙', 'ª', 'º', '№', 'vk_none', '·', '£', 'vk_none', 'tab', 'keypad_slash', 'keypad_asterisk', 'keypad_hyphen', '¨'],
    ['page_up', 'delete_or_backspace', 'up_arrow', 'delete_forward', 'page_down', '¡', 'keypad_7', 'keypad_8', 'keypad_9', 'keypad_plus', 'vk_none', 'semicolon'],
    ['home', 'left_arrow', 'down_arrow', 'right_arrow', 'end', '¿', 'keypad_4', 'keypad_5', 'keypad_6', 'comma', '', '˝'],
    ['escape', 'tab', '', 'return_or_enter', '', ':', 'keypad_1', 'keypad_2', 'keypad_3', 'period']
  )

  return {
    description: 'VOU',
    manipulators: [].concat(
      modifiers('quote'),
      eachKey({
          fromKeys: ['c', 'b'],
          toKeys: ['v', 'z'],
          toModifiers: ['left_command'],
          conditions: [ifMod4On, isLayoutActive]
        }
      ),
      eachKey({
          fromKeys: remapFromKeys.concat(['spacebar']),
          toKeys: remapToLayer4KeysForVou.concat(['keypad_0']),
          fromModifiers: {
            optional: ['control', 'option', 'command']
          },
          conditions: [ifMod4On, isLayoutActive]
        }
      ),
      eachKey({
          fromKeys: remapFromKeys,
          toKeys: remapToLayer3KeysForVou,
          fromModifiers: {
            optional: ['control', 'option', 'command']
          },
          conditions: [ifMod3On, isLayoutActive]
        }
      ),
      eachKey({
          fromKeys: remapFromKeys,
          toKeys: remapToLayer2Keys,
          conditions: [isLayoutActive],
          fromModifiers: {
            mandatory: 'shift'
          }
        }
      ),
      eachKey({
          fromKeys: remapFromKeys,
          toKeys: remapToLayer1Keys,
          fromModifiers: {
            optional: 'any'
          },
          conditions: [isLayoutActive]
        }
      )
    )
  }
}

function eachKey(options) {
  const result = []

  for (var i in options.fromKeys) {
    const fromKey = options.fromKeys[i]
    const toKey = options.toKeys[i]
    switch (toKey.trim()) {
      case '':
        break
      case 'ˆ': {
        result.push(modification(options, fromKey, {
          key_code: '6',
          modifiers: 'option'
        }))
        break
      }
      case 'ˇ': {
        result.push(modification(options, fromKey, {
          key_code: 'v',
          modifiers: 'option'
        }))
        break
      }
      case '˝': {
        result.push(modification(options, fromKey, {
          key_code: 'j',
          modifiers: 'option'
        }))
        break
      }
      case '¨': {
        result.push(modification(options, fromKey, {
          key_code: 'u',
          modifiers: 'option'
        }))
        break
      }
      case '◌̀': {
        result.push(modification(options, fromKey, {
          key_code: 'non_us_backslash',
          modifiers: 'option'
        }))
        break
      }
      case '¸': {
        result.push(modification(options, fromKey, {
          key_code: 'c',
          modifiers: 'option'
        }))
        break
      }
      case '´': {
        result.push(modification(options, fromKey, {
          key_code: 'e',
          modifiers: 'option'
        }))
        break
      }
      case '˜': {
        result.push(modification(options, fromKey, {
          key_code: 'n',
          modifiers: 'option'
        }))
        break
      }
      case '–': {
        result.push(modification(options, fromKey, {
          key_code: 'hyphen',
          modifiers: 'option'
        }))
        break
      }
      case '°': {
        result.push(modification(options, fromKey, {
          key_code: '8',
          modifiers: ['option', 'shift']
        }))
        break
      }
      case '˙': {
        result.push(modification(options, fromKey, {
          key_code: 'w',
          modifiers: 'option'
        }))
        break
      }
      case 'ª': {
        result.push(modification(options, fromKey, {
          key_code: '9',
          modifiers: 'option'
        }))
        break
      }
      case 'º': {
        result.push(modification(options, fromKey, {
          key_code: '0',
          modifiers: 'option'
        }))
        break
      }
      case '№': {
        result.push(modification(options, fromKey, [{
          key_code: 'semicolon',
          modifiers: ['option', 'shift']
        }, {
          key_code: 'spacebar'
        }]))
        break
      }
      case '•': {
        result.push(modification(options, fromKey, {
          key_code: '8',
          modifiers: 'option'
        }))
        break
      }
      case '·': {
        result.push(modification(options, fromKey, {
          key_code: '9',
          modifiers: ['option', 'shift']
        }))
        break
      }
      case '§': {
        result.push(modification(options, fromKey, {
          key_code: '5',
          modifiers: 'option'
        }))
        break
      }
      case '»': {
        result.push(modification(options, fromKey, {
          key_code: 'backslash',
          modifiers: ['option', 'shift']
        }))
        break
      }
      case '«': {
        result.push(modification(options, fromKey, {
          key_code: 'backslash',
          modifiers: 'option'
        }))
        break
      }
      case '€': {
        result.push(modification(options, fromKey, {
          key_code: '2',
          modifiers: ['option', 'shift']
        }))
        break
      }
      case '¿': {
        result.push(modification(options, fromKey, {
          key_code: 'slash',
          modifiers: ['option', 'shift']
        }))
        break
      }
      case '¡': {
        result.push(modification(options, fromKey, {
          key_code: '1',
          modifiers: 'option'
        }))
        break
      }
      case '£': {
        result.push(modification(options, fromKey, {
          key_code: '3',
          modifiers: 'option'
        }))
        break
      }
      case '„': {
        result.push(modification(options, fromKey, {
          key_code: 'comma',
          modifiers: ['option', 'shift']
        }))
        break
      }
      case '“': {
        result.push(modification(options, fromKey, {
          key_code: 'open_bracket',
          modifiers: 'option'
        }))
        break
      }
      case '›': {
        result.push(modification(options, fromKey, {
          key_code: '4',
          modifiers: ['option', 'shift']
        }))
        break
      }
      case '‹': {
        result.push(modification(options, fromKey, {
          key_code: '3',
          modifiers: ['option', 'shift']
        }))
        break
      }
      case '¢': {
        result.push(modification(options, fromKey, {
          key_code: '4',
          modifiers: 'option'
        }))
        break
      }
      case '¥': {
        result.push(modification(options, fromKey, {
          key_code: 'y',
          modifiers: 'option'
        }))
        break
      }
      case '”': {
        result.push(modification(options, fromKey, {
          key_code: 'open_bracket',
          modifiers: ['option', 'shift']
        }))
        break
      }
      case '‚': {
        result.push(modification(options, fromKey, {
          key_code: '0',
          modifiers: ['option', 'shift']
        }))
        break
      }
      case '‘': {
        result.push(modification(options, fromKey, {
          key_code: 'close_bracket',
          modifiers: 'option'
        }))
        break
      }
      case '’': {
        result.push(modification(options, fromKey, {
          key_code: 'close_bracket',
          modifiers: ['option', 'shift']
        }))
        break
      }
      case '—': {
        result.push(modification(options, fromKey, {
          key_code: 'hyphen',
          modifiers: ['option', 'shift']
        }))
        break
      }
      case '˚': {
        result.push(modification(options, fromKey, {
          key_code: 'k',
          modifiers: 'option'
        }))
        break
      }
      case 'ä':
      case 'ö':
      case 'ü': {
        const toKeyCode = removeDiaereses(toKey)
        result.push(
          {
            type: 'basic',
            from: {
              key_code: fromKey
            },
            to: [{
              key_code: 'u',
              modifiers: 'option'
            }, {
              key_code: toKeyCode
            }]
          }
        )

        result.push(
          {
            type: 'basic',
            from: {
              key_code: fromKey,
              modifiers: {
                mandatory: 'shift'
              }
            },
            to: [{
              key_code: 'u',
              modifiers: 'option'
            }, {
              key_code: toKeyCode,
              modifiers: 'shift'
            }]
          }
        )
        break
      }
      case 'ß': {
        result.push(modification(options, fromKey, {
          key_code: 's',
          modifiers: 'option'
        }))
        break
      }
      case '…': {
        result.push(modification(options, fromKey, {
          key_code: 'semicolon',
          modifiers: 'option'
        }))
        break
      }
      case '_': {
        result.push(modification(options, fromKey, {
          key_code: 'hyphen',
          modifiers: 'shift'
        }))
        break
      }
      case '[': {
        result.push(modification(options, fromKey, {
          key_code: 'open_bracket'
        }))
        break
      }
      case ']': {
        result.push(modification(options, fromKey, {
          key_code: 'close_bracket'
        }))
        break
      }
      case '^': {
        result.push(modification(options, fromKey, {
          key_code: '6',
          modifiers: 'shift'
        }))
        break
      }
      case '!': {
        result.push(modification(options, fromKey, {
          key_code: '1',
          modifiers: 'shift'
        }))
        break
      }
      case '<': {
        result.push(modification(options, fromKey, {
          key_code: 'comma',
          modifiers: ['shift']
        }))
        break
      }
      case '>': {
        result.push(modification(options, fromKey, {
          key_code: 'period',
          modifiers: 'shift'
        }))
        break
      }
      case '=': {
        result.push(modification(options, fromKey, {
          key_code: 'equal_sign'
        }))
        break
      }
      case '&': {
        result.push(modification(options, fromKey, {
          key_code: '7',
          modifiers: 'shift'
        }))
        break
      }
      case '\\': {
        result.push(modification(options, fromKey, {
          key_code: 'backslash'
        }))
        break
      }
      case '/': {
        result.push(modification(options, fromKey, {
          key_code: 'slash'
        }))
        break
      }
      case '{': {
        result.push(modification(options, fromKey, {
          key_code: 'open_bracket',
          modifiers: 'shift'
        }))
        break
      }
      case '}': {
        result.push(modification(options, fromKey, {
          key_code: 'close_bracket',
          modifiers: 'shift'
        }))
        break
      }
      case '*': {
        result.push(modification(options, fromKey, {
          key_code: '8',
          modifiers: 'shift'
        }))
        break
      }
      case '?': {
        result.push(modification(options, fromKey, {
          key_code: 'slash',
          modifiers: 'shift'
        }))
        break
      }
      case '(': {
        result.push(modification(options, fromKey, {
          key_code: '9',
          modifiers: 'shift'
        }))
        break
      }
      case ')': {
        result.push(modification(options, fromKey, {
          key_code: '0',
          modifiers: 'shift'
        }))
        break
      }
      case '-': {
        result.push(modification(options, fromKey, {
          key_code: 'hyphen'
        }))
        break
      }
      case ':':
        result.push(modification(options, fromKey, {
          key_code: 'semicolon',
          modifiers: 'shift'
        }))
        break
      case '@': {
        result.push(modification(options, fromKey, {
          key_code: '2',
          modifiers: 'shift'
        }))
        break
      }
      case '#': {
        result.push(modification(options, fromKey, {
          key_code: '3',
          modifiers: 'shift'
        }))
        break
      }
      case '$': {
        result.push(modification(options, fromKey, {
          key_code: '4',
          modifiers: 'shift'
        }))
        break
      }
      case '|': {
        result.push(modification(options, fromKey, {
          key_code: 'backslash',
          modifiers: 'shift'
        }))
        break
      }
      case '~': {
        result.push(modification(options, fromKey, {
          key_code: 'non_us_backslash',
          modifiers: 'shift'
        }))
        break
      }
      case '`': {
        result.push(modification(options, fromKey, {
          key_code: 'non_us_backslash'
        }))
        break
      }
      case '+': {
        result.push(modification(options, fromKey, {
          key_code: 'equal_sign',
          modifiers: 'shift'
        }))
        break
      }
      case '%': {
        result.push(modification(options, fromKey, {
          key_code: '5',
          modifiers: 'shift'
        }))
        break
      }
      case '"': {
        result.push(modification(options, fromKey, {
          key_code: 'quote',
          modifiers: 'shift'
        }))
        break
      }
      case '\'': {
        result.push(modification(options, fromKey, {
          key_code: 'quote'
        }))
        break
      }
      case ';': {
        result.push(modification(options, fromKey, {
          key_code: 'semicolon'
        }))
      }
        break
      default:
        result.push(modification(options, fromKey, {
          key_code: toKey,
          modifiers: options.toModifiers
        }))
    }
  }

  return result
}

function modification(options, fromKeyCode, to, from) {
  from = typeof from !== 'undefined' ? from : {
    key_code: fromKeyCode,
    modifiers: options.fromModifiers
  }
  return {
    type: 'basic',
    from,
    to,
    conditions: options.conditions
  }
}

function removeDiaereses(umlaut) {
  switch (umlaut) {
    case 'ü': {
      return 'u'
    }
    case 'ö': {
      return 'o'
    }
    case 'ä': {
      return 'a'
    }
  }
}

function modifiers(secondMod3Key) {
  return [].concat(
    ['caps_lock', secondMod3Key].map(function(key) {
      return {
        from: {
          key_code: key,
          modifiers: {
            optional:
              'any'
          }
        },
        to: [
          {
            set_variable: {
              name: 'neo2_mod_3',
              value: 1,
              key_up_value: 0
            }
          }
        ],
        type: 'basic',
        conditions: [isLayoutActive]
      }
    }),
    {
      type: 'basic',
      from: { simultaneous: [{ key_code: 'grave_accent_and_tilde' }, { key_code: 'right_command' }] },
      to: [setMod4(2, true)],
      conditions: [isLayoutActive, ifMod4NotLocked]
    },
    {
      type: 'basic',
      from: { simultaneous: [{ key_code: 'grave_accent_and_tilde' }, { key_code: 'right_command' }] },
      to: [setMod4(0)],
      conditions: [isLayoutActive, ifMod4Locked]
    },
    ['grave_accent_and_tilde', 'right_command'].map(function(key) {
      return {
        type: 'basic',
        from: {
          key_code: key,
          modifiers: {
            optional: 'any'
          }
        },
        to: [setMod4(1)],
        to_after_key_up: [setMod4(0)],
        conditions: [isLayoutActive]
      }
    })
  )
}

main()
