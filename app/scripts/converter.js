var converter = function() {
  function dbGameToGameVM(dbGame) {
    var owner = dbGame.get('owner');
    return {
      id: dbGame.id,
      title: dbGame.get('title'),
      platform: dbGame.get('platform'),
      price: dbGame.get('price'),
      img: dbGame.get('img'),
      description: dbGame.get('description'),
      genres: dbGame.get('genres'),
      ownerId: owner ? owner.id : null
    };
  }
  function dbMovieToMovieVM(dbMovie) {
    var owner = dbMovie.get('owner');
    return {
      id: dbMovie.id,
      title: dbMovie.get('title'),
      year: dbMovie.get('year'),
      price: dbMovie.get('price'),
      img: dbMovie.get('img'),
      description: dbMovie.get('description'),
      genres: dbMovie.get('genres'),
      ownerId: owner ? owner.id : null
    };
  }
  return {
    dbGameToGameVM: dbGameToGameVM,
    dbMovieToMovieVM: dbMovieToMovieVM
  };
}();
