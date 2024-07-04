const express = require('express');

//Authentication 
const requireAuth = require('../middleware/requireAuth');

// controller functions
const { getQuoteGridData,getRecentOpportunitiesData,getRecentQuotesData } = require('../controllers/quoteGridController');

const router = express.Router();

// require auth for all routes
router.use(requireAuth);

//addPeople Route

router.get('/getgriddata', getQuoteGridData);
router.get('/getgridrecentdata', getRecentQuotesData);
router.get('/getopportunityrecentdata',getRecentOpportunitiesData)
// ==========================================

/**
 * @swagger
 * /api/quoteGrid/getgriddata:
 *   get:
 *     summary: Get quotes Data
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
 *                       accounts:
 *                         type: string
 *                       owner:
 *                         type: string
 *                       parent_account:
 *                         type: string
 *                       description:
 *                         type: string
 *                       region:
 *                         type: string
 *                       industry:
 *                         type: string
 *                       vertical:
 *                         type: string
 *                       type:
 *                         type: string
 *                       billing_street1:
 *                         type: string
 *                       billing_street2:
 *                         type: string
 *                       billing_city:
 *                         type: string
 *                       billing_state:
 *                         type: string
 *                       billing_zip:
 *                         type: number
 *                       billing_country:
 *                         type: string
 *                       billing_phone:
 *                         type: number
 *                       shipping_street1:
 *                         type: string
 *                       shipping_street2:
 *                         type: string
 *                       shipping_city:
 *                         type: string
 *                       shipping_state:
 *                         type: string
 *                       shipping_zip:
 *                         type: number
 *                       shipping_country:
 *                         type: string
 *                       shipping_phone:
 *                         type: number
 *                       Opportunities:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             _id:
 *                               type: string
 *                             account_Id:
 *                               type: string
 *                             opportunity_name:
 *                               type: string
 *                             net_price:
 *                               type: string
 *                             margin:
 *                               type: string
 *                             cost:
 *                               type: number
 *                             stage:
 *                               type: string
 *                             probability:
 *                               type: string
 *                             hours:
 *                               type: string
 *                             close:
 *                               type: string
 *                             start:
 *                               type: string
 *                             duration_weeks:
 *                               type: number
 *                             owner:
 *                               type: string
 *                             region:
 *                               type: string
 *                             vertical:
 *                               type: string
 *                             practice:
 *                               type: string
 *                             currency:
 *                               type: string
 *                             org:
 *                               type: string
 *                             opportunity_type:
 *                               type: string
 *                             Quotes:
 *                               type: array
 *                               items:
 *                                 type: object
 *                                 properties:
 *                                   _id:
 *                                     type: string
 *                                   account_id:
 *                                     type: string
 *                                   opportunity_id:
 *                                     type: string
 *                                   quotes_name:
 *                                     type: string
 *                                   template_type:
 *                                     type: string
 *                 message:
 *                   type: string
 * /api/quoteGrid/getgridrecentdata:
 *   get:
 *     summary: Get quotes Data for home page
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
 *                       account_id:
 *                         type: string
 *                       opportunity_id:
 *                         type: string
 *                       quotes_name:
 *                         type: string
 *                       template_type:
 *                         type: string
 *                       Opportunity:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                           account_Id:
 *                             type: string
 *                           opportunity_name:
 *                             type: string
 *                           net_price:
 *                             type: string  # Update with the actual type
 *                           margin:
 *                             type: string  # Update with the actual type
 *                           cost:
 *                             type: number
 *                           stage:
 *                             type: string
 *                           probability:
 *                             type: string  # Update with the actual type
 *                           hours:
 *                             type: string  # Update with the actual type
 *                           close:
 *                             type: string  # Assuming it's a date string
 *                           start:
 *                             type: string  # Assuming it's a date string
 *                           duration_weeks:
 *                             type: number
 *                           owner:
 *                             type: string
 *                           region:
 *                             type: string
 *                           vertical:
 *                             type: string
 *                           practice:
 *                             type: string
 *                           currency:
 *                             type: string
 *                           org:
 *                             type: string
 *                           opportunity_type:
 *                             type: string
 *                       Account:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                           accounts:
 *                             type: string
 *                           owner:
 *                             type: string
 *                           parent_account:
 *                             type: string
 *                           description:
 *                             type: string
 *                           region:
 *                             type: string
 *                           industry:
 *                             type: string
 *                           vertical:
 *                             type: string
 *                           type:
 *                             type: string
 *                           billing_street1:
 *                             type: string
 *                           billing_street2:
 *                             type: string
 *                           billing_city:
 *                             type: string
 *                           billing_state:
 *                             type: string
 *                           billing_zip:
 *                             type: number
 *                           billing_country:
 *                             type: string
 *                           billing_phone:
 *                             type: number
 *                           shipping_street1:
 *                             type: string
 *                           shipping_street2:
 *                             type: string
 *                           shipping_city:
 *                             type: string
 *                           shipping_state:
 *                             type: string
 *                           shipping_zip:
 *                             type: number
 *                           shipping_country:
 *                             type: string
 *                           shipping_phone:
 *                             type: number
 *                 message:
 *                   type: string
 * /api/quoteGrid/getopportunityrecentdata:
 *   get:
 *     summary: Get opportunity Data for home page
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
 *                         type: string
 *                       start:
 *                         type: string
 *                       duration_weeks:
 *                         type: number
 *                       owner:
 *                         type: string
 *                       region:
 *                         type: string
 *                       vertical:
 *                         type: string
 *                       practice:
 *                         type: string
 *                       currency:
 *                         type: string
 *                       org:
 *                         type: string
 *                       opportunity_type:
 *                         type: string
 *                       Account:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                           accounts:
 *                             type: string
 *                           owner:
 *                             type: string
 *                           parent_account:
 *                             type: string
 *                           description:
 *                             type: string
 *                           region:
 *                             type: string
 *                           industry:
 *                             type: string
 *                           vertical:
 *                             type: string
 *                           type:
 *                             type: string
 *                           billing_street1:
 *                             type: string
 *                           billing_street2:
 *                             type: string
 *                           billing_city:
 *                             type: string
 *                           billing_state:
 *                             type: string
 *                           billing_zip:
 *                             type: number
 *                           billing_country:
 *                             type: string
 *                           billing_phone:
 *                             type: number
 *                           shipping_street1:
 *                             type: string
 *                           shipping_street2:
 *                             type: string
 *                           shipping_city:
 *                             type: string
 *                           shipping_state:
 *                             type: string
 *                           shipping_zip:
 *                             type: number
 *                           shipping_country:
 *                             type: string
 *                           shipping_phone:
 *                             type: number
 *                     message:
 *                       type: string
 * components:
 *  securitySchemes:
 *    bearerAuth:
 *     type: http
 *     scheme: bearer
 *     bearerFormat: JWT
 */
module.exports = router;