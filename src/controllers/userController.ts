import UserService from "../services/user_service";
import { Request, Response } from "express";
import { RegStatusT } from '../types/status';

export  default  class  UserController {

    static async regiserUser(req: Request, res: Response) {
        console.log(req.body);
        const status: RegStatusT = await UserService.registerUser(req.body);
        if (status.status === 'success') {
            res.status(200).json({ message: status.message });
        } else {
            res.status(400).json({ message: status.message });
        }
    }

}