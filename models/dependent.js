var mongoose = require('mongoose');
var User = require('./user');

var Schema = mongoose.Schema;

var DependentSchema = new Schema(
  {
  	pkey: {type: String, required: true, unique: true},
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    dependent: {type: Schema.Types.ObjectId, ref: 'User'}
  }
);

//Export model
module.exports = mongoose.model('Dependent', DependentSchema);