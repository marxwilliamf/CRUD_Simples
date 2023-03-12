import * as express from "express";
import { createConnection } from "typeorm";

export class App {
    private app: express.Application;

    constructor() {
        this.app = express();
        this.connectDb();
        //this.config();
    }

    private async connectDb() {
        await createConnection();
    }

    public listen(port: number): void {
        this.app.listen(port, () => {
            console.log(`Server started on port ${port}`);
        });
    }
}






// import express from "express";

// const app = express();
// // ...
// module.exports = app;


// export class App {
//     private app: express.Application;

//     constructor() {
//         this.app = express();
//         //this.config();
//     }

//     // private config(): void {
//     //     this.app.use(bodyParser.json()); // body-parser middleware para lidar com dados json
//     //     this.app.use(cors()); // middleware cors para permitir requisições cross-origin
//     //     this.app.use(helmet()); // middleware helmet para aumentar a segurança do aplicativo

//     //     this.app.use('/', routes); // adiciona as rotas do seu aplicativo
//     //     this.app.use(errorMiddleware); // adiciona o middleware de tratamento de erros
//     // }

//     public listen(port: number): void {
//         this.app.listen(port, () => {
//             console.log(`Server started on port ${port}`);
//         });
//     }
// }