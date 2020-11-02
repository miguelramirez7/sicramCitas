var passport = require('passport');
require('../../config/userpassport')(passport);
var express = require('express');
var router = express.Router();
var doctorController = require("../../controller/doctorController");
//crera un nuevo usuario REGISTANDOTE
router.post('/signupdoctor', doctorController.SignupDoctor);


module.exports = router;