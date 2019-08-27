#!/usr/bin/env ruby

require 'webrick'

Dir.chdir(File.dirname(__dir__) + '/docs')

server = WEBrick::HTTPServer.new(
  Port: 8000,
  DocumentRoot: '.'
)

server.mount_proc('/dist.json') do |_, res|
  res['Content-Type'] = 'application/json'

  IO.popen('ruby ' + __dir__ + '/make-distjs.rb') do |p|
    res.body = p.read
  end
end

server.start
