import s from './static.json'
export function parseLanguageCode(code : string) {
    for (let c of s.communities) {
        if (c.code === code) {
            return c.name
        } 
    }
}