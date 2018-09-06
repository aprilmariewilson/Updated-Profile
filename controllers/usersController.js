const dotenv = require('dotenv');
dotenv.config();
require("json-stringify");
const db = require('./../models');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
	host: 'smtp.gmail.com',
	port: 465,
	secure: true,
	tls: {
		ciphers: 'SSLv3',
		rejectUnauthorized: false
	},
	auth: {
		user: process.env.DB_USER,
		pass: process.env.DB_PASSWORD
	}
});


module.exports = {
	findAll: function (req, res) {
		db.User
			.find(req.query)
			.sort({ date: +1 })
			.then(dbModel => res.json(dbModel))
			.catch(err => res.status(422).json(err));
	},
	findById: function (req, res) {
		db.User
			.findById(req.params.id)
			.then(dbModel => res.json(dbModel))
			.catch(err => res.status(422).json(err));
	},
	create: function (req, res) {
		
		const mailOptions = {
			from: process.env.DB_USER,
			to: process.env.DB_EMAIL,
			subject: 'Portfolio hit ',
			text: 'Someone is contacting you through your portfolio! Name:' + req.body.name + 
			' Email: ' + req.body.email + ' Number: ' + req.body.phoneNumber + ' ' + req.body.message
		};
		db.User
			.create(req.body)
			.then((dbModel, err) => {
				err ? console.log("dammit") : console.log("????");
				console.log("Response from the create", dbModel)
				res.json(dbModel)
			})
			.then(transporter.sendMail(mailOptions, function (error, info) {
				if (error) {
					console.log(error);
				} else {
					console.log('Email sent');
				}
			}))
			.catch(err => res.status(422).json(err));
	},
	update: function (req, res) {
		db.User
			.findOneAndUpdate({ _id: req.params.id }, req.body)
			.then(dbModel => res.json(dbModel))
			.catch(err => res.status(422).json(err));
	},
	remove: function (req, res) {
		db.User
			.findById({ _id: req.params.id })
			.then(dbModel => dbModel.remove())
			.then(dbModel => res.json(dbModel))
			.catch(err => res.status(422).json(err));
	}
};