const pool = require("../../config/database");

module.exports = {
    createDetailByUserIdByProjectId: (data, dataDay, callBack) => {
      pool.query(
        `insert into time_sheet(project_id, user_id, hours, day, note) 
                  values(?,?,?,?,?)`,
        [
            data.project_id,
            data.user_id,
            data.hours,
            dataDay,
            data.note
        ],
        (error, results, fields) => {
          if (error) {
            callBack(error);
          }
          return callBack(null, results);
        }
      );
    },
    getDetailByProjectId: (project_id, callBack) => {
      pool.query(
        `select * from time_sheet where project_id = ?`,
        [project_id],
        (error, results, fields) => {
          if (error) {
            callBack(error);
          }
          // return callBack(null, results[0]);
          return callBack(null, results);
        }
      );
  },
  updateDetail: (data, callBack) => {
    pool.query(
      `update time_sheet set project_id=?, user_id=?, hours=?, note=? where id = ?`,
      [
        data.project_id,
        data.user_id,
        data.hours,
        data.note,
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
  deleteDetail: (data, callBack) => {
    pool.query(
      `delete from time_sheet where id = ?`,
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