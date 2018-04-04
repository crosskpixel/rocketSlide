import { init } from "./Index";
class Init {

    constructor() {
        this.defineEnviroment();
    }

    defineEnviroment(): void {
        try {
            if (process.env.NODE_ENV.trim() === "dev") {
                this.RunOneThread();
            } else if (process.env.NODE_ENV.trim() === "test") {
                this.RunOneThread();
            } else if (process.env.NODE_ENV.trim() === "production") {
                this.RunAllThreads();
            } else if (process.env.NODE_ENV.trim() === "umbler") {
                this.RunOneThread();
            }
        }catch(err){
            console.log("DEFINA A VARIAVEL DE AMBIENTE");
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