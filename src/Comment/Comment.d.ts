export default interface Comment {
    author: string,
    content: string,
    parent: string,
    _id: string,
    children?: Comment[],
    createdAt: string | Object
}