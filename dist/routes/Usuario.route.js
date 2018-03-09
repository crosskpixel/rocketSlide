"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils/utils");
const Usuario_controller_1 = require("../controller/Usuario.controller");
const JWT_1 = require("../middlewares/JWT");
const index_1 = require("./../model/index");
const db = index_1.LOAD_MODEL();
module.exports = (app) => {
    app.post("/registro", utils_1.validateSchema(CHECK_REQUEST_REGISTER), (req, res) => {
        let { name, username, email, password } = req.body;
        let usuario = { name, username, email, password, email_auth: 1, uuid: null };
        Usuario_controller_1.registrarUsuario(usuario).then(result => res.json(result))
            .catch(err => res.status(err.code).json({ msg: err.msg }));
    });
    app.post("/login", (req, res) => {
        let { username, password } = req.body;
        JWT_1.login(username, password).then(token => res.json({ token: token })).catch(err => res.status(err.code).json({ msg: err.msg }));
    });
    app.post("/auth", JWT_1.authJWT, (req, res) => {
        console.log(req['session'].id);
        res.send({ msg: "Usuario Autenticado" });
    });
    app.post("/authFirebase", JWT_1.authJWT, (req, res) => {
        res.send("AUTENTICADO COM SUCESSO BROW");
    });
    app.get("/socket", (req, res) => {
        app['io'].emit("socket", "Funcionando perfeitamente");
    });
};
const CHECK_REQUEST_LOGIN = {
    username: {
        in: "body",
        isLength: {
            options: [{ min: 1, max: 50 }]
        },
        errorMessage: "Informe um nome de usuarios para efetuar login"
    },
    password: {
        in: "body",
        isLength: {
            min: [{ min: 1, max: 20 }],
        },
        errorMessage: "Informe um usuario e senha"
    }
};
const CHECK_REQUEST_REGISTER = {
    name: {
        in: "body",
        isLength: {
            options: [{ min: 1, max: 50 }]
        },
        errorMessage: "Informe um nome válido",
    },
    username: {
        in: "body",
        isLength: {
            options: [{ min: 1, max: 15 }]
        },
        errorMessage: "O nome de usuario deve ter entre 1 a 15 caracteres"
    },
    email: {
        in: "body",
        isEmail: true,
        errorMessage: "Informe um email Válido"
    },
    password: {
        in: "body",
        isLength: {
            options: [{ min: 1, max: 30 }]
        }
    }
};
