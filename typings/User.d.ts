interface User {
    _id: string,
    username: string,
    meta: UserMeta,
    email: string,
    createdAt: any // Todo: Identify this type
}

export type UserMeta = {
    ip : number | undefined,
    role: string
}

export default User