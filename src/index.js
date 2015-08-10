module.exports = function memoize( fn, delay ) {
  var wait = delay || 0;
  return function () {
    var args = Array.prototype.slice.call(arguments);
    var hash = "";
    var i = args.length;
    var currentArg = null;
    fn.memoize || (fn.memoize = {});
    while (i--) {
      currentArg = args[i];
      hash += (currentArg === Object(currentArg)) ?
      JSON.stringify(currentArg) : currentArg;
    }
    if (!(hash in fn.memoize)) {
      function clearMemo(hash) {
        return function() {
          setTimeout(function() {
            delete fn.memoize[hash];
          }, wait);
        }
      }
      fn.memoize[hash] = fn.apply(this, args);
      fn.memoize[hash].then(clearMemo(hash), clearMemo(hash));
    }
    return fn.memoize[hash];
  };
};
