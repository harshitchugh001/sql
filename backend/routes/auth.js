const express = require('express');
const router = express.Router();

const {
    signup,
    signin,
} = require('../controllers/auth');

const {
    getsurvey,
    getquestionbysurvey,
    nextquestion,
    result
}=require("../controllers/surveys");



router.post('/signup',  signup);
router.post('/signin',  signin);
router.get('/surveys', getsurvey);

router.post(`/getquestionbysurvey`, getquestionbysurvey);

router.post('/nextquestion',nextquestion);


router.post('/result',result)






module.exports = router;