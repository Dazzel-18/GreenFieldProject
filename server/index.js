var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var redirect = require('express-redirect');
var db = require('../database-mongo/index.js');
var Users = require('./Models/users');
var Jobs = require('./Models/jobs');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var expressValidtor = require('express-validator');
var mongoStore = require('connect-mongo')(session);

//it generates a unique id for the session
var generateSecret = function (){
	var j, x;
	var random = ['f', 'b', 'C', 'v', 'I', 'f', 'N', 'E', 'j', 'w', 'i',
	'H', 'N', 'H', 'z', '7', 'n', 'n', 'a', '3', 'V', 'I', 'Q', 'J', 'Q'];

	for (var i = random.length - 1; i > 0; i--) {
		j = Math.floor(Math.random() * (i + 1));
		x = random[i];
		random[i] = random[j];
		random[j] = x;
	}

	return random.join('');
};

var app = express();
redirect(app);

//connects the server with client side
app.use(express.static(__dirname + '/../react-client/dist'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
 extended: false 
}));
app.use(cookieParser());
app.use(expressValidtor());
app.use(session({
	secret: generateSecret(),
	saveUninitialized: false,
	resave: false,
	store:new mongoStore({
		mongooseConnection: mongoose.connection
	}),
	cookie:{
		maxAge: 180*60*1000
	}
}));

// to handle users request to retrive all users
app.get('/users', function(req,res){
	Users.retriveALlUsers(function(err,data){

		if (err){
			res.status(500);
			res.send(err);
		} else {
			res.status(200);
			res.send(data);
		}

	})
})

//it renders all the jobs
app.get('/jobs', function(req, res){
	Jobs.allJobs(function(err, jobs){

		if(err){
			console.log(err);
		} else {
			res.send(jobs);
		}

	});	
});

app.get('/jobinfo/:jobid', function(req, res){
	var jobid = req.params.jobid;
	Jobs.getJobById(jobid, function(err, job){

		if(err){
			console.log(err);
		} else {
			res.send(job);
		}

	});	
});

app.get('/logged', function(req, res){

	if(req.session.userName){
		res.send(true)
	}else{
		res.send(false)
	}

});

//it renders the jobs for each individual user
app.get('/userJobs', function(req, res){
	Jobs.jobByUserName({'user': req.session.userName}, function(err, job){

		if(err){
			console.log(err);
		} else {
			res.send(job);
		}

	});
});
app.get('/userJobss/:userName', function(req, res){
	Jobs.jobByUserName({'user': req.params.userName}, function(err, job){

		if(err){
			console.log(err);
		} else {
			res.send(job);
		}

	});
});

app.post('/userJob', function(req, res){
	Jobs.getUserJob(req.body.jobTitle,req.body.user, function(err, user){

		if(err){
			console.log(err);
		} else {
			res.send(user);
		}

	});
});

//it add a new comment for this User
app.post('/comment', function(req, res){
	var user = req.session.userName;

	if(user === undefined){
		user = 'none'
	}

	Jobs.createComment(req.body.states,{'userName':user},
	function(err,comment){

	    if(err){
	      res.send(err)
	    }

  		res.json(comment)
	})
});

app.get('/comment/:id', function(req, res){
	Jobs.findComment({'id': req.params.id}, function(err,comment){

	    if(err){
	      res.send(err)
	    }

	  	res.json(comment)
	})
});

//it updates the user job
app.put('/updateUserJob', function(req, res){
	Jobs.updateUserJob(req.body.jobTitle,req.body.states.user,req.body.states,
	function(err, user){

		if(err){
			console.log(err);
		} else {

			res.send(user);
		}

	});
});

// search users
app.get('/findUser/:userName', function (req, res) {
	Users.getUserInfo(req.params.userName, function(err, user){

		if(err){
			console.log(err);
		} else {
			res.send(user);
		}

	});
});

