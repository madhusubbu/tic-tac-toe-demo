import React from 'react'
import { Link } from 'react-router-dom'
import { Storage } from './../storage/storage'
import { Form, Button, Navbar, Alert } from 'react-bootstrap';
import {Dropdown } from 'react-dropdown'
import 'react-dropdown/style.css';
import * as FaIcon from 'react-icons/fa';
import Icon from '@material-ui/core/Icon';
import * as MaterialDesign from 'react-icons/md';
import {FaRegUserCircle} from 'react-icons/fa';
import Header from './header'

export class Scorecard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Scorecard: [],
      user1Name: '',
      user1Symbol: 'X',
      user2Name: '',
      user2Symbol: 'O',
      symbols: ['X','O','$', 'I', '*', 'J', '@'],
      hasError: false
      //symbols: [{id:'f069', value:'\uf069'},{id:'f0a8', value:'\uf0a8'}, {id:'f101', value:'\uf101'},{id:'f188', value:'\uf188'}, {id:'f358', value:'\uf358'}]
    }
    
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  handleSubmit(event) {
    event.preventDefault();
    if(this.validate()){
    localStorage.setItem('users', this.state.user1Name + '~' + this.state.user1Symbol + '~' +this.state.user2Name + '~' + this.state.user2Symbol )
    window.location ='/board';
    }
  }
  
  async componentDidMount() {
    let storage = await new Storage().getData()

    this.setState({
      Scorecard: storage
    })
    this.setUserData()
  }

  handleUser1Name = event => {
    this.setState({user1Name: event.target.value})
  }

  handleUser1Symbol = event => {
    this.setState({user1Symbol: event.target.value})
  }

  handleUser2Name = event => {
    this.setState({user2Name: event.target.value})
  }

  handleUser2Symbol = event => {
    this.setState({user2Symbol: event.target.value})
  }

  clearHistory = () => {
    localStorage.removeItem('gameScorecard')
    this.setState({
      Scorecard: []
    })
}
  
clearData = () => {
  this.setState({
    user1Name: '',
    user1Symbol: 'X',
    user2Name: '',
    user2Symbol: 'O',
  })
}

setUserData(){
  let userSavedData = localStorage.getItem('users');
  if(userSavedData){
      let userData = userSavedData.split('~');
      this.setState({
        user1Name: userData[0],
        user1Symbol: userData[1],
        user2Name: userData[2],
        user2Symbol: userData[3],
      })
  }
}

validate() {
   if(this.state.user1Name === ''){
    this.setState({ hasError: true, errorMessage: "Enter First User Name"});
    return false
  }
  if(this.state.user2Name === ''){
    this.setState({ hasError: true, errorMessage: "Enter Second User Name"});
    return false
  }  
  if(this.state.user1Name.trim() === this.state.user2Name.trim()){
    this.setState({ hasError: true, errorMessage: "User Name cannot be same"});
    return false
  }
  if(this.state.user1Symbol === this.state.user2Symbol){
    this.setState({ hasError: true, errorMessage: "Same symbol cannot be selected"});
    return false
  }

  return true
}

  render() {
    return (
      <div>
         <Header />
         <br /> 
         {this.state.hasError ? 
                    <Alert variant="danger" onClick={() => this.setState({ hasError: false })}>{this.state.errorMessage}</Alert> : ""} 
      <div style={{display: 'flex'}}> <br />
      <div style={{width:'65%'}}>
        <div className="container">
        <br />
          <Form onSubmit={this.handleSubmit}>
          <Form.Label style={{fontWeight:'bold'}}>First Player&nbsp;&nbsp;</Form.Label>
                <FaRegUserCircle />
              <div style={{display: 'flex'}}>
                <div style={{width:'70%'}}>
                  <Form.Control
                      type="text" value = {this.state.user1Name} onChange ={this.handleUser1Name} placeholder ="Enter Name here"
                  />
                </div>
                <div style={{width:'2%'}}></div>
                <div style={{width:'25%'}} >
                    <select  value={this.state.user1Symbol} onChange={this.handleUser1Symbol} className="ddl" placeholder="Select Symbol">
                    {this.state.symbols.map(list => (
                      <option key={list} value={list.id} >
                          {list}
                      </option>
                    ))}
                  </select>
                </div>
              </div>  
                <br />  <br />

                <Form.Label style={{fontWeight:'bold'}}>Second Player&nbsp;&nbsp;</Form.Label>
                <FaRegUserCircle />
                <div style={{display: 'flex'}}>
                  <div style={{width:'70%'}}>
                  <Form.Control
                        type="text"  value = {this.state.user2Name} onChange ={this.handleUser2Name} placeholder ="Enter Name here"
                    />
                  </div>
                  <div style={{width:'2%'}}></div>
                  <div style={{width:'25%'}} >
                  <select  value={this.state.user2Symbol} onChange={this.handleUser2Symbol} className="ddl">
                      {this.state.symbols.map((list, index) => (
                          <option key={list} value={list}>
                            {list}
                          </option>
                    ))}
                  </select>
                  </div>
                </div>
               
                <br /> <br />
                <div style={{display: 'flex'}}>
                    <div style={{width:'50%'}}>
                        <span>
                          First User: <br />
                          &nbsp;&nbsp;&nbsp;Name: {this.state.user1Name}  <br />
                          &nbsp;&nbsp;&nbsp;Symbol: {this.state.user1Symbol} <br />
                        </span> <br />
                    </div>
                    <div style={{width:'50%'}}>
                        <span>
                          Second User: <br />
                          &nbsp;&nbsp;&nbsp;Name: {this.state.user2Name}  <br />
                          &nbsp;&nbsp;&nbsp;Symbol: {this.state.user2Symbol}
                        </span> <br />
                    </div>
                  </div>
                <Button type="submit" variant="outline-primary" className="btn" id="startBtn">Start New Game</Button>
                &nbsp;&nbsp; <Button onClick={this.clearData.bind(this)}>Clear</Button>
            </Form>
          </div>
      </div>
      <div style={{width:'35%'}} className="game">
      <br />
      <h3>Recent Games Result:</h3>
        <ul>
          {this.state.Scorecard.map((leader, key) => {
            return <li key={key}>{leader}</li>
          })}
        </ul> <br />
        {
          (this.state.Scorecard.length > 0) && <div>
              <button className="btn" onClick={this.clearHistory}>Clear History</button> <br />
          </div>
        }
      </div>
      </div>   
    </div>
    )
  }
}