#!/bin/bash

set -e # forbid command failure

cd $(dirname "$0")/../public

#
# Update dist.json
#

mkdir -p build
ruby ../scripts/make-distjson.rb >build/dist.json

#
# Update extra_descriptions
#

rsync -a extra_descriptions build

for f in $(find extra_descriptions -name '*.html'); do
  mkdir -p $(dirname "build/$f")
  echo '<script src="../../vendor/js/iframeResizer.contentWindow.min.js"></script>' >"build/$f"
  cat "$f" >>"build/$f"
done
