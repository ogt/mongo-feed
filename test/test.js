var db = require('mongojs').connect('mongodb://localhost/mongo_feed_test');
var test = require('tap').test;
var _ = require('glutils');
var mongoFeed = require('../');

test('simple test - check bounding conditions for page size', function (t) {
  _.run(function() {
    var feed = mongoFeed(db,'events');
    t.plan(4);
    for (var i=0;i<4;i++) {
      _.p(feed.post({what: 'something happened : ('+i+')', who: 'odysseas'+i},_.p()));
    }
    t.equal(_.p(feed.recent(1,0,_.p())).length,1);
    t.equal(_.p(feed.recent(2,0,_.p())).length,2);
    t.equal(_.p(feed.recent(4,0,_.p())).length,4);
    t.equal(_.p(feed.recent(10,0,_.p())).length,4);
    t.end()
  });
})

test('long test - check bounding conditions for page size', function (t) {
  _.run(function() {
    var feed = mongoFeed(db,'events1');
    t.plan(6);
    for (var i=0;i<200;i++) {
      _.p(feed.post({where: 'something new happened : ('+i+')', which: 'john'+i},_.p()));
    }
    t.equal(_.p(feed.recent(1,0,_.p())).length,1);
    t.equal(_.p(feed.recent(2,0,_.p())).length,2);
    t.equal(_.p(feed.recent(100,0,_.p())).length,100);
    t.equal(_.p(feed.recent(200,0,_.p())).length,100);
    t.equal(_.p(feed.recent(400,0,_.p())).length,100);
    t.equal(_.p(feed.recent(-1,0,_.p())).length,10);
    t.end();
  });
})

test('test bounding conditions for sequence number parameter', function (t) {
  var feed = mongoFeed(db,'events2');
  _.run(function() {
    t.plan(10);
    var from = Date.now();
    for (var i=0;i<200;i++) {
      _.p(feed.post({whats: 'something else happened : ('+i+')', who: 'michael'+i},_.p()));
    }
    var items = _.p(feed.recent(10,0,_.p()));
    t.equal(items[0]._feed_seq_no,200);
    t.equal(items[9]._feed_seq_no,191);
    t.ok(_.has(items[0],'_feed_posted_on'));
    var then = Date.now();
    t.ok(_.all(items,function(el) {
      var dd = new Date(el._feed_posted_on);
      return dd >= from && dd <= then;
    }));

    var items = _.p(feed.recent(10,190,_.p()));
    t.equal(items[0]._feed_seq_no,189);
    t.equal(items[9]._feed_seq_no,180);
    t.equal(items[9].who,'michael179');

    var items = _.p(feed.recent(10,6,_.p()));
    t.equal(items.length, 5);
    t.equal(items[0]._feed_seq_no,5);
    t.equal(items[4]._feed_seq_no,1);
    t.end();
    db.close();
  });
})
