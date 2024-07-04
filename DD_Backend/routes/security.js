const express = require('express');
//Authentication 
const requireAuth = require('../middleware/requireAuth');


// controller functions
const { getSecurity, addSecurity, getSpecificRole, updateSecurityById, deleteSecurityById  } = require('../controllers/securityController');

const router = express.Router();

// require auth for all routes

router.use(requireAuth);

// security route
router.get('/get', getSecurity);
router.post('/add', addSecurity);
router.put('/update/:id', updateSecurityById);
router.delete('/delete/:id', deleteSecurityById);

//for access
router.post('/getSpecificRoleData', getSpecificRole);

/**
 * @swagger
 * /api/security/add:
 *   post:
 *     summary: Add SecurityRoles
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sendData:
 *                 type: object
 *                 properties:
 *                   role_name:
 *                     type: string
 *                   role_desc:
 *                     type: string
 *                   account:
 *                     type: string
 *                   opportunity:
 *                     type: string
 *                   oppor_stage:
 *                     type: string
 *                   quote:
 *                     type: string
 *                   quote_add:
 *                     type: string
 *                   quote_guideSel_ans:
 *                     type: string
 *                   quote_guidesel_desg:
 *                     type: string
 *                   catalog:
 *                     type: string
 *                   catalog_roles:
 *                     type: string
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
 * /api/security/get:
 *   get:
 *     summary: Get SecurityRoles Data
 *     security:
 *       - bearerAuth: []
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
 *                       role_name:
 *                         type: string
 *                       role_desc:
 *                         type: string
 *                       account:
 *                         type: string
 *                       opportunity:
 *                         type: string
 *                       oppor_stage:
 *                         type: string
 *                       quote:
 *                         type: string
 *                       quote_add:
 *                         type: string
 *                       quote_guideSel_ans:
 *                         type: string
 *                       quote_guidesel_desg:
 *                         type: string
 *                       catalog:
 *                         type: string
 *                       catalog_roles:
 *                         type: string
 *                 message:
 *                   type: string
 * /api/security/update/{id}:
 *   put:
 *     summary: Update SecurityRoles
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the securityRole to be updated
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sendData:
 *                 type: object
 *                 properties:
 *                   role_name:
 *                     type: string
 *                   role_desc:
 *                     type: string
 *                   account:
 *                     type: string
 *                   opportunity:
 *                     type: string
 *                   oppor_stage:
 *                     type: string
 *                   quote:
 *                     type: string
 *                   quote_add:
 *                     type: string
 *                   quote_guideSel_ans:
 *                     type: string
 *                   quote_guidesel_desg:
 *                     type: string
 *                   catalog:
 *                     type: string
 *                   catalog_roles:
 *                     type: string
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
 * /api/security/delete/{id}:
 *   delete:
 *     summary: Delete SecurityRoles
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the securityRole to be deleted
 *         schema:
 *           type: string
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
 * /api/security/getSpecificRoleData:
 *   post:
 *     summary: Get Specific SecurityRoles
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               role:
 *                 type: string
 *             required:
 *               - role
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
 *                       role_name:
 *                         type: string
 *                       role_desc:
 *                         type: string
 *                       account:
 *                         type: string
 *                       opportunity:
 *                         type: string
 *                       oppor_stage:
 *                         type: string
 *                       quote:
 *                         type: string
 *                       quote_add:
 *                         type: string
 *                       quote_guideSel_ans:
 *                         type: string
 *                       quote_guidesel_desg:
 *                         type: string
 *                       catalog:
 *                         type: string
 *                       catalog_roles:
 *                         type: string
 *                 message:
 *                   type: string
 *       204:
 *         description: No data found
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 * components:
 *  securitySchemes:
 *    bearerAuth:
 *     type: http
 *     scheme: bearer
 *     bearerFormat: JWT
 */



module.exports = router;