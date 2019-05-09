const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const db = require('../../database/db');

// Create a passport middleware to handle User login
passport.use(new LocalStrategy({
    usernameField : 'username',
    passwordField : 'password'
}, (username, password, done) => {
	if (!username || username.length < 2 || !password)
        return done(null, false, { message: "Your submission is invalid." });
	// Verify user exists by username
	db.selectAccount(username).then(user => {
		// If account doesn't exist
		if (!user)
			return done(null, false, { message: "Username or password is incorrect." }); // vague on purpose

		// Verify password
		bcrypt.compare(password, user.password).then(valid => {
			if (valid)
				return done(null, user);
			else
				return done(null, false, { message: "Username or password is incorrect." });
		});
	}).catch(err => {
		return done(null, false, { message: "Username or password is incorrect." });
	});
}));