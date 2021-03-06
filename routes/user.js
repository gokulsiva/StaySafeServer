var express = require('express');
var router = express.Router();

// Require controller modules
var user_controller = require('../controllers/userController');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Use proper api call.');
});

/// User ROUTES ///

// GET request for creating User. NOTE This must come before route for id (i.e. display user).
router.get('/create', user_controller.user_create_get);

// POST request for creating User.
router.post('/create', user_controller.user_create_post);

// POST request for User authenticate.
router.post('/auth', user_controller.user_authenticate_post);

// GET request to delete User.
router.get('/:id/delete', user_controller.user_delete_get);

// POST request to delete User.
router.post('/:id/delete', user_controller.user_delete_post);

// GET request to update User.
router.get('/:id/update', user_controller.user_update_get);

// POST request to update User.
router.post('/:id/update', user_controller.user_update_post);

// GET request for one User.
router.get('/:id', user_controller.user_detail);

// GET request for list of all Users.
router.get('/all', user_controller.user_list);

// Post request to update fbase request
router.post('/updateFbaseToken', user_controller.user_update_fbaseToken);

// Post request to update fbase request
router.post('/updateGuardianId', user_controller.user_update_guardianId);

// Post request to send panic alerts
router.post('/panic', user_controller.user_panic);


module.exports = router;
