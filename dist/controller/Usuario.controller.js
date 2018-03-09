"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../model/index");
const Usuario_middleware_1 = require("../middlewares/Usuario.middleware");
const crypto = require("crypto");
const SECRET_KEY_1 = require("../utils/SECRET_KEY");
const { user } = index_1.LOAD_MODEL();
exports.registrarUsuario = (usuario) => {
    return new Promise((resolve, reject) => {
        Usuario_middleware_1.availableEmail(usuario.email).then(resposta => {
            if (usuario.password != null) {
                usuario.password = crypto.createHmac("md5", SECRET_KEY_1.SECRET_KEY).update(usuario.password).digest("hex");
            }
            user.create(usuario).then(user => resolve({ msg: "Usuario cadastrado com sucesso." }))
                .catch(err => reject({ code: 500, msg: "Erro ao gravar registro no banco de dados" }));
        }).catch(err => reject(err));
    });
};
