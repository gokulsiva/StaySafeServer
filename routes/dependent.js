var express = require('express');
var router = express.Router();

// Require controller modules
var dependent_controller = require('../controllers/dependentController');

/* GET dependents listing. */
router.get('/', function(req, res, next) {
  res.send('Use proper api call.');
});

/// Dependent ROUTES ///

// GET request for creating Dependent. NOTE This must come before route for id (i.e. display dependent).
router.get('/create', dependent_controller.dependent_create_get);

// POST request for creating Dependent.
router.post('/create', dependent_controller.dependent_create_post);

// GET request to delete Dependent.
router.get('/:id/delete', dependent_controller.dependent_delete_get);

// POST request to delete Dependent.
router.post('/:id/delete', dependent_controller.dependent_delete_post);

// GET request to update Dependent.
router.get('/:id/update', dependent_controller.dependent_update_get);

// POST request to update Dependent.
router.post('/:id/update', dependent_controller.dependent_update_post);

// GET request for one Dependent.
router.get('/:id', dependent_controller.dependent_detail);

// GET request for list of all Dependents.
router.post('/list', dependent_controller.dependent_list);


module.exports = router;
