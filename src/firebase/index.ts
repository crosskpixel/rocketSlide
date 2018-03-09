
/*
import * as admin from 'firebase-admin';
import { UserInterface } from "../model/User";
import { registrarUsuario } from "../controller/Usuario.controller";

admin.initializeApp({
    credential: admin.credential.cert(require("./firebase_key.json")),
    databaseURL: "https://typescript-js.firebaseio.com"
});
export const verifyTokenFirebase = (token) => {
    return new Promise((resolve, reject) => {
        admin.auth().verifyIdToken(token)
            .then(function (decodedToken) {
                console.log(decodedToken);
                let { name, user_id, email, email_verified } = decodedToken;
                let usuario: UserInterface = {
                    name: (name  ? name : "NULL"),
                    uuid: user_id,
                    username: user_id,
                    email: email,
                    email_auth: (email_verified ? 1 : 0),
                    password: null
                }
                registrarUsuario(usuario).catch(err => console.log(err));
                var uid = decodedToken.uid;
                resolve(uid);
            }).catch(function (error) {
                reject({ code: 500, msg: "Token falhou" });
            });
    });
}*/



