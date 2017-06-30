#!/bin/sh

for srcfile in docs/json/*.json; do
  echo "check $srcfile"
  /usr/bin/ruby scripts/lint.rb < "$srcfile" || exit 1
done
