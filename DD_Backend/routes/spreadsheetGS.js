const express = require('express')

const requireAuth = require('../middleware/requireAuth');

const {getGuidedSellingQuestions  , getAnswerByQuestionIdGS, saveCalcDataGS, getAllCalcDataGS } = require('../controllers/SpreadSheetGSController')

const router = express.Router()

router.use(requireAuth);


router.post('/displaygs/questiongs', getGuidedSellingQuestions);
// router.get('/display/:survey_questions_id', getByPosition);
router.post('/displaygs/answergs', getAnswerByQuestionIdGS);

router.post('/displaygs/data/addcalcgs', saveCalcDataGS);

router.post('/displaygs/data/getcalcgs', getAllCalcDataGS);


module.exports = router;

//getCatalogQuestions getByPosition,