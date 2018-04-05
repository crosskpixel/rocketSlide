"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");
const expressValidator = require("express-validator");
const io_server = require("socket.io");
const index_1 = require("./middlewares/index");
// Criando as configurações para o ExpressJS
class App {
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
    config() {
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: true }));
        this.express.use(cors({ origin: process.env.DOMAIN.trim(), allowedHeaders: ["Content-Type", "Authorization"] }));
        (process.env.NODE_ENV.trim() == "umbler" ? "Servidor iniciado na UMBLER.NET" : this.express.use(logger('dev')));
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
        this.express.use((req, res, next) => {
            req["session"] = {};
            req["ROOT_PATH"] = __dirname;
            // res.setHeader("Cache-Control", 'no-cache');
            res.setHeader('Access-Control-Allow-Origin', "*");
            // res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
            //  res.setHeader("Access-Control-Allow-Headers", "*");
            // res.setHeader('Access-Control-Allow-Credentials', "false");
            // res.setHeader('Access-Control-Max-Age', '1728000');
            if (process.env.NODE_ENV.trim() != "test") {
                if (req.headers['x-forwarded-proto'] != 'https') {
                    res.redirect("https://" + req.headers.host + req.url);
                }
                else {
                    next();
                }
            }
            next();
        });
        this.express.use(express.static(path.join(__dirname, "public")));
    }
    middleware() {
        let customValidators = index_1.LOAD_MIDDLEWARES();
        this.express.use(expressValidator({ customValidators }));
    }
    routes() {
        fs.readdirSync("dist/routes").forEach((file, key) => {
            require("./routes/" + file)(this.express);
        });
    }
    sockets() {
        fs.readdirSync("dist/socketio").forEach((file, key) => {
            require("./socketio/" + file)(this.io);
        });
    }
    database() {
        /*const { sequelize } = LOAD_MODEL();
        sequelize.sync({ force: false }).then(() => console.log("BASE DE DADOS INICIADA"));*/
    }
}
exports.default = new App();
