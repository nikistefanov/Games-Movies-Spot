var eventLoader = (function() {
  var CONSTANTS = {
    PRODUCT_MIN_LENGTH: 3,
  };

  function loginPageEvents($container) {
    $container.on('click', '#btn-login', function(ev) {
      ev.stopPropagation();
      ev.preventDefault();
      var username = $('#input-username')[0].value;
      var password = $('#input-password')[0].value;

      users.login(username, password)
        .then(function() {
          toastr.success('Logged in!');
          document.location = document.referrer;
        });
    });

    $container.on('click', '#btn-reg', function(ev) {
      ev.stopPropagation();
      ev.preventDefault();
      var username = $('#input-username')[0].value,
        password = $('#input-password')[0].value;

      users.register(username, password)
        .then(function() {
          toastr.success('Registered!');
          // document.location = document.location.origin;
          document.location = document.referrer;
        });
    });
  }

  function navigationEvents($container) {
    $container.on('click', '#btn-logout', function(ev) {
      users.logout()
        .then(function() {
          toastr.success('Logged out!');
          location.reload();
        });
    });
    $container.on('click', '#btn-search', function(ev) {
      ev.stopPropagation();
      ev.preventDefault();
      console.log(5);

      var value = $('#search').val();
      //document.location = document.location.origin + '#/search/' + value;
    });
  }

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

      $.each(gameData, function(index, value) {
        validate.ifUndefined(value);
        if (!(index == 'genres' || index == 'platform' || index == 'price' || index == 'owner')) {
          validate.valueMinLength(value, CONSTANTS.PRODUCT_MIN_LENGTH, index);
        }
      });

      games.add(gameData)
        .then(function(data) {
          toastr.success('Game added.');
          location.reload();
        });
    });

    $container.on('click', '#btn-delete-game', function(ev) {
      ev.stopPropagation();
      ev.preventDefault();

      var gameId = $(ev.target).closest('div').attr('data-game-id');
      games.remove(gameId)
        .then(function(data) {
          toastr.success('Game removed.');
          document.location = document.location.href = '#/games';
        })
        .catch(function(err) {
          toastr.error(err);
        });
    });
  }

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

      $.each(movieData, function(index, value) {
        validate.ifUndefined(value);
        if (!(index == 'genres' || index == 'price' || index == 'owner')) {
          validate.valueMinLength(value, CONSTANTS.PRODUCT_MIN_LENGTH, index);
        }
      });

      movies.add(movieData)
        .then(function(data) {
          toastr.success('Movie added.');
          location.reload();
        });
    });

    $container.on('click', '#btn-delete-movie', function(ev) {
      ev.stopPropagation();
      ev.preventDefault();

      var movieId = $(ev.target).closest('div').attr('data-movie-id');
      movies.remove(movieId)
        .then(function(data) {
          toastr.success('Movie removed.');
          document.location = document.location.href = '#/movies';
        })
        .catch(function(err) {
          toastr.error(err);
        });
    });
  }

  function collapseEvents($container) {
    $(document).on('click', '#burger', function(ev) {
      var $this = $(this);

      if (!($this.hasClass("add-product-platform"))) {
        $("#site-slogan").toggle();
      }
    });
  }

  function commentsEvents($container) {
    $container.on('click', '#btn-txtarea', function(ev) {
      ev.stopPropagation();
      ev.preventDefault();

      var date = new Date().toLocaleString();
      var value = $('#txtarea').val();

      validate.ifUndefined(value);
      validate.valueMinLength(value, CONSTANTS.PRODUCT_MIN_LENGTH);
      validate.isValidString(value);

      $('#user-comment p').text(value);
      $('#txtarea').val("");

      var commentData = {
        text: value,
        date: date,
        owner: Parse.User.current()
      };

      comments.add(commentData)
        .then(function(data) {
          notifier.success('Comment added.');
        });
    });
  }
  return {
    loginPageEvents: loginPageEvents,
    navigationEvents: navigationEvents,
    gameEvents: gameEvents,
    movieEvents: movieEvents,
    collapseEvents: collapseEvents,
    commentsEvents: commentsEvents
  };
})();
