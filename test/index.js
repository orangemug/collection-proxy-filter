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
    assert.equal(c.at(0), this.collection.at(0));
    assert.equal(c.at(1), this.collection.at(1));
    assert.equal(c.at(2), this.collection.at(2));
    assert.equal(c.at(3), this.collection.at(3));
  });

  it("filter should contain only models filtered", function() {
    var c = proxyFilter(this.collection, function(model) {
      var id = model.get("id");
      if(id > 1 && id < 4) return true;
      return false;
    });
    assert.equal(c.at(0), this.collection.at(1));
    assert.equal(c.at(1), this.collection.at(2));
  });

  it("should track add events", function() {
    var c = proxyFilter(this.collection);
    this.collection.add({id: 5});
    assert.equal(c.size(), 5);
    assert.equal(c.at(5), this.collection.at(5));
  });

  it("should track remove events", function() {
    var c = proxyFilter(this.collection);
    this.collection.remove(this.collection.at(1));
    assert.equal(c.size(), 3);
    assert.equal(c.at(1), this.collection.at(1));
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

