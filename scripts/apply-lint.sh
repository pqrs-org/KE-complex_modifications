#!/bin/bash

topdir="$(dirname $0)/.."
karabiner_cli="${topdir}/bin/karabiner_cli"
lint="'$karabiner_cli' --lint-complex-modifications "

output=$(${topdir}/bin/karabiner_cli --lint-complex-modifications "$@")
if [ $? -ne 0 ]; then
  echo "$output"
  exit 1
else
  echo "Checked $(echo "$output" | wc -l | sed 's| ||g') files"
fi
