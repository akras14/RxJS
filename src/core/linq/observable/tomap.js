  if (!!root.Map) {
    /**
    * Converts the observable sequence to a Map if it exists.
    * @param {Function} keySelector A function which produces the key for the Map.
    * @param {Function} [elementSelector] An optional function which produces the element for the Map. If not present, defaults to the value from the observable sequence.
    * @returns {Observable} An observable sequence with a single value of a Map containing the values from the observable sequence.
    */
    observableProto.toMap = function (keySelector, elementSelector) {
      var source = this;
      return new AnonymousObservable(function (observer) {
        var m = new root.Map();
        return source.subscribe(
          function (x) {
            var key;
            try {
              key = keySelector(x);
            } catch (e) {
              observer.onError(e);
              return;
            }

            var element = x;
            if (elementSelector) {
              try {
                element = elementSelector(x);
              } catch (e) {
                observer.onError(e);
                return;
              }
            }

            m.set(key, element);
          },
          observer.onError.bind(observer),
          function () {
            observer.onNext(m);
            observer.onCompleted();
          });
      });
    };
  }
