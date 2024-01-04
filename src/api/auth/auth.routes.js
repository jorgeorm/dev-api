const express = require("express");
const { UNAUTHORIZED, INTERNAL_SERVER_ERROR } = require("http-status-codes");
const router = express.Router();

const authService = require("../../modules/auth/auth.service");
const authMiddleware = require("./auth.middleware");

const { AUTH_ERROR, AUTH_EXCEPTION } = require("./auth.constants");

const authFlow = [authMiddleware.jwtPayload, authMiddleware.requireLogin];

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
 *     Response:
 *       type: object
 *       required:
 *         - result
 *       properties:
 *         result:
 *           type: any
 *           description: Result of the operation.
 *       example:
 *         result: {...}
 *     UserRequest:
 *       type: object
 *       required:
 *         - id
 *       properties:
 *         id:
 *           type: string
 *           description: Current user id.
 *       example:
 *         id: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
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
 *                 message: Authentication error. Wrong email/password.
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
router.post("/", (req, res) => {
  const credentials = req.body;

  authService
    .jwtLogin(credentials, req.app)
    .then((token) => {
      if (!token)
        return res.status(UNAUTHORIZED).json({
          message: AUTH_ERROR,
        });

      res.json({
        result: token,
      });
    })
    .catch(() => {
      res.status(INTERNAL_SERVER_ERROR).json({ message: AUTH_EXCEPTION });
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
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserRequest'
 *     responses:
 *       200:
 *         description: Current user data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CurrentUser'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 *
 */
router.post("/user", authFlow, async (req, res) => {
  const { userPayload } = req;

  try {
    const user = await authService.currentUser(userPayload);
    res.json({ result: user });
  } catch (error) {
    res.status(INTERNAL_SERVER_ERROR).json({ message: AUTH_EXCEPTION });
  }
});

module.exports = router;
