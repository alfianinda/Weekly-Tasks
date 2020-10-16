const pool = require("../../config/database");

module.exports = {
    create: (fileRequest, data, callBack) => {
      pool.query(
        `insert into registration(email, password, first_name, last_name, education, job_position, language, file_gambar) 
                  values(?,?,?,?,?,?,?,?)`,
        [
          data.email,
          data.password,
          data.first_name,
          data.last_name,
          data.education,
          data.job_position,
          data.language,
          fileRequest.name
        ],
        (error, results, fields) => {
          if (error) {
            callBack(error);
          }
          return callBack(null, results);
        }
      );
    },
    getUsers: callBack => {
        pool.query(
          `select id, email, password, first_name, last_name, education, job_position, language, file_gambar from registration`,
          [],
          (error, results, fields) => {
            if (error) {
              callBack(error);
            }
            return callBack(null, results);
          }
        );
    },
    getUserByUserId: (id, callBack) => {
        pool.query(
          `select id, email, password, first_name, last_name, education, job_position, language, file_gambar from registration where id = ?`,
          [id],
          (error, results, fields) => {
            if (error) {
              callBack(error);
            }
            return callBack(null, results[0]);
          }
        );
    },
    updateUser: (fileRequest, data, callBack) => {
        pool.query(
          `update registration set email=?, password=?, first_name=?, last_name=?, education=?, job_position=?, language=?, file_gambar=? where id = ?`,
          [
            data.email,
            data.password,
            data.first_name,
            data.last_name,
            data.education,
            data.job_position,
            data.language,
            fileRequest.name,
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
    deleteUser: (data, callBack) => {
        pool.query(
          `delete from registration where id = ?`,
          [data.id],
          (error, results, fields) => {
            if (error) {
              callBack(error);
            }
            return callBack(null, results[0]);
          }
        );
    },
    getUserByUserEmail: (data, callBack) => {
        pool.query(
          `select * from registration where email = ?`,
          [data.email],
          (error, results, fields) => {
            if (error) {
              callBack(error);
            }
            return callBack(null, results[0]);
          }
        );
    }
};