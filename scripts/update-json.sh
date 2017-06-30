#!/bin/sh

for srcfile in src/json/*.erb; do
  dstfile="docs/json/`basename $srcfile .erb`"
  if [ "$srcfile" -nt "$dstfile" ]; then
    echo "$dstfile"
    /usr/bin/ruby scripts/erb2json.rb < "$srcfile" > "$dstfile" || exit 1
  fi
done
