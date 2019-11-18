import React, { Component } from 'react'
import { Link } from 'react-router-dom';

import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';

class Registration extends Component {
    constructor() {
        super()
        this.state = {
            FullName: null,
            Email: null,
            UserName: null,
            Password: null,
            user: false
        }
    }
    handleChange = async (e) => {
        await this.setState({ [e.target.name]: e.target.value })
    }
    TrnsferUserToDB = () => {
        if (this.state.Email && this.state.FullName && this.state.UserName && this.state.Password) {
            if (this.state.Email.includes('@')) {
                let user = {
                    FullName: this.state.FullName,
                    Email: this.state.Email,
                    UserName: this.state.UserName,
                    Password: this.state.Password
                }
                this.props.AddUserToDB(user)
                this.setState({ user: true })
                this.StartSearching()
            } else {
                alert('Hey, check your mail input please, @ is missing')
            }
        } else {
            alert('Hey, check your inputs please, somthing is wrong or missing')
        }
    }
    StartSearching = () => {

    }
    render() {
        return (
            <div>
                <form class="signup-form">
                    <div>
                        <TextField
                            name="FullName"
                            hintText="Bob Marly"
                            value={this.state.firstName} onChange={this.handleChange}
                            floatingLabelText="Full Name"
                        />
                    </div>
                    <div>
                        <TextField
                            name="Email"
                            hintText="example@mail.com"
                            value={this.state.mail} onChange={this.handleChange}
                            floatingLabelText="Email"
                        />
                    </div>
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
                        <Link to="/SearchBar" onClick={this.TrnsferUserToDB} > Register</Link>
                    </Fab>
                </form>
            </div>
        )
    }
}

export default Registration