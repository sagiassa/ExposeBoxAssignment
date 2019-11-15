import React, { Component } from 'react';
import './App.css';
import axios from 'axios'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import SearchBar from './components/SearchBar'
import Login from './components/Login'
import Registration from './components/Registration'

class App extends Component {
  constructor() {
    super()
  }
  componentDidMount = () => {
    localStorage.setItem('option', true)
  }
  getDataFromAPIByTag = async (param) => {
    console.log(param + " got to app")
    let data = await axios.get(`http://localhost:3030/tags/`, { params: { tag: param } })
    console.log("back to app, data is:")
    console.log(data.data)
  }
  getDataFromAPIByQuery = async (param) => {
    console.log(param + " got to app")
    let data = await axios.get(`http://localhost:3030/query/`, { params: { search: param } })
    console.log("back to app, data is:")
    console.log(data.data)
  }
  AddUserToDB = (user) => {
    console.log("app js")
    axios.post('http://localhost:3030/users', user)
  }
  CheckForUserInDB = async (user) => {
    console.log(user)
    let data = await axios.get('http://localhost:3030/users/', {params : { userName : user.UserName, password: user.Password}})
    console.log(data)
    if(data){
      localStorage.setItem('user' , true)
    }else {
      localStorage.setItem('user', false)
      alert("Hey, You need to Register first")
    }
  }
  render() {
    return (
      <Router>
        <div>
          <div className="nav-bar">
            <Link to='/SearchBar'> Search </Link>
            <Link to='/Register'>Register</Link>
            <Link to='/Login'> Login </Link>
          </div>
          <Route path='/' exact render={() => <SearchBar getDataFromAPIByTag={this.getDataFromAPIByTag} getDataFromAPIByQuery={this.getDataFromAPIByQuery} />} />
          <Route path='/SearchBar' exact render={() => <SearchBar getDataFromAPIByTag={this.getDataFromAPIByTag} getDataFromAPIByQuery={this.getDataFromAPIByQuery} />} />
          <Route path='/Register' exact render={() => <Registration AddUserToDB={this.AddUserToDB} />} />
          <Route path='/Login' exact render={() => <Login CheckForUserInDB={this.CheckForUserInDB}/>} />
        </div>

      </Router>
    )
  }
}

export default App;
