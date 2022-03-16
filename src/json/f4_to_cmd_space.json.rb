#!/usr/bin/env ruby

# You can generate json by executing the following command on Terminal.
#
# $ ruby ./f4_to_cmd_space.json.rb
#

# Maps F4 (defaults to Spotlight search on MacOS) to Command+Space.
# This is useful if you want F4 to use a Spotlight replacement like
# Raycast.

require 'json'
require_relative '../lib/karabiner.rb'

def main
    puts JSON.pretty_generate(
        'title' => '[macOS] Map F4 to Command+Space',
        'rules' => [
            {
                'description' => 'Map F4 to Command+Space',
                'manipulators' => [
                    {
                        'type' => 'basic',
                        'from' => {
                            'key_code' => 'f4',
                            'modifiers' => Karabiner.from_modifiers,
                        },
                        'to' => [
                            {
                                'key_code' => 'spacebar',
                                'modifiers' => ['command'],
                            }
                        ]
                    }
                ]
            }
        ]
    )
end

main