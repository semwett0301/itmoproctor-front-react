export interface ILocalization {
    translation: {
        unauthorized: object,
        student: object,
        proctor: object,
        admin: object,
        shared: object
    }
}

export const engLocalization: ILocalization = {
    translation: {
        unauthorized: {
            auth: {
                login: 'Login',
                password: 'Password',
                signIn: 'Sign in'
            },
            installing: {
                name: 'Proctoring system from ITMO',
                download: 'Download',
                version: 'version',
                from: 'from',
                other: 'Other versions of application',
                forEach: 'For',
                prevVersion: 'Previous version',
                nextVersion: 'Next version'
            }
        },
        student: {
            name: 'Username'
        },
        proctor: {},
        admin: {},
        shared: {

        }
    }

}
