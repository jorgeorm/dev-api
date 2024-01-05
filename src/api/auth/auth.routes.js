const express = require("express");
const { UNAUTHORIZED } = require("http-status-codes");
const router = express.Router();

const auth = require("../../modules/auth/auth.lib");

const { AUTH_ERROR, AUTH_FLOW } = require("./auth.constants");

/**
 * @swagger
 * components:
 *   schemas:
 *     LoginCredentials:
 *       type: object
 *       required:
 *         - username
 *         - password
 *       properties:
 *         username:
 *           type: string
 *           description: The user's username.
 *         password:
 *           type: string
 *           description: The user's password.
 *       example:
 *         username: jorgeorm
 *         password: superSecret123
 *     BaseResponseSuccess:
 *       type: object
 *       required:
 *         - result
 *       properties:
 *         result:
 *           type: any
 *           description: Result of the operation.
 *       example:
 *         result: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *     BaseResponseError:
 *       type: object
 *       required:
 *         - message
 *       properties:
 *         result:
 *           type: string
 *           description: Error message.
 *       example:
 *         message: Rety later / contact support
 *     CurrentUser:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           description: The user's email.
 *         firstName:
 *           type: string
 *           description: The user's first name.
 *         lastName:
 *           type: string
 *           description: The user's last name.
 *         role:
 *           type: string
 *           description: The user's role.
 *
 *       example:
 *         email: jorgeorm@gmail.com
 *         firstName: Jorge
 *         lastName: Ordonez
 *         role: admin
 *
 */

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: The authentication managing API
 * /auth:
 *   post:
 *     summary: Login to the application
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginCredentials'
 *     responses:
 *       200:
 *         description: The JWT token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BaseResponseSuccess'
 *               example:
 *                 result: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BaseResponseError'
 *               example:
 *                 message: Login is required.
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BaseResponseError'
 *               example:
 *                 message: Unknown error
 *
 */
router.post("/", async (req, res) => {
  const credentials = req.body;
  const token = await auth.jwtLogin(credentials, req.app);

  if (!token) {
    return res.status(UNAUTHORIZED).json({
      message: AUTH_ERROR,
    });
  }

  res.json({
    result: token,
  });
});

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: The authentication managing API
 * /auth/user:
 *   post:
 *     summary: Gets current loged in user based on credentials
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *     responses:
 *       200:
 *         description: Current user data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               allOf:
 *                 - $ref: '#/components/schemas/BaseResponseSuccess'
 *                 - type: object
 *                   required:
 *                     - result
 *                   properties:
 *                     result:
 *                       $ref: '#/components/schemas/CurrentUser'
 *                   example:
 *                     result:
 *                       email: jorgeorm@gmail.com
 *                       firstName: Jorge
 *                       lastName: Ordonez
 *                       role: admin
 *
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BaseResponseError'
 *               example:
 *                 message: Unknown error
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BaseResponseError'
 *               example:
 *                 message: Unknown error
 *
 */
router.post("/user", AUTH_FLOW, async (req, res) => {
  const { userPayload } = req;
  const user = await auth.currentUser(userPayload);
  res.json({ result: user });
});

module.exports = router;
