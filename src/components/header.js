import React, { Component } from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import {GiTicTacToe} from 'react-icons/gi'

class Header extends Component{
render(){
        return (
        <div>
            <Navbar bg="light" expand="lg">
            <Navbar.Brand  style={{textAlign: 'center', width:'100%'}}><GiTicTacToe /> Welcome to TicTacToe Game!</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            </Navbar>
        </div>
        )
    }
}

export default Header