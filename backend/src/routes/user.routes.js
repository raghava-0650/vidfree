import { Router } from 'express';

const router = Router();

router.route("/login");
router.route("/register");
router.route("/add_to_acitvity");
router.route("/get_all_activivty");

export default router;