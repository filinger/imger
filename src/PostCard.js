import React, {Component} from 'react';
import {Card, CardBody, CardImg, CardSubtitle, CardTitle, Modal, ModalBody, ModalHeader} from 'reactstrap';
import PostCarousel from "./PostCarousel";

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

export default PostCard;
