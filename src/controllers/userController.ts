import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import DbService from '../service/db_service';
import User from '../model/user';
import jwt from 'jsonwebtoken';

const dbService = new DbService();

export const register = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, age, email, password, role } = req.body;
        
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user instance
        const newUser = new User({ name, age, email, password: hashedPassword, role });

        // Save user to the database
        const result = await dbService.query(
            'INSERT INTO users(name, age, email, password, role) VALUES($1, $2, $3, $4, $5) RETURNING id',
            [newUser.name, newUser.age, newUser.email, newUser.password, newUser.role]
        );

        // Generate JWT token
        const token = jwt.sign({ userId: result.rows[0].id }, process.env.JWT_SECRET || '');

        res.status(201).json({ message: 'User registered successfully', token });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
      const { email, password } = req.body;

      // Retrieve user from the database by email
      const result = await dbService.query('SELECT * FROM users WHERE email = $1', [email]);
      const user = result.rows[0];

      // Check if user exists
      if (!user) {
          res.status(401).json({ message: 'Invalid email or password' });
          return;
      }

      // Check password
      const passwordMatch = await bcrypt.compare(password, user.password);

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
