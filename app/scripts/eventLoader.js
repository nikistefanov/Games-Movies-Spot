var eventLoader = function() {
  function loginPageEvents($container) {
    $container.on('click', '#btn-login', function(ev) {
      ev.stopPropagation();
      ev.preventDefault();
      var username = $('#input-username')[0].value;
      var password = $('#input-password')[0].value;

      data.users.login(username, password)
        .then(function() {
          toastr.success('Logged in!');
          document.location = document.location.origin;
        });
    });

    $container.on('click', '#btn-reg', function(ev) {
      ev.stopPropagation();
      ev.preventDefault();
      var username = $('#input-username')[0].value,
        password = $('#input-password')[0].value;

      data.users.register(username, password)
        .then(function() {
          toastr.success('Registered!');
          document.location = document.location.origin;
        });
    });
  };

  function navigationEvents($container) {
    $container.on('click', '#btn-logout', function(ev) {
      data.users.logout()
        .then(function() {
          toastr.success('Logged out!');
          location.reload();
        });
    });
    $container.on('click', '#btn-search', function(ev) {
      ev.stopPropagation();
      ev.preventDefault();

      var value = $('#search')[0].value;
      document.location = document.location.origin + '#/search/' + value;
    });
    $(document).on('click.bs.collapse.data-api', '[data-toggle="collapse"]', function(e) {
      var $this = $(this);

      if (!($this.hasClass("add-product-platform"))) {
        $("#site-slogan").toggle();
      }
    });
    $(document).on('click', '#btn-txtarea', function(ev) {
      ev.stopPropagation();
      ev.preventDefault();

      var value = $('#txtarea').val();
      $('#user-comment p').text(value);
    });
  };
  function gameEvents($container) {
    $container.on('click', '#btn-add-game', function(ev) {
      var genres = [];

      $(".genres-checkbox:checked").each(function() {
        genres.push($(this).val());
      });

      var gameData = {
        title: $('#tb-game-title').val(),
        platform: $("#tb-game-platform option:selected").text(),
        price: $('#tb-game-price').val(),
        img: $('#basic-url').val(),
        description: $('#tb-game-description').val(),
        genres: genres,
        owner: Parse.User.current()
      };

      gameData.forEach((key) => {
        validate.ifUndefined(gameData[key]);
      });

      data.games.add(gameData)
        .then(function(data) {
          toastr.success('Game added.');
          location.reload();
        });
    });

    $container.on('click', '#btn-delete-game', function(ev) {
      ev.stopPropagation();
      ev.preventDefault();

      var gameId = $(ev.target).closest('div').attr('data-game-id');
      data.games.remove(gameId)
        .then(function(data) {
          toastr.success('Game removed.');
          document.location = document.location.href = '#/games';
        })
        .catch(function(err) {
          toastr.error(err);
        });
    });
  };
  function movieEvents($container) {
    $container.on('click', '#btn-add-movie', function(ev) {
      var genres = [];

      $(".genres-checkbox:checked").each(function() {
        genres.push($(this).val());
      });

      var movieData = {
        title: $('#tb-movie-title').val(),
        year: $('#tb-movie-year').val(),
        price: $('#tb-movie-price').val(),
        img: $('#basic-url').val(),
        description: $('#tb-movie-description').val(),
        genres: genres,
        owner: Parse.User.current()
      };

      movieData.forEach((key) => {
        validate.ifUndefined(movieData[key]);
      });

      data.movies.add(movieData)
        .then(function(data) {
          toastr.success('Movie added.');
          location.reload();
        });
    });

    $container.on('click', '#btn-delete-movie', function(ev) {
      ev.stopPropagation();
      ev.preventDefault();

      var movieId = $(ev.target).closest('div').attr('data-movie-id');
      data.movies.remove(movieId)
        .then(function(data) {
          toastr.success('Movie removed.');
          document.location = document.location.href = '#/movies';
        })
        .catch(function(err) {
          toastr.error(err);
        });
    });
  };
  return {
    loginPageEvents: loginPageEvents,
    navigationEvents: navigationEvents,
    gameEvents: gameEvents,
    movieEvents: movieEvents
  };
}();
