#!/bin/bash

for d in data/errors/*; do
  echo $d
  if python3 ../../scripts/lint-public-json.py $d; then
    exit 1
  else
    echo "ok"
    echo
  fi
done

exit 0
