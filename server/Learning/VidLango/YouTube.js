const fetch = require('node-fetch')

class YouTube {
    constructor() {
        //this.getVideoDetails = getVideoDetails
        this.apiKey = 'AIzaSyCy4XOULjfMoUZFEKoTaCmKG_ZKwVpkt_c' //TODO: Don't push this up to GitHub
    }

    getVideoDetails(videoID, callback) {
        const reqHeader = {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }
        fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails&id=${videoID}&key=${this.apiKey}`, reqHeader).then(res => {
            console.log(res)    
            if (res.status !== 200) {
                console.error(res.statusText)
            }
            else return res.json()
        }).then((data) => {
            callback(data)
        })
    }
}

module.exports = YouTube