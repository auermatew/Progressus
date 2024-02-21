import express from 'express';
import DbService from './service/db_service';
import dotenv from 'dotenv';

class App{

    public app: express.Application;
    public dbService: DbService;

    constructor(){
        dotenv.config();
        this.app = express();
        this.dbService = new DbService();
    }

    public listen(){
        this.app.listen(3000, () => {
            console.log('Server is running on port 3000');
        });
    }

}