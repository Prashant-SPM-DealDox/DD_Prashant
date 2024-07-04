const express = require("express");

//Authentication 
const requireAuth = require('../middleware/requireAuth')

// controller functions
const {
  addConfig,
  getConfig,
  updateConfig,
} = require("../controllers/configController");

const router = express.Router();

// require auth for all routes
router.use(requireAuth)

// config route
router.post("/add", addConfig);

router.get("/get", getConfig);

router.put("/update/:id", updateConfig);

/**
 * @swagger
 * /api/config/add:
 *   post:
 *     summary: Add Config
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               value1:
 *                 type: string
 *               value2:
 *                 type: string
 *               value3:
 *                 type: string
 *               value4:
 *                 type: string
 *               value5:
 *                 type: string
 *               value6:
 *                 type: string
 *               value7:
 *                 type: string
 *               value8:
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
 
 * /api/config/get:
 *   get:
 *     summary: Get Config
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               configId:
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
 *                 config:
 *                   type: object

 * /api/config/update/{id}:
 *   put:
 *     summary: Update Config
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
 *               value1:
 *                 type: string
 *               value2:
 *                 type: string
 *               value3:
 *                 type: string
 *               value4:
 *                 type: string
 *               value5:
 *                 type: string
 *               value6:
 *                 type: string
 *               value7:
 *                 type: string
 *               value8:
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
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */


module.exports = router;
