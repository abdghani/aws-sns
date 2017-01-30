var express = require('express');
var path = require('path');
var user = require(path.join(__dirname,'..','controller','userValidation'));
var router = express.Router();

router.post('/createUser',
    user.checkUserExistUser,
    user.createUser
);

router.post('/getKey',
    user.verifyUser,
    user.getKey
);

module.exports = router;
