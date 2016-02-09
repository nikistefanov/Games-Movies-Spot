var games = function() {
  var Game = Parse.Object.extend("Game");

  function all() {
    var query = new Parse.Query(Game);
    return new Promise(function(resolve, reject) {
      query.find()
        .then(function(data) {
          return data.map(function(item) {
            return converter.dbGameToGameVM(item);
          });
        })
        .then(function(data) {
          var currentUserId = Parse.User.current() ? Parse.User.current().id : '';
          data.map(function(item) {
            item.isOwner = currentUserId === item.ownerId;
            return item;
          });
          resolve({
            games: data
          });
        });
    });
  }

  function get(id) {
    var gameId = id;
    var query = new Parse.Query(Game);
    return query.get(gameId)
      .then(function(data) {
        return converter.dbGameToGameVM(data);
      })
      .then(function(currentGame) {
        var currentUserId = Parse.User.current() ? Parse.User.current().id : '';
        currentGame.isOwner = currentUserId === currentGame.ownerId;
        return {
          game: currentGame
        };
      });
  }

  function getItemByTitle(string) {
    var searchedString = string;
    var query = new Parse.Query(Game);
    return query.find()
        .then(function(data) {
          return data.map(function(item) {
            return converter.dbGameToGameVM(item);
          });
        })
        .then(function(data) {
          var currentGames = [];
          data.map(function(item) {
            if (item.title.indexOf(searchedString) > -1) {
              currentGames.push(item);
            }
          });
          debugger;
          return currentGames;
        });
  }

  function add(gameData) {
    var game = new Game();

    ['title', 'platform', 'price', 'img', 'description', 'genres', 'owner'].forEach((key) => {
      game.set(key, gameData[key]);
    });

    return game.save();
  }

  function remove(id) {
    var query = new Parse.Query(Game);

    return new Promise(function(resolve, reject) {
      query.get(id)
        .then(function(game) {
          resolve(game.destroy());
        });
    });
  }
  return {
    all: all,
    get: get,
    getItemByTitle: getItemByTitle,
    add: add,
    remove: remove
  };
}();
