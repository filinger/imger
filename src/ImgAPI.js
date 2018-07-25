export class ImgAPI {
  static fetch = requestUrl => {
    return fetch('https://api.imgur.com/3/' + requestUrl, {
      headers: {
        Authorization: `Client-ID 8d78ae8b814469f`
      }
    }).then(r => r.json())
  };
}
