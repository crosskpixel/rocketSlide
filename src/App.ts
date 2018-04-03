import { customValidators } from './middlewares/Usuario.middleware';
import * as path from 'path';
import * as express from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as consign from 'consign';
import * as fs from 'fs';
import * as expressValidator from 'express-validator';
import * as io_server from "socket.io";

import { LOAD_MODEL } from "./model/index";
import { LOAD_MIDDLEWARES } from './middlewares/index';
// Criando as configurações para o ExpressJS
class App {
    // Instancia dele
    public express;// express.Application;
    public io;// io_server;

    constructor() {
        this.io = io_server();
        this.express = express();
        //  this.database();
        this.config();
        this.sockets();
        //  this.middleware();
        //  this.routes();
        this.express.io = this.io;
    }

    private config(): void {
        this.express.use(express.static(path.join(__dirname, "public")));
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: true }));
        this.express.use(cors({ origin: process.env.DOMAIN.trim(), allowedHeaders: ["Content-Type", "Authorization"] }));
        (process.env.NODE_ENV.trim() == "umbler" ? "Servidor iniciado na UMBLER.NET" : this.express.use(logger('dev')));
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
        this.express.use((req, res, next) => {
            req["session"] = {};
            req["ROOT_PATH"] = __dirname;
<<<<<<< HEAD
            // res.setHeader("Cache-Control", 'no-cache');
            res.setHeader('Access-Control-Allow-Origin', process.env.DOMAIN.trim());
=======
           // res.setHeader("Cache-Control", 'no-cache');
            res.setHeader('Access-Control-Allow-Origin', '*');
>>>>>>> b1f8ceb97c7f2c57d85e072066620879bb4ebd9a
            // res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
            //  res.setHeader("Access-Control-Allow-Headers", "*");
            // res.setHeader('Access-Control-Allow-Credentials', "false");
            // res.setHeader('Access-Control-Max-Age', '1728000');
            next();
        });
    }

    private middleware(): void {
        let customValidators = LOAD_MIDDLEWARES();
        this.express.use(expressValidator({ customValidators }));
    }

    private routes(): void {
        fs.readdirSync("dist/routes").forEach((file, key) => {
            require("./routes/" + file)(this.express);
        });
    }

    private sockets(): void {
        fs.readdirSync("dist/socketio").forEach((file, key) => {
            require("./socketio/" + file)(this.io);
        });
    }

    private database(): void {
        /*const { sequelize } = LOAD_MODEL();
        sequelize.sync({ force: false }).then(() => console.log("BASE DE DADOS INICIADA"));*/
    }
}
export default new App();