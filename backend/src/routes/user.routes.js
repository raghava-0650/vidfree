import { Router } from 'express';

import {
  login,
  regester,
} from '../controllers/user.controller.js';

const router = Router();

router.route("/login").post(login);
router.route("/register").post(regester);
router.route("/add_to_acitvity");
router.route("/get_all_activivty");

export default router;