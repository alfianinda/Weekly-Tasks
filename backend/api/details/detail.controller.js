const {
    createDetailByUserIdByProjectId,
    getDetailByProjectId,
    updateDetail,
    deleteDetail
  } = require("./detail.service");

module.exports = {
    createDetailByUserIdByProjectId: (req, res) => {
        const data = req.body;
        const selectDay = req.body.day
        // const dataDay =  (new Date ((new Date((new Date(new Date())).toISOString() )).getTime() - ((new Date()).getTimezoneOffset()*60000))).toISOString().slice(0, 19).replace('T', ' ');
        // const dataDay =  (new Date ((new Date((new Date(selectDay)).toISOString() )).getTime() - ((new Date()).getTimezoneOffset()*60000))).toISOString().slice(0, 19).replace('T', ' ');
        // const dataDay = new Date(selectDay).toISOString().slice(0, 19).replace('T', ' ');
        const dataDay = selectDay ? new Date(selectDay).toISOString().slice(0, 19).replace('T', ' ') : (new Date ((new Date((new Date(new Date())).toISOString() )).getTime() - ((new Date()).getTimezoneOffset()*60000))).toISOString().slice(0, 19).replace('T', ' ');
        
        createDetailByUserIdByProjectId(data, dataDay, (err, results) => {
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
    getDetailByProjectId: (req, res) => {
        const project_id = req.params.project_id;
        getDetailByProjectId(project_id, (err, results) => {
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
    updateDetail: (req, res) => {
      const data = req.body;
      
      updateDetail(data, (err, results) => {
        if (err) {
          console.log(err);
          return;
        }
        if (!results){
            return res.json({
                success: 0,
                message: "Failed to update detail"
            })
        }
        return res.json({
          success: 1,
          message: "updated successfully"
        });
      });
    },
    deleteDetail: (req, res) => {
      const data = req.body;
      deleteDetail(data, (err, results) => {
        if (err) {
          console.log(err);
          return;
        } else {
          return res.json({
              success: 1,
              message: "task detail deleted successfully"
            });
        }
      });
    },
};