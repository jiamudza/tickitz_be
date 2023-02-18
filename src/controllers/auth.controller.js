require('dotenv').config()
const authModel = require("../models/auth.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { JWT_PRIVATE_KEY } = process.env;

const authController = {
  login: (req, res) => {
    return authModel
      .login(req.body)
      .then((result) => {
        jwt.sign(
          { id: result.id, role: result.role },
          JWT_PRIVATE_KEY,
          (err, token) => {
            if (err) {
              return res.send(err.message);
            }
            return res.status(200).send({
              message: "success",
              data: {
                token,
                user: result,
              },
            });
          }
        );
      })
      .catch((error) => {
        return res.status(500).send({ message: error });
      });
  },

  register: (req, res) => {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
      if (err) {
        return res.status(500).send({ message: err.message });
      } else {
        const request = {
          ...req.body,
          password: hash,
        };
        return authModel
          .register(request)
          .then((result) => {
            return res.status(201).send({ message: "succes", data: result });
          })
          .catch((error) => {
            return res.status(500).send({ message: error });
          });
      }
    });
  },

  resetPassword: (req, res) => {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
      if (err) {
        return res.status(500).send({ message: err.message });
      } else {
        const request = {
          ...req.body,
          password: hash,
          id_profile: req.params.id_profile
        };
        return authModel
          .resetPassword(request)
          .then((result) => {
            return res.status(201).send({ message: "succes", data: result });
          })
          .catch((error) => {
            return res.status(500).send({ message: error });
          });
      }
    });
    
},

//   get: (req, res) => {
//     return authModel
//       .get(req.query)
//       .then((result) => {
//         return res.status(200).send({ message: "success", data: result });
//       })
//       .catch((error) => {
//         return res.status(500).send({ message: error });
//       });
//   },
//   getDetail: (req, res) => {
//     return authModel
//       .getDetail(req.params.id)
//       .then((result) => {
//         return res.status(200).send({ message: "success", data: result });
//       })
//       .catch((error) => {
//         return res.status(500).send({ message: error });
//       });
//   },
//   update: (req, res) => {
//     const request = {
//       ...req.body,
//       id: req.params.id,
//     };
//     return authModel
//       .update(request)
//       .then((result) => {
//         return res.status(201).send({ message: "succes", data: result });
//       })
//       .catch((error) => {
//         return res.status(500).send({ message: error });
//       });
//   },
};

module.exports = authController;
