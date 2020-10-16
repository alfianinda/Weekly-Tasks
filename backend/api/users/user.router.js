const {
    createUser,
    getUserByUserId,
    getUsers,
    updateUsers,
    deleteUser,
    login
  } = require("./user.controller");
const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");

router.post("/", createUser);
router.post("/login", login);
router.get("/", getUsers);
router.get("/:id", getUserByUserId);

router.patch("/", checkToken, updateUsers);
router.post("/delete", checkToken, deleteUser);

module.exports = router; 