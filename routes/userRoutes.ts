const router = require("express").Router();

const isLoggedIn = require("../middleware/authMiddleware.ts");

//Import Controller
import {
  getUser,
  updateUser,
  getAllUser,
  addNewUser,
  login,
} from "../contoller/api";

router.post("/addNewUser/", isLoggedIn, addNewUser);
router.put("/updateUser/", isLoggedIn, updateUser);
router.get("/getUser/", isLoggedIn, getUser);
router.get("/getAllUser/", isLoggedIn, getAllUser);

module.exports = router;
