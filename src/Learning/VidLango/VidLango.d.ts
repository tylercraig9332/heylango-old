export default interface VidLango {
    video_id : string,
    snippet : snippet | undefined,
    captions : Array<any>,
    kind : string | 'yt'
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