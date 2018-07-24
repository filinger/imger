import React, {Component} from 'react';
import {CardColumns} from 'reactstrap';
import PostCard from "./PostCard";
import ImgurAPI from "./ImgurAPI";

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
    const newTags = nextProps.tags;

    if (newTags !== this.props.tags && newTags && newTags.length > 0) {
      this.searchGallery(newTags)
    } else {
      this.loadGallery(nextProps.section, nextProps.sorting, nextProps.window)
    }
  }

  loadGallery(section, sorting, window) {
    ImgurAPI.get(`gallery/${section.toLowerCase()}/${sorting.toLowerCase()}/${window.toLowerCase()}?showViral=true&mature=true`)
      .then(response => {
        this.setState({
          gallery: response.data
        })
      })
  }

  searchGallery(tags) {
    const query = 'title: ' + tags.map(t => t.replace('#', '')).join(' AND ');
    ImgurAPI.get(`gallery/search/${this.props.sorting.toLowerCase()}/${this.props.window.toLowerCase()}?q=${query}`)
      .then(response => {
        this.setState({
          gallery: response.data
        })
      });
  }

  render() {
    const cards = this.state.gallery
      .filter(post => post.images && post.images.length > 0)
      .map(post => <PostCard id={post.id}
                             key={post.id}
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