app.get('/userInfo', function(req, res){
	Users.getUserInfo(req.session.userName, function(err, user){

		if(err){
			console.log(err);
		} else {
			res.send(user);
		}

	});
});

//it updates the user information
app.put('/updateUser', function (req, res) {
	var query = req.session.userName;
	var updatedData = req.body;
	Users.updateUsers(query, updatedData, function(err, users){

		if(err){
			console.log(err);
		} else {
			res.send(users);
		}

	});
});

//sends the user information to the database
app.post("/signup",function(req, res){
	var user = req.body
	Users.createUsers(user, function(err, userdata){

		if(err){
			console.log(err);
		} else {
			res.send(userdata);
		}

	});
});

app.post('/rating',function(req,res){

	if(req.session.userName !== req.body.username){
		Users.findRate(req.body,function(err,result){

			if (!err && result) {
			    result.rating.numberOfRater++ ;// update ur values goes here
			    result.rating.Total += req.body.Total;
			    res.send(result);
			} else {
		       	res.status(500);
		       	res.send(err);
	       	}

		})
	}

})

// destroys sessions when logout
app.get('/logout', function (req, res) {
	req.session.destroy();
	res.redirect('/');
});

//it checks the user information; if it already exists, it will create a session
app.post('/login', function (req, res) {
	Users.getUser(req.body.userName, req.body.password, function(err, user){

		if(err){
			res.send(err);
		} else {
			req.session.userName = user.userName;
			res.locals.login = user;
			res.locals.session = req.session;
			res.redirect('/');
		}

	});
});

//it creates a new job
app.post('/job', function(req, res){
	Jobs.createJob(req.session.userName,req.body, function(err,jobs){

		if(err){
			console.log(err);
		} else {
			res.send(jobs);
		}

	})
});

//it searches jobs by title
app.post('/someJobs', function (req, res) {
	Jobs.findSome(req.body.query, function(err, jobs){

		if(err){
			console.log(err);
		} else {
			res.send(jobs);
		}

	});
});

//it searches jobs by category
app.post('/jobCategory', function (req, res) {
	Jobs.jobsByCategory({"category":req.body.category}, function(err, job){

		if(err){
			console.log(err);
		} else {
			res.send(job);
		}

	});
});

app.delete('/:jobTitle', function(req, res){
	Jobs.deleteJob(req.body.jobTitle, function(err, job){

		if(err){
			console.log(err);
		} else {
			res.send(job);
		}

	});
});

// get user in the session
app.get('/job/interest', function(req,res){
	res.status(200);
	res.send(req.session.userName);
})

app.get('/interest/:jobid', function(req,res){
	var jobId = req.params.jobid;
	Jobs.getInterestUsers(jobId, function(err,data){

		if(err) {
			res.status(500);
			res.send(err);
		} else {
			res.status(200);
			res.send(data);
		}

	})
})

app.get('/job/interest/:jobid',function(req,res){
	var id = req.params.jobid;
	var loggedUser = req.session.userName;
	Jobs.createJobInterest(id, loggedUser, function(err, user){

		if(err){
			console.log("err");
		} else {
			console.log("success");
		}

	})
})

app.get('/jobinfo/:jobid', function(req, res){
	var jobid = req.params.jobid;
	Jobs.getJobById(jobid, function(err, job){

		if(err){
			console.log(err);
		} else {
			res.send(job);
		}

	});	
});

app.post('/assignjob',function(req, res){
	var jobId = req.body.jobId;
	var user = req.body.user;
	Jobs.assignJob(jobId, user, function(err, data){

		if(err){
			res.status(500);
			res.send(err);
		}

	})
})

app.get('/taken', function (req, res) {
	Jobs.findTaken(req.session.userName, function(err, jobs){

		if(err){
			console.log(err);
		} else {
			res.send(jobs);
		}

	});
});

app.set('port', (process.env.PORT || 3000));
app.listen(app.get('port'), function() {
  console.log('listening on port ', app.get('port'));
});

