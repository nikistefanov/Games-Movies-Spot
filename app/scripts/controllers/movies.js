var movies = (function() {
  var Movie = Parse.Object.extend("Movie");
  function all() {
    var query = new Parse.Query(Movie);
    return new Promise(function(resolve, reject) {
      query.find()
        .then(function(data) {
          return data.map(function(item) {
            return converter.dbMovieToMovieVM(item);
          });
        })
        .then(function(data) {
          var currentUserId = Parse.User.current() ? Parse.User.current().id : '';
          data.map(function(item) {
            item.isOwner = currentUserId === item.ownerId;
            return item;
          });
          resolve({
            movies: data
          });
        });
    });
  }
  function get(id) {
    var movieId = id;
    var query = new Parse.Query(Movie);
    return query.get(movieId)
      .then(function(data) {
        return converter.dbMovieToMovieVM(data);
      })
      .then(function(currentMovie) {
        var currentUserId = Parse.User.current() ? Parse.User.current().id : '';
        currentMovie.isOwner = currentUserId === currentMovie.ownerId;
        return {
          movie: currentMovie
        };
      });
  }
  function add(movieData) {
    var movie = new Movie();

    // ['title', 'year', 'price', 'img', 'description', 'genres', 'owner'].forEach((key) => {
    //   movie.set(key, movieData[key]);
    // });
    movie.set('title', movieData.title);
    movie.set('year', movieData.year);
    movie.set('price', movieData.price);
    movie.set('img', movieData.img);
    movie.set('description', movieData.description);
    movie.set('genres', movieData.genres);
    movie.set('owner', movieData.owner);

    return movie.save();
  }
  function remove(id) {
    var query = new Parse.Query(Movie);

    return new Promise(function(resolve, reject) {
      query.get(id)
        .then(function(movie) {
          resolve(movie.destroy());
        });
    });
  }

  return {
    all: all,
    get: get,
    add: add,
    remove: remove
  };
})();
