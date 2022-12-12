# src/json

This directory contains the JSON generator.

These JSON generators will be called by [update-json.sh](../../scripts/update-json.sh).
The output files are saved to public/json.

## Supported file extensions

-   .js (nodejs is required)
-   .rb
-   .erb

## Supported filename format

To generate JSON files successfully, the filename must match `*.json.<file-extension>`. 

- *\** : your self-defined name
- *.json* : must add `.json` before filename extension
- *.file-extension* : `.js` or `.rb` or `.erb`
