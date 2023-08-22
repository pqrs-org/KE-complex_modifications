// JavaScript should be written in ECMAScript 5.1.

// Hemingway bridge:
// I need to start off by figuring out easiest (least verbose) way to express/list my capslock keys.
// I should be able to do this easier than it is done in this file, especially that it mostly works on shell commands.

/*

I could divide it to blocks:
* capslock override
  * it could include caps + c for caps lock toggle
* typing base
* typing extra (parenthesis, dots)
* dock app keys
* media keys
* os management (if I manage to get there)
  * focus handling
  * lock screen
*/

/*

Single manipulator (caps-based):
{
	type = 'basic',
	conditions = [ { "name": "caps_lock pressed", "type": "variable_if", "value": 1 } ]
	from (string): j   // or obj { key: 'j', modifiers: unefined = any || [ string ] = required }
	to (string): j   // or obj { key: 'j', modifiers: unefined = any || [ string ] = required }

}
*/

const exampleBasicManipulator = {
	type: 'basic',
	conditions: [ { "name": "caps_lock pressed", "type": "variable_if", "value": 1 } ],
	from: 'j',
	to: 'left_arrow'
};

function getBasicCapsManipulator( info ) {
	return {
		type: info.type || 'basic',
		conditions: info.conditions || [ { "name": "caps_lock pressed", "type": "variable_if", "value": 1 } ],
		from: {
			"key_code": info.from,
			"modifiers": {
				"optional": [
					"any"
				]
			}
		},
		to: getToKeys()
	};

	function getToKeys() {
		const configKey = info.to;
		if ( typeof configKey == 'string' ) {
			return [
				{
					"key_code": configKey
				}
			];
		} else if ( typeof configKey == 'object' && configKey.key ) {
			return [
				{
					"key_code": configKey.key,
					modifiers: configKey.modifiers || []
				}
			];
		} else {
			throw 'To key should be a string or a specific interfaced object, ' + JSON.stringify( info.to ) + ' given instead.';
		}
	}
}

function getDockApplicationManipulator( number, applicationName ) {
	const normalizedValue = parseInt( number, 10 );
	const applicationNameSanitized = applicationName.replace( /\"/g, '' );

	if ( normalizedValue < 1 || normalizedValue > 9 ) {
		throw 'Number passed to the getDockApplicationManipulator() function should be a number greater than 0 and less than 10';
	}

	return {
		type: 'basic',
		conditions: [ { "name": "caps_lock pressed", "type": "variable_if", "value": 1 } ],
		from: {
			"key_code": String( normalizedValue ),
			"modifiers": {
				"optional": [
					"any"
				]
			}
		},
		to: [
			{
				"shell_command": 'open -a "' + applicationNameSanitized + '"'
			}
		]
	};
}

const sections = [
	{
		name: 'Capslock override',
		manipulators: [
			{
				"from": {
					"key_code": "caps_lock",
					"modifiers": {
						"optional": [
							"any"
						]
					}
				},
				"to": [
					{
						"set_variable": {
							"name": "caps_lock pressed",
							"value": 1
						}
					}
				],
				"to_after_key_up": [
					{
						"set_variable": {
							"name": "caps_lock pressed",
							"value": 0
						}
					}
				],
				"type": "basic"
			},
			getBasicCapsManipulator( { from: 'backslash', to: 'caps_lock' } )
		]
	},
	{
		name: 'Typing base (arrows, enter, backspace)',
		manipulators: [
			getBasicCapsManipulator( { from: 'j', to: 'left_arrow' } ),
			getBasicCapsManipulator( { from: 'k', to: 'down_arrow' } ),
			getBasicCapsManipulator( { from: 'l', to: 'right_arrow' } ),
			getBasicCapsManipulator( { from: 'i', to: 'up_arrow' } ),
			getBasicCapsManipulator( { from: 'h', to: 'return_or_enter' } ),
			getBasicCapsManipulator( { from: 'spacebar', to: 'delete_or_backspace' } )
		]
	},
	{
		name: 'Dock app keys (hardcoded for my dock order, sorry!)',
		manipulators: [
			getDockApplicationManipulator( 1, 'Firefox' ),
			getDockApplicationManipulator( 2, 'Google Chrome' ),
			getDockApplicationManipulator( 3, 'Slack' ),
			getDockApplicationManipulator( 4, 'Visual Studio Code' ),
			getDockApplicationManipulator( 5, 'Spotify' ),
			getDockApplicationManipulator( 7, 'iTerm' ),
			getDockApplicationManipulator( 8, 'Notion' )
		]
	},
	{
		name: 'Media keys',
		manipulators: [
			getBasicCapsManipulator( { from: 'f1', to: 'mute' } ),
			getBasicCapsManipulator( { from: 'f2', to: 'rewind' } ),
			getBasicCapsManipulator( { from: 'f3', to: 'fastforward' } )
		]
	},
	{
		name: 'os management (⌘+t -> focus dock, ⌘+b -> focus icon tray, ⌘+q -> focus app menu)',
		manipulators: [
			// ctrl + f3
			getBasicCapsManipulator( { from: 't', to: { key: 'f3', modifiers: [ 'left_control' ] } } ),
			getBasicCapsManipulator( { from: 'b', to: { key: 'f8', modifiers: [ 'left_control' ] } } ),
			// For some reason ctrl+f2 doesn't work on my mac, all others are wokring, so I remapped it to f5 as a workaround :/
			// getBasicCapsManipulator( { from: 'q', to: { key: 'f2', modifiers: [ 'left_control' ] } } ),
			getBasicCapsManipulator( { from: 'q', to: { key: 'f5', modifiers: [ 'left_control' ] } } ),
			getBasicCapsManipulator( { from: 'f12', to: { key: 'f14', modifiers: [ 'left_command' ] } } )
		]
	}
	// * capslock override
	//   * it could include caps + c for caps lock toggle
	// * typing base
	// * typing extra (parenthesis, dots)
	// * dock app keys
	// * media keys
	// * os management (if I manage to get there)
	//   * focus handling
	//   * lock screen
];

const json = {
	title:
		'personal rules for @mlewand - override caps lock to work as a modifier key to replicate keys like arrows, home/end/page up/page down, some media keys etc.',
	maintainers: [ 'mlewand' ],
	rules: sections.map( function( sectionItem ) {
		return {
			description: sectionItem.name,
			manipulators: sectionItem.manipulators || []
		}
	} )
}

console.log( JSON.stringify( json, null, '  ' ) );
