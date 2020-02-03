interface Post {
    id?: string,
    title: string,
    content?: string,
    community: string,
    image: string,
    author: string,
    createdAt?: any // TODO: figure a handler for this.
}

export default Post