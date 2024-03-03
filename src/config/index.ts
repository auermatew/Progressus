import App from "../app";
import dotenv from 'dotenv';

dotenv.config();

const app = new App();

const config = {
  jwtSecret: process.env.JWT_SECRET
};

export default config;