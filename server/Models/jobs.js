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
  salary: {
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
  dateFrom: String,
  dateTo: String,

   takenBy:{
    type:String,
    default:"Vacant"

   }

});


var InterestSchema= mongoose.Schema({
  username: {
    type:String,
    index: {unique: true }
  },
  jobId: {
    type:String,
  }
})

var Interests= mongoose.model("Interests", InterestSchema)



var commentsSchema= mongoose.Schema({
  username: String,
  text: String,
  idJob: String


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

Jobs.aggregate([

   { $match: {'_id':mongoose.Types.ObjectId(jobId)} },
  
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
       // console.log("get data",data);
        callback(null, data)
    });
}






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
  Jobs.findOneAndUpdate({jobTitle: jobTitle,user:user}, {$set: updatedData}, callback)
};
var updateJobs = function(jobTitle, updatedData, callback){
  Jobs.findOneAndUpdate({jobTitle: jobTitle}, {$set: updatedData}, callback)
};

var deleteJob = function(jobTitle, callback){
  Jobs.deleteOne({jobTitle: jobTitle}, callback)
};
var createComment=function(comment,userName,callback){  
  var comment=new Comments({
    username:userName.userName,
    text: comment.comments,
    idJob: comment._id,
  })

  comment.save(function(err){
    if(err){
      callback(err)
    }
  callback(null,comment)

  })

}
var findComment = function (id, callback){
  Comments.find(function(err, data){
    if(err){
      callback(err, null)
    } else {
      var arr=[];
      for(var i=0;i<data.length;i++){
        console.log(data[i].idJob)
        
        if(id.id===data[i].idJob){
          arr.push(data[i])
        }
      }
      console.log(arr)
    callback(null, arr)
  }
  });
};



var createJobInterest=function(jobId,loggedUser,callback){
  var interest=new Interests({
    username:loggedUser,
    jobId: jobId
  })

  interest.save(function(err){
    if(err){
      callback(err)
    }
  callback(null,interest)

  })
 }



 var getInterestUsers=function(jobId,callback){
  Interests.find({jobId:jobId},function(err,data){

    if(err)
      callback(err,null);
    else{

     callback(null,data);
    }
  })

 }


 var assignJob=function(jobId,user,callback){


Jobs.findById({_id:jobId},function(err,data){
  if(err)
    callback(err,null);

  else{
    if (data.takenBy==='Vacant'){
        data.takenBy=user;
        data.save(function(err){
        if (err)   console.log("error in saving takenBy")
       })
      }
    callback(null,data);
  }
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
module.exports.findComment = findComment;
module.exports.createJobInterest=createJobInterest;
module.exports.getInterestUsers=getInterestUsers;
module.exports.assignJob=assignJob;

