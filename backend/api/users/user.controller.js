const {
    create,
    getUserByUserId,
    getUsers,
    updateUser,
    deleteUser,
    getUserByUserEmail
  } = require("./user.service");

const { genSaltSync, hashSync, compareSync  } = require("bcrypt");
const { sign } = require("jsonwebtoken");

module.exports = {
    createUser: (req, res) => {
      const data = req.body;
      const salt = genSaltSync(10);
      data.password = hashSync(data.password, salt);

      const fileRequest = req.files.file;

      create(fileRequest, data, (err, results) => {
        if (req.files){
          fileRequest.mv(`./../frontend/public/file_store/${fileRequest.name}`, (error) => {
            if (error){
              console.error(error);
              return res.status(500).send(error);
            } else {
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
            }
          })
        }
      });
    },
    getUsers: (req, res) => {
        getUsers((err, results) => {
          if (err) {
            console.log(err);
            return;
          }
          return res.json({
            success: 1,
            data: results
          });
        });
    },
    getUserByUserId: (req, res) => {
        const id = req.params.id;
        getUserByUserId(id, (err, results) => {
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
          results.password = undefined;
          return res.json({
            success: 1,
            data: results
          });
        });
    },
    updateUsers: (req, res) => {
        const data = req.body;
        const salt = genSaltSync(10);
        data.password = hashSync(data.password, salt);

        const fileRequest = req.files.file;

        updateUser(fileRequest, data, (err, results) => {
          if (req.files) {
            fileRequest.mv(`./../frontend/public/file_store/${fileRequest.name}`, (error) => {
              if (error){
                throw error;
              } else {
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
              }
            })
          }
        });
    },
    deleteUser: (req, res) => {
        const data = req.body;
        deleteUser(data, (err, results) => {
          if (err) {
            console.log(err);
            return;
          } else {
            return res.json({
                success: 1,
                message: "user deleted successfully"
              });
          }
        });
    },
    login: (req, res) => {
        const data = req.body;
        getUserByUserEmail(data, (err, results) => {
          if (err) {
            console.log(err);
          }
          if (!results) {
            return res.json({
              success: 0,
              data: "Invalid email or password"
            });
          }
          const result = compareSync(data.password, results.password);
          if (result) {
            results.password = undefined;
            const jsontoken = sign({ result: results }, "qwe1234", {
              expiresIn: "1h"
            });
            return res.json({
              success: 1,
              message: "login successfully",
              token: jsontoken,
              data: results
            });
          } else {
            return res.json({
              success: 0,
              data: "Invalid email or password"
            });
          }
        });
    }
};