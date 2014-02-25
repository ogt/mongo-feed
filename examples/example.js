var db = require('mongojs').connect('mongodb://localhost/mongo_feed_test');
var feed = require('../')(db,'events');
var _ = require('glutils');
_.run(function() {
  _.p(feed.post({what: 'something happened', who: 'odysseas'},_.p()));
  _.p(feed.post({what: 'something else happened', who: 'john'},_.p()));
  _.p(feed.post({what: 'something too happened', who: 'michael'},_.p()));
  _.p(feed.post({what: 'something more happened', who: 'joe'},_.p()));

  var items = _.p(feed.recent(3,2,_.p()));
  console.log(items);
});
