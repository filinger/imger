import React, {Component} from 'react';
import {Carousel, CarouselCaption, CarouselControl, CarouselIndicators, CarouselItem} from 'reactstrap';

class PostCarousel extends Component {
  constructor(props) {
    super(props);
    this.state = {activeIndex: 0};
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.goToIndex = this.goToIndex.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);
  }

  onExiting() {
    this.animating = true;
  }

  onExited() {
    this.animating = false;
  }

  next() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === this.props.images.length - 1 ? 0 : this.state.activeIndex + 1;
    this.setState({activeIndex: nextIndex});
  }

  previous() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === 0 ? this.props.images.length - 1 : this.state.activeIndex - 1;
    this.setState({activeIndex: nextIndex});
  }

  goToIndex(newIndex) {
    if (this.animating) return;
    this.setState({activeIndex: newIndex});
  }

  render() {
    const {activeIndex} = this.state;
    const slides = this.props.images.map(img => {
      return (
        <CarouselItem onExiting={this.onExiting} onExited={this.onExited} key={img.id}>
          <img width="100%" src={img.link} alt=""/>
          <CarouselCaption className="text-danger" captionText="" captionHeader=""/>
        </CarouselItem>
      );
    });

    const items = this.props.images.map(img => {
      return {src: img.link}
    });

    return (
      <Carousel activeIndex={activeIndex} next={this.next} previous={this.previous}>
        <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={this.goToIndex}/>
        {slides}
        <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous}/>
        <CarouselControl direction="next" directionText="Next" onClickHandler={this.next}/>
      </Carousel>
    );
  }
}

PostCarousel.defaultProps = {
  images: []
};

export default PostCarousel;