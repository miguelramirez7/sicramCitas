var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;

// cargando y usando el modelo usuario
var User = require('../models/user');
var config = require('../database/key');//para obtener el secreto

module.exports = function(passport) {
  var opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  opts.secretOrKey = config.database.secretU;
  
  
  //estrategia para encontrar al paciente a partir del token y nos retornarar el user que sera de paciente
  passport.use('user',new JwtStrategy(opts, async function(jwt_payload, done) {
    User.findOne({username: jwt_payload.username}, function(err, user) {
          if (err) {
              return done(err, false);
          }
          if (user) {
              done(null, user);
              
          } else {
              done(null, false);
          }
      });
  }));

 
};