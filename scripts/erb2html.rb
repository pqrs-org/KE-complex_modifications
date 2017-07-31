#!/usr/bin/ruby

require 'erb'
require 'json'

include ERB::Util

def import_button(json_file_path)
  json_path = json_file_path.gsub(/^docs\//, '')

  "<a class=\"btn btn-primary btn-sm pull-right\" data-json-path=\"#{json_path}\">Import</a>"
end

def file_import_panel(json_file_path)
  title = ''
  rule_descriptions = ''

  File.open(json_file_path) do |f|
    data = JSON.parse(f.read)
    title = h(data['title'])
    data['rules'].each do |rule|
      rule_descriptions += '<div class="list-group-item">' + h(rule['description']) + '</div>'
    end
  end

  extra_description_file_path = 'src/extra_descriptions/' + json_file_path.gsub(/^docs\/json\//, '') + '.html'
  if FileTest.exist?(extra_description_file_path)
    File.open(extra_description_file_path) do |f|
      rule_descriptions += '<div class="list-group-item">' + f.read + '</div>'
    end
  end

  <<-EOS
    <div class="panel panel-default">
      <div class="panel-heading">
        <a class="panel-title btn btn-link" role="button" data-toggle="collapse" href="##{json_file_path.gsub(/^docs\/json\//, '').gsub(/.json/, '')}" aria-expanded="false" aria-controls="#{json_file_path.gsub(/^docs\/json\//, '').gsub(/.json/, '')}">#{title}</a>
        #{import_button(json_file_path)}
      </div>
      <div class="list-group collapse" id="#{json_file_path.gsub(/^docs\/json\//, '').gsub(/.json/, '')}">
          #{rule_descriptions}
      </div>
    </div>
  EOS
end

template = ERB.new $stdin.read
puts template.result
