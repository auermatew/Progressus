class User{
    id?: number;
    name: string;
    email: string;
    password: string;
    age: number;
    role: string;
    token?: string;

    constructor(name: string, email: string, password: string, age: number, role: string){
        this.name = name;
        this.email = email;
        this.password = password;
        this.age = age;
        this.role = role;
    }
        // Setters
          setId(id: number): void {
            this.id = id;
        }

        setName(name: string): void {
            this.name = name;
        }

        setEmail(email: string): void {
            this.email = email;
        }

        setPassword(password: string): void {
            this.password = password;
        }

        setAge(age: number): void {
            this.age = age;
        }

        setRole(role: string): void {
            this.role = role;
        }

        setToken(token: string): void {
            this.token = token;
        }

        // Getters
        getId(): number | undefined{
            return this.id;
        }

        getName(): string {
            return this.name;
        }

        getEmail(): string {
            return this.email;
        }

        getPassword(): string {
            return this.password;
        }

        getAge(): number {
            return this.age;
        }

        getRole(): string {
            return this.role;
        }

        getToken(): string | undefined {
            return this.token;
        }
}

export default User;

