import { Console } from "console"

export function speak(text : string, language : string, displayError : boolean) {
    let utterance = new SpeechSynthesisUtterance()
    utterance.text = text
    utterance.lang = language
    let voices = window.speechSynthesis.getVoices()
    let e = false
    voices.forEach((voice) => {
        const split = voice.lang.split('-')
        let v = split[0]
        if (v === language) {
            e = true
        }
    })
    if (e) {
        window.speechSynthesis.speak(utterance)
    } else {
        if (displayError) {
            alert(`The language of this text (${language}) is not installed on your local machine.\n\nView console for more information`)
            console.log('---Text-to-speach Voice Error---')
            console.log(`Text-to-speach attempted to translate "${text}" from the language "${language}," but installed languages on your machine for speechSynthesis do not support this language.`)
            console.log(`If you are using Windows, please visit https://support.microsoft.com/en-us/office/how-to-download-text-to-speech-languages-for-windows-10-d5a6b612-b3ae-423f-afa5-4f6caf1ec5d3 to learn how to install new languages`)
            console.log('Currently Installed Voices and Languages: ', voices)
            console.log('------')
        }
    }   
}