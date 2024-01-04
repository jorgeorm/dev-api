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
 *     LoginSuccess:
 *       type: object
 *       required:
 *         - success
 *         - token
 *       properties:
 *         success:
 *           type: boolean
 *           description: The login success status.
 *         token:
 *           type: string
 *           description: The JWT token.
 *       example:
 *         success: true
 *         token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
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
 *               $ref: '#/components/schemas/LoginSuccess'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 *
 */
router.post("/", (req, res) => {
  const credentials = req.body;

  authService
    .jwtLogin(credentials, req.app)
    .then((token) => {
      if (!token)
        return res.status(UNAUTHORIZED).json({
          success: false,
          message: AUTH_ERROR,
        });

      res.json({
        success: true,
        token: token,
      });
    })
    .catch(() => {
      res
        .status(INTERNAL_SERVER_ERROR)
        .json({ success: false, message: AUTH_EXCEPTION });
    });
});

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: The authentication managing API
 * /auth/user:
 *   post:
 *     summary: Login to the application
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
    res.json({ success: true, user });
  } catch (error) {
    res
      .status(INTERNAL_SERVER_ERROR)
      .json({ success: false, message: AUTH_EXCEPTION });
  }
});

module.exports = router;
