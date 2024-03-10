import { Request, Response } from 'express';
import DbService from './db_service';
import User from '../models/user';
import jwt from 'jsonwebtoken';
import { RegStatusT } from '../types/status';
import { AuthService } from './authorization_service';
import { AuthenticationService } from './authentication_service';


export default class UserService {
    static registerUser = async ({ name, age, email, password, role }: User): Promise<RegStatusT> => {
        try {
            console.log('registerUser', name, age, email, password, role);
             
            // Check  SQL injection for all fields
             /*if(AuthenticationService.isSQLInjectionSafe(name) || AuthenticationService.isSQLInjectionSafe(email) || AuthenticationService.isSQLInjectionSafe(password)){
                return { status: 'error', message: 'Invalid input' };
            }*/

            // Check if all fields are filled out
            if (!name || !age || !email || !password || !role) {
                return { status: 'error', message: 'All fields are required' };
            }
            if(!AuthenticationService.isValidEmail(email)){
                return { status: 'error', message: 'Invalid email' };   
            }
            if(!AuthenticationService.isStrongPassword(password)){
                return { status: 'error', message: 'Password is not strong enough' };
            }
            if(await this.ifUserExists(email)){
                return { status: 'error', message: 'User already exists' };
            }


            // Check if email is valid

           
            
            
            
            // Hash password
            const hashedPassword = await AuthService.hashPassword(password);


            // Create a new user instance
            const newUser = new User( name, email, hashedPassword, age, role );
            


            // Save user to the database and getting id back
            const result = await DbService.query(
                'INSERT INTO users(name, age, email, password, role) VALUES($1, $2, $3, $4, $5) RETURNING id',
                [newUser.name, newUser.age, newUser.email, newUser.password, newUser.role]
            );

            //id
        
            if (result.rows.length === 0) {
                return { status: 'error', message: 'User registration failed' };
            }
            newUser.id = result.rows[0].id;
            console.log('newUser', newUser);
            

            /*
            {
                name,
                email,
                password: hashedPassword,
                age,
                role
                id
                token?
            */

            // Generate JWT token
            const token = await AuthService.generateToken(newUser);

            return { status: 'success', message: 'User registered successfully', token: token };
        } catch (error) {
            console.error('Error registering user:', error);
            return { status: 'error', message: 'Internal server error' };
        }
    };

    static  loginUser = async (req: Request, res: Response): Promise<void> => {
        try {
            const { email, password } = req.body;

            // Retrieve user from the database by email
            const result = await DbService.query('SELECT * FROM users WHERE email = $1', [email]);
            const user = result.rows[0];

            // Check if user exists
            if (!user) {
                res.status(401).json({ message: 'Invalid email or password' });
                return;
            }

            // Check password
            //const passwordMatch = await bcrypt.compare(password, user.password);
            const passwordMatch = true;

            if (!passwordMatch) {
                res.status(401).json({ message: 'Invalid email or password' });
                return;
            }

            // Generate JWT token
            const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET || '');

            res.json({ message: 'Login successful', token });
        } catch (error) {
            console.error('Error logging in user:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    };

    static ifUserExists = async (email: string): Promise<boolean> => {
        const result = await DbService.query('SELECT * FROM users WHERE email = $1', [email]);
        console.log('ifUserExists', result.rows.length > 0);
        console.log(result.rows);
        
        return result.rows.length > 0;
    }
}

