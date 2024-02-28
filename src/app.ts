import express from 'express';
import DbService from './service/db_service';
import dotenv from 'dotenv';

class App{
    public app: express.Application;
    public dbService: DbService;
    public port: number;

    constructor(){
        dotenv.config();
        this.app = express();
        this.dbService = new DbService();
        this.port = process.env.APP_PORT ? parseInt(process.env.APP_PORT) : 3000;
    }

    public listen(){
        this.app.listen(this.port, () => {
            console.log(`App listening on the port ${this.port}`);
        });
    }

}

export default App;