#!/bin/sh

cd `dirname "$0"`/../docs
ruby ../scripts/make-distjs.rb > dist.json.tmp || exit 1
diff -q dist.json.tmp dist.json || mv dist.json.tmp dist.json

