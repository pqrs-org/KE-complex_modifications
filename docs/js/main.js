{
  let groups = [];

  let app4 = new Vue({
    el: '#app-4',
    data: {
      groups: groups
    }
  });

  let baseName = function(path) {
    let base = path.substring(path.lastIndexOf('/') + 1);
    if (base.lastIndexOf(".") != -1) {
      base = base.substring(0, base.lastIndexOf("."));
    }
    return base;
  };

  let jsonUrl = function(path) {
    let url = encodeURIComponent(location.href.replace(/[^/]+$/, '') + path);
    return 'karabiner://karabiner/assets/complex_modifications/import?url=' + url;
  };

  let getFile = function(path, groupIndex, fileIndex) {
    axios.get(path).then(function(response) {
      let f = {
        title: response.data.title,
        id: baseName(path),
        importUrl: jsonUrl(path),
        rules: []
      };

      response.data.rules.forEach(function(r) {
        f.rules.push(r.description);
      });

      Vue.set(groups[groupIndex].files, fileIndex, f);
    }).catch(function(error) {
      console.log(error);
    });
  };

  axios.get('groups.json')
    .then(function(response) {
      response.data.index.forEach(function(group, groupIndex) {
        let g = {
          name: group.name,
          id: group.id,
          files: []
        };
        groups.push(g);

        group.files.forEach(function(file, fileIndex) {
          getFile(file.path, groupIndex, fileIndex);
        });
      });
    })
    .catch(function(error) {
      console.log(error);
    });
}
