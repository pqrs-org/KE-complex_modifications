#!/usr/bin/env ruby
# frozen_string_literal: true

Encoding.default_external = Encoding::UTF_8
Encoding.default_internal = Encoding::UTF_8

require 'json'

open(ARGV[0]) do |f|
  data = JSON.parse(f.read)
  if data['title'].nil?
    $stderr << "`title` is not found in json.\n"
    exit 1
  end
  if data['rules'].nil?
    $stderr << "`rules` is not found in json.\n"
    exit 1
  end
  if data['rules'].empty?
    $stderr << "`rules` is empty.\n"
    exit 1
  end
  data['rules'].each do |rule|
    if rule['description'].nil?
      $stderr << "`description` is not found in rule.\n"
      p rule
      exit 1
    end
    if rule['manipulators'].nil?
      $stderr << "`manipulators` is not found in rule.\n"
      p rule
      exit 1
    end
    if rule['manipulators'].empty?
      $stderr << "`manipulators` is empty.\n"
      p rule
      exit 1
    end
    rule['manipulators'].each do |manipulator|
      next unless manipulator['type'].nil?

      $stderr << "`type` is not found in manipulator.\n"
      p manipulator
      exit 1
    end
  end
end
