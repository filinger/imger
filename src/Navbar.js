import React, {Component} from 'react';


class Navbar extends Component {

  render() {
    return (
      <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
        <a className="navbar-brand" href="#">ImgEr</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar"
                aria-controls="navbar" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"/>
        </button>

        <div className="collapse navbar-collapse" id="navbar">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" id="section" data-toggle="dropdown"
                 aria-haspopup="true" aria-expanded="false">Section</a>
              <div className="dropdown-menu" aria-labelledby="section">
                <button className="dropdown-item" type="button">Hot</button>
                <button className="dropdown-item" type="button">Top</button>
                <button className="dropdown-item" type="button">User</button>
              </div>
            </li>

            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" id="sorting" data-toggle="dropdown"
                 aria-haspopup="true" aria-expanded="false">Sort by</a>
              <div className="dropdown-menu" aria-labelledby="sorting">
                <button className="dropdown-item" type="button">Viral</button>
                <button className="dropdown-item" type="button">Top</button>
                <button className="dropdown-item" type="button">Time</button>
                <button className="dropdown-item" type="button">Rising</button>
              </div>
            </li>

            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" id="window" data-toggle="dropdown"
                 aria-haspopup="true" aria-expanded="false">Window</a>
              <div className="dropdown-menu" aria-labelledby="window">
                <button className="dropdown-item" type="button">Day</button>
                <button className="dropdown-item" type="button">Week</button>
                <button className="dropdown-item" type="button">Month</button>
              </div>
            </li>
          </ul>

          <form className="form-inline my-2 my-lg-0">
            <input className="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search"/>
            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
          </form>
        </div>
      </nav>
    );
  }
}

export default Navbar;
