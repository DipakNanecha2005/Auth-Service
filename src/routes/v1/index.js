import express from "express";
import {
  create,
  logIn,
  isAuthenticated,
  isAdmin,
} from "../../controllers/user-controller.js";
import {
  validateIsAdminRequest,
  validateUserAuth,
} from "../../middlewares/request-validation.js";

/**
 * Router for version-1 API endpoints.
 * @route /v1
 */
const router = express.Router();

router.post("/register", validateUserAuth, create);
router.post("/login", validateUserAuth, logIn);
router.get("/isAuthenticated", isAuthenticated);
router.get("/isAdmin", validateIsAdminRequest, isAdmin);

export default router;
