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

----------

# Karabiner-Elements Usage

## Import file from another site

1. Put a json file to your site.
2. Make a link `karabiner://karabiner/assets/complex_modifications/import?url=<JSON_URL>`.
3. Open the link from web browser.

### A link example

```
karabiner://karabiner/assets/complex_modifications/import?url=https%3A%2F%2Fpqrs.org%2Fosx%2Fkarabiner%2Fcomplex_modifications%2Fjson%2Fcaps_lock.json
```
