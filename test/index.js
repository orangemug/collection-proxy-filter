var assert      = require("assert");
var Collection  = require("backbone").Collection;
var proxyFilter = require("../");

describe("collection-proxy-filter", function() {
  beforeEach(function() {
    this.collection = new Collection([
      {id: 1},
      {id: 2},
      {id: 3},
      {id: 4}
    ]);
  });

  it("should return a new collection", function() {
    var c = proxyFilter(this.collection);
    assert.notEqual(c, this.collection);
  });

  it("no-op filter should contain same models", function() {
    var c = proxyFilter(this.collection);
    assert.deepEqual(c.at(0).toJSON(), this.collection.at(0).toJSON());
    assert.deepEqual(c.at(1).toJSON(), this.collection.at(1).toJSON());
    assert.deepEqual(c.at(2).toJSON(), this.collection.at(2).toJSON());
    assert.deepEqual(c.at(3).toJSON(), this.collection.at(3).toJSON());
  });

  it("filter should contain only models filtered", function() {
    var c = proxyFilter(this.collection, function(model) {
      var id = model.get("id");
      if(id > 1 && id < 4) return true;
      return false;
    });
    assert.deepEqual(c.at(0).toJSON(), this.collection.at(1).toJSON());
    assert.deepEqual(c.at(1).toJSON(), this.collection.at(2).toJSON());
  });

  it("should track add events", function() {
    var c = proxyFilter(this.collection);
    this.collection.add({id: 5});
    assert.equal(c.size(), 5);
    assert.deepEqual(c.at(4).toJSON(), this.collection.at(4).toJSON());
  });

  it("should track remove events", function() {
    var c = proxyFilter(this.collection);
    this.collection.remove(this.collection.at(1));
    assert.equal(c.size(), 3);
    assert.deepEqual(c.at(1).toJSON(), this.collection.at(1).toJSON());
  });

  it("should track reset events", function() {
    var c = proxyFilter(this.collection);

    this.collection.reset();
    assert.equal(c.size(), 0);

    this.collection.reset([
      {id: "a"},
      {id: "b"}
    ]);
    assert.equal(c.size(), 2);
  });
});

