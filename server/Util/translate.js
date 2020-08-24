const {TranslationServiceClient} = require('@google-cloud/translate');
const gcloud = require('./gcloud.json')
const translationClient = new TranslationServiceClient({keyFile: './server/Util/gcloud.json'});

async function translateText(text, targetCode) {
    const p_id = gcloud.project_id
    const location = 'global'
    // Construct request
    const request = {
        parent: `projects/${p_id}/locations/${location}`,
        contents: [text],
        mimeType: 'text/plain', // mime types: text/plain, text/html
        sourceLanguageCode: targetCode,
        targetLanguageCode: 'en',
    };

    let translations = []
    try {
        // Run request
        const [response] = await translationClient.translateText(request);
        
        for (const translation of response.translations) {
            console.log(`Translation: ${translation.translatedText}`);
            translations.push(translation.translatedText)
        }
    } catch (error) {
        console.error(error);
    }
    return translations
}

module.exports = translateText