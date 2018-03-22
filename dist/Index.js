"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http = require("http");
const debug = require("debug");
const App_1 = require("./App");
//import * as io_server from "socket.io";
const init = () => {
    debug('ts-express:server');
    const port = normalizePort(process.env.PORT || 80);
    App_1.default.express.set('port', port);
    const server = http.createServer(App_1.default.express);
    App_1.default.io.attach(server);
    server.listen(port);
    server.on('error', (error) => {
        if (error.syscall !== 'listen')
            throw error;
        let bind = (typeof port === 'string') ? 'Pipe ' + port : 'Port ' + port;
        switch (error.code) {
            case 'EACCES':
                console.error(`${bind} requires elevated privileges`);
                process.exit(1);
                break;
            case 'EADDRINUSE':
                console.error(`${bind} is already in use`);
                process.exit(1);
                break;
            default:
                throw error;
        }
    });
    server.on('listening', () => {
        let addr = server.address();
        let bind = (typeof addr === 'string') ? `pipe ${addr}` : `port ${addr.port}`;
        debug(`Listening on ${bind}`);
    });
    function normalizePort(val) {
        let port = (typeof val === 'string') ? parseInt(val, 10) : val;
        if (isNaN(port))
            return val;
        else if (port >= 0)
            return port;
        else
            return false;
    }
};
exports.init = init;
