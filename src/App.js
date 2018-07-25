import React, {Component} from 'react';
import {ImgCollection} from "./ImgCollection";

import {ImgNavBar} from "./ImgNavBar";

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      navBarInput: null
    };
  }

  handleInputUpdate = (newInput) => {
    this.setState({navBarInput: newInput})
  };

  render() {
    return (
      <div className="App">
        <ImgNavBar onInputUpdate={this.handleInputUpdate}/>
        <ImgCollection {...this.state.navBarInput}/>
      </div>
    );
  }
}

export default App;
