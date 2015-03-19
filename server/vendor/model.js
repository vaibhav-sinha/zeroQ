var Mongoose = require('mongoose');
var Uuid = require('node-uuid');

var api = {};

//Define schema
var vendorSchema = Mongoose.Schema({
    firstName: String,
    lastName: String,
    mobile: Number,
    email: {type: String, unique: true, required: true},
    userId: {type: Number, unique: true, required: true},
    picture: String,
    address: String,
    account: {
        bank: String,
        number: Number
    },
    password: String
});

//Define methods on schema
vendorSchema.methods.findByEmail = function(cb) {
    return this.model('Vendor').find({email: this.email}, cb);
};

//Compile schema into model
Vendor = Mongoose.model('Vendor', vendorSchema);

//Define APIs
api.createOrUpdateVendorFromGoogleData = function(obj, cb) {
    var query = {userId: obj.id};
    var vendor = {
        firstName: obj.name.givenName,
        lastName: obj.name.familyName,
        email: obj.emails[0].value,
        userId: obj.id,
        picture: obj.image.url,
        password: Uuid.v1()
    };
    var options = {
        new: true,
        upsert: true
    };
    Vendor.findOneAndUpdate(query, vendor, options, cb);
};

exports.Vendor = Vendor;
exports.api = api;

exports.attributes = {
    name: 'vendorModel',
    version: '1.0.0'
};