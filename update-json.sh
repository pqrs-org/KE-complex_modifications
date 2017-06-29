#!/bin/sh

for srcfile in src/json/*.erb; do
  dstfile="docs/json/`basename $srcfile .erb`"
  if [ "$srcfile" -nt "$dstfile" ]; then
    /usr/bin/ruby erb2json.rb < "$srcfile" > "$dstfile"
    echo "$dstfile"
  fi
done
