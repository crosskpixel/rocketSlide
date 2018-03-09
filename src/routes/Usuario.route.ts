import * as express from 'express';
import { validateSchema } from "../utils/utils";
import { UserInterface } from "../model/User";
import { registrarUsuario } from "../controller/Usuario.controller";
import { login, authJWT } from "../middlewares/JWT";
import { LOAD_MODEL } from './../model/index';
import { verifyTokenFirebase } from "./../firebase/index";
const db = LOAD_MODEL();

module.exports = (app: express.Application) => {

    app.post("/registro", validateSchema(CHECK_REQUEST_REGISTER), (req: express.Request, res: express.Response) => {
        let { name, username, email, password }: UserInterface = req.body;
        let usuario: UserInterface = { name, username, email, password, email_auth: 1, uuid: null };
        registrarUsuario(usuario).then(result => res.json(result))
            .catch(err => res.status(err.code).json({ msg: err.msg }));
    });

    app.post("/login", (req: express.Request, res: express.Response) => {
        let { username, password } = req.body;
        login(username, password).then(token => res.json({ token: token })).catch(err => res.status(err.code).json({ msg: err.msg }));
    });

    app.post("/auth", authJWT, (req: express.Request, res: express.Response) => {
        console.log(req['session'].id);
        res.send({ msg: "Usuario Autenticado" });
    });
    app.post("/authFirebase", authJWT, (req: express.Request, res: express.Response) => {
        res.send("AUTENTICADO COM SUCESSO BROW");
    });

    app.get("/socket", (req, res) => {
        app['io'].emit("socket", "Funcionando perfeitamente");
    });

}
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
}
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
}