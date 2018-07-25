import React, {Component} from 'react';
import {CardColumns} from 'reactstrap';
import {ImgPost} from "./ImgPost";
import {ImgAPI} from "./ImgAPI";

export class ImgCollection extends Component {
  constructor(props) {
    super(props);
    this.state = {posts: []};
    this.fetchPosts = this.fetchPosts.bind(this);
  }

  componentDidMount() {
    this.fetchPosts(this.props.section, this.props.sorting, this.props.window, null)
  }

  componentWillReceiveProps(nextProps) {
    const newSearch = nextProps.query;
    if (newSearch !== this.props.tags && newSearch && newSearch.length > 0) {
      this.fetchPosts(nextProps.section, nextProps.sorting, nextProps.window, newSearch)
    } else {
      this.fetchPosts(nextProps.section, nextProps.sorting, nextProps.window, null)
    }
  }

  fetchPosts(section, sorting, window, query) {
    section = section.toLowerCase();
    sorting = sorting.toLowerCase();
    window = window.toLowerCase();

    let url = '';
    if (query && query.length > 0) {
      url += `gallery/search/${sorting}/${window}?q=${query}`;
    } else {
      url += `gallery/${section}/${sorting}/${window}`;
    }

    ImgAPI.fetch(url).then(response => {
      this.setState({posts: response.data})
    })
  }

  render() {
    const cards = this.state.posts
      .filter(post => post.images && post.images.length > 0)
      .map(post => <ImgPost id={post.id}
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

ImgCollection.defaultProps = {
  section: 'Hot',
  sorting: 'Viral',
  window: 'Week',
  query: ''
};
