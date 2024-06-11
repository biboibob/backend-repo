const router = require("express").Router();

//Import Controller
import { getUser, updateUser } from "../contoller/api";

// router.get("/", (req: any, res: any) => {
//   res.send("Hello User!");
// });

router.get("/updateUser/", updateUser);
router.put("/getUser/", getUser);

module.exports = router;
