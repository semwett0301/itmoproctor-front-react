export interface ILocalization {
    translation: {
        student: object,
        proctor: object,
        admin: object,
        shared: object
    }
}

export const engLocalization: ILocalization = {
    translation: {
        student: {
            name: 'Username'
        },
        proctor: {},
        admin: {},
        shared: {
            auth: {
                login: 'Login',
                password: 'Password',
                signIn: 'Sign in'
            }
        }
    }

}