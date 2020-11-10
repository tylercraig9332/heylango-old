import s from './language.json'
export function parseLanguageCode(code : string) {
  // Language codes are often occompanied by their country eg. 'en-US' or 'en_UK' 
    if (code.length > 2) {
      code = code.slice(0, 2)
    }
    for (let c of s.info) {
        if (c.code === code) {
            return c.name
        } 
    }
    // This will return whatever was passed if language code not found
    return code
}

export function parseLanguageFlag(code : string) {
  // Language codes are often occompanied by their country eg. 'en-US' or 'en_UK' 
  // It would be nice in the future to parse countrycode and return their emoji, rather than the general one saved in the JSON
  if (code.length > 2) {
    code = code.slice(0, 2)
  }
  for (let c of s.info) {
      if (c.code === code) {
          return c.flag
      } 
  }
}

export function parseCategoryId(code : string) {
  let cat : {[key: string] : any} = s.youtubeCategories

  // Just rereturn the code if it doesn't exist
  if (cat[code] === undefined) return code
  return cat[code]
}

export function timeSince(dString : string) {
    let date : any = new Date(dString);
    let now : any = new Date()
  
    let seconds = Math.floor((now - date) / 1000);
    let intervalType;
  
    let interval = Math.floor(seconds / 31536000);
    if (interval >= 1) {
      intervalType = 'year';
    } else {
      interval = Math.floor(seconds / 2592000);
      if (interval >= 1) {
        intervalType = 'month';
      } else {
        interval = Math.floor(seconds / 86400);
        if (interval >= 1) {
          intervalType = 'day';
        } else {
          interval = Math.floor(seconds / 3600);
          if (interval >= 1) {
            intervalType = "hour";
          } else {
            interval = Math.floor(seconds / 60);
            if (interval >= 1) {
              intervalType = "minute";
            } else {
              interval = seconds;
              intervalType = "second";
            }
          }
        }
      }
    }
    if (interval > 1 || interval === 0) {
        intervalType += 's';
    }
    
    return interval + ' ' + intervalType;
}

export function timeFormat(seconds : number) {
    if (seconds === 0) return '0:00'
    let s = seconds
    let m = Math.floor(s / 60)
    s %= 60
    let h = Math.floor(m / 60)
    let sform = (s < 10) ? `0${s}` : `${s}` // adds 0 before second 4:06 
    let mform = (h > 0 && m < 10) ? `0${m}` : `${m}` // adds 0 before if there is an hour 1:04:55 vs 4:55
    let hform = (h > 0) ? `${h}:` : ''
    return `${hform}${mform}:${sform}`
}