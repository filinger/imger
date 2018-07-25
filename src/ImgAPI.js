export class ImgAPI {
  static fetch = requestUrl => {
    return fetch('https://api.imgur.com/3/' + requestUrl, {
      headers: {
        Authorization: `Client-ID a7e081ef1fdf64e`
      }
    }).then(r => r.json())
  };
}
