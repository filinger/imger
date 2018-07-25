import React, {Component} from 'react';

import {
  Button,
  Collapse,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Input,
  InputGroup,
  InputGroupAddon,
  Nav,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem,
  UncontrolledDropdown
} from 'reactstrap';

export class ImgNavBar extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      section: 'Hot',
      sorting: 'Viral',
      window: 'Week',
      query: ''
    };

    this.handleToggle = this.handleToggle.bind(this);
    this.handleChangeField = this.handleChangeField.bind(this);
    this.handleChangeQuery = this.handleChangeQuery.bind(this);
  }

  handleToggle() {
    this.setState({isOpen: !this.state.isOpen});
  }

  handleChangeField(field) {
    return e => {
      this.setState({[field]: e.currentTarget.textContent});
      this.props.onInputUpdate(this.state);
    };
  }

  handleChangeQuery(e) {
    this.setState({query: e.currentTarget.value});
    this.props.onInputUpdate(this.state);
  }

  render() {
    return (
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">Irina's Awesome Image Search Engine</NavbarBrand>
        <NavbarToggler onClick={this.handleToggle}/>
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <InputGroup>
                <InputGroupAddon addonType="prepend"><Button>Search</Button></InputGroupAddon>
                <Input placeholder="..." onChange={this.handleChangeQuery}/>
              </InputGroup>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>{this.state.section}</DropdownToggle>
              <DropdownMenu right>
                <DropdownItem onClick={this.handleChangeField('section')}>Hot</DropdownItem>
                <DropdownItem onClick={this.handleChangeField('section')}>Top</DropdownItem>
                <DropdownItem onClick={this.handleChangeField('section')}>User</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>{this.state.sorting}</DropdownToggle>
              <DropdownMenu right>
                <DropdownItem onClick={this.handleChangeField('sorting')}>Viral</DropdownItem>
                <DropdownItem onClick={this.handleChangeField('sorting')}>Rising</DropdownItem>
                <DropdownItem onClick={this.handleChangeField('sorting')}>Time</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>{this.state.window}</DropdownToggle>
              <DropdownMenu right>
                <DropdownItem onClick={this.handleChangeField('window')}>Day</DropdownItem>
                <DropdownItem onClick={this.handleChangeField('window')}>Week</DropdownItem>
                <DropdownItem onClick={this.handleChangeField('window')}>Month</DropdownItem>
                <DropdownItem onClick={this.handleChangeField('window')}>All</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Collapse>
      </Navbar>
    );
  }
}
