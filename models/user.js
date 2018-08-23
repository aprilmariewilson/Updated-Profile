const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const userSchema = new Schema({
    name:{ type: String, required: true, trim: true },
    phoneNumber: { type:String, trim: true },
    email: {type: String, required: true, trim: true },
    message:[ {body: String, date: Date}],
    date: {type: Date, default: Date.now}
});

const User = mongoose.model('User', userSchema);

module.exports = User;