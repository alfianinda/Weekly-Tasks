const {
    createProjectByUserId,
    getProjectByUserId,
    updateProjects,
    deleteProject,
  } = require("./project.controller");
const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");

router.post("/", checkToken, createProjectByUserId);
router.get("/:user_id", getProjectByUserId);
router.patch("/", checkToken, updateProjects);
router.post("/delete", checkToken, deleteProject);

module.exports = router;