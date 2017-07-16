#!/usr/bin/ruby

require 'erb'
require 'json'

include ERB::Util

def import_button(json_file_path)
  json_url = 'https://pqrs.org/osx/karabiner/complex_modifications/' + json_file_path.gsub(/^docs\//, '')

  "<a class=\"btn btn-primary btn-sm\" style=\"margin-left: 40px\" href=\"karabiner://karabiner/assets/complex_modifications/import?url=#{u(json_url)}\">Import</a>"
end

def file_import_panel(json_file_path)
  title = ''
  rule_descriptions = ''

  File.open(json_file_path) do |f|
    data = JSON.parse(f.read)
    title = h(data['title'])
    data['rules'].each do |rule|
      rule_descriptions += '<li>' + h(rule['description']) + '</li>'
    end
  end

  extra_description_file_path = 'src/extra_descriptions/' + json_file_path.gsub(/^docs\/json\//, '') + '.html'
  if FileTest.exist?(extra_description_file_path)
    File.open(extra_description_file_path) do |f|
      rule_descriptions += f.read
    end
  end

  <<-EOS
    <div class="panel panel-default">
      <div class="panel-heading">
        <h3 class="panel-title">#{title}</h3>
      </div>
      <div class="panel-body">
        <ul>
          #{rule_descriptions}
        </ul>
        #{import_button(json_file_path)}
      </div>
    </div>
  EOS
end

template = ERB.new $stdin.read
puts template.result
