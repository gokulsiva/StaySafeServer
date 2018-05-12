var User = require('../models/user');
var nodemailer = require('nodemailer');

// Display list of all Users.
exports.user_list = function(req, res) {
    res.send('NOT IMPLEMENTED: User list');
};

// Display detail page for a specific User.
exports.user_detail = function(req, res) {
    res.send('NOT IMPLEMENTED: User detail: ' + req.params.id);
};

// Display User create form on GET.
exports.user_create_get = function(req, res) {
    res.render('userCreate');
};

exports.user_authenticate_post = function(req, res) {
	res.setHeader('Content-Type', 'application/json');
	var resultObj = {'status':'', 'msg':{}, 'user':{}};
	var authUser = {id:'', name:'', email:'', dob:'', mpin:'', contact_no:9876543210, gender:'', fbaseToken: ''}
	var body = req.body;
	var email = body.email;
	var password = body.password;
	User.findOne({'email':email, 'password':password}, function(err, user){
		if (err || !user) {
			resultObj.status = 'failure';
			if(!user){
				resultObj.msg = "Invalid email/password.";
			} else {
				resultObj.msg = "Error retriving data.";
			}
		} else {
			resultObj.status = 'success';
			resultObj.msg = 'User authenticated.';
			authUser = user.userObj;
		}
		resultObj.user = authUser;
		res.send(JSON.stringify(resultObj));
	});
};

// Handle User create on POST.
exports.user_create_post = function(req, res) {
	res.setHeader('Content-Type', 'application/json');
	var resultObj = {'status':'', 'msg':{}, 'id':''};
	var body = req.body;
	var name = body.name;
	var email = body.email;
	var password = body.password;
	var mpin = body.mpin;
	var gender = body.gender;
	var dob = new Date(body.dob);
	var contact_no = body.contact_no;
	var newUser = new User({'name':name, 'email':email, 'password':password, 'mpin':mpin, 'gender': gender, 'dob':dob, 'contact_no': contact_no, 'fbaseToken': ''});

	newUser.save(function(err, newUser){
		if (err) {
			resultObj.status = 'failure';
			if(err.code == 11000){
				resultObj.msg = "Email already exists.";
			} else {
				resultObj.msg = "Error saving data.";
			}
		} else {
			resultObj.status = 'success';
			resultObj.msg = 'User added successfully.';
			resultObj.id = newUser.id;
		}
		res.send(JSON.stringify(resultObj));
	});
};

// Display User delete form on GET.
exports.user_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: User delete GET');
};

// Handle User delete on POST.
exports.user_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: User delete POST');
};

// Display User update form on GET.
exports.user_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: User update GET');
};

// Handle User update on POST.
exports.user_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: User update POST');
};

// Post request to update fbaseToken
exports.user_update_fbaseToken = function(req, res) {
	res.setHeader('Content-Type', 'application/json');
	var resultObj = {'status':'', 'msg':{}, 'fbaseToken':''};
	var body = req.body;
	var id = body.id;
	var newtoken = body.fbaseToken || '';
	User.findById(id, function (err, user) {
	  if (err) {
	  	resultObj.status = 'failure';
	  	resultObj.msg = JSON.stringify(err);
	  } else {
		  	user.fbaseToken = newtoken;
		  	user.save(function (err, updatedUser) {
		    if (err) {
		    	resultObj.status = 'failure';
		  		resultObj.msg = JSON.stringify(err);
		    } else {
		    	resultObj.status = 'success';
		    	resultObj.msg = 'successfully updated user fbaseToken.'
		    	resultObj.fbaseToken = user.fbaseToken;
		    }
		    res.send(JSON.stringify(resultObj));
	  });
	  }
	});
}

// Post request to send panic alerts
exports.user_panic = function(req, res) {
	res.setHeader('Content-Type', 'application/json');
	var resultObj = {'status':'failre', 'msg':"Unable to send."};
	var body = req.body;
	// var userId = body.userId;
	// var panic = body.panic;
	// var location = body.location;
	//TODO: Email notification
	var transporter = nodemailer.createTransport({
	  service: 'gmail',
	  auth: {
	    user: 'userEmail',
	    pass: 'userPass'
	  }
	});

	var mailOptions = {
	  from: 'userEmail',
	  to: 'receiverEmail',
	  subject: '!Danger: In troble....',
	  text: 'User is in danger. His location is lat:XX.XX, long:XX.XX'
	};

	transporter.sendMail(mailOptions, function(error, info){
	  if (error) {
	    
	  } else {
	    resultObj.status = "success";
	    resultObj.msg = "Seccessfully sent."
	  }
	  res.send(JSON.stringify(resultObj));
	});
}

// Post request to update fbaseToken
exports.user_update_guardianId = function(req, res) {
	res.setHeader('Content-Type', 'application/json');
	var resultObj = {'status':'', 'msg':{}};
	var body = req.body;
	var id = body.userId;
	var guardianId = body.guardianId || '';
	User.findById(id, function (err, user) {
	  if (err) {
	  	resultObj.status = 'failure';
	  	resultObj.msg = JSON.stringify(err);
	  } else {
		  	user.guardianId = guardianId;
		  	user.save(function (err, updatedUser) {
		    if (err) {
		    	resultObj.status = 'failure';
		  		resultObj.msg = JSON.stringify(err);
		    } else {
		    	resultObj.status = 'success';
		    	resultObj.msg = 'successfully updated.'
		    }
		    res.send(JSON.stringify(resultObj));
	  });
	  }
	});
}