const {
    createDetailByUserIdByProjectId,
    getDetailByProjectId,
    updateDetail,
    deleteDetail
  } = require("./detail.controller");
const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");

router.post("/", checkToken, createDetailByUserIdByProjectId);
router.get("/:project_id", getDetailByProjectId);
router.patch("/", checkToken, updateDetail);
router.post("/delete", checkToken, deleteDetail);

module.exports = router;