import React, {Component} from 'react';
import Navbar from "./Navbar";
import Gallery from "./Gallery";

class App extends Component {

  render() {
    return (
      <div className="App">
        <Navbar/>
        <Gallery/>
      </div>
    );
  }
}

export default App;
