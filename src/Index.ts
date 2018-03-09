import * as http from 'http';
import * as debug from 'debug';
import * as fs from 'fs';
import App from './App';
//import * as io_server from "socket.io";

var init = () => {
    debug('ts-express:server');
    const port = normalizePort(process.env.PORT || 80);
    App.express.set('port', port);
    const server = http.createServer(App.express);
    App.io.attach(server);
    server.listen(port);
    server.on('error', (error: NodeJS.ErrnoException): void => {
        if (error.syscall !== 'listen') throw error;
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
    server.on('listening', (): void => {
        let addr = server.address();
        let bind = (typeof addr === 'string') ? `pipe ${addr}` : `port ${addr.port}`;
        debug(`Listening on ${bind}`);
    });
    function normalizePort(val: number | string): number | string | boolean {
        let port: number = (typeof val === 'string') ? parseInt(val, 10) : val;
        if (isNaN(port)) return val;
        else if (port >= 0) return port;
        else return false;
    }
}
export { init };