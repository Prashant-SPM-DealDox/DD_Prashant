const express = require("express");

//Authentication
const requireAuth = require("../middleware/requireAuth");

const {
  getSinglePeopleData,
  updateAccess,
  deleteAccess,
} = require("../controllers/accessController");

const router = express.Router();

// require auth for all routes
router.use(requireAuth);

//getSinglePeopleData
router.post("/getPeople", getSinglePeopleData);
//update access status in people DB
router.put("/updateAccess", updateAccess);

router.delete("/deleteAccess", deleteAccess);

/**
 * @swagger
 * /api/access/getPeople:
 *   post:
 *     summary: Get People to give access
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               first_name:
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
 *                 data:
 *                   type: object
 
 * /api/access/updateAccess:
 *   put:
 *     summary: Update People Access
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               access:
 *                 type: string
 *               email:
 *                 type: string
 *               securityRole:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 
 * /api/access/deleteAccess:
 *   delete:
 *     summary: Delete People Access
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               access:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
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