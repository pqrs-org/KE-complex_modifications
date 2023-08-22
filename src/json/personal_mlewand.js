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
* app management
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
		to: [
			{
				"key_code": info.to
			}
		]
	};
}

const sections = [
	{
		name: 'Capslock override'
	},
	{
		name: 'Typing base',
		manipulators: [
			getBasicCapsManipulator( { from: 'j', to: 'left_arrow' } ),
			getBasicCapsManipulator( { from: 'k', to: 'down_arrow' } ),
			getBasicCapsManipulator( { from: 'l', to: 'right_arrow' } ),
			getBasicCapsManipulator( { from: 'i', to: 'up_arrow' } )
		]
	},
	{
		name: 'Media keys'
	}
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

console.log( JSON.stringify( json, null, '  ' ) )
