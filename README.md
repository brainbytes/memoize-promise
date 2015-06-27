Works just like a normal memoize function. The only difference is that it
expects the function you are memoizing to return a promise. Until that promise
has resolved/rejected, subsequent calls to the function will return the same
promise.

This is useful for instance if you have a function which makes a call to the
network. Instead of fetching the same data multiple times, all calls will get
the same promise back, allowing for a simple API and efficient use of resources.
