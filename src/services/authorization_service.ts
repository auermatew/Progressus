import User from '../models/user';
import jwt from 'jsonwebtoken';

export class AuthService{
    
    // Adat --> {password }
    // Hash the password
    static async hashPassword(password: string): Promise<string> {
        //const salt = await bcrypt.genSalt(10);
        //return await bcrypt.hash(password, salt);
        return password;
    }
    //Generate JWT token
    static async generateToken(user: User): Promise<string> {
        return await jwt.sign({ userId: user.id }, process.env.JWT_SECRET || '');
    }
    
}