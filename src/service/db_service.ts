import { Client } from 'ts-postgres';

export default class DbService {
    client: Client | undefined;

    constructor() {
        this.init();
    }

    async ping(): Promise<any> {
        console.log("Pinging the database...");
        const res = await this.query('SELECT NOW()');
        console.log("Database pinged successfully:", res);
        return res;
    }

    private async checkClient(): Promise<Client> {
        if (!this.client) {
            throw new Error("Database client is undefined");
        }
        return this.client;
    }

    private async connectToDB(): Promise<void> {
        console.log("Connecting to the database...");
        this.client = new Client({
            host: process.env.DB_HOST || 'localhost',
            port: parseInt(process.env.DB_PORT || '5432'),
            database: process.env.POSTGRES_DB || 'progressus',
            user: process.env.POSTGRES_USER || 'progressus',
            password: process.env.POSTGRES_PASSWORD || 'progressus'
        });
        await this.client.connect();
    }

    private async disconnectFromDB(): Promise<void> {
        const client = await this.checkClient();
        console.log("Disconnecting from the database...");
        await client.end();
    }

    async query(query: string, params?: any[]): Promise<any> {
        try {
            const client = await this.checkClient();
            console.log("Executing query:", query, params);
            const result = await client.query(query, params);
            console.log("Query executed successfully:", result);
            return result;
        } catch (error) {
            console.error("Error executing query:", error);
            throw error; // Rethrow the error for the caller to handle
        }
    }

    async init(): Promise<void> {
        try {
            await this.connectToDB(); // Connect to DB before initializing
            
            await this.query(`
                CREATE TABLE IF NOT EXISTS users (
                    id SERIAL PRIMARY KEY,
                    name VARCHAR(255) NOT NULL,
                    age INT NOT NULL,
                    email VARCHAR(255) NOT NULL UNIQUE,
                    password VARCHAR(255) NOT NULL,
                    role VARCHAR(255) NOT NULL
                )
            `);

            await this.query(`
                CREATE TABLE IF NOT EXISTS relations (
                    id SERIAL PRIMARY KEY,
                    user_id_1 INT NOT NULL FOREIGN KEY REFERENCES users(id),
                    user_id_2 INT NOT NULL FOREIGN KEY REFERENCES users(id)
                )
            `);

            await this.query(`
                CREATE TABLE IF NOT EXISTS chat_room (
                    id SERIAL PRIMARY KEY,
                    user_id INT NOT NULL FOREIGN KEY REFERENCES users(id),
                    message VARCHAR(255) NOT NULL,
                    time_sent TIMESTAMP NOT NULL,
                    seen BOOLEAN NOT NULL
                )
            `);

            await this.query(`
                CREATE TABLE IF NOT EXISTS organiser_profile_page (
                    user_id INT NOT NULL FOREIGN KEY REFERENCES users(id),
                    desc VARCHAR(255) NOT NULL,
                    rating INT NOT NULL,
                    comments VARCHAR(255) NOT NULL
                )
            `);

            await this.query(`
                CREATE TABLE IF NOT EXISTS class (
                    id SERIAL PRIMARY KEY,
                    organiser_id INT NOT NULL FOREIGN KEY REFERENCES organiser_profile_page(user_id),
                    time TIMESTAMP NOT NULL,
                    price INT NOT NULL,
                    booked BOOLEAN NOT NULL,
                    booked_user_id INT
                )
            `);

            console.log("Database initialized successfully");

        } catch (error) {
            console.error("Error initializing database:", error);
            throw error; // Rethrow the error for the caller to handle
        }
        finally {
            await this.disconnectFromDB(); // Disconnect from DB after initializing
        }
    }
}
