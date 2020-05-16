#!/usr/bin/env ruby

# You can generate json by executing the following command on Terminal.
#
# $ ruby ./japanese_nicola.json.rb
#

require 'json'
require_relative '../lib/karabiner.rb'

########################################
# 左シフトのキーコード

LEFT_SHIFT_KEY_CODE = 'spacebar'.freeze

########################################
# 右シフトのキーコード

RIGHT_SHIFT_KEY_CODE = 'lang1'.freeze

########################################
# 有効になる条件

CONDITIONS = [
  Karabiner.input_source_if([
                              {
                                'input_mode_id' => 'com.apple.inputmethod.Japanese',
                              },
                              {
                                'input_mode_id' => 'com.apple.inputmethod.Japanese.Hiragana',
                              },
                              {
                                'input_mode_id' => 'com.apple.inputmethod.Japanese.Katakana',
                              },
                              {
                                'input_mode_id' => 'com.apple.inputmethod.Japanese.HalfWidthKana',
                              },
                            ]),
  Karabiner.frontmost_application_unless(['loginwindow']),
].freeze

########################################
# ローマ字入力の定義

def key(key_code)
  {
    'key_code' => key_code,
    'repeat' => false,
  }
end

def key_with_shift(key_code)
  {
    'key_code' => key_code,
    'modifiers' => [
      'left_shift',
    ],
    'repeat' => false,
  }
end

def key_with_option(key_code)
  {
    'key_code' => key_code,
    'modifiers' => [
      'option',
    ],
    'repeat' => false,
  }
end

ROMAN_MAP = {
  'あ' => [key('a')],
  'い' => [key('i')],
  'う' => [key('u')],
  'え' => [key('e')],
  'お' => [key('o')],
  'か' => [key('k'), key('a')],
  'き' => [key('k'), key('i')],
  'く' => [key('k'), key('u')],
  'け' => [key('k'), key('e')],
  'こ' => [key('k'), key('o')],
  'が' => [key('g'), key('a')],
  'ぎ' => [key('g'), key('i')],
  'ぐ' => [key('g'), key('u')],
  'げ' => [key('g'), key('e')],
  'ご' => [key('g'), key('o')],
  'さ' => [key('s'), key('a')],
  'し' => [key('s'), key('i')],
  'す' => [key('s'), key('u')],
  'せ' => [key('s'), key('e')],
  'そ' => [key('s'), key('o')],
  'ざ' => [key('z'), key('a')],
  'じ' => [key('z'), key('i')],
  'ず' => [key('z'), key('u')],
  'ぜ' => [key('z'), key('e')],
  'ぞ' => [key('z'), key('o')],
  'た' => [key('t'), key('a')],
  'ち' => [key('t'), key('i')],
  'つ' => [key('t'), key('u')],
  'て' => [key('t'), key('e')],
  'と' => [key('t'), key('o')],
  'だ' => [key('d'), key('a')],
  'ぢ' => [key('d'), key('i')],
  'づ' => [key('d'), key('u')],
  'で' => [key('d'), key('e')],
  'ど' => [key('d'), key('o')],
  'な' => [key('n'), key('a')],
  'に' => [key('n'), key('i')],
  'ぬ' => [key('n'), key('u')],
  'ね' => [key('n'), key('e')],
  'の' => [key('n'), key('o')],
  'は' => [key('h'), key('a')],
  'ひ' => [key('h'), key('i')],
  'ふ' => [key('h'), key('u')],
  'へ' => [key('h'), key('e')],
  'ほ' => [key('h'), key('o')],
  'ば' => [key('b'), key('a')],
  'び' => [key('b'), key('i')],
  'ぶ' => [key('b'), key('u')],
  'べ' => [key('b'), key('e')],
  'ぼ' => [key('b'), key('o')],
  'ぱ' => [key('p'), key('a')],
  'ぴ' => [key('p'), key('i')],
  'ぷ' => [key('p'), key('u')],
  'ぺ' => [key('p'), key('e')],
  'ぽ' => [key('p'), key('o')],
  'ま' => [key('m'), key('a')],
  'み' => [key('m'), key('i')],
  'む' => [key('m'), key('u')],
  'め' => [key('m'), key('e')],
  'も' => [key('m'), key('o')],
  'や' => [key('y'), key('a')],
  'ゆ' => [key('y'), key('u')],
  'よ' => [key('y'), key('o')],
  'ゃ' => [key('x'), key('y'), key('a')],
  'ゅ' => [key('x'), key('y'), key('u')],
  'ょ' => [key('x'), key('y'), key('o')],
  'ら' => [key('r'), key('a')],
  'り' => [key('r'), key('i')],
  'る' => [key('r'), key('u')],
  'れ' => [key('r'), key('e')],
  'ろ' => [key('r'), key('o')],
  'わ' => [key('w'), key('a')],
  'を' => [key('w'), key('o')],
  'ん' => [key('n'), key('n')],
  'っ' => [key('l'), key('t'), key('u')],
  'ぁ' => [key('x'), key('a')],
  'ぃ' => [key('x'), key('i')],
  'ぅ' => [key('x'), key('u')],
  'ぇ' => [key('x'), key('e')],
  'ぉ' => [key('x'), key('o')],
  'ゔ' => [key('v'), key('u')],
  '、' => [key('comma')],
  '。' => [key('period')],
  'ー' => [key('hyphen')],
  'delete' => [key('delete_or_backspace')],
  '？' => [key_with_shift('slash')],
  '／' => [key_with_option('slash')],
  '〜' => [key_with_shift('equal_sign')],
  '「' => [key('close_bracket')],
  '」' => [key('backslash')],
  '［' => [key_with_option('close_bracket')],
  '］' => [key_with_option('backslash')],
  '（' => [key_with_shift('8')],
  '）' => [key_with_shift('9')],
  '『' => [key_with_shift('close_bracket')],
  '』' => [key_with_shift('backslash')],
  '．' => [key_with_option('period')],
  ',' => [key('comma')],
}.freeze

