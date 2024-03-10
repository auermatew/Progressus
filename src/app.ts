import express from 'express';
import DbService from './services/db_service';
import UserController from './controllers/userController';
import dotenv from 'dotenv';

class App{
    public app: express.Application;
    public port: number;

    constructor(){
        dotenv.config();
        this.app = express();
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: true}));
        DbService.init();
        this.setRoutes();
        this.port = process.env.APP_PORT ? parseInt(process.env.APP_PORT) : 3000;
        this.listen();
    }

    private setRoutes(){
        const router = express.Router();
        router.post('/reg', UserController.regiserUser);
        this.app.use('/', router);
    }

    public listen(){
        this.app.listen(this.port, () => {
            console.log(`App listening on the port ${this.port}`);
        });
    }
}

export default App;