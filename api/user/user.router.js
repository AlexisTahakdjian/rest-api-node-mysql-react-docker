const { createUser, findAllUsers, findUserById, updated, login } = require("./user.controller");
const {checkToken} = require('../auth/token.validation')

const router = require("express").Router();

//public
router.post("/", createUser);
router.post("/login", login);
//private
router.get("/", checkToken, findAllUsers);
router.get("/:id", checkToken, findUserById);
router.patch("/",checkToken, updated);



module.exports = router;