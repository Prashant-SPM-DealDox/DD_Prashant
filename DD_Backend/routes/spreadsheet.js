const express = require('express')

const requireAuth = require('../middleware/requireAuth');

const {getCatalogQuestions  , getAnswerByQuestionId, saveCalcData, getAllCalcData } = require('../controllers/spreadsheetController')

const router = express.Router()

router.use(requireAuth);


router.post('/display/question', getCatalogQuestions);
// router.get('/display/:survey_questions_id', getByPosition);
router.post('/display/answer', getAnswerByQuestionId);

router.post('/display/data/addcalc', saveCalcData);

router.post('/display/data/getcalc', getAllCalcData);


module.exports = router;

//getCatalogQuestions getByPosition,