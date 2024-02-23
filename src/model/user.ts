class User {
    private _id: number | null = null;
    private _name: string | null = null;
    private _age: number | null = null;
    private _email: string | null = null;
    private _password: string | null = null;
    private _role : string | null = null;

    constructor(params: Partial<User>) {
        Object.assign(this, params);
    }   

    /**
     * Getter id
     * @return {number | null}
     */
	public get id(): number | null  {
		return this._id;
	}

    /**
     * Setter id
     * @param {number } value
     */
	public set id(value: number ) {
		this._id = value;
	}
    
    /**
     * Getter name
     * @return {string | null}
     */
	public get name(): string | null  {
		return this._name;
	}

    /**
     * Setter name
     * @param {string } value
     */
	public set name(value: string ) {
		this._name = value;
	}

    /**
     * Getter age
     * @return {number | null}
     */
	public get age(): number | null  {
		return this._age;
	}

    /**
     * Setter age
     * @param {number } value
     */
	public set age(value: number ) {
		this._age = value;
	}

    /**
     * Getter email
     * @return {string | null}
     */
	public get email(): string | null {
		return this._email;
	}

    /**
     * Setter email
     * @param {string } value
     */
	public set email(value: string ) {
		this._email = value;
	}

    /**
     * Getter password
     * @return {string | null }
     */
	public get password(): string | null {
		return this._password;
	}

    /**
     * Setter password
     * @param {string } value
     */
	public set password(value: string ) {
		this._password = value;
	}

    /**
     * Getter role
     * @return {string | null }
     */
	public get role(): string | null  {
		return this._role;
	}

    /**
     * Setter role
     * @param {string } value
     */
	public set role(value: string ) {
		this._role = value;
	}

}

export default User;