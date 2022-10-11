import passport from "passport";
import passportLocal from "passport-local";
import UsuarioController from "../src/controllers/usuariosController.js";
import Utilities from "../src/utilities.js";

const LocalStrategy = passportLocal.Strategy;

const authentication = passport.use(
	new LocalStrategy({
		usernameField: 'email',
		passwordField: 'senha',
		session: false
	}, async (email, senha, done) => {
		try {
			let user = await UsuarioController.findByEmail(email);
			if (!user) return done(null, false, { message: 'User not found.' });
			
			let verifyPassword = await Utilities.verifyPassword(senha, user.senha)
			if (!verifyPassword) return done(null, false, { message: 'Invalid password.' }); 

			return done(null, user);
		} catch (error) {
			done(error);
		}
	})
);

export default authentication;