########################################

def main
  puts JSON.pretty_generate(
    'title' => 'Japanese NICOLA',
    'rules' => [
      {
        'description' => 'Japanese NICOLA Type F',
        'manipulators' => [
          # シフトありから並べること

          # ------------------------------
          # 左シフト
          left_shift_key('1', '？'),
          left_shift_key('2', '／'),
          left_shift_key('3', '〜'),
          left_shift_key('4', '「'),
          left_shift_key('5', '」'),
          left_shift_key('comma', 'ぺ'),
          left_shift_key('period', 'ぼ'),
          left_shift_key('a', 'を'),
          left_shift_key('b', 'ぃ'),
          left_shift_key('c', 'ろ'),
          left_shift_key('d', 'な'),
          left_shift_key('e', 'り'),
          left_shift_key('f', 'ゅ'),
          left_shift_key('g', 'も'),
          left_shift_key('h', 'ば'),
          left_shift_key('i', 'ぐ'),
          left_shift_key('j', 'ど'),
          left_shift_key('k', 'ぎ'),
          left_shift_key('l', 'ぽ'),
          left_shift_key('m', 'ぞ'),
          left_shift_key('n', 'ぷ'),
          left_shift_key('o', 'づ'),
          left_shift_key('p', 'ぴ'),
          left_shift_key('q', 'ぁ'),
          left_shift_key('r', 'ゃ'),
          left_shift_key('s', 'あ'),
          left_shift_key('t', 'れ'),
          left_shift_key('u', 'ぢ'),
          left_shift_key('v', 'や'),
          left_shift_key('w', 'え'),
          left_shift_key('x', 'ー'),
          left_shift_key('y', 'ぱ'),
          left_shift_key('z', 'ぅ'),

          # ------------------------------
          # 右シフト
          right_shift_key('0', '『'),
          right_shift_key('6', '［'),
          right_shift_key('7', '］'),
          right_shift_key('8', '（'),
          right_shift_key('9', '）'),
          right_shift_key('hyphen', '』'),
          right_shift_key('comma', 'む'),
          right_shift_key('semicolon', 'っ'),
          right_shift_key('period', 'わ'),
          right_shift_key('slash', 'ぉ'),
          right_shift_key('a', 'ゔ'),
          right_shift_key('b', 'べ'),
          right_shift_key('c', 'ず'),
          right_shift_key('d', 'で'),
          right_shift_key('e', 'だ'),
          right_shift_key('f', 'げ'),
          right_shift_key('g', 'ぜ'),
          right_shift_key('h', 'み'),
          right_shift_key('i', 'る'),
          right_shift_key('j', 'お'),
          right_shift_key('k', 'の'),
          right_shift_key('l', 'ょ'),
          right_shift_key('m', 'ゆ'),
          right_shift_key('n', 'ぬ'),
          right_shift_key('o', 'ま'),
          right_shift_key('p', 'ぇ'),
          right_shift_key('r', 'ご'),
          right_shift_key('s', 'じ'),
          right_shift_key('t', 'ざ'),
          right_shift_key('u', 'に'),
          right_shift_key('v', 'ぶ'),
          right_shift_key('w', 'が'),
          right_shift_key('x', 'び'),
          right_shift_key('y', 'よ'),

          # ------------------------------
          # シフトなし
          normal_key('comma', 'ね'),
          normal_key('semicolon', 'ん'),
          normal_key('quote', 'delete'),
          normal_key('period', 'ほ'),
          normal_key('open_bracket', '、'),
          normal_key('a', 'う'),
          normal_key('b', 'へ'),
          normal_key('c', 'す'),
          normal_key('d', 'て'),
          normal_key('e', 'た'),
          normal_key('f', 'け'),
          normal_key('g', 'せ'),
          normal_key('h', 'は'),
          normal_key('i', 'く'),
          normal_key('j', 'と'),
          normal_key('k', 'き'),
          normal_key('l', 'い'),
          normal_key('m', 'そ'),
          normal_key('n', 'め'),
          normal_key('o', 'つ'),
          normal_key('p', ','),
          normal_key('q', '。'),
          normal_key('r', 'こ'),
          normal_key('s', 'し'),
          normal_key('t', 'さ'),
          normal_key('u', 'ち'),
          normal_key('v', 'ふ'),
          normal_key('w', 'か'),
          normal_key('x', 'ひ'),
          normal_key('y', 'ら'),
          normal_key('z', '．'),
        ],
      },
    ]
  )
end

def normal_key(key, char)
  {
    'type' => 'basic',
    'from' => {
      'key_code' => key,
    },
    'to' => ROMAN_MAP[char],
    'conditions' => CONDITIONS,
  }
end

def left_shift_key(key, char)
  {
    'type' => 'basic',
    'from' => {
      'simultaneous' => [
        {
          'key_code' => key,
        },
        {
          'key_code' => LEFT_SHIFT_KEY_CODE,
        },
      ],
    },
    'to' => ROMAN_MAP[char],
    'conditions' => CONDITIONS,
  }
end

def right_shift_key(key, char)
  {
    'type' => 'basic',
    'from' => {
      'simultaneous' => [
        {
          'key_code' => key,
        },
        {
          'key_code' => RIGHT_SHIFT_KEY_CODE,
        },
      ],
    },
    'to' => ROMAN_MAP[char],
    'conditions' => CONDITIONS,
  }
end

main
