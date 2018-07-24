const ClientId = 'a7e081ef1fdf64e';
const BaseUrl = 'https://api.imgur.com/3/';

class ImgurAPI {
  static checkStatus = response => {
    if (response.status >= 200 && response.status < 300) {
      return Promise.resolve(response)
    } else {
      return Promise.reject(new Error(response.statusText))
    }
  };

  static get = requestUrl => {
    return fetch(BaseUrl + requestUrl, {headers: {Authorization: `Client-ID ${ClientId}`}})
      .then(this.checkStatus)
      .then(r => r.json())
      .catch(e => console.log('Request failed', e))
  };
}

export default ImgurAPI;
