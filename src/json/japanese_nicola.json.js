// JavaScript should be written in ECMAScript 5.1.

const karabiner = require('../lib/karabiner')

function main() {
  console.log(
    JSON.stringify(
      {
        title: 'Japanese NICOLA',
        rules: [
          {
            description: 'Japanese NICOLA Type F',
            manipulators: manipulators(),
          },
        ],
      },
      null,
      '  '
    )
  )
}

function manipulators() {
  // 左シフトのキーコード
  const leftShiftKeyCode = 'spacebar'

  // 右シフトのキーコード
  const rightShiftKeyCode = 'lang1'

  // 有効になる条件
  const conditions = [
    {
      type: 'input_source_if',
      input_sources: [
        {
          input_mode_id: 'com.apple.inputmethod.Japanese',
        },
        {
          input_mode_id: 'com.apple.inputmethod.Japanese.Hiragana',
        },
        {
          input_mode_id: 'com.apple.inputmethod.Japanese.Katakana',
        },
        {
          input_mode_id: 'com.apple.inputmethod.Japanese.HalfWidthKana',
        },
      ],
    },
    {
      type: 'frontmost_application_unless',
      bundle_identifiers: karabiner.bundleIdentifiers.loginwindow,
    },
  ]

  //
  // ローマ字入力の定義
  //

  const key = function (k) {
    return {
      key_code: k,
      repeat: false,
    }
  }

  const keyWithShift = function (k) {
    return {
      key_code: k,
      modifiers: ['left_shift'],
      repeat: false,
    }
  }

  const keyWithOption = function (k) {
    return {
      key_code: k,
      modifiers: ['option'],
      repeat: false,
    }
  }

  const romanMap = {
    あ: [key('a')],
    い: [key('i')],
    う: [key('u')],
    え: [key('e')],
    お: [key('o')],
    か: [key('k'), key('a')],
    き: [key('k'), key('i')],
    く: [key('k'), key('u')],
    け: [key('k'), key('e')],
    こ: [key('k'), key('o')],
    が: [key('g'), key('a')],
    ぎ: [key('g'), key('i')],
    ぐ: [key('g'), key('u')],
    げ: [key('g'), key('e')],
    ご: [key('g'), key('o')],
    さ: [key('s'), key('a')],
    し: [key('s'), key('i')],
    す: [key('s'), key('u')],
    せ: [key('s'), key('e')],
    そ: [key('s'), key('o')],
    ざ: [key('z'), key('a')],
    じ: [key('z'), key('i')],
    ず: [key('z'), key('u')],
    ぜ: [key('z'), key('e')],
    ぞ: [key('z'), key('o')],
    た: [key('t'), key('a')],
    ち: [key('t'), key('i')],
    つ: [key('t'), key('u')],
    て: [key('t'), key('e')],
    と: [key('t'), key('o')],
    だ: [key('d'), key('a')],
    ぢ: [key('d'), key('i')],
    づ: [key('d'), key('u')],
    で: [key('d'), key('e')],
    ど: [key('d'), key('o')],
    な: [key('n'), key('a')],
    に: [key('n'), key('i')],
    ぬ: [key('n'), key('u')],
    ね: [key('n'), key('e')],
    の: [key('n'), key('o')],
    は: [key('h'), key('a')],
    ひ: [key('h'), key('i')],
    ふ: [key('h'), key('u')],
    へ: [key('h'), key('e')],
    ほ: [key('h'), key('o')],
    ば: [key('b'), key('a')],
    び: [key('b'), key('i')],
    ぶ: [key('b'), key('u')],
    べ: [key('b'), key('e')],
    ぼ: [key('b'), key('o')],
    ぱ: [key('p'), key('a')],
    ぴ: [key('p'), key('i')],
    ぷ: [key('p'), key('u')],
    ぺ: [key('p'), key('e')],
    ぽ: [key('p'), key('o')],
    ま: [key('m'), key('a')],
    み: [key('m'), key('i')],
    む: [key('m'), key('u')],
    め: [key('m'), key('e')],
    も: [key('m'), key('o')],
    や: [key('y'), key('a')],
    ゆ: [key('y'), key('u')],
    よ: [key('y'), key('o')],
    ゃ: [key('x'), key('y'), key('a')],
    ゅ: [key('x'), key('y'), key('u')],
    ょ: [key('x'), key('y'), key('o')],
    ら: [key('r'), key('a')],
    り: [key('r'), key('i')],
    る: [key('r'), key('u')],
    れ: [key('r'), key('e')],
    ろ: [key('r'), key('o')],
    わ: [key('w'), key('a')],
    を: [key('w'), key('o')],
    ん: [key('n'), key('n')],
    っ: [key('l'), key('t'), key('u')],
    ぁ: [key('x'), key('a')],
    ぃ: [key('x'), key('i')],
    ぅ: [key('x'), key('u')],
    ぇ: [key('x'), key('e')],
    ぉ: [key('x'), key('o')],
    ゔ: [key('v'), key('u')],
    '、': [key('comma')],
    '。': [key('period')],
    ー: [key('hyphen')],
    delete: [key('delete_or_backspace')],
    '？': [keyWithShift('slash')],
    '／': [keyWithOption('slash')],
    '〜': [keyWithShift('equal_sign')],
    '「': [key('close_bracket')],
    '」': [key('backslash')],
    '［': [keyWithOption('close_bracket')],
    '］': [keyWithOption('backslash')],
    '（': [keyWithShift('8')],
    '）': [keyWithShift('9')],
    '『': [keyWithShift('close_bracket')],
    '』': [keyWithShift('backslash')],
    '．': [keyWithOption('period')],
    '，': [keyWithOption('comma')],
  }

  const normalKey = function (key, char) {
    return {
      type: 'basic',
      from: {
        key_code: key,
      },
      to: romanMap[char],
      conditions: conditions,
    }
  }

  const leftShiftKey = function (key, char) {
    return {
      type: 'basic',
      from: {
        simultaneous: [
          {
            key_code: key,
          },
          {
            key_code: leftShiftKeyCode,
          },
        ],
      },
      to: romanMap[char],
      conditions: conditions,
    }
  }

  const rightShiftKey = function (key, char) {
    return {
      type: 'basic',
      from: {
        simultaneous: [
          {
            key_code: key,
          },
          {
            key_code: rightShiftKeyCode,
          },
        ],
      },
      to: romanMap[char],
      conditions: conditions,
    }
  }

  return [
    //
    // シフトありから並べること
    //

    //
    // 左シフト
    //

    leftShiftKey('1', '？'),
    leftShiftKey('2', '／'),
    leftShiftKey('3', '〜'),
    leftShiftKey('4', '「'),
    leftShiftKey('5', '」'),
    leftShiftKey('comma', 'ぺ'),
    leftShiftKey('period', 'ぼ'),
    leftShiftKey('a', 'を'),
    leftShiftKey('b', 'ぃ'),
    leftShiftKey('c', 'ろ'),
    leftShiftKey('d', 'な'),
    leftShiftKey('e', 'り'),
    leftShiftKey('f', 'ゅ'),
    leftShiftKey('g', 'も'),
    leftShiftKey('h', 'ば'),
    leftShiftKey('i', 'ぐ'),
    leftShiftKey('j', 'ど'),
    leftShiftKey('k', 'ぎ'),
    leftShiftKey('l', 'ぽ'),
    leftShiftKey('m', 'ぞ'),
    leftShiftKey('n', 'ぷ'),
    leftShiftKey('o', 'づ'),
    leftShiftKey('p', 'ぴ'),
    leftShiftKey('q', 'ぁ'),
    leftShiftKey('r', 'ゃ'),
    leftShiftKey('s', 'あ'),
    leftShiftKey('t', 'れ'),
    leftShiftKey('u', 'ぢ'),
    leftShiftKey('v', 'や'),
    leftShiftKey('w', 'え'),
    leftShiftKey('x', 'ー'),
    leftShiftKey('y', 'ぱ'),
    leftShiftKey('z', 'ぅ'),

    //
    // 右シフト
    //

    rightShiftKey('0', '『'),
    rightShiftKey('6', '［'),
    rightShiftKey('7', '］'),
    rightShiftKey('8', '（'),
    rightShiftKey('9', '）'),
    rightShiftKey('hyphen', '』'),
    rightShiftKey('comma', 'む'),
    rightShiftKey('semicolon', 'っ'),
    rightShiftKey('period', 'わ'),
    rightShiftKey('slash', 'ぉ'),
    rightShiftKey('a', 'ゔ'),
    rightShiftKey('b', 'べ'),
    rightShiftKey('c', 'ず'),
    rightShiftKey('d', 'で'),
    rightShiftKey('e', 'だ'),
    rightShiftKey('f', 'げ'),
    rightShiftKey('g', 'ぜ'),
    rightShiftKey('h', 'み'),
    rightShiftKey('i', 'る'),
    rightShiftKey('j', 'お'),
    rightShiftKey('k', 'の'),
    rightShiftKey('l', 'ょ'),
    rightShiftKey('m', 'ゆ'),
    rightShiftKey('n', 'ぬ'),
    rightShiftKey('o', 'ま'),
    rightShiftKey('p', 'ぇ'),
    rightShiftKey('r', 'ご'),
    rightShiftKey('s', 'じ'),
    rightShiftKey('t', 'ざ'),
    rightShiftKey('u', 'に'),
    rightShiftKey('v', 'ぶ'),
    rightShiftKey('w', 'が'),
    rightShiftKey('x', 'び'),
    rightShiftKey('y', 'よ'),

    //
    // シフトなし
    //

    normalKey('comma', 'ね'),
    normalKey('semicolon', 'ん'),
    normalKey('quote', 'delete'),
    normalKey('period', 'ほ'),
    normalKey('open_bracket', '、'),
    normalKey('a', 'う'),
    normalKey('b', 'へ'),
    normalKey('c', 'す'),
    normalKey('d', 'て'),
    normalKey('e', 'た'),
    normalKey('f', 'け'),
    normalKey('g', 'せ'),
    normalKey('h', 'は'),
    normalKey('i', 'く'),
    normalKey('j', 'と'),
    normalKey('k', 'き'),
    normalKey('l', 'い'),
    normalKey('m', 'そ'),
    normalKey('n', 'め'),
    normalKey('o', 'つ'),
    normalKey('p', '，'),
    normalKey('q', '。'),
    normalKey('r', 'こ'),
    normalKey('s', 'し'),
    normalKey('t', 'さ'),
    normalKey('u', 'ち'),
    normalKey('v', 'ふ'),
    normalKey('w', 'か'),
    normalKey('x', 'ひ'),
    normalKey('y', 'ら'),
    normalKey('z', '．'),
  ]
}

main()
