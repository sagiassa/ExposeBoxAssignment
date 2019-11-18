import React, { Component } from 'react'
import { BrowserRouter as Redirect } from 'react-router-dom';

class Logout extends Component {
    constructor() {
        super()
    }
    componentWillMount = () => {
        this.props.Logout()
    }

    render() {
        return (
            <Redirect to='/' />
        )
    }
}

export default Logout