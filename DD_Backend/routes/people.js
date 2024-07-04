const express = require('express');

//Authentication 
const requireAuth = require('../middleware/requireAuth');

// controller functions
const { addPeople, getPeople, updatePeopleRecord } = require('../controllers/peopleController');

const router = express.Router();

// require auth for all routes
router.use(requireAuth);

//addPeople Route
router.post('/add', addPeople);

//getPeople Route
router.get('/get', getPeople);

//update People
router.put('/update/:peopleId' , updatePeopleRecord);

/**
 * @swagger
 * /api/people/add:
 *   post:
 *     summary: peoples data
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
 *               last_name:
 *                 type: string
 *               title:
 *                 type: string
 *               uid:
 *                 type: string
 *               emp_id:
 *                 type: string
 *               emp_ref_id:
 *                 type: string
 *               start_date:
 *                 type: string
 *               end_date:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: number
 *               src_sys_usr_name:
 *                 type: string
 *               city:
 *                 type: string
 *               region:
 *                 type: string
 *               country:
 *                 type: string
 *               practice:
 *                 type: string
 *               org:
 *                 type: string
 *               manager:
 *                 type: string
 *               exp_yr:
 *                 type: string
 *               tenure:
 *                 type: string
 *               crm_status:
 *                 type: string
 *               contractor:
 *                 type: boolean
 *               supplier:
 *                 type: string
 *               currency:
 *                 type: string
 *               cost_per_hour:
 *                 type: number
 *               week_hour:
 *                 type: number
 *               access:
 *                 type: string
 *               catalog_role:
 *                 type: array
 *                 items:
 *                   type: string
 *               password:
 *                 type: string
 *               securityRole:
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
* /api/people/get:
 *   get:
 *     summary: peoples data
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
 *                       first_name:
 *                         type: string
 *                       last_name:
 *                         type: string
 *                       title:
 *                         type: string
 *                       uid:
 *                         type: string
 *                       emp_id:
 *                         type: string
 *                       emp_ref_id:
 *                         type: string
 *                       start_date:
 *                         type: string
 *                       end_date:
 *                         type: string
 *                       email:
 *                         type: string
 *                       phone:
 *                         type: number
 *                       src_sys_usr_name:
 *                         type: string
 *                       city:
 *                         type: string
 *                       region:
 *                         type: string
 *                       country:
 *                         type: string
 *                       practice:
 *                         type: string
 *                       org:
 *                         type: string
 *                       manager:
 *                         type: string
 *                       exp_yr:
 *                         type: string
 *                       tenure:
 *                         type: string
 *                       crm_status:
 *                         type: string
 *                       contractor:
 *                         type: boolean
 *                       supplier:
 *                         type: string
 *                       currency:
 *                         type: string
 *                       cost_per_hour:
 *                         type: number
 *                       week_hour:
 *                         type: number
 *                       access:
 *                         type: string
 *                       catalog_role:
 *                         type: array
 *                         items:
 *                           type: string
 *                       password:
 *                         type: string
 *                       securityRole:
 *                         type: string
 *                 message:
 *                   type: string
 * /api/people/update/{id}:
 *   put:
 *     summary: update PeopleAccount
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the people to be updated
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               first_name:
 *                 type: string
 *               last_name:
 *                 type: string
 *               title:
 *                 type: string
 *               uid:
 *                 type: string
 *               emp_id:
 *                 type: string
 *               emp_ref_id:
 *                 type: string
 *               start_date:
 *                 type: string
 *               end_date:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: number
 *               src_sys_usr_name:
 *                 type: string
 *               city:
 *                 type: string
 *               region:
 *                 type: string
 *               country:
 *                 type: string
 *               practice:
 *                 type: string
 *               org:
 *                 type: string
 *               manager:
 *                 type: string
 *               exp_yr:
 *                 type: string
 *               tenure:
 *                 type: string
 *               crm_status:
 *                 type: string
 *               contractor:
 *                 type: boolean
 *               supplier:
 *                 type: string
 *               currency:
 *                 type: string
 *               cost_per_hour:
 *                 type: number
 *               week_hour:
 *                 type: number
 *               access:
 *                 type: string
 *               catalog_role:
 *                 type: array
 *                 items:
 *                   type: string
 *               password:
 *                 type: string
 *               securityRole:
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
 *  securitySchemes:
 *    bearerAuth:
 *     type: http
 *     scheme: bearer
 *     bearerFormat: JWT
 */
module.exports = router;