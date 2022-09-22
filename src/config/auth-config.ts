interface IAuthConfig {
    roles: object,
    providers: object
}

const authConfig: IAuthConfig = {
    roles: {
        0: "unauthorized",
        1: "student",
        2: "proctor",
        3: "admin",
    },
    providers: [
        "local",
        "openedu"
    ]
}

export default authConfig;