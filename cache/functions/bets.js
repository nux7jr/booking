import get_defalut_content from '../../app/requests/text.request.js'
import 'dotenv/config';
import fs from 'fs'

export default function initCaching () {
  const url = process.env.URL_API_BETTING;
  get_defalut_content(url).then(data => {
    fs.writeFile('cache/data/bets.json', data, (err) => {
      if (err) throw err;
      console.log('Data written to file');
    });
  });
}

class cacher {
  constructor(url, time) {
    this.url = url;
    this.time = time;
  }
}