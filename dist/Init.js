"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Index_1 = require("./Index");
class Init {
    constructor() {
        this.defineEnviroment();
    }
    defineEnviroment() {
        if (process.env.NODE_ENV.trim() === "dev") {
            this.RunOneThread();
        }
        else if (process.env.NODE_ENV.trim() === "test") {
            this.RunAllThreads();
        }
        else if (process.env.NODE_ENV.trim() === "production") {
            this.RunAllThreads();
        }
    }
    RunAllThreads() {
        const cluster = require('cluster');
        const numCPUs = require('os').cpus().length;
        if (cluster.isMaster) {
            console.log(`Master ${process.pid} is running`);
            for (let i = 0; i < numCPUs; i++) {
                cluster.fork();
            }
            cluster.on('exit', (worker, code, signal) => {
                console.log(`worker ${worker.process.pid} died`);
            });
        }
        else {
            Index_1.init();
        }
    }
    RunOneThread() {
        Index_1.init();
    }
}
new Init();
