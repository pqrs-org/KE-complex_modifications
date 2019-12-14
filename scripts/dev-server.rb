#!/usr/bin/env ruby
# frozen_string_literal: true

require 'webrick'

Dir.chdir(File.dirname(__dir__) + '/public')

server = WEBrick::HTTPServer.new(
  BindAddress: 'localhost',
  Port: 8000,
  DocumentRoot: '.'
)

server.mount_proc('/build/dist.json') do |_, res|
  res['Content-Type'] = 'application/json'

  system('bash ' + __dir__ + '/update-public-build.sh')
  open('build/dist.json') do |f|
    res.body = f.read
  end
end

server.start
