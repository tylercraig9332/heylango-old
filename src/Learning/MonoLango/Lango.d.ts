interface Lango {
    _id: string,
    content: string,
    title: string,
    description: string,
    language: string,
    author: string,
    alternateContent?: string
    audio?: any,
    video_id?: string,
    imgSrc? : string
}

export default Lango