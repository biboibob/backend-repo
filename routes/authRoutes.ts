const router = require("express").Router();

//Import Controller
import { login } from "../contoller/api";

router.post("/login/", login);

module.exports = router;
