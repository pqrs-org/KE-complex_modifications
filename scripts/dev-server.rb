#!/usr/bin/env ruby

require 'webrick'

Dir.chdir(File.dirname(__dir__) + '/public')

server = WEBrick::HTTPServer.new(
  BindAddress: 'localhost',
  Port: 8000,
  DocumentRoot: '.'
)

server.mount_proc('/build/dist.json') do |_, res|
  res['Content-Type'] = 'application/json'

  IO.popen('ruby ' + __dir__ + '/make-distjson.rb') do |p|
    res.body = p.read
  end
end

server.start
