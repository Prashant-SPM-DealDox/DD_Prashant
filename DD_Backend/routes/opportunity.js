const express = require('express');

// Authentication
const requireAuth = require('../middleware/requireAuth');

// Controller functions
const { addOpportunity, getOpportunity, updateOpportunity, deleteOpportunity, getSpecificOpportunity } = require('../controllers/opportunityController');

const router = express.Router();

// Require auth for all routes
router.use(requireAuth);

// Accounts route
router.post('/add', addOpportunity);

router.post('/get', getOpportunity);

router.put('/update/:id', updateOpportunity);

router.delete('/delete/:id', deleteOpportunity);

// Quotes Opp Route
router.post('/getOpp', getSpecificOpportunity);

/**
 * @swagger
 * /api/opportunity/add:
 *    post:
 *     summary: Add Opportunity
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               account_Id:
 *                 type: object
 *               opportunity_name:
 *                 type: string
 *               net_price:
 *                 type: string
 *               margin:
 *                 type: string
 *               cost:
 *                 type: number
 *               stage:
 *                 type: string
 *               probability:
 *                 type: string
 *               hours:
 *                 type: string
 *               close:
 *                 type: date
 *               start:
 *                 type: date
 *               duration_weeks:
 *                 type: number
 *               owner:
 *                 type: string
 *               region:
 *                 type: number
 *               vertical:
 *                 type: string
 *               practice:
 *                 type: number
 *               currency:
 *                 type: string
 *               org:
 *                 type: string
 *               opportunity_type:
 *                 type: string
 *     responses:
 *       200:
 *         description: "Successful response"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 * 
 * /api/opportunity/get:
 *   post:
 *     summary: Get opportunity Data
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               account_Id:
 *                 type: object
 *     responses:
 *       200:
 *         description: "Successful response"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       account_Id:
 *                         type: object
 *                       opportunity_name:
 *                         type: string
 *                       net_price:
 *                         type: string
 *                       margin:
 *                         type: string
 *                       cost:
 *                         type: number
 *                       stage:
 *                         type: string
 *                       probability:
 *                         type: string
 *                       hours:
 *                         type: string
 *                       close:
 *                         type: date
 *                       start:
 *                         type: date
 *                       duration_weeks:
 *                         type: number
 *                       owner:
 *                         type: string
 *                       region:
 *                         type: number
 *                       vertical:
 *                         type: string
 *                       practice:
 *                         type: number
 *                       currency:
 *                         type: string
 *                       org:
 *                         type: string
 *                       opportunity_type:
 *                         type: string
 *                 message:
 *                   type: string
 * 
 * /api/opportunity/update/{id}:
 *   put:
 *     summary: Update Opportunity
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         type: string
 *         required: true
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *              
 *               opportunity_name:
 *                 type: string
 *               net_price:
 *                 type: string
 *               margin:
 *                 type: string
 *               cost:
 *                 type: number
 *               stage:
 *                 type: string
 *               probability:
 *                 type: string
 *               hours:
 *                 type: string
 *               close:
 *                 type: string
 *                 discription: close
 *                 format: date
 *               start:
 *                 type: string
 *                 discription: start
 *                 format: date
 *               duration_weeks:
 *                 type: number
 *               owner:
 *                 type: string
 *               region:
 *                 type: number
 *               vertical:
 *                 type: string
 *               practice:
 *                 type: number
 *               currency:
 *                 type: string
 *               org:
 *                 type: string
 *               opportunity_type:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 * 
 * /api/opportunity/delete/{id}:
 *   delete:
 *     summary: Update Opportunity
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         type: string
 *         required: true
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *              
 *               opportunity_name:
 *                 type: string
 *               net_price:
 *                 type: string
 *               margin:
 *                 type: string
 *               cost:
 *                 type: number
 *               stage:
 *                 type: string
 *               probability:
 *                 type: string
 *               hours:
 *                 type: string
 *               close:
 *                 type: string
 *                 discription: close
 *                 format: date
 *               start:
 *                 type: string
 *                 discription: start
 *                 format: date
 *               duration_weeks:
 *                 type: number
 *               owner:
 *                 type: string
 *               region:
 *                 type: number
 *               vertical:
 *                 type: string
 *               practice:
 *                 type: number
 *               currency:
 *                 type: string
 *               org:
 *                 type: string
 *               opportunity_type:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 * 
 * /api/opportunity/getOpp:
 *   post:
 *     summary: Get specific opportunity data
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               opp_id:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       account_Id:
 *                         type: object
 *                       opportunity_name:
 *                         type: string
 *                       net_price:
 *                          type: string
 *                       margin:
 *                          type: string
 *                       cost:
 *                         type: number
 *                       stage:
 *                          type: string
 *                       probability:
 *                          type: string
 *                       hours:
 *                          type: string
 *                       close:
 *                         type: date
 *                       start:
 *                         type: date
 *                       duration_weeks:
 *                         type: number
 *                       owner:
 *                          type: string
 *                       region:
 *                         type: number
 *                       vertical:
 *                          type: string
 *                       practice:
 *                         type: number
 *                       currency:
 *                          type: string
 *                       org:
 *                          type: string
 *                       opportunity_type:
 *                          type: string
 *                 message:
 *                   type: string
 *       '404':
 *         description: Opportunity Data Not Found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 *       '401':
 *         description: Failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

module.exports = router;
