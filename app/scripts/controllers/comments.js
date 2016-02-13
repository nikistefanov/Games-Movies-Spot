var comments = (function() {
  var Comment = Parse.Object.extend("Comment");

    function all() {
      var query = new Parse.Query(Comment);
      return new Promise(function(resolve, reject) {
        query.find()
          .then(function(data) {
            return data.map(function(item) {
              return converter.dbCommentToCommentVM(item);
            });
          })
          .then(function(data) {
            var currentUserId = Parse.User.current() ? Parse.User.current().id : '';
            data.map(function(item) {
              item.isOwner = currentUserId === item.ownerId;
              return item;
            });
            resolve({
              comments: data
            });
          });
      });
    }

    function get(id) {
      var commentId = id;
      var query = new Parse.Query(Comment);
      return query.get(commentId)
        .then(function(data) {
          return converter.dbCommentToCommentVM(data);
        })
        .then(function(currentComment) {
          var currentUserId = Parse.User.current() ? Parse.User.current().id : '';
          currentGame.isOwner = currentUserId === currentGame.ownerId;
          return {
            comment: currentComment
          };
        });
    }
    function add(commentData) {
      var comment = new Comment();

      comment.set('text', commentData.text);
      comment.set('date', commentData.date);
      comment.set('owner', commentData.owner);

      return comment.save();
    }
    function remove(id) {
      var query = new Parse.Query(Comment);

      return new Promise(function(resolve, reject) {
        query.get(id)
          .then(function(comment) {
            resolve(comment.destroy());
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
