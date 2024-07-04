const express = require('express')

//Authentication 
const requireAuth = require('../middleware/requireAuth')

// controller functions
const { addLookupsData, getLookupsData, updateLookupData } = require('../controllers/lookups_dataController')

const router = express.Router()

// require auth for all routes
router.use(requireAuth)

// lookups route
router.post('/add', addLookupsData);
router.post('/get', getLookupsData);
router.put('/updatelookupdata', updateLookupData);

/**
 * @swagger
 * /api/lookups_data/add:
 *   post:
 *     summary: Add Lookups data
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               lookups_accesskey:
 *                 type: string
 *               lookups_name:
 *                 type: string
 *               code:
 *                 type: string
 *               value1:
 *                 type: string
 *               value2:
 *                 type: string
 *               parent_lookups_data:
 *                 type: string
 *               disable:
 *                 type: number
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
 * /api/lookups_data/get:
 *   post:
 *     summary: Get Lookups data
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               lookups_accesskey:
 *                 type: string
 *             required:
 *               - lookups_accesskey
 *     responses:
 *       200:
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
 *                       lookups_accesskey:
 *                         type: string
 *                       lookups_name:
 *                         type: string
 *                       code:
 *                         type: string
 *                       value1:
 *                         type: string
 *                       value2:
 *                         type: string
 *                       parent_lookups_data:
 *                         type: string
 *                       disable:
 *                         type: number
 *                 message:
 *                   type: string
 * /api/lookups_data/updatelookupdata:
 *   put:
 *     summary: Update Lookups_data
 *     security:
 *       - bearerAuth: []
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *                lookups_data_id:
 *                  type: string
*                lookups_accesskey:
 *                  type: string
 *                lookups_name:
 *                  type: string
 *                code:
 *                  type: string
 *                value1:
 *                  type: string
 *                value2:
 *                  type: string
 *                parent_lookups_data:
 *                  type: string
 *                disable:
 *                  type: number
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
 * components:
 *  securitySchemes:
 *    bearerAuth:
 *     type: http
 *     scheme: bearer
 *     bearerFormat: JWT
 */

module.exports = router;

