const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create a Schema and a Model

const UserSchema = new Schema({
    firstName: String,
    lastName: String,
	 email: String,
	 password: String,
	 work: String,
	 education: String,
    music: String,
	 shows: String,
	 sports: String,
});

const User = mongoose.model('user', UserSchema);

module.exports = User;
