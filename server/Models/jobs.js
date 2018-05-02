var mongoose = require('mongoose');


////Jobs Schema
var jobsSchema = mongoose.Schema({
  user: 
  {
    type: String,
  },
  jobTitle: {
    type: String,
    require:true
  },
  jobDescription: String,
  category: {
    type: String,
    require:true
  },
  from: String,
  to: String,
  dateTo:Date,
  dateFrom:Date,
  created_at: 
  {
    type:Date,
    default:Date.now
  }, 

   interestedUsers:{
   	type:[String]
   },

   takenBy:{
   	type:String

   }

});

var commentsSchema= mongoose.Schema({
  username: String,
  text: String
})

var Comments= mongoose.model("Comments", commentsSchema)

/////Jobs Model
var Jobs = mongoose.model('Jobs', jobsSchema);

var createJob = function(userName,data, callback){
  data["user"]=userName;
  Jobs.create(data, callback)
};

// i think we don't need to pass data because 
// it's gonna retrive all the jobs n the schema 
// idk though
var allJobs = function (callback){
   Jobs.aggregate([

   	{$sort:
       {created_at:-1}
    },
   {
     $lookup:
       {
         from: "users",
         localField: "user",
         foreignField: "userName",
         as: "userInfo"
       }
   }
], function (err, data) {
        if (err) {
          console.log(err);
            callback(err, null);
        }
        console.log(data);
        callback(null, data)
    });
};

var jobByTitle = function (jobTitle, callback){
  Jobs.findOne({jobTitle: jobTitle}, function(err, data){
    if(err){
      callback(err, null)
    } else {
    callback(null, data)
  }
  });
};




var getJobById = function (jobId, callback){
  Jobs.findOne({_id: jobId}, function(err, data){
    if(err){
      callback(err, null)
    } else {
    callback(null, data)
  }
  });
};

var getUserJob = function (jobTitle,user, callback){
  Jobs.findOne({"jobTitle": jobTitle,"user":user}, function(err, data){
    if(err){
      callback(err, null)
    } else {
    callback(null, data)
  }
  });



  
};

var findSome = function(title, callback){

var regexValue = '\.*'+title+'\.*';


 Jobs.aggregate([
    {$match:{"jobTitle":new RegExp(regexValue, 'i')}},
   {
    
     $lookup:
       {
         from: "users",
         localField: "user",
         foreignField: "userName",
         as: "userInfo"
       }
  }
  
], function (err, data) {
        if (err) {
          console.log(err);
            callback(err, null);
        }
        console.log(data);
        callback(null, data)
    });
  
};
var jobByUserName = function(user, callback){
  if(user.user!=="All"){
   Jobs.aggregate([
    {$match:{"user":user.user}},
   {
    
     $lookup:
       {
         from: "users",
         localField: "user",
         foreignField: "userName",
         as: "userInfo"
       }
  }
  
], function (err, data) {
        if (err) {
          console.log(err);
            callback(err, null);
        }
        console.log(data);
        callback(null, data)
    });
 }else{
   Jobs.aggregate([
   {
     $lookup:
       {
         from: "users",
         localField: "user",
         foreignField: "userName",
         as: "userInfo"
       }
  }
], function (err, data) {
        if (err) {
          console.log(err);
            callback(err, null);
        }
        console.log(data);
        callback(null, data)
    });
 }
};

var jobsByCategory = function(category, callback){
  if(category.category!=="All"){
   Jobs.aggregate([
    {$match:{"category":category.category}},
   {
    
     $lookup:
       {
         from: "users",
         localField: "user",
         foreignField: "userName",
         as: "userInfo"
       }
  }
  
], function (err, data) {
        if (err) {
          console.log(err);
            callback(err, null);
        }
        console.log(data);
        callback(null, data)
    });
 }else{
   Jobs.aggregate([
   {
     $lookup:
       {
         from: "users",
         localField: "user",
         foreignField: "userName",
         as: "userInfo"
       }
  }
], function (err, data) {
        if (err) {
          console.log(err);
            callback(err, null);
        }
        console.log(data);
        callback(null, data)
    });
 }
  
};

var jobsByStartTime = function(from, callback){
  Jobs.find({from: from}, function(err, data){
    if(err){
      callback(err, null)
    } else {
    callback(null, data)
  }
  });
};

var jobsByEndTime = function(to, callback){
  Jobs.find({to: to}, function(err, data){
    if(err){
      callback(err, null)
    } else {
    callback(null, data)
  }
  });
};
var updateUserJob = function(jobTitle,user, updatedData, callback){
  console.log('ups',updatedData)
  Jobs.findOneAndUpdate({jobTitle: jobTitle,user:user}, {$set: updatedData}, callback)
};
var updateJobs = function(jobTitle, updatedData, callback){
  Jobs.findOneAndUpdate({jobTitle: jobTitle}, {$set: updatedData}, callback)
};

var deleteJob = function(jobTitle, callback){
  Jobs.deleteOne({jobTitle: jobTitle}, callback)
};
var createComment=function(comment,callback){
  console.log("req,commmetn",comment);
  
  var comment=new Comments({
    username:comment.user,
    text: comment.comments
  })

  comment.save(function(err){
    if(err){
      callback(err)
    }
  callback(null,comment)

  })

}

// Exporting the Model and the functions
module.exports.Jobs = Jobs;
module.exports.Comments = Comments;
module.exports.createJob = createJob;
module.exports.allJobs = allJobs;
module.exports.jobByTitle = jobByTitle;
module.exports.jobsByCategory = jobsByCategory;
module.exports.jobByUserName = jobByUserName;
module.exports.jobsByStartTime = jobsByStartTime;
module.exports.jobsByEndTime = jobsByEndTime;
module.exports.updateJobs = updateJobs;
module.exports.deleteJob = deleteJob;
module.exports.findSome = findSome;
module.exports.getUserJob = getUserJob;
module.exports.updateUserJob = updateUserJob;
module.exports.getJobById=getJobById;
module.exports.createComment = createComment;
