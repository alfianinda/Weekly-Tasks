const {
    createProjectByUserId,
    getProjectByUserId,
    updateProject,
    deleteProject
  } = require("./project.service");

module.exports = {
    createProjectByUserId: (req, res) => {
      const data = req.body;
      createProjectByUserId(data, (err, results) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            success: 0,
            message: "Database connection error"
          });
        }
        return res.status(200).json({
          success: 1,
          data: results
        });
      });
    },
    getProjectByUserId: (req, res) => {
        const user_id = req.params.user_id;
        getProjectByUserId(user_id, (err, results) => {
          if (err) {
            console.log(err);
            return;
          }
          if (!results) {
            return res.json({
              success: 0,
              message: "Record not Found"
            });
          }
          return res.json({
            success: 1,
            data: results
          });
        });
    },
    updateProjects: (req, res) => {
      const data = req.body;
      updateProject(data, (err, results) => {
        if (err) {
          console.log(err);
          return;
        }
        if (!results){
            return res.json({
                success: 0,
                message: "Failed to update user"
            })
        }
        return res.json({
          success: 1,
          message: "updated successfully"
        });
      });
    },
    deleteProject: (req, res) => {
      const data = req.body;
      deleteProject(data, (err, results) => {
        if (err) {
          console.log(err);
          return;
        } else {
          return res.json({
              success: 1,
              message: "project deleted successfully"
            });
        }
        // if (!results) {
        //   return res.json({
        //     success: 0,
        //     message: "project deleted successfully"
        //   });
        // }
        // return res.json({
        //   success: 1,
        //   message: "project deleted successfully"
        // });
      });
    },
    // deleteProject: (req, res) => {
    //   const data = req.body;
    //   deleteProject(data, (err, results) => {
    //     if (err) {
    //       console.log(err);
    //       return;
    //     } else {
    //       res.send('1')
    //     }
    //   });
    // }
};