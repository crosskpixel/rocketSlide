"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SECRET_KEY_1 = require("../utils/SECRET_KEY");
const index_1 = require("./../model/index");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const index_2 = require("../firebase/index");
const { user } = index_1.LOAD_MODEL();
exports.login = (username, password) => {
    return new Promise((resolve, reject) => {
        user.findOne({
            where: {
                username: username
            }
        }).then(user => {
            console.log(user);
            if (user) {
                if (crypto.createHmac("md5", SECRET_KEY_1.SECRET_KEY).update(password).digest("hex") == user.password) {
                    var token = jwt.sign({ id: user.id }, SECRET_KEY_1.SECRET_KEY, { expiresIn: 60 * 120 });
                    resolve("Bearer " + token);
                }
                else {
                    reject({ code: 401, msg: "Senha incorreta" });
                }
            }
            else {
                reject({ code: 204, msg: "Usuario não encontrado" });
            }
        });
    });
};
exports.authJWT = (req, res, next) => {
    if (!req.headers.authorization || !req.headers.authorization.startsWith("Bearer")) {
        var token = req.headers.authorization.split("x-access-token").pop().trim();
        if (token) {
            index_2.verifyTokenFirebase(token).then(uuid => {
                user.findAll({
                    where: {
                        uuid: uuid
                    }
                }).then(_user => {
                    req["session"] = { id: _user.id };
                    next();
                });
            }).catch(err => res.status(err.code).json({ msg: err.msg }));
        }
        else {
            res.send({ msg: "token não encontrado" });
        }
    }
    else {
        var token = req.headers.authorization.split("Bearer").pop().trim();
        jwt.verify(token, SECRET_KEY_1.SECRET_KEY, (err, data) => {
            if (err) {
                res.status(401).json({ msg: "Token Inválido" });
            }
            else {
                req["session"] = { id: data };
                next();
            }
        });
    }
};
