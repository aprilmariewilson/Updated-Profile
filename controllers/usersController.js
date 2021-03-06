const dotenv = require('dotenv');
dotenv.config();
require("json-stringify");
const db = require('./../models');
const nodemailer = require('nodemailer');
const fromEmail = process.env.DB_USER || process.env.DB_USER;
const password = process.env.DB_PASSWORD || process.env.DB_PASSWORD;
const toEmail = process.env.DB_EMAIL || process.env.DB_EMAIL;
const transporter = nodemailer.createTransport({
	host: 'smtp.gmail.com',
	port: 465,
	secure: true,
	tls: {
		ciphers: 'SSLv3',
		rejectUnauthorized: false
	},
	auth: {
		user: fromEmail,
		pass: password
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
		console.log("controller" + db.User);
		const mailOptions = {
			from: fromEmail,
			to: toEmail,
			subject: 'Portfolio hit ',
			text: 'Someone is contacting you through your portfolio! Name: ' + req.body.name + 
			' Email: ' + req.body.email + ' Number: ' + req.body.phoneNumber + '  Message: ' + req.body.message
		};
		db.User
			.create(req.body)
			.then((dbModel, err) => {
				err ? console.log("try again") : 
				console.log("Response from the create", dbModel);
				res.json(dbModel);
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