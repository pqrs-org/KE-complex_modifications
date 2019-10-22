#!/bin/bash

topdir="$(dirname $0)/.."
karabiner_cli='/Library/Application Support/org.pqrs/Karabiner-Elements/bin/karabiner_cli'
use_partial_lint=false

# Use built-in binary only when CI
if [ "$GITHUB_ACTION" != "" ]; then
  karabiner_cli="$topdir/.github/workflows/bin/karabiner_cli"
fi

version_number=$("$karabiner_cli" --version-number)
if [ $? -eq 0 ]; then
  if [ $version_number -lt 120201 ]; then
    use_partial_lint=true
  fi
else
  use_partial_lint=true
fi

lint="'$karabiner_cli' --lint-complex-modifications "

if $use_partial_lint; then
  echo
  echo "----------------------------------------"
  echo "WARNING:"
  echo "The complete linting requires Karabiner-Elements 12.2.1 or later."
  echo "Using partial lint instead."
  echo "----------------------------------------"
  echo

  lint="$topdir/scripts/partial-lint.rb"
fi

for srcfile in $@; do
  echo "check $srcfile"
  sh -c "$lint $srcfile" || exit 1
done
