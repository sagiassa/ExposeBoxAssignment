import React, { Component } from 'react';
import './App.css';
import axios from 'axios'
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';
import SearchBar from './components/SearchBar'
import Login from './components/Login'
import Logout from './components/Logout'
import Registration from './components/Registration'
import DetailsPage from './components/DetailsPage'
import { declareTypeAlias } from '@babel/types';

class App extends Component {
  constructor() {
    super()
    this.state = {
      data: null,
      user: false
    }
  }
  componentDidMount = () => {
    localStorage.setItem('option', true)
    if(!localStorage.getItem('topSearched')){
      localStorage.setItem('topSearched', null)
      localStorage.setItem('topSearchedCount', 0)
    }

  }
  getDataFromAPIByTag = async (param) => {
    let data = await axios.get(`http://localhost:3030/tags/`, { params: { tag: param } })
    let posts = data.data.posts
    this.setState({ data : posts })
  }
  getDataFromAPIByQuery = async (param) => {
    let data = await axios.get(`http://localhost:3030/query/`, { params: { search: param } })
    let posts = data.data.posts
    this.setState({ data : posts })
  }
  AddUserToDB = (user) => {
    axios.post('http://localhost:3030/users', user)
    localStorage.setItem('user', true)
    this.setState({ user: true })
  }
  CheckForUserInDB = async (user) => {
    let data = await axios.get('http://localhost:3030/users/', { params: { userName: user.UserName, password: user.Password } })
    if (data.data.length > 0) {
      localStorage.setItem('user', true)
      this.setState({ user: true })
    } 
    else {
      localStorage.setItem('user', false)
      alert("Hey, You need to Register first")
    }
  }
  Logout = () => {
    localStorage.setItem('user', false)
    this.setState({ user : false })
  }
  render() {
    return (
      <Router>
        <div>
          <div className="nav-bar">
            {this.state.user ? <div>
              <Link to='/SearchBar'> Search </Link>
              <Link to='/Logout'> Logout </Link> </div>
              : <div>
                <Link to='/SearchBar'> Search </Link>
                <Link to='/Register'>Register</Link>
                <Link to='/Login'> Login </Link>
              </div>}
          </div>
          <Route path='/' exact render={() => <SearchBar data={this.state.data} getDataFromAPIByTag={this.getDataFromAPIByTag} getDataFromAPIByQuery={this.getDataFromAPIByQuery} />} />
          <Route path='/SearchBar' exact render={() => <SearchBar data={this.state.data} getDataFromAPIByTag={this.getDataFromAPIByTag} getDataFromAPIByQuery={this.getDataFromAPIByQuery} />} />
          <Route path='/Register' exact render={() => <Registration AddUserToDB={this.AddUserToDB} />} />
          <Route path='/Login' exact render={() => <Login CheckForUserInDB={this.CheckForUserInDB} />} />
          <Route path='/Logout' exact render={() => <Logout Logout={this.Logout} /> } />
          <Route path='/DetailsPage' exact render={() => <DetailsPage />} />
        </div>

      </Router>
    )
  }
}

export default App;
