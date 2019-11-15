import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';

export class Login extends Component {
    constructor() {
        super()
        this.state = {
            UserName: null,
            Password: null
        }
    }
    handleChange = async (e) => {
        await this.setState({ [e.target.name]: e.target.value })
        console.log(this.state)
    }
    CheckForUserInDB = () => {
        this.props.CheckForUserInDB(this.state)
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
                <Fab variant="extended" aria-label="like" className="submit" onClick={this.CheckForUserInDB}>
                    {/* <NavigationIcon className="icon" /> */}
                    Login
                    </Fab>
            </div>
        )
    }
}

export default Login;
