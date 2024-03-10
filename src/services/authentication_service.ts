
export class AuthenticationService {

    static isValidEmail(email: string): boolean {
        //TODO: validation email sending
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    static isStrongPassword(password: string): boolean {
/*          Starts with an uppercase letter.
            Includes at least one lowercase letter.
            Includes at least one digit.
            Minimum length of 8 characters.
            Maximum length of 16 characters. */
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,16}$/;
        return passwordRegex.test(password);
    }

    static isSQLInjectionSafe(input: string): boolean {
        const sqlInjectionRegex = /[-[\]{}()*+?.,\\^$|#\s]/;
        return !sqlInjectionRegex.test(input);
    }
    static isValidAge(age: number): boolean { return age >= 0 && age <= 120; }

    
}
