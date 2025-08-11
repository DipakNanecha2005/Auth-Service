import express from "express";
import { create } from "../../controllers/user-controller.js";

/**
 * Router for version-1 API endpoints.
 * @route /v1
 */
const router = express.Router();

router.post("/register", create);

export default router;
