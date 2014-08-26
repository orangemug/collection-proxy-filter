function filter(collection, fn) {
  var c = new collection.constructor;

  function add(model) {
    if(!fn || fn(model)) {
      c.add(model.toJSON());
    }
  }

  function remove(model) {
    c.remove(model)
  }

  collection.each(add);
  collection.on("add", add);
  collection.on("remove", remove);

  // Only supported in some libraries
  collection.on("reset", function() {
    c.reset();
    collection.each(add);
  });
  return c;
}

module.exports = filter;
