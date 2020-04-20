import s from './static.json'
export function parseLanguageCode(code : string) {
    for (let c of s.communities) {
        if (c.code === code) {
            return c.name
        } 
    }
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