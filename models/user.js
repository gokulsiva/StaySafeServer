var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = new Schema(
  {
    name: {type: String, required: true, max: 100, trim:true},
    email: {type: String, required: true, max: 100, unique: true, lowercase:true, trim:true},
    password: {type: String, required: true, max: 100, trim:true},
    gender: {type: String, required: true, trim:true},
    dob: {type:Date, required: true, default:Date.now},
    contact_no: {type:Number}
  }
);

// Virtual for author's full name
UserSchema
.virtual('userName')
.get(function () {
  return this.name;
});

// Virtual for author's URL
UserSchema
.virtual('userEmail')
.get(function () {
  return this.email;
});

//Export model
module.exports = mongoose.model('User', UserSchema);