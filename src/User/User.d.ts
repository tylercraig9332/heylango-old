interface User {
    id: String,
    username: String,
    meta: UserMeta,
    email: String,
    createdAt: any // Todo: Identify this type
}

export type UserMeta = {
    ip : number | undefined,
    role: String
}

export default User