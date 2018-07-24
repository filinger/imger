import React, {Component} from 'react';
import {
  Card, CardColumns, CardImg, CardTitle, CardBody
} from 'reactstrap';

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

class PostCard extends Component {
  render() {
    return (
      <Card body inverse style={{backgroundColor: '#333', borderColor: '#333'}}>
        <CardImg top width="100%" src={this.props.src} alt=""/>
        <CardBody>
          <CardTitle>{this.props.title}</CardTitle>
        </CardBody>
      </Card>
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

  componentWillReceiveProps() {
    this.loadGallery()
  }

  loadGallery() {
    imgurFetch(`gallery/${this.props.section.toLowerCase()}/${this.props.sorting.toLowerCase()}/${this.props.window.toLowerCase()}?showViral=true&mature=true`)
      .then(response => {
        this.setState({
          gallery: response.data
        })
      })
  }

  render() {
    const cards = this.state.gallery
      .filter(post => post.images && post.images.length > 0)
      .map(post => <PostCard key={post.id} title={post.title} src={post.images[0].link}/>);

    return (
      <CardColumns>
        {cards}
      </CardColumns>
    );
  }
}

Gallery.defaultProps = {
  section: 'Hot',
  sorting: 'Viral',
  window: 'Week',
  page: 1,
  tags: [],
  search: ''
};

export default Gallery;
