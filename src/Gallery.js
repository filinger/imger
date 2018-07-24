import React, {Component} from 'react';
import {Card, CardBody, CardColumns, CardImg, CardSubtitle, CardTitle, Modal, ModalBody, ModalHeader} from 'reactstrap';
import PostCarousel from "./PostCarousel";

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
  constructor(props) {
    super(props);
    this.state = {modal: false};
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({modal: !this.state.modal});
  }

  render() {
    return (
      <Card body inverse style={{backgroundColor: '#333', borderColor: '#333'}}>
        <CardImg top width="100%" src={this.props.src} alt="" onClick={this.toggle}/>
        <CardBody>
          <CardTitle>{this.props.title}</CardTitle>
          <CardSubtitle>{this.props.tags}</CardSubtitle>
        </CardBody>

        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>{this.props.title}</ModalHeader>
          <ModalBody>
            <PostCarousel images={this.props.images}/>
          </ModalBody>
        </Modal>
      </Card>
    );
  }
}

class Gallery extends Component {
  constructor(props) {
    super(props);
    this.state = {gallery: []};
    this.loadGallery = this.loadGallery.bind(this);
    this.searchGallery = this.searchGallery.bind(this);
  }

  componentDidMount() {
    this.loadGallery(this.props.section, this.props.sorting, this.props.window)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.tags !== this.props.tags && this.props.tags && this.props.tags.length > 0) {
      this.searchGallery(nextProps.tags)
    } else {
      this.loadGallery(nextProps.section, nextProps.sorting, nextProps.window)
    }
  }

  loadGallery(section, sorting, window) {
    imgurFetch(`gallery/${section.toLowerCase()}/${sorting.toLowerCase()}/${window.toLowerCase()}?showViral=true&mature=true`)
      .then(response => {
        this.setState({
          gallery: response.data
        })
      })
  }

  searchGallery(tags) {
    const query = 'title: ' + tags.map(t => t.replace('#', '')).join(' AND ');
    imgurFetch(`gallery/search/${this.props.sorting.toLowerCase()}/${this.props.window.toLowerCase()}?q=${query}`)
      .then(response => {
        this.setState({
          gallery: response.data
        })
      });
  }

  render() {
    const cards = this.state.gallery
      .filter(post => post.images && post.images.length > 0)
      .map(post => <PostCard key={post.id}
                             title={post.title}
                             src={post.images[0].link}
                             tags={post.tags.map(t => `#` + t.name).join(' ')}
                             images={post.images}
      />);

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
