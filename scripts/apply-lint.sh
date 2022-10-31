#!/bin/bash

topdir="$(dirname $0)/.."
karabiner_cli="${topdir}/bin/karabiner_cli"
use_partial_lint=false

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

echo -n "Checking json files"
for srcfile in $@; do
  echo -n '.'
  output=$(sh -c "$lint $srcfile")
  if [ $? -ne 0 ]; then
    echo
    echo
    echo $(basename $srcfile)
    echo
    echo $output
    echo
    exit 1
  fi
done
echo
