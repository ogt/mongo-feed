var _ = require('glutils');
var mongoSequence = require('mongo-sequence');
var collprefix = 'feed_';

module.exports = function(db,name) {

  var collection = db.collection(collprefix+name);
  collection.ensureIndex({_feed_seq_no:-1});
  collection.ensureIndex({_feed_posted_on:-1});
  var feed = { name : name, db :db, collection : collection};
  feed.post = function(obj,cb) {
    var seq = mongoSequence(db,name,{coll:collprefix+'counters'});
    seq.getNext(function(err,counter) {
      if (!err) {
        var dd = new Date();
        collection.insert(_.merge(obj,
          {
            _feed_seq_no : counter,
            _feed_posted_on : dd.toJSON()
          }),
        cb);
      }
      else {
        cb(err);
      }
    });
  }
  feed.recent = function(n,seq, cb) {
    if (n > 100) { n = 100 }
    if (n <= 0) { n = 10 }
    var criterion = seq <=0 ? {} :  {_feed_seq_no : { $lt :  seq }}
     
    collection.find(criterion).limit(n).sort({_feed_seq_no : -1}, function(err,items) {
      if (err) { cb(err);}
      else {
        cb(null,items.map(function(el){return _.omit(el,'_id'); }));
      }
    });
  }
  return feed;
}
