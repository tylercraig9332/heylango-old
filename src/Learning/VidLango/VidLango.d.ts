export default interface VidLango {
    video_id : string,
    meta : vmeta | undefined,
    tags: Array<any>,
    author: string,
    language: string,
    captions : Array<any>,
    kind : string | 'yt',
    _id : string
}

export type snippet = {
    publishedAt: string,
    channelId : string,
    title: string,
    description: string,
    thumbnails : Object,
    channelTitle: string,
    tags: Array,
    categaryId: string,
    liveBroadcastContent: string,
    localized: Object,
    defaultAudioLanguage: string
}
export type vmeta = {
    title: string,
    description: string,
    categoryId: string,
    thumbnails: string
}