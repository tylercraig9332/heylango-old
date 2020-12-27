import getBrowserInfo from './getBrowserInfo'
import { message } from 'antd'
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
    const browser = getBrowserInfo()
    if (browser.indexOf('Safari') != -1) { // User is using Safari
        const lang = navigator.language 
        if (lang != language) {
            alert('Safari does not support text-to-speech unless the system/MacOS language is the same, please visit https://osxdaily.com/2016/04/26/add-change-language-mac-os-x/')
            return
        }
    }
    if (e || browser.indexOf('Chrome') != -1) { // User has language downloaded or is using Chrome
        window.speechSynthesis.speak(utterance)
    } else {
        if (displayError) {
            console.log('---Text-to-speach Voice Error---')
            console.log(`Text-to-speach attempted to translate "${text}" from the language "${language}," but installed languages on your browser for speechSynthesis do not support this language.`)
            console.log('Sometimes this issue can be fixed automatically by trying to run text-to-speech a second time.')
            console.log(`Please add languages to your browser by following this guide https://www.wikihow.com/Change-Your-Browser%27s-Language`)
            console.log('You can also add languages for your operating system and restarting the browser so the new languages will take affect in your browser. See guides below')
            console.log(`If you are using Windows, please visit https://support.microsoft.com/en-us/office/how-to-download-text-to-speech-languages-for-windows-10-d5a6b612-b3ae-423f-afa5-4f6caf1ec5d3`)
            console.log('If you are using Mac, please visit https://osxdaily.com/2016/04/26/add-change-language-mac-os-x/')
            console.log('Currently Installed Voices and Languages: ', voices)
            console.log('------')
            alert(`The language of this text (${language}) is not installed on your browser.\n\nSometimes, trying again will install the correct language.\n\nView console (F12) for more information`)
            message.info('Please try again')
        }
    }   
}