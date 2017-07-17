$(function() {
  console.log('hello');
  $('a[data-json-path]').each(function() {
    var $this = $(this);
    var json_path = $this.data('json-path');
    var json_url = encodeURIComponent(location.href.replace(/[^/]+$/, '') + json_path);
    var url = 'karabiner://karabiner/assets/complex_modifications/import?url=' + json_url;
    $this.attr('href', url);
  });
});
