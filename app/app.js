(function() {
  Parse.initialize("CQQSRsV2TqaFPvfgN0LJuW49vI7usCNSQpxfNasJ", "kp0Hm8vWotsHZIlFLz20Vaa9nmNdDH0B3N3hF9ha");
  var containerId = '#main',
    $container = $(containerId),
    $footer = $('#footer');

  var sammyApp = Sammy(containerId, function() {
    this.get('#/', function() {
      this.redirect('#/home');
    });

    this.get('#/home', function() {
      templatesFunctionality.loadHomeTemplate();
      Promise.all([games.all(), templates.load('home')])
        .then(function(results) {
          $('.loader-top').hide();
          var template = Handlebars.compile(results[1]),
            html = template(results[0]);

          $container.html(html);
        });
      templates.load('footer-home')
        .then(function(templateHtml) {
          $footer.html(templateHtml);
        });
    });

    this.get('#/games', function() {
      templatesFunctionality.loadGameTemplate();
      Promise.all([games.all(), templates.load('games')])
        .then(function(results) {
          //console.log(results[0].games.length);
          $('.loader-top').hide();
          var template = Handlebars.compile(results[1]),
            html = template(results[0]);

          $container.html(html);
        });
      templates.load('footer')
        .then(function(templateHtml) {
          $footer.html(templateHtml);
        });
    });

    this.get('#/games/game-info/:id', function(context) {
      templatesFunctionality.loadGameInfoTemplate();
      var id = context.params.id;

      Promise.all([games.get(id), templates.load('game-info')])
        .then(function(results) {
          $('.loader-top').hide();
          var template = Handlebars.compile(results[1]),
            html = template(results[0]);

          $container.html(html);
        });
    });

    this.get('#/movies', function() {
      templatesFunctionality.loadMovieTemplate();
      Promise.all([movies.all(), templates.load('movies')])
        .then(function(results) {
          $('.loader-top').hide();
          var template = Handlebars.compile(results[1]),
            html = template(results[0]);

          $container.html(html);
        });
      templates.load('footer')
        .then(function(templateHtml) {
          $footer.html(templateHtml);
        });
    });

    this.get('#/movies/movie-info/:id', function(context) {
      templatesFunctionality.loadMovieInfoTemplate();
      var id = context.params.id;

      Promise.all([movies.get(id), templates.load('movie-info')])
        .then(function(results) {
          $('.loader-top').hide();
          var template = Handlebars.compile(results[1]),
            html = template(results[0]);

          $container.html(html);
        });
    });

    this.get('#/location', function() {
      templatesFunctionality.loadLocationTemplate();
      templates.load('location')
        .then(function(templateHtml) {
          $('.loader-top').hide();
          $container.html(templateHtml);
        });
      templates.load('footer')
        .then(function(templateHtml) {
          $footer.html(templateHtml);
        });
    });

    this.get('#/login', function() {
      templates.load('login')
        .then(function(templateHtml) {
          $container.html(templateHtml);
        });
    });

    this.get('#/register', function() {
      templates.load('register')
        .then(function(templateHtml) {
          $container.html(templateHtml);
        });
    });

    $(function() {
      Promise.all([users.current(), templates.load('login-logout')])
        .then(function(results) {
          var template = Handlebars.compile(results[1]),
            html = template(results[0]);

          $('.user-nav').append(html);
        });
    });
  });

  $(function() {
    sammyApp.run('#/');
    eventLoader.collapseEventes($container);
    eventLoader.navigationEvents($('.user-nav'));
    eventLoader.loginPageEvents($container);
    eventLoader.movieEvents($container);
    eventLoader.gameEvents($container);
  });
}());
