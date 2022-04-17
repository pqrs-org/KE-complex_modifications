#!/bin/bash

set -e # forbid command failure

for srcfile in src/json/*.json.*; do
  extension="${srcfile##*.}"

  dstfile="public/json/$(basename $srcfile .$extension)"
  if [[ "$srcfile" -nt "$dstfile" ]]; then
    failed=0

    if [[ $extension = 'erb' ]]; then
      if scripts/erb2json.rb <"$srcfile" >"$dstfile"; then
        if scripts/apply-lint.sh "$dstfile"; then
          echo "$dstfile"
          failed=1
        fi
      fi
    fi

    if [[ $extension = 'rb' ]]; then
      if ruby "$srcfile" >"$dstfile"; then
        if scripts/apply-lint.sh "$dstfile"; then
          echo "$dstfile"
          failed=1
        fi
      fi
    fi

    if [[ $extension = 'js' ]]; then
      if which -s node; then
        if node "$srcfile" >"$dstfile"; then
          if scripts/apply-lint.sh "$dstfile"; then
            echo "$dstfile"
            failed=1
          fi
        fi
      else
        echo "Skip $srcfile due to node command is not found"
        failed=1
      fi
    fi

    if [[ $failed -eq 0 ]]; then
      rm -f "$dstfile"
      exit 1
    fi
  fi
done
