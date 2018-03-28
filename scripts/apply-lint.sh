#!/bin/sh

ruby -rjson -e "open('docs/groups.json') {|f| JSON.parse(f.read) }" || exit 1

for srcfile in docs/json/*.json; do
  echo "check $srcfile"
  scripts/lint.rb < "$srcfile" || exit 1
done
