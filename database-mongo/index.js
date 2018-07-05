var mongoose=require("mongoose");
mongoose.Promise = global.Promise;
//mongoose.connect("mongodb://RBK:rbk12345@ds159489.mlab.com:59489/jobsdb",{ useMongoClient: true});



mongoose.connect("mongodb://localhost/jobsdb",{ useMongoClient: true});

var db = mongoose.connection;
db.on("error",function(){
	console.log("connection error");
});
db.once("open",function() {
	console.log("connection success");	
});

