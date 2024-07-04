const express = require('express');

const requireAuth = require('../middleware/requireAuth');


const { addRoles, getRoles, updateRoles, deleteRolesById } = require('../controllers/rolesController');

const router = express.Router()

router.use(requireAuth)

router.post('/add', addRoles);
router.get('/get', getRoles);
router.put('/update/:id', updateRoles);
router.delete('/delete/:id', deleteRolesById);

/**
 * @swagger
 * /api/roles/add:
 *   post:
 *     summary: Add Roles
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
*                role_name:
*                  type: string
*                role_cat_category:
*                  type: string
*                role_cat_status:
*                  type: string
*                role_type:
*                  type: string
*                role_group:
*                  type: string
*                role_practice:
*                  type: string
*                parent_role:
*                  type: string
*                role_exter_ref:
*                  type: string
*                role_pro_disc:
*                  type: boolean
*                role_category_1:
*                  type: string
*                role_category_2:
*                  type: string
*                role_category_3:
*                  type: string
*                role_category_4:
*                  type: String
*                role_category_5:
*                  type: string
*                role_category_6:
*                  type: String
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
 * /api/roles/get:
 *   get:
 *     summary: Get Roles Data
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
 *                       role_cat_category:
 *                         type: string
 *                       role_cat_status:
 *                         type: string
 *                       role_type:
 *                         type: string
 *                       role_group:
 *                         type: string
 *                       role_practice:
 *                         type: string
 *                       parent_role:
 *                         type: string
 *                       role_exter_ref:
 *                         type: string
 *                       role_pro_disc:
 *                         type: boolean
 *                       role_category_1:
 *                         type: string
 *                       role_category_2:
 *                         type: string
 *                       role_category_3:
 *                         type: string
 *                       role_category_4:
 *                         type: String
 *                       role_category_5:
 *                         type: string
 *                       role_category_6:
 *                         type: String
 *                 message:
 *                   type: string
 * /api/roles/update/{id}:
 *   put:
 *     summary: Update Roles
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the Roles to be updated
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *                role_name:
 *                  type: string
 *                role_cat_category:
 *                  type: string
 *                role_cat_status:
 *                  type: string
 *                role_type:
 *                  type: string
 *                role_group:
 *                  type: string
 *                role_practice:
 *                  type: string
 *                parent_role:
 *                  type: string
 *                role_exter_ref:
 *                  type: string
 *                role_pro_disc:
 *                  type: boolean
 *                role_category_1:
 *                  type: string
 *                role_category_2:
 *                  type: string
 *                role_category_3:
 *                  type: string
 *                role_category_4:
 *                  type: String
 *                role_category_5:
 *                  type: string
 *                role_category_6:
 *                  type: String
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
 * /api/roles/delete/{id}:
 *   delete:
 *     summary: Delete Roles
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the Roles to be deleted
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
 * components:
 *  securitySchemes:
 *    bearerAuth:
 *     type: http
 *     scheme: bearer
 *     bearerFormat: JWT
 */

module.exports = router;