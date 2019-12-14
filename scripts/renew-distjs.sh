#!/bin/sh

cd $(dirname "$0")/../public
ruby ../scripts/make-distjs.rb >build/dist.json
