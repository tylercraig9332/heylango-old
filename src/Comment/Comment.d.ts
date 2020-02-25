export default interface Comment {
    author: string | Object,
    content: string,
    parent: string,
    id: string,
    children?: Comment[]
}