const router = require("express").Router();

//Import Controller
import { getUser, updateUser, getAllUser, addNewUser } from "../contoller/api";

router.post("/addNewUser/", addNewUser);
router.put("/updateUser/", updateUser);
router.get("/getUser/", getUser);
router.get("/getAllUser/", getAllUser);

module.exports = router;
