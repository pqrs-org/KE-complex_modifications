#!/usr/bin/ruby

require 'json'

data = JSON.parse($stdin.read)
if data['title'].nil? then
  $stderr << "`title` is not found in json.\n"
  exit 1
end
if data['rules'].nil? then
  $stderr << "`rules` is not found in json.\n"
  exit 1
end
if data['rules'].empty? then
  $stderr << "`rules` is empty.\n"
  exit 1
end
data['rules'].each do |rule|
  if rule['description'].nil? then
    $stderr << "`description` is not found in rule.\n"
    p rule
    exit 1
  end
  if rule['manipulators'].nil? then
    $stderr << "`manipulators` is not found in rule.\n"
    p rule
    exit 1
  end
  if rule['manipulators'].empty? then
    $stderr << "`manipulators` is empty.\n"
    p rule
    exit 1
  end
  rule['manipulators'].each do |manipulator|
    if manipulator['type'].nil? then
      $stderr << "`type` is not found in manipulator.\n"
      p manipulator
      exit 1
    end
  end
end
