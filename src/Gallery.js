import React, {Component} from 'react';

const ClientId = 'a7e081ef1fdf64e';
const BaseUrl = 'https://api.imgur.com/3/';

const checkStatus = response => {
  if (response.status >= 200 && response.status < 300) {
    return Promise.resolve(response)
  } else {
    return Promise.reject(new Error(response.statusText))
  }
};

const imgurFetch = requestUrl => {
  return fetch(BaseUrl + requestUrl, {headers: {Authorization: `Client-ID ${ClientId}`}})
    .then(checkStatus)
    .then(r => r.json())
    .catch(e => console.log('Request failed', e))
};

class PostThumbnail extends Component {
  render() {
    return (
      <div className="col-lg-3 col-md-4 col-xs-6">
        <a className="d-block mb-4 h-100">
          <img className="img-fluid img-thumbnail" src={this.props.src} alt=""/>
        </a>
      </div>
    );
  }
}

class Gallery extends Component {
  constructor(props) {
    super(props);
    this.state = {gallery: []};
    this.loadGallery = this.loadGallery.bind(this);
  }

  componentDidMount() {
    this.loadGallery()
  }

  loadGallery() {
    imgurFetch(`gallery/${this.props.section.toLowerCase()}/${this.props.sort.toLowerCase()}/${this.props.window.toLowerCase()}?showViral=true&mature=true`)
      .then(response => {
        this.setState({
          gallery: response.data
        })
      })
  }

  render() {
    const thumbnails = this.state.gallery
      .filter(post => post.images && post.images.length > 0)
      .map(post => <PostThumbnail key={post.id} src={post.images[0].link}/>);

    return (
      <main role="main" className="container">
        <div className="row text-center text-lg-left">
          {thumbnails}
        </div>
      </main>
    );
  }
}

Gallery.defaultProps = {
  section: 'Hot',
  sort: 'Viral',
  window: 'Week',
  page: 1,
  tags: [],
  search: ''
};

export default Gallery;
