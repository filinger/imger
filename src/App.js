import React, {Component} from 'react';
import Gallery from "./Gallery";
import {
  Button,
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem, InputGroup, InputGroupAddon, Input, NavItem
} from 'reactstrap';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      navBarIsOpen: false,
      section: 'Hot',
      sorting: 'Viral',
      window: 'Week',
      tags: [],
      search: ''
    };

    this.toggleNavBar = this.toggleNavBar.bind(this);
    this.changeSection = this.changeSection.bind(this);
    this.changeSorting = this.changeSorting.bind(this);
    this.changeWindow = this.changeWindow.bind(this);
    this.changeTags = this.changeTags.bind(this);
    this.changeSearch = this.changeSearch.bind(this);
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

  changeTags(e) {
    const re = /#\w+/g;
    this.setState({tags: e.currentTarget.value.match(re)})
  }

  changeSearch(e) {
    this.setState({search: e.currentTarget.value})
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
                <NavItem>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend"><Button>Tags</Button></InputGroupAddon>
                    <Input placeholder="#cats #acid ..." onChange={this.changeTags}/>
                  </InputGroup>
                </NavItem>
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
                    <DropdownItem onClick={this.changeWindow}>All</DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </Nav>
            </Collapse>
          </Navbar>
        </div>

        <Gallery {...this.state}/>
      </div>
    );
  }
}

export default App;
