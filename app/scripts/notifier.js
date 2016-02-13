var notifier = (function() {
  function success(msg) {
    //alert(msg);
    toastr.success(msg);
  }
  function error(msg) {
    toastr.error(msg);
  }
  return {
    success: success,
    error: error
  };
})();
