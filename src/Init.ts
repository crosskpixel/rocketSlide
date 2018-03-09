import { init } from "./Index";
class Init {

    constructor() {

        

        this.defineEnviroment();
    }

    defineEnviroment(): void {
        if (process.env.NODE_ENV.trim() === "dev") {
            this.RunOneThread();
        } else if (process.env.NODE_ENV.trim() === "test") {
            this.RunAllThreads();
        } else if (process.env.NODE_ENV.trim() === "production") {
            this.RunAllThreads();
        }
    }

    private RunAllThreads() {
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
        } else {
            init();
        }
    }

    private RunOneThread() {
        init();
    }

}
new Init();