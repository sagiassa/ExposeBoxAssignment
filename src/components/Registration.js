import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';

class Registration extends Component {
    constructor() {
        super()
        this.state = {
            FullName: null,
            Email: null,
            UserName: null,
            Password: null
        }
    }
    handleChange = async (e) => {
        await this.setState({ [e.target.name]: e.target.value })
    }
    TrnsferUserToDB = () => {
        if (this.state.Email.includes('@') && this.state.FullName && this.state.UserName && this.state.Password) {
            let user = {
                FullName: this.state.FullName,
                Email: this.state.Email,
                UserName: this.state.UserName,
                Password: this.state.Password
            }
            this.props.AddUserToDB(user)
            alert(this.state.FullName + ", you registered Successfully")
        } else {
            alert('Hey, check your inputs please, somthing is wrong or missing')
        }

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
                    <Fab variant="extended" aria-label="like" className="submit" onClick={this.TrnsferUserToDB}>
                        {/* <NavigationIcon className="icon" /> */}
                        Register
                    </Fab>
                </form>
            </div>
        )
    }
}

export default Registration