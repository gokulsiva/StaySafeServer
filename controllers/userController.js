var User = require('../models/user');

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
	var authUser = {id:'', name:'', email:'', dob:'', contact_no:9876543210, gender:''}
	var body = req.body;
	var email = body.email;
	var password = body.password;
	User.findOne({'email':email, 'password':password}, function(err, user){
		if (err || !user) {
			resultObj.status = 'failure';
			if(!user){
				resultObj.msg = "Invalid email/password.";
			} else {
				resultObj.msg = "Error saving data.";
			}
		} else {
			resultObj.status = 'success';
			resultObj.msg = 'User authenticated.';
			var userJson = JSON.parse(JSON.stringify(user));
			authUser.id = userJson._id;
			authUser.name = userJson.name;
			authUser.email = userJson.email;
			var date = new Date(userJson.dob);
			authUser.dob = (date.getMonth() + 1)+'-'+date.getDate()+'-'+date.getYear();
			authUser.contact_no = userJson.contact_no;
			authUser.gender = userJson.gender;
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
	var gender = body.gender;
	var dob = new Date(body.dob);
	var contact_no = body.contact_no;
	var newUser = new User({'name':name, 'email':email, 'password':password, 'gender': gender, 'dob':dob, 'contact_no':contact_no});

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