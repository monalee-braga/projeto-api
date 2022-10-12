import passport from "passport";
import passportLocal from "passport-local";
import UsuarioController from "../../src/controllers/usuariosController.js";
import passportHttpBearer from "passport-http-bearer";
import jwt from "jsonwebtoken";
import Utilities from "../utilities.js";

const BearerStrategy = passportHttpBearer.Strategy;
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

const authenticationBearer = passport.use(
	new BearerStrategy(
		async (token, done) => {
			try {
				const payload = jwt.verify(token, process.env.CHAVE_JWT);
				const user = await UsuarioController.findOne(payload.id);
				done(null, user);
			} catch (error) {
				done(error);
			}
		}
	)
);

export default { authentication, authenticationBearer };