const express = require('express')
const uploadImageMiddleware = require('../middleware/uploadImageMiddleware')
//Authentication 
const requireAuth = require('../middleware/requireAuth')
// controller functions
const { getDoctypes, addDoctype, deleteDoctypeById, deletOneSectionById, updateDoctypeById } = require('../controllers/doctypeController')

const router = express.Router()
// require auth for all routes
router.use(requireAuth)
// security route
router.get('/get', getDoctypes);
router.post('/add',
    uploadImageMiddleware.fields([
        { name: 'template_file', maxCount: 1 },
        { name: 'watermark_file', maxCount: 1 }
    ]),
    addDoctype
)
router.delete('/delete/:id', deleteDoctypeById)

router.delete('/deleteSection/:id', deletOneSectionById);

router.put('/update/:id',
    uploadImageMiddleware.fields([
        { name: 'template_file', maxCount: 1 },
        { name: 'watermark_file', maxCount: 1 }
    ]),
    updateDoctypeById
)

router.put('/update/:id', updateDoctypeById);

//router.put( "/updateFile", uploadImageMiddleware.single("pdffile"), uploadFile);

/**
 * @swagger
* /api/doctype/add:
 *   post:
 *     summary: Add Document Template
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               doc_name:
 *                 type: string
 *               category:
 *                 type: string
 *               status:
 *                 type: string
 *               purpose:
 *                 type: string
 *               template_file:
 *                 type: string
 *               paper_size:
 *                 type: string
 *               watermark_file:
 *                 type: string
 *               watermark:
 *                 type: boolean
 *               toc:
 *                 type: boolean
 *               sections:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     section_name:
 *                       type: string
 *                     section_tag:
 *                       type: string
 *               sectionData:
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
 * /api/doctype/get:
 *   get:
 *     summary: Get Document Templates
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
 *                 documentTemplates:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/DocumentTemplate'
 * /api/doctype/update/{id}:
 *   put:
 *     summary: Update Document Template
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               doc_name:
 *                 type: string
 *               category:
 *                 type: string
 *               status:
 *                 type: string
 *               purpose:
 *                 type: string
 *               template_file:
 *                 type: string
 *               paper_size:
 *                 type: string
 *               watermark_file:
 *                 type: string
 *               watermark:
 *                 type: boolean
 *               toc:
 *                 type: boolean
 *               sections:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     section_name:
 *                       type: string
 *                     section_tag:
 *                       type: string
 *               sectionData:
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
 * /api/doctype/delete/{id}:
 *   delete:
 *     summary: Delete Doctype
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
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
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

module.exports = router;