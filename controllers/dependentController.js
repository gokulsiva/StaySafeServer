var Dependent = require('../models/dependent');
var User = require('../models/user');

// Display list of all Dependents.
exports.dependent_list = function(req, res) {
	res.setHeader('Content-Type', 'application/json');
	var resultObj = {'status':'', 'msg':{}, 'dependents':[]};
	var body = req.body;
	var userId = body.userId;
	Dependent.find({'user' : userId}).
	populate('dependent').
	exec(function (err, dependents_list) {
    if (err) {
    	resultObj.status = 'failure';
	  	resultObj.msg = JSON.stringify(err);
	  } else {
	  	resultObj.status = 'success';
	  	resultObj.msg = "successfully retrived dependent details.";
	  	var userObjArr = [];
	  	for (var i = 0; i < dependents_list.length; i++) {
	  		var tempDepObj = dependents_list[i].dependent.userObj;
	  		userObjArr.push(tempDepObj);
	  	}
	  	resultObj.dependents = userObjArr;
	  }
	  res.send(JSON.stringify(resultObj));
  });
};

// Display detail page for a specific Dependent.
exports.dependent_detail = function(req, res) {
    res.send('NOT IMPLEMENTED: Dependent detail: ' + req.params.id);
};

// Display Dependent create form on GET.
exports.dependent_create_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Dependent create');
};

// Display Dependent create form on GET.
exports.dependent_create_post = function(req, res) {
    res.setHeader('Content-Type', 'application/json');
	var resultObj = {'status':'', 'msg':{}};
	var body = req.body;
	var userId = body.userId;
	var dependentId = body.dependentId;

	User.findById(userId, function (err, user) {
	  if (err) {
	  	resultObj.status = 'failure';
	  	resultObj.msg = JSON.stringify(err);
	  	res.send(JSON.stringify(resultObj));
	  } else {
		  User.findById(dependentId, function (err, dependent) {
			  if (err) {
			  	resultObj.status = 'failure';
			  	resultObj.msg = JSON.stringify(err);
			  	res.send(JSON.stringify(resultObj));
			  } else {
				  	if (user && user.id && dependent && dependent.id) {
				  		var newDependent = new Dependent({'user':user, 'dependent':dependent, 'pkey':user.id+dependent.id});
						newDependent.save(function(err, newdependent){
							if (err) {
								resultObj.status = 'failure';
								if(err.code == 11000){
									resultObj.msg = "Dependent already exists.";
								} else {
									resultObj.msg = "Error saving data.";
								}
							} else {
								resultObj.status = 'success';
								resultObj.msg = 'Dependent added successfully.';
							}
							res.send(JSON.stringify(resultObj));
						});
				  	} else {
				  		resultObj.status = 'failure';
				  		resultObj.msg = "Unable to find such dependent.";
				  		res.send(JSON.stringify(resultObj));
				  	}
			  }
			});
	  }
	});
};

// Display Dependent delete form on GET.
exports.dependent_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Dependent delete GET');
};

// Handle Dependent delete on POST.
exports.dependent_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Dependent delete POST');
};

// Display Dependent update form on GET.
exports.dependent_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Dependent update GET');
};

// Handle Dependent update on POST.
exports.dependent_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Dependent update POST');
};
