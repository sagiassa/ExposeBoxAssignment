import React, { Component } from 'react'
import { BrowserRouter as Redirect, Link } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';

export class Login extends Component {
    constructor() {
        super()
        this.state = {
            UserName: null,
            Password: null,
            user: false
        }
    }
    handleChange = async (e) => {
        await this.setState({ [e.target.name]: e.target.value })
    }
    CheckForUserInDB = async () => {
        await this.props.CheckForUserInDB(this.state)
        if (localStorage.getItem('user') === 'true') {
            await this.setState({ user: true })
        }
    }
    render() {
        return (
            <div>
                <div>
                    <TextField
                        name="UserName"
                        hintText="example123"
                        value={this.state.firstName} onChange={this.handleChange}
                        floatingLabelText="First Name"
                    />
                </div>
                <div>
                    <TextField
                        name="Password"
                        value={this.state.firstName} onChange={this.handleChange}
                        floatingLabelText="password"
                        type="password"
                    />
                </div>
                <Fab variant="extended" aria-label="like" className="submit" >
                    <Link to='/SearchBar' onClick={this.CheckForUserInDB}> Login </Link>
                </Fab>
            </div>
        )
    }
}

export default Login;
