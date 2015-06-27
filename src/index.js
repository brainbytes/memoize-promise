module.exports = function memoize( fn ) {
    return function () {
        var args = Array.prototype.slice.call(arguments);
        var hash = "";
        var i = args.length;
        var currentArg = null;
        while (i--) {
            currentArg = args[i];
            hash += (currentArg === Object(currentArg)) ?
            JSON.stringify(currentArg) : currentArg;
            fn.memoize || (fn.memoize = {});
        }
        if (!(hash in fn.memoize)) {
          function clearMemo() {
            delete fn.memoize[hash];
          }
          fn.memoize[hash] = fn.apply(this, args);
          fn.memoize[hash].then(clearMemo, clearMemo);
        }
        return fn.memoize[hash];
    };
}
