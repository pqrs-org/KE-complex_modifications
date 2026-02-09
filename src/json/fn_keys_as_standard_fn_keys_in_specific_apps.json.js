// JavaScript must be written in ECMAScript 5.1.

function main() {

	const apps = [
		// Dosbox Staging
		"io.github.dosbox-staging",

		// Phoenix Slides
		"net.blyt.phoenixslides",

		// far2l
		"com.far2l"
	];

	fn_keys = [];
	for (var i = 1; i <= 12; i++) {
		fn_keys.push('f' + i.toString());
	}

	const manipulators = [];

	for (var i = 0; i < fn_keys.length; ++i) {
		const fn_key = fn_keys[i];

		manipulators.push({
			"conditions": [
				{
				"bundle_identifiers": apps,
				"type": "frontmost_application_if"
				}
			],
			"from": {
				"key_code": fn_key,
				"modifiers": {
				"mandatory": ["fn"],
				"optional": ["any"]
				}
			},
			"to": [{ "key_code": fn_key }],
			"type": "basic"
		});

		manipulators.push({
			"conditions": [
				{
				"bundle_identifiers": apps,
				"type": "frontmost_application_if"
				}
			],
			"from": {
				"key_code": fn_key,
				"modifiers": {
				"optional": ["caps_lock", "command", "control", "option", "shift"]
				}
			},
			"to": [
				{
				"key_code": fn_key,
				"modifiers": ["fn"]
				}
			],
			"type": "basic"
		});

	}

	const title = 'Use F1, F2, etc. keys as standard function keys in specific apps';

	console.log(
		JSON.stringify(
			{
				title: title,
				maintainers: ["bertrandom"],
				rules: [{
					description: title,
					manipulators: manipulators,
				}]
			},
			null,
			2
		)
	);

}

main()
