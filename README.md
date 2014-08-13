# collection-proxy-filter [![Build Status](https://travis-ci.org/orangemug/collection-proxy-filter.svg?branch=master)](https://travis-ci.org/orangemug/collection-proxy-filter)
A collection filter that keeps in sync with the master collection

    proxy.filter(collection, function(model) {
      var data = model.toJSON();
      return data;
    });
    // => Collection


## License
MIT
