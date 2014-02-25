Generic feed-like service that uses mongo and provides a post/recent api

[![Build Status](https://travis-ci.org/ogt/mongo-feed.png)](https://travis-ci.org/ogt/mongo-feed)

## Description
```
var MongoFeed = require('mongo-feed');
var feed = new MongoFeed('db,'Test Feed', cb);
feed.post({a:1,b:2},cb);
feed.post({x:11,z:22},cb);
feed.post({w:9,m:8},cb);
feed.recent(10,null, function(err,items) {
// items would be [ { x:11,z:22,_feed_posted_on : <ts>, _feed_seq_no : 2},
//     { a:1,b:2,_feed_posted_on : <ts>, _feed_seq_no : 1}
//  ]
});
feed.recent(10,2, function(err,items) {
// items would be [ { x:11,z:22,_feed_posted_on : <ts>, _feed_seq_no : 2}  ]
```

## Installation 

Installing the module
```
npm install mongo-feed
```
