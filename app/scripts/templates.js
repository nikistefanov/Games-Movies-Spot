var templates = (function() {
  function load(name) {
    var url = 'app/templates/' + name + '.handlebars';

    return new Promise(function(resolve, reject) {
      $.ajax({
        url: url,
        success: function(data) {
          resolve(data);
        },
        error: function(err) {
          reject(err);
        }
      });
    });
  }
  return {
    load: load
  };
})();
