import passport from "passport";
import UsuarioController from "../src/controllers/usuariosController.js";
import passportHttpBearer from "passport-http-bearer";
import jwt from "jsonwebtoken";

const BearerStrategy = passportHttpBearer.Strategy;

const authenticationBearer = passport.use(
	new BearerStrategy(
		async (token, done) => {
			try {
				const payload = jwt.verify(token, process.env.CHAVE_JWT);
				const user = await UsuarioController.findById(payload.id);
				done(null, user);
			} catch (error) {
				done(error);
			}
		}
	)
);

export default authenticationBearer;