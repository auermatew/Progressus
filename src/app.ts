import express, { json } from 'express';
import DbService from './service/db_service';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';

class App{
    public app: express.Application;
    public dbService: DbService;
    public port: number;

    constructor(){
        dotenv.config();
        this.app = express();
        this.dbService = new DbService();
        this.port = process.env.APP_PORT ? parseInt(process.env.APP_PORT) : 3000;
        this.config();
        this.routes();
        this.listen();
    }

    config() {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(cors(
          {
            origin: '*',
            methods: ['GET', 'POST', 'PUT', 'DELETE']
          }
        ));
        this.app.use(json());
    }

    routes() {
        //this.app.use('/api', routerApi);
    }

    public listen(){
        this.app.listen(this.port, () => {
            console.log(`App listening on the port ${this.port}`);
        });
    }
}

export default App;