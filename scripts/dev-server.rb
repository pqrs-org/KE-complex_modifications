#!/usr/bin/env ruby

require 'webrick'

Dir.chdir(File.dirname(__dir__) + '/docs')

server = WEBrick::HTTPServer.new(
  Port: 8000,
  DocumentRoot: '.'
)

server.mount_proc('/dist.json') do |_, res|
  res['Content-Type'] = 'application/json'

  IO.open('| ruby ' + File.dirname(__dir__) + '/make-distjs.rb') do |f|
    res.body = f
  end
end

server.start
