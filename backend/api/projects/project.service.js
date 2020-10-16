const pool = require("../../config/database");

module.exports = {
    createProjectByUserId: (data, callBack) => {
      pool.query(
        `insert into project(user_id, project_name, project_description) 
                  values(?,?,?)`,
        [
          data.user_id,
          data.project_name,
          data.project_description
        ],
        (error, results, fields) => {
          if (error) {
            callBack(error);
          }
          return callBack(null, results);
        }
      );
    },
    getProjectByUserId: (user_id, callBack) => {
        pool.query(
          `select * from project where user_id = ?`,
          [user_id],
          (error, results, fields) => {
            if (error) {
              callBack(error);
            }
            // return callBack(null, results[0]);
            return callBack(null, results);
          }
        );
    },
    updateProject: (data, callBack) => {
      pool.query(
        `update project set user_id=?, project_name=?, project_description=? where id = ?`,
        [
          data.user_id,
          data.project_name,
          data.project_description,
          data.id
        ],
        (error, results, fields) => {
          if (error) {
            callBack(error);
          }
          return callBack(null, results);
        }
      );
    },
    deleteProject: (data, callBack) => {
      pool.query(
        `delete from project where id = ?`,
        [data.id],
        (error, results, fields) => {
          if (error) {
            callBack(error);
          }
          return callBack(null, results[0]);
        }
      );
    }
};