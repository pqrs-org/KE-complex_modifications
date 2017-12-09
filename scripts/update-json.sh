#!/bin/sh

for srcfile in src/json/*.erb; do
  dstfile="docs/json/`basename $srcfile .erb`"
  if [ "$srcfile" -nt "$dstfile" ]; then
    failed=0
    if scripts/erb2json.rb < "$srcfile" > "$dstfile"; then
      if scripts/lint.rb < "$dstfile"; then
        echo "$dstfile"
        failed=1
      fi
    fi

    if [ $failed -eq 0 ]; then
      rm -f "$dstfile"
      exit 1
    fi
  fi
done
