const express = require('express')
const { userRegistration, userProfile } = require('../controllers/userController')
const  verifyJWT = require('../middleware/verifyJWT')
const router = express.Router()

router.post('/registeruser',userRegistration)
router.get('/userprofile',verifyJWT,userProfile)


module.exports = router