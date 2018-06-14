#!/usr/bin/env ruby

# You can generate json by executing the following command on Terminal.
#
# $ ruby ./example_japanese_nicola.json.rb
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

  'し' => [key('s'), key('i')],
  'せ' => [key('s'), key('e')],

  'ぜ' => [key('z'), key('e')],

  'て' => [key('t'), key('e')],

  'な' => [key('n'), key('a')],

  'も' => [key('m'), key('o')],

  'ゅ' => [key('x'), key('y'), key('u')],

  'を' => [key('w'), key('o')],

  '1' => [key('1')],
  '?' => [key_with_shift('slash')],
}.freeze

########################################

def main
  puts JSON.pretty_generate(
    'title' => 'Japanese NICOLA (partial) (rev 2)',
    'rules' => [
      {
        'description' => 'Japanese NICOLA (partial) (rev 2)',
        'manipulators' => [
          # シフトありから並べること

          # ------------------------------
          # 左シフト

          left_shift_key('a', 'を'),
          left_shift_key('s', 'あ'),
          left_shift_key('d', 'な'),
          left_shift_key('f', 'ゅ'),
          left_shift_key('f', 'も'),

          left_shift_key('1', '?'),

          # ------------------------------
          # 右シフト

          right_shift_key('f', 'ぜ'),

          # ------------------------------
          # シフトなし

          normal_key('a', 'う'),
          normal_key('s', 'し'),
          normal_key('d', 'て'),
          normal_key('f', 'け'),
          normal_key('g', 'せ'),

          normal_key('1', '1'),
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
