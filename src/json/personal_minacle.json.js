// JavaScript should be written in ECMAScript 5.1.

const alnumKeyCodeRange = range(0x04, 0x27)
const symbolKeyCodeRange = range(0x2d, 0x38)
const nonUsBackslashKeyCodeRange = range(0x64, 0x64)
const characterKeyCodeList = [].concat(alnumKeyCodeRange, symbolKeyCodeRange, nonUsBackslashKeyCodeRange)

function main() {
  console.log(
    JSON.stringify(
      {
        title: 'Minacle Key Customisation',
        maintainers: ['minacle'],
        rules: [
          {
            description: '⌘F3 → Mission Control',
            manipulators: [
              {
                from: keyWithStrictModifiers('f3', ['command']),
                to: commandKey('mission_control'),
                type: 'basic',
              },
            ],
          },
          {
            description: '(fnF13 → F16), (fnF14 → F17), (fnF15 → F18)',
            manipulators: [
              {
                from: keyWithLooseModifiers('f13', ['fn']),
                to: key('f16'),
                type: 'basic',
              },
              {
                from: keyWithLooseModifiers('f14', ['fn']),
                to: key('f17'),
                type: 'basic',
              },
              {
                from: keyWithLooseModifiers('f15', ['fn']),
                to: key('f18'),
                type: 'basic',
              },
            ],
          },
          {
            description: '(⌃⌃ → [Aあ][A가])',
            manipulators: [
              {
                conditions: [isInputSourceLang('en')],
                from: key('left_control'),
                to: key('left_control'),
                to_if_alone: [controlShiftKey('spacebar'), keyClear()],
                type: 'basic',
              },
              {
                conditions: [isInputSourceLang('en')],
                from: key('right_control'),
                to: key('right_control'),
                to_if_alone: [controlShiftKey('spacebar'), keyClear()],
                type: 'basic',
              },
              {
                conditions: [isInputSourceLangNot('en')],
                from: key('left_control'),
                to: key('left_control'),
                to_if_alone: toEn(),
                type: 'basic',
              },
              {
                conditions: [isInputSourceLangNot('en')],
                from: key('right_control'),
                to: key('right_control'),
                to_if_alone: toEn(),
                type: 'basic',
              },
            ],
          },
          {
            description: '(⌃␣ → あ가)',
            manipulators: [
              {
                conditions: [isInputSourceLang('ja')],
                from: keyWithStrictModifiers('spacebar', ['control']),
                to: toKo(),
                type: 'basic',
              },
              {
                conditions: [isInputSourceLang('ko')],
                from: keyWithStrictModifiers('spacebar', ['control']),
                to: toJa(),
                type: 'basic',
              },
            ],
          },
          koOptionAnyToEnOptionAnyOrKoOptionShiftAnyToEnOptionShiftAnyRule(),
        ],
      },
      null,
      '  '
    )
  )
}

function range(min, max) {
  const result = []
  for (var i = min; i <= max; ++i) {
    result.push(i)
  }
  return result
}

function commandKey(keyCode) {
  return {
    key_code: keyCode,
    modifiers: ['command'],
  }
}

function controlShiftKey(keyCode) {
  return {
    key_code: keyCode,
    modifiers: ['control', 'shift'],
  }
}

function isInputSourceLang(lang) {
  return {
    input_sources: [
      {
        language: '^' + lang + '$',
      },
    ],
    type: 'input_source_if',
  }
}

function isInputSourceLangNot(lang) {
  return {
    input_sources: [{ language: '^' + lang + '$' }],
    type: 'input_source_unless',
  }
}

function keyWithLooseModifiers(keyCode, modifiers) {
  return {
    key_code: keyCode,
    modifiers: {
      mandatory: modifiers,
      optional: ['any'],
    },
  }
}

function keyWithStrictModifiers(keyCode, modifiers) {
  return {
    key_code: keyCode,
    modifiers: {
      mandatory: modifiers,
    },
  }
}

function koOptionAnyToEnOptionAnyOrKoOptionShiftAnyToEnOptionShiftAnyRule() {
  return {
    description: '([가]⌥any → [A]⌥any), ([가]⌥⇧any → [A]⌥⇧any)',
    manipulators: characterKeyCodeList.map(function (keyCode) {
      return {
        conditions: [isInputSourceLang('ko')],
        from: {
          key_code: keyCode,
          modifiers: {
            mandatory: ['option'],
            optional: ['shift'],
          },
        },
        to: [key('japanese_eisuu'), optionKey(keyCode)],
        to_after_key_up: [keyClear(), controlShiftKey('spacebar'), keyClear(), key('vk_none')],
        type: 'basic',
      }
    }),
  }
}

function optionKey(keyCode) {
  return {
    key_code: keyCode,
    modifiers: ['option'],
  }
}

function key(keyCode) {
  return {
    key_code: keyCode,
  }
}

function keyClear() {
  return {
    key_code: 'vk_none',
    modifiers: [],
  }
}

function singleKey(keyCode) {
  return {
    key_code: keyCode,
    modifiers: [],
  }
}

function toEn() {
  return [key('japanese_eisuu'), keyClear()]
}

function toJa() {
  return [key('japanese_kana'), keyClear()]
}

function toKo() {
  return [
    key('lang2'),
    {
      select_input_source: {
        language: 'ko',
      },
    },
    keyClear(),
  ]
}

main()
