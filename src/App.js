import React, {Component} from 'react';
import Gallery from "./Gallery";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      navBarIsOpen: false,
      section: 'Hot',
      sorting: 'Viral',
      window: 'Week'
    };

    this.toggleNavBar = this.toggleNavBar.bind(this);
    this.changeSection = this.changeSection.bind(this);
    this.changeSorting = this.changeSorting.bind(this);
    this.changeWindow = this.changeWindow.bind(this);
  }

  toggleNavBar() {
    this.setState({navBarIsOpen: !this.state.navBarIsOpen});
  }

  changeSection(e) {
    this.setState({section: e.currentTarget.textContent})
  }

  changeSorting(e) {
    this.setState({sorting: e.currentTarget.textContent})
  }

  changeWindow(e) {
    this.setState({window: e.currentTarget.textContent})
  }

  render() {
    return (
      <div className="App">
        <div>
          <Navbar color="light" light expand="md">
            <NavbarBrand href="/">ImgEr</NavbarBrand>
            <NavbarToggler onClick={this.toggleNavBar}/>
            <Collapse isOpen={this.state.navBarIsOpen} navbar>
              <Nav className="ml-auto" navbar>
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>{this.state.section}</DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem onClick={this.changeSection}>Hot</DropdownItem>
                    <DropdownItem onClick={this.changeSection}>Top</DropdownItem>
                    <DropdownItem onClick={this.changeSection}>User</DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>{this.state.sorting}</DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem onClick={this.changeSorting}>Viral</DropdownItem>
                    <DropdownItem onClick={this.changeSorting}>Rising</DropdownItem>
                    <DropdownItem onClick={this.changeSorting}>Time</DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>{this.state.window}</DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem onClick={this.changeWindow}>Day</DropdownItem>
                    <DropdownItem onClick={this.changeWindow}>Week</DropdownItem>
                    <DropdownItem onClick={this.changeWindow}>Month</DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </Nav>
            </Collapse>
          </Navbar>
        </div>

        <Gallery section={this.state.section} sorting={this.state.sorting} window={this.state.window}/>
      </div>
    );
  }
}

export default App;
