import { UserInterface } from "../model/User";
import { LOAD_MODEL } from "../model/index";
import { availableEmail } from '../middlewares/Usuario.middleware';
import * as crypto from "crypto";
import { SECRET_KEY } from "../utils/SECRET_KEY";
const { user } = LOAD_MODEL();

export const registrarUsuario = (usuario: UserInterface) => {
    return new Promise((resolve, reject) => {
        availableEmail(usuario.email).then(resposta => {
            if (usuario.password != null) {
                usuario.password = crypto.createHmac("md5", SECRET_KEY).update(usuario.password).digest("hex");
            }
            user.create(usuario).then(user => resolve({ msg: "Usuario cadastrado com sucesso." }))
                .catch(err => reject({ code: 500, msg: "Erro ao gravar registro no banco de dados" }));
        }).catch(err => reject(err));
    });
}