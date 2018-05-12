var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = new Schema(
  {
    name: {type: String, required: true, max: 100, trim:true},
    email: {type: String, required: true, max: 100, unique: true, lowercase:true, trim:true},
    password: {type: String, required: true, max: 100, trim:true},
    gender: {type: String, required: true, trim:true},
    mpin: {type:String, required: true},
    dob: {type:Date, required: true, default:Date.now},
    contact_no: {type:Number},
    fbaseToken: {type: String},
    guardianId: {type: String, default:""}

  }
);

// Virtual for author's full name
UserSchema
.virtual('id')
.get(function () {
  return this._id;
});

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

// Virtual for author's URL
UserSchema
.virtual('userObj')
.get(function () {
  var user = {};
  var date = new Date(this.dob);
  date = (date.getMonth() + 1)+'-'+date.getDate()+'-'+date.getYear();
  user.id = this._id;
  user.name = this.name;
  user.email = this.email;
  user.gender = this.gender;
  user.mpin = this.mpin;
  user.dob = date;
  user.contact_no = this.contact_no;
  user.fbaseToken = this.fbaseToken;
  user.guardianId = this.guardianId;
  return JSON.parse(JSON.stringify(user));
});

//Export model
module.exports = mongoose.model('User', UserSchema);