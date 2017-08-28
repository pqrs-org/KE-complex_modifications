#!/usr/bin/env ruby

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

def add_group(title,id,json_files)

  $toc << "<li class=\"list-group-item\"><span class=\"badge\">#{json_files.length}</span><a href=\"##{id}\">#{title}</a></li>"

  group_content = ""
  json_files.each do |json|
    group_content += file_import_panel(json)
  end
  $groups += <<-EOS
      <div class="panel panel-primary" id="#{id}">
        <div class="panel-heading">
          <h3 class="panel-title">#{title}</h3>
        </div>
        <div class="panel-body">
          #{group_content}
        </div>
      </div>
  EOS
end

def render_toc()
  toc_content = "<ul class=\"toc list-group\">"
  toc_content += "<li class=\"list-group-item list-group-item-info\">Table of Contents</li>"
  $toc.each do |toc_item|
    toc_content += toc_item
  end
  toc_content += "</ul>"
  toc_content
end

template = ERB.new $stdin.read
puts template.result
