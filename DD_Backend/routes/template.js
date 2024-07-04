const express = require('express');

// Authentication
const requireAuth = require('../middleware/requireAuth');

// Controller Function
const { addTemplate, getTemplate, updateTemplate, deleteTemplate, getTemplateforGs } = require('../controllers/templateController');

const router = express.Router();

// Require authentication for all routes
router.use(requireAuth);

// Template routes
router.get('/get', getTemplate);
router.post('/add', addTemplate);
router.delete('/delete/:templateId', deleteTemplate);
router.put('/update/:templateId', updateTemplate);
router.post('/getdoc', getTemplateforGs);

/**
 * @swagger
 * /api/template/add:
 *   post:
 *     summary: Add Template
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               quote_name:
 *                 type: string
 *               doc_tempData:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     doc_name:
 *                       type: string
 *                     sections:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           section_name:
 *                             type: string
 *                           section_value:
 *                             type: array
 *                             items:
 *                               type: object
 *                               properties:
 *                                 key:
 *                                   type: number
 *                                 value:
 *                                   type: string
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
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                 message:
 *                   type: string
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *
 * /api/template/get:
 *   get:
 *     summary: Get Template
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
 *                 message:
 *                   type: string
 *                 content:
 *                   type: object
 *
 * /api/template/update/{templateId}:
 *   put:
 *     summary: Update template
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: templateId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               quote_name:
 *                 type: string
 *               doc_tempData:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     doc_name:
 *                       type: string
 *                     sections:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           section_name:
 *                             type: string
 *                           section_value:
 *                             type: array
 *                             items:
 *                               type: object
 *                               properties:
 *                                 key:
 *                                   type: number
 *                                 value:
 *                                   type: string
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
 * /api/template/delete/{templateId}:
 *   delete:
 *     summary: Delete Template
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: templateId
 *         required: true
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
 *
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

module.exports = router;
