[![Build Status](https://travis-ci.org/pqrs-org/KE-complex_modifications.svg?branch=master)](https://travis-ci.org/pqrs-org/KE-complex_modifications)

# KE-complex_modifications

complex_modifications for Karabiner-Elements.

https://pqrs.org/osx/karabiner/complex_modifications/

## Update docs

Run make in terminal.

```
make
```

## Add rules

1. Put a file to [src/json](https://github.com/pqrs-org/KE-complex_modifications/tree/master/src/json). (or [docs/json](https://github.com/pqrs-org/KE-complex_modifications/tree/master/docs/json) directly)
2. Add `file_import_panel` to [src/index.html.erb](https://github.com/pqrs-org/KE-complex_modifications/tree/master/src/index.html.erb).
3. Run `make` in terminal.

Key name definitions are [here](https://github.com/tekezo/Karabiner-Elements/blob/master/src/apps/PreferencesWindow/PreferencesWindow/Resources/simple_modifications.json). 

In the `"from"` section of the JSON files, you can use `command`, `option`, `shift`, `control` etc. instead of `left_command`, `left_option`, `left_shift` and `left_control` to refer to both the left and right modifier keys.

## Local testing

1. Copy a json file to `~/.config/karabiner/assets/complex_modifications`.
2. Import rules from Karabiner-Elements Preferences.

### Example

```
$ cp docs/json/caps_lock.json ~/.config/karabiner/assets/complex_modifications
```

Then open `Karabiner-Elements Preferences > Complex Modifications > Rules > Add rule`

----------

# Karabiner-Elements Usage

## Import file from another site

1. Put a json file to your site.
2. Make a link `karabiner://karabiner/assets/complex_modifications/import?url=<JSON_URL>`.
3. Open the link from web browser.
