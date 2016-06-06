'use strict';

var path = process.cwd();
var ClickHandler = require(path + '/app/controllers/clickHandler.server.js');

module.exports = function (app, passport) {

	function isLoggedIn (req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		} else {
			res.redirect('/login');
		}
	}

	var clickHandler = new ClickHandler();

	app.route('/')
		.get(function (req, res) {
			console.log(req.session);
			res.sendFile(path + '/public/index.html');
		});

	app.route('/polls/new')
		.get(isLoggedIn, function (req, res) {
			res.sendFile(path + '/public/newPoll.html');
		});

	app.route('/polls/new')
		.post(isLoggedIn, function (req, res) {
			console.log("Here comes dat body");
			console.log(req.body);
			res.send("Hi");
		});

	app.route('/login')
		.get(function (req, res) {
			res.sendFile(path + '/public/login.html');
		});

	app.route('/loggedin')
		.get(function(req, res) { 
			res.send(req.isAuthenticated() ? req.user : '0'); 
		});

	app.route('/logout')
		.get(function (req, res) {
			req.logout();
			res.redirect('back');
		});

	app.route('/profile')
		.get(isLoggedIn, function (req, res) {
			res.sendFile(path + '/public/profile.html');
		});

	app.route('/api/:id')
		.get(isLoggedIn, function (req, res) {
			res.json(req.user.github);
		});

	app.route('/auth/github')
		.get(passport.authenticate('github'));

	app.route('/auth/github/callback')
		.get(passport.authenticate('github', {
			successRedirect: '/',
			failureRedirect: '/login'
		}));

	app.route('/api/:id/clicks')
		.get(isLoggedIn, clickHandler.getClicks)
		.post(isLoggedIn, clickHandler.addClick)
		.delete(isLoggedIn, clickHandler.resetClicks);
};
