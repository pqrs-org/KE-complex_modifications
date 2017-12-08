{
  let groups = [];
  let fetchTotalNumber = 0;
  let fetchCount = 0;

  Vue.directive('scroll-to-hash', {
    componentUpdated: function(el) {
      if (groups.length > 0) {
        if (fetchTotalNumber > 0 &&
            fetchTotalNumber == fetchCount) {
          var hash = location.hash;
          if (hash) {
            location.href = '#';
            location.href = hash;

            var id = hash.substring(1);
            $('#' + id + ' .collapse').collapse('show');
          }
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

  let fetchFile = function(path, groupIndex, fileIndex) {
    axios.get(path).then(function(response) {
      ++fetchCount;

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
          files: [],
          extraDescription: ''
        };
        g.files.length = group.files.length;
        g.files.fill(undefined);
        groups.push(g);

        group.files.forEach(function(file, fileIndex) {
          if (file.path) {
            ++fetchTotalNumber;
            fetchFile(file.path, groupIndex, fileIndex);
          }
        });
      });
    })
    .catch(function(error) {
      console.log(error);
    });
}
