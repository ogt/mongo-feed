Minimalist feed service using mongo 
--
[![Build Status](https://travis-ci.org/ogt/mongo-feed.png)](https://travis-ci.org/ogt/mongo-feed)

## Description
```
var mongoFeed = require('mongo-feed');
var feed = new MongoFeed('db','Test Feed');
feed.post({a:1,b:2},cb);
// later...
feed.post({x:11,z:22},cb);
// later...
feed.post({w:9,m:8},cb);
// later...
feed.recent(10,null, function(err,items) {
// items would be [
//     { w:9,m:8,_feed_posted_on : <ts>, _feed_seq_no : 3},
//     { x:11,z:22,_feed_posted_on : <ts>, _feed_seq_no : 2},
//     { a:1,b:2,_feed_posted_on : <ts>, _feed_seq_no : 1}
//  ]
});
feed.recent(10,2, function(err,items) {
// items would be [ { x:11,z:22,_feed_posted_on : <ts>, _feed_seq_no : 2}  ]
```
The module reserves attributes prefixed with `_feed`. It currently adds the following two attributes
- `_feed_seq_no` - unique sequencial id starting from 1 for the first post
- `_feed_posted_on` datetime in this format : `2014-03-01T16:30:38.909Z`

The module allows posting an object multiple times, ie, you can safely include an `_id` attribute in the posted object.

## Installation 

Installing the module
```
npm install mongo-feed
```
