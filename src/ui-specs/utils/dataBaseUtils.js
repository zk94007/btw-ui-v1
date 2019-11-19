var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://dev_user:74BW0JQboSOyKmQt@cluster0-dev-68z9l.mongodb.net/";

//var url = "mongodb+srv://dev_user:74BW0JQboSOyKmQt@cluster0-68z9l.mongodb.net/";


var DataBaseUtils = function () {

  this.removeDocumentByEmail = function (email) {
    MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
      if (err) throw err;
      //delete user by property /email
      dbo = db.db("test");
      var myqueryDelete = { 'email': email };
      dbo.collection("users").deleteOne(myqueryDelete, function (err, result) {
        if (err) throw err;
        console.log("EMAIL record deleted with email :  --> " + email);
        db.close();
      });
    });
  }

  this.fetchTotalDocumentCount = function () {
    MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
      if (err) throw err;
      //delete user by property /email
      dbo = db.db("test");
      dbo.collection("users").countDocuments({}, function (err, result) {
        if (err) throw err;
        console.log("Total Number of Records:  " + result);
        db.close();
      });
    });
  }
}
module.exports = DataBaseUtils;
