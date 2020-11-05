[![Build Status](https://github.com/pqrs-org/KE-complex_modifications/workflows/KE-complex_modifications%20CI/badge.svg)](https://github.com/pqrs-org/KE-complex_modifications/actions)
[![License](https://img.shields.io/badge/license-Public%20Domain-blue.svg)](https://github.com/pqrs-org/KE-complex_modifications/blob/master/LICENSE.md)

# KE-complex_modifications

complex_modifications for Karabiner-Elements.

<https://ke-complex-modifications.pqrs.org/>

## Add rules

1.  Put a `.rb` (or `.erb`) template file into [src/json](https://github.com/pqrs-org/KE-complex_modifications/tree/master/src/json). (Or put a `.json` file into [public/json](https://github.com/pqrs-org/KE-complex_modifications/tree/master/public/json) directly.)
2.  (Optional) Put extra description file into [public/extra_descriptions](https://github.com/pqrs-org/KE-complex_modifications/tree/master/public/extra_descriptions).
3.  Add the following json into [public/groups.json](https://github.com/pqrs-org/KE-complex_modifications/tree/master/public/groups.json) &gt; `files`.

    ```json5
    {
      "path": "json/your_awesome_configuration.json", // required
      "extra_description_path": "extra_descriptions/your_awesome_configuration.html" // optional
    },
    ```

4.  Run `make` command on Terminal. <br/> If you've put `.rb` (or `.erb`) source file into `src/json`, formatted json file will be auto generated in the `public/json/your_awesome_configuration.json`.

    ```shell
    make
    ```

## complex_modifications documents

-   [karabiner.json Reference Manual](https://karabiner-elements.pqrs.org/docs/json/)
    -   [Typical complex_modifications examples](https://karabiner-elements.pqrs.org/docs/json/typical-complex-modifications-examples/)
    -   [complex_modifications manipulator definition](https://karabiner-elements.pqrs.org/docs/json/complex-modifications-manipulator-definition/)

## Testing complex_modifications webpage on local server

`public/index.html` does not work properly if you open it via `file://...`.<br />
Launch a local web server by `make server` in terminal and open <http://localhost:8000>.<br />
(You can quit the local web server by the `control-c` shortcut in terminal.) <br/>
Before run `make server`, make sure you've run `make` command to auto generate `public/build/dist.json` file.

Karabiner-Elements cannot import the json from the local web server due to the no https connection between local web server.<br />
Please import the json via file copy. (See [Test your own rules](#Test-your-own-rules).)

## Testing your own rules

1.  Copy a json file to `~/.config/karabiner/assets/complex_modifications`.

    ```shell
    cp public/json/your_awesome_configuration.json ~/.config/karabiner/assets/complex_modifications
    ```

2.  Import rules from Karabiner-Elements Preferences.
    `Karabiner-Elements Preferences > Complex Modifications > Rules > Add rule`

## How to publish your own rules

If you want to publish your own rules into complex_modification repository, follow this step.

1.  Fork this repository to your github account.
2.  Update or add new rules by following [Add rules](#add-rules) section. Don't forget to run `make`
3.  Stage modified files (`git add`) and commit it (`git commit`)<br/>
    <br/>
    _NOTE :_ The `make` command will auto generate `public/build/dist.json` file. But do not stage `public/build/dist.json` file. <br/>
    (`public/build/dist.json` file is already ignored by .gitignore)<br/>
    <br/>
4.  Push to your forked repository.
5.  Click "New Pull Request" button, then the maintainer will review your commit.

---

# Karabiner-Elements Usage

## Import file from another site

1.  Put a json file to your site.
2.  Make a link `karabiner://karabiner/assets/complex_modifications/import?url=<JSON_URL>`.
3.  Open the link from web browser.

---

# Updating the web application

Note: You don't need to update the web application if you just want to add new json.

If you want to modify the web application, the source code is in `src/vuejs`.
Follow the instruction in `src/vuejs/README.md`.
