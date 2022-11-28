/* eslint-disable import/extensions */
import passport from 'passport';
import passportLocal from 'passport-local';
import passportHttpBearer from 'passport-http-bearer';
import jwt from 'jsonwebtoken';
import AuthController from '../controllers/authController.js';
import Utilities from '../utilities.js';

const BearerStrategy = passportHttpBearer.Strategy;
const LocalStrategy = passportLocal.Strategy;

const authentication = passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      session: false,
    },
    async (email, password, done) => {
      try {
        const user = await AuthController.findByEmail(email);
        if (!user) return done(null, false, { message: 'User not found.' });

        const verifyPassword = await Utilities.verifyPassword(
          password,
          user.password,
        );
        if (!verifyPassword) {
          return done(null, false, { message: 'Invalid password.' });
        }

        return done(null, user);
      } catch (error) {
        done(error);
      }
    },
  ),
);

const authenticationBearer = passport.use(
  new BearerStrategy(async (token, done) => {
    try {
      const isTokenValid = await AuthController.findToken(token);
      if (isTokenValid) {
        const payload = jwt.verify(token, process.env.CHAVE_JWT);
        const user = await AuthController.findOne(payload.id);
        done(null, user);
      } else {
        done(null);
      }
    } catch (error) {
      done(error);
    }
  }),
);

export default { authentication, authenticationBearer };
