#!/usr/bin/env ruby

# You can generate json by executing the following command on Terminal.
#
# $ ruby ./personal_minacle.json.rb
#

require 'json'
require_relative '../lib/karabiner.rb'

ALNUM_KEY_CODE_RANGE = 0x04..0x27
SYMBOL_KEY_CODE_RANGE = 0x2d..0x38
NON_US_BACKSLASH_KEY_CODE_RANGE = 0x64..0x64

CHARACTER_KEY_CODE_LIST = (ALNUM_KEY_CODE_RANGE.to_a + SYMBOL_KEY_CODE_RANGE.to_a + NON_US_BACKSLASH_KEY_CODE_RANGE.to_a).freeze

def command_key(key_code)
    {
        'key_code' => key_code,
        'modifiers' => [
            'command',
        ],
    }
end

def control_key(key_code)
    {
        'key_code' => key_code,
        'modifiers' => [
            'control',
        ],
    }
end

def control_shift_key(key_code)
    {
        'key_code' => key_code,
        'modifiers' => [
            'control',
            'shift',
        ],
    }
end

def is_input_source_lang(lang)
    {
        'input_sources' => [
            {
                'language' => "^#{lang}$",
            },
        ],
        'type': 'input_source_if',
    }
end

def is_input_source_lang_not(lang)
    {
        'input_sources' => [
            {
                'language' => "^#{lang}$",
            },
        ],
        'type': 'input_source_unless',
    }
end

def is_keyboard_not_builtin
    {
        'identifiers' => [
            {
                'is_built_in_keyboard' => false,
                'is_keyboard' => true,
            },
        ],
        'type' => 'device_if',
    }
end

def key_transient(key_code)
    {
        'key_code' => key_code,
        'repeat' => false,
    }
end

def key_with_loose_modifiers(key_code, modifiers)
    {
        'key_code' => key_code,
        'modifiers' => {
            'mandatory': modifiers,
            'optional': ['any'],
        },
    }
end

def key_with_optional_modifiers(key_code, modifiers)
    {
        'key_code' => key_code,
        'modifiers' => {
            'optional': modifiers,
        },
    }
end

def key_with_strict_modifiers(key_code, modifiers)
    {
        'key_code' => key_code,
        'modifiers' => {
            'mandatory': modifiers,
        },
    }
end

def ko_option_any_to_en_option_any_or_ko_option_shift_any_to_en_option_shift_any_rule
    rule = {
        'description' => '([가]⌥any → [A]⌥any), ([가]⌥⇧any → [A]⌥⇧any)',
    }
    manipulators = []
    for key_code in CHARACTER_KEY_CODE_LIST
        manipulators.push(
            {
                'conditions' => [
                    is_input_source_lang('ko'),
                ],
                'from' => {
                    'key_code' => key_code,
                    'modifiers' => {
                        'mandatory' => [
                            'option',
                        ],
                        'optional' => [
                            'shift',
                        ],
                    },
                },
                'to' => [
                    key('japanese_eisuu'),
                    option_key(key_code),
                ],
                'to_after_key_up' => [
                    key_clear,
                    control_shift_key('spacebar'),
                    key_clear,
                    key('vk_none'),
                ],
                'type' => 'basic',
            }
        )
    end
    rule['manipulators'] = manipulators
    return rule
end

def main
    puts JSON.pretty_generate(
        'conditions' => [
            is_keyboard_not_builtin,
        ],
        'maintainers' => [
            'minacle'
        ],
        'rules' => [
            {
                'description' => '⌘F3 → Mission Control',
                'manipulators' => [
                    {
                        'from' => key_with_strict_modifiers('f3', ['command']),
                        'to' => command_key('mission_control'),
                        'type' => 'basic',
                    },
                ],
            },
            {
                'description' => '(fnF13 → F16), (fnF14 → F17), (fnF15 → F18)',
                'manipulators' => [
                    {
                        'from' => key_with_loose_modifiers('f13', ['fn']),
                        'to' => key('f16'),
                        'type' => 'basic',
                    },
                    {
                        'from' => key_with_loose_modifiers('f14', ['fn']),
                        'to' => key('f17'),
                        'type' => 'basic',
                    },
                    {
                        'from' => key_with_loose_modifiers('f15', ['fn']),
                        'to' => key('f18'),
                        'type' => 'basic',
                    },
                ],
            },
            {
                'description' => '(⌃⌃ → [Aあ][A가])',
                'manipulators' => [
                    {
                        'conditions' => [
                            is_input_source_lang('en'),
                        ],
                        'from' => key('left_control'),
                        'to' => key('left_control'),
                        'to_if_alone' => [
                            control_shift_key('spacebar'),
                            key_clear,
                        ],
                        'type' => 'basic',
                    },
                    {
                        'conditions' => [
                            is_input_source_lang('en'),
                        ],
                        'from' => key('right_control'),
                        'to' => key('right_control'),
                        'to_if_alone' => [
                            control_shift_key('spacebar'),
                            key_clear,
                        ],
                        'type' => 'basic',
                    },
                    {
                        'conditions' => [
                            is_input_source_lang_not('en'),
                        ],
                        'from' => key('left_control'),
                        'to' => key('left_control'),
                        'to_if_alone' => to_en,
                        'type' => 'basic',
                    },
                    {
                        'conditions' => [
                            is_input_source_lang_not('en'),
                        ],
                        'from' => key('right_control'),
                        'to' => key('right_control'),
                        'to_if_alone' => to_en,
                        'type' => 'basic',
                    },
                ],
            },
            {
                'description' => '(⌃␣ → あ가)',
                'manipulators' => [
                    {
                        'conditions' => [
                            is_input_source_lang('ja'),
                        ],
                        'from' => key_with_strict_modifiers('spacebar', ['control']),
                        'to' => to_ko,
                        'type' => 'basic',
                    },
                    {
                        'conditions' => [
                            is_input_source_lang('ko'),
                        ],
                        'from' => key_with_strict_modifiers('spacebar', ['control']),
                        'to' => to_ja,
                        'type' => 'basic',
                    },
                ],
            },
            ko_option_any_to_en_option_any_or_ko_option_shift_any_to_en_option_shift_any_rule,
        ],
        'title' => 'Minacle Key Customisation',
    )
end

def option_key(key_code)
    {
        'key_code' => key_code,
        'modifiers' => [
            'option',
        ],
    }
end

def option_shift_key(key_code)
    {
        'key_code' => key_code,
        'modifiers' => [
            'option',
            'shift',
        ],
    }
end

def key(key_code)
    {
        'key_code' => key_code,
    }
end

def key_clear
    {
        'key_code' => 'vk_none',
        'modifiers' => [],
    }
end

def single_key(key_code)
    {
        'key_code' => key_code,
        'modifiers' => [],
    }
end

def to_en
    [
        key('japanese_eisuu'),
        key_clear
    ]
end

def to_ja
    [
        key('japanese_kana'),
        key_clear
    ]
end

def to_ko
    [
        key('lang2'),
        {
            'select_input_source' => {
                'language' => 'ko',
            },
        },
        key_clear
    ]
end

main
