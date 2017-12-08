{
  let groups = [];

  Vue.directive('scroll-to-hash', {
    componentUpdated: function(el) {
      if (groups.length > 0) {
        let finished = true;
        groups.forEach(function(g) {
          g.files.forEach(function(f) {
            if (f === undefined) {
              finished = false;
            }
          });
        });
        if (finished) {
          let href = location.href;
          location.href = '#';
          location.href = href;
        }
      }
    }
  });

  let mainContainer = new Vue({
    el: '#main-container',
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
        id: baseName(path),
        title: response.data.title,
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
          id: group.id,
          name: group.name,
          files: []
        };
        g.files.length = group.files.length;
        g.files.fill(undefined);
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